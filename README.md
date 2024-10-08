# Motion Panel for Laravel

Motion Panel is an elegant and powerful dashboard designed to help you monitor and manage your Laravel application with ease. Whether you're tracking jobs, monitoring system performance, or debugging routes, Motion Panel provides a comprehensive suite of tools to keep your application running smoothly. Experience seamless integration and enhanced visibility into your application's operations with Motion Panel.

![Motion Panel Screenshot](screenshot.png)

## Installation

```sh
composer require motionpanel/motionpanel-laravel
php artisan vendor:publish --tag=motionpanel-assets
```

### Custom middleware for "/motionpanel/\*" and "/api/motionpanel/\*"

You need to publish the config first:

```sh
php artisan vendor:publish --tag=motionpanel-config
```

And you can add middleware to the `web-middleware` config for web routes under "/motionpanel/\*", and to the `api-middleware` config for API routes under "/api/motionpanel/\*".

### Todos

#### Phase #0

- [ ] Support Middleware for "/motionpanel/\*" and "/api/motionpanel/\*"
- [ ] Release v0.1
- [x] Write installation guide
- [ ] Write development guide
- [x] Show tanstack router debugger only in development
- [ ] Build UI for exception state (APIs return non 2xx)

#### Phase #1

- [x] Jobs monitoring (Database)
- [ ] Jobs filter by date (Database)
- [x] Jobs detailed panel (Database)
- [x] Failed jobs monitoring (Database)
- [ ] Failed jobs filter by date (Database)
- [x] Failed jobs detailed panel (Database)
- [ ] Jobs monitoring (Redis)
- [ ] Failed jobs monitoring (Redis)
- [ ] Test support for Laravel 9+

#### Phase #2

- [ ] Router logs

#### Phase #3

- [ ] CPU load monitoring
- [ ] Memory load

### Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to contribute to this project.

### License

This project is licensed under the terms of the MIT license. See [LICENSE.md](LICENSE.md) for details.
