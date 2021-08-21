# adonis5-provider-tester
> AdonisJS

[![typescript-image]][typescript-url] [![npm-image]][npm-url] [![license-image]][license-url]

> Util for running adonis providers for testing.

# Using
Setup adonis app with your providers and configs:
```ts
const app = await new AdonisApplication()
			.registerProvider(AdonisCacheProvider)
			.registerProvider(AdonisRequestThrottlerProvider)
			.registerAppConfig({ configName: 'cache', appConfig: cacheConfig })
			.registerAppConfig({ configName: 'request-throttler', appConfig: throttlerConfig })
			.loadApp()
```

Take object from container:
```ts
const instance = app.iocContainer.use(<ProviderURI>)
```

Setup adonis app and start http server for app:
```ts
const app = await new AdonisApplication()
			.registerProvider(AdonisCacheProvider)
			.registerProvider(AdonisRequestThrottlerProvider)
			.registerAppConfig({ configName: 'cache', appConfig: cacheConfig })
			.registerAppConfig({ configName: 'request-throttler', appConfig: throttlerConfig })
			.loadAppWithHttpServer()
```

Close app:
```ts
await app.stopApp()
```

Close http server:
```ts
await app.stopServer()
```

Register middleware:
```ts
import { Middleware } from "co-compose";

const app = await new AdonisApplication()
	.registerProvider(MiddlewareProvider)
	.registerNamedMiddleware('<middleware-name>', '<middleware-uri>')
	.loadAppWithHttpServer()
```

[typescript-image]: https://img.shields.io/badge/Typescript-294E80.svg?style=for-the-badge&logo=typescript

[typescript-url]:  "typescript"

[npm-image]: https://img.shields.io/npm/v/adonis-provider-tester.svg?style=for-the-badge&logo=npm

[npm-url]: https://www.npmjs.com/package/adonis-provider-tester "npm"

[license-image]: https://img.shields.io/npm/l/adonis-provider-tester?color=blueviolet&style=for-the-badge

[license-url]: LICENSE.md "license"
