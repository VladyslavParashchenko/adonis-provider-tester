export async function execOneByOne(promises: Promise<unknown>[] | unknown[]): Promise<void> {
	try {
		for (const promise of promises) {
			await promise
		}
	} catch (e) {
		throw e
	}
}
