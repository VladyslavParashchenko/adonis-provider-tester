import { Ignitor } from '@adonisjs/core/build/src/Ignitor'
import { createServer } from 'http'
import { HttpServer } from '@adonisjs/core/build/src/Ignitor/HttpServer'
import { ConfigContract } from '@ioc:Adonis/Core/Config'
import { join } from 'path'
import { ContainerBindings } from '@ioc:Adonis/Core/Application'
import { IocContract } from '@adonisjs/fold'
import { execOneByOne } from '../helpers/execOneByOne'
import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { ServerContract } from '@ioc:Adonis/Core/Server'
import { AdonisProvider, ApplicationConfig, ProviderConstructor } from './types'

export class AdonisApplication {
	private _httpServer: HttpServer
	private _application: ApplicationContract
	private customerProviderInstances: AdonisProvider[] = []
	private middlewaresMap: Record<string, string> = {}

	constructor(
		private customProviders: ProviderConstructor[] = [],
		private appConfigs: ApplicationConfig[] = []
	) {}

	public registerProvider(provider: ProviderConstructor): AdonisApplication {
		this.customProviders.push(provider)
		return this
	}

	public registerAppConfig(config: ApplicationConfig): AdonisApplication {
		this.appConfigs.push(config)
		return this
	}

	public registerNamedMiddleware(alias: string, middleware: string): this {
		this.middlewaresMap[alias] = middleware
		return this
	}

	public async loadApp(): Promise<this> {
		await this.initApplication()
		await this.initCustomProviders()
		await this.registerProviders()
		await this.registerMiddlewares()
		await this.initApplicationConfigs()
		await this.bootProviders()

		return this
	}

	public async loadAppWithHttpServer(): Promise<this> {
		await this.loadApp()
		await this.startHttpServer()

		return this
	}

	private initApplication() {
		this._httpServer = new Ignitor(join(__dirname, 'source')).httpServer()
		this._application = this._httpServer.application
	}

	private async initCustomProviders() {
		this.customerProviderInstances = this.customProviders.map((Provider) => {
			return Provider.needsApplication
				? new Provider(this._application)
				: new Provider(this._application.container)
		})
	}

	private async registerProviders() {
		await this.application.setup()
		await this.application.registerProviders()
		const { providersWithShutdownHook, providersWithReadyHook } = this.application as any as {
			providersWithReadyHook: AdonisProvider[]
			providersWithShutdownHook: AdonisProvider[]
		}

		await execOneByOne(
			this.customerProviderInstances.map((provider) => {
				if (typeof provider.ready === 'function') {
					providersWithReadyHook.push(provider)
				}

				if (typeof provider.shutdown === 'function') {
					providersWithShutdownHook.push(provider)
				}

				return provider.register()
			})
		)
	}

	private async initApplicationConfigs() {
		const config: ConfigContract = this._application.container.use('Adonis/Core/Config')
		this.appConfigs.map(({ appConfig, configName }) => config.set(configName, appConfig))
	}

	private async bootProviders() {
		await this.application.bootProviders()
		await execOneByOne(this.customerProviderInstances.map((provider) => provider.boot()))
	}

	private async startHttpServer() {
		await this._httpServer.start((handler) => createServer(handler))
	}

	public get httpServer(): HttpServer {
		return this._httpServer
	}

	public get application(): ApplicationContract {
		return this._application
	}

	public get iocContainer(): IocContract<ContainerBindings> {
		return this._application.container
	}

	public static initApplication(
		customProviders: ProviderConstructor[] = [],
		appConfigs: ApplicationConfig[] = []
	) {
		const app = new AdonisApplication(customProviders, appConfigs)
		return app.loadAppWithHttpServer()
	}

	public async stopServer() {
		await this._httpServer.close()
	}

	public async stopApp() {
		await this.application.shutdown()
	}

	private async registerMiddlewares() {
		const server: ServerContract = this._application.container.use('Adonis/Core/Server')
		server.middleware.registerNamed(this.middlewaresMap)
	}
}
