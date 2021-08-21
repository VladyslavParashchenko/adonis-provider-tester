import AdonisApplication from '../index'
import { mocked } from 'ts-jest/utils'
import { ProviderConstructor } from '../src/adonis-app/types'
import { ConfigContract } from "@ioc:Adonis/Core/Config";
import { Application } from "@adonisjs/application";

describe('Adonis provider tester test', () => {
	test('provider loading', async () => {
		const registerMock = jest.fn().mockImplementation(() => Promise.resolve())
		const bootMock = jest.fn().mockImplementation(() => Promise.resolve())
		const provider: any = jest.fn().mockImplementation(() => ({
			register: registerMock,
			boot: bootMock,
		}))
		provider.needsApplication = jest.fn().mockReturnValue(true)

		const app = await AdonisApplication.initApplication([provider as any as ProviderConstructor])
		expect(mocked(provider)).toHaveBeenNthCalledWith(1, expect.any(Application))
		expect(registerMock).toHaveBeenCalled()
		expect(bootMock).toHaveBeenCalled()

		await app.stopApp()
	})

	test('config loading', async () => {
		const configName = 'testConfig'
		const testConfig = { a: 1, b: '1', c: true }

		const app: AdonisApplication = await AdonisApplication.initApplication([], [{
			configName: configName,
			appConfig: testConfig
		}])

		const config: ConfigContract = app.iocContainer.use('Adonis/Core/Config')
		expect(config.get(configName)).toEqual(testConfig)

		await app.stopApp()
	})
})

