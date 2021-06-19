import { Logger } from '@adonisjs/logger/build'
import { HttpExceptionHandler } from '@adonisjs/core/build/src/HttpExceptionHandler'

export default class ExceptionHandler extends HttpExceptionHandler {
	constructor() {
		super(new Logger({ enabled: false } as any))
	}

	protected ignoreStatuses = []

	public async handle(error, ctx) {
		await super.handle(error, ctx)
	}

	public async report() {}
}
