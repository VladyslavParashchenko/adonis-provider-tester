export interface ProviderConstructor {
	new (...providerArgs: unknown[]): AdonisProvider

	needsApplication?: boolean
}

export interface AdonisProvider {
	ready?: () => Promise<void> | void

	shutdown?: () => Promise<void> | void

	register(): Promise<void> | void

	boot(): Promise<void> | void
}

export interface ApplicationConfig {
	configName: string
	appConfig: object
}
