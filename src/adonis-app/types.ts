export interface ProviderConstructor {
	new (...providerArgs: unknown[]): AdonisProvider

	needsApplication: boolean
}

export interface AdonisProvider {
	ready?: () => Promise<void>

	shutdown?: () => Promise<void>

	register(): Promise<void>

	boot(): Promise<void>
}

export interface ApplicationConfig {
	configName: string
	appConfig: object
}
