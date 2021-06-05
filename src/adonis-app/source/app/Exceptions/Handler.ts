export default class ExceptionHandler {
	protected ignoreStatuses = []

	public async handle(error, ctx) {
		if (typeof error.handle === 'function') {
			return error.handle(error, ctx)
		}
		return ctx.response.status(500).send({ error: 'UNHANDLED_ERROR' })
	}

	public async report() {}
}
