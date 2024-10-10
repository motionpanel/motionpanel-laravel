# Contributing to MotionPanel for Laravel

Thank you for considering contributing to MotionPanel! We welcome contributions from the community and are excited to work with you.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- PHP
- Composer
- Node.js
- npm or yarn

### Installation

1. Fork the repository and clone it to your local machine.
2. Navigate to the project directory:
   ```sh
   cd motionpanel-laravel
   ```
3. Install PHP dependencies:
   ```sh
   composer install
   ```
4. Install JavaScript dependencies:
   ```sh
   npm install
   ```
   or
   ```sh
   yarn install
   ```

### Running the Project

1. Add this to your Laravel project `composer.json`

   ```json
    "repositories": [
        {
            "type": "path",
            "url": "<path to this repo>"
        }
   ]
   ```

   then proceed to installation guide in [README.md](README.md)

2. In a new terminal, start Vite:
   ```sh
   npm run dev
   ```
   or
   ```sh
   yarn dev
   ```

### Running Tests

To ensure your changes do not break existing functionality, run the project's test suite. The project uses Pest and Testbench for testing, which are already installed.

1. Run the tests:

   ```sh
   composer run-script test
   ```

This command will execute all the tests and provide you with a report of the results.

## Code Guidelines

### PHP

- Follow the [PSR-12](https://www.php-fig.org/psr/psr-12/) coding standard.
- Ensure your code passes all tests and does not break existing functionality.

### JavaScript/TypeScript

- Use [ESLint](https://eslint.org/) for linting.
- Follow the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript).
- Use TypeScript for type safety.

## Submitting Changes

1. Create a new branch for your feature or bugfix:
   ```sh
   git checkout -b feature/your-feature-name
   ```
2. Commit your changes with a descriptive commit message.
3. Push your branch to your forked repository:
   ```sh
   git push origin feature/your-feature-name
   ```
4. Open a Pull Request against the `main` branch of the original repository.

## Reporting Issues

If you find a bug or have a feature request, please open an issue on GitHub. Provide as much detail as possible to help us understand and address the issue.

## Code of Conduct

Please adhere to our [Code of Conduct](CODE_OF_CONDUCT.md) in all interactions.

Thank you for contributing!
