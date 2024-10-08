# Motion Panel for Laravel

## Installation

```sh
composer require motionpanel/motionpanel-laravel
php artisan vendor:publish --tag=motionpanel
```

### Todos

#### Phase #0

- [ ] Support Middleware for "/motion-panel/\*" and "/api/motion-panel/\*"
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
