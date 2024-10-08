# Motion Panel for Laravel

> Notes: Currently, only Laravel 9.x, 10.x, and 11.x are supported. Newer versions need to be tested.
> If you need to support versions older than Laravel 9.x, you're welcome to create a pull request.

> **Note:** This project is in the very early stages of development. Some features may not be available or fully functional yet.

Motion Panel is an elegant and powerful dashboard designed to help you monitor and manage your Laravel application with ease. Whether you're tracking jobs, monitoring system performance, or debugging routes, Motion Panel provides a comprehensive suite of tools to keep your application running smoothly. Experience seamless integration and enhanced visibility into your application's operations with Motion Panel.

![Motion Panel Screenshot](screenshot.png)

## Installation

```sh
composer require motionpanel/motionpanel-laravel
```

### Register Motion Panel Service Provider:

For Laravel 11.x, in `bootstrap/providers.php`:

```php
<?php

return [
    ...
    MotionPanel\MotionPanelLaravel\MotionPanelLaravelServiceProvider::class,
];
```

For Laravel 10.x, in `config/app.php`:

```php
'providers' => ServiceProvider::defaultProviders()->merge([
    // Other Service Providers

    App\Providers\ComposerServiceProvider::class,
])->toArray(),
```

For Laravel 9.x, in `config/app.php`:

```php
'providers' => [
    // Other Service Providers
    MotionPanel\MotionPanelLaravel\MotionPanelLaravelServiceProvider::class,
];
```

Publish the assets:

```sh
php artisan vendor:publish --tag=motionpanel-assets --force
```

### Custom Middleware for "/motionpanel/_" and "/api/motionpanel/_"

You need to publish the config first:

```sh
php artisan vendor:publish --tag=motionpanel-config
```

Once the Motion Panel config is published, go to `config/motionpanel.php` and add middleware to the `web-middleware` config for web routes under "/motionpanel/_", and to the `api-middleware` config for API routes under "/api/motionpanel/_".

### Todos

#### Phase #0

- [x] Support Middleware for "/motionpanel/_" and "/api/motionpanel/_"
- [x] Release v0.1
- [x] Write installation guide
- [ ] Write development guide
- [x] Show tanstack router debugger only in development
- [ ] Build UI for exception state (APIs return non-2xx)
- [x] Build Job status page

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

#### Phase #3 (Integrate with Prometheus)

- [ ] CPU load monitoring
- [ ] Memory load monitoring

### Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to contribute to this project.

### License

This project is licensed under the terms of the MIT license. See [LICENSE.md](LICENSE.md) for details.
