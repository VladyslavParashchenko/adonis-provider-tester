import { Logger } from '@adonisjs/logger/build'
import { HttpExceptionHandler } from '@adonisjs/core/build/src/HttpExceptionHandler'
import { LoggerConfig } from '@ioc:Adonis/Core/Logger'

export default class ExceptionHandler extends HttpExceptionHandler {
	constructor() {
		super(new Logger({ enabled: false } as LoggerConfig))
	}

	protected ignoreStatuses = []

	public async handle(error, ctx) {
		await super.handle(error, ctx)
	}

	public async report() {}
}
