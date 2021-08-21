<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of contents

- [adonis5-provider-tester](#adonis5-provider-tester)
- [Using](#using)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


# adonis5-provider-tester
> AdonisJS
[![typescript-image]][typescript-url] [![npm-image]][npm-url] [![license-image]][license-url]

> Test utils for running adonis providers for testing.

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
