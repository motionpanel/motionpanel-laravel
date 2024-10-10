<?php

namespace MotionPanel\MotionPanelLaravel\Global\Console;

use Illuminate\Console\Command;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Str;
use Symfony\Component\Console\Attribute\AsCommand;

#[AsCommand(name: 'motionpanel:install')]
class InstallCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'motionpanel:install';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Install all of the MotionPanel resources';

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle()
    {
        $this->comment('Publishing MotionPanel Service Provider...');
        $this->callSilent('vendor:publish', ['--tag' => 'motionpanel-provider']);

        $this->comment('Publishing MotionPanel Assets...');
        $this->callSilent('vendor:publish', ['--tag' => 'motionpanel-assets']);

        $this->comment('Publishing MotionPanel Configuration...');
        $this->callSilent('vendor:publish', ['--tag' => 'motionpanel-config']);

        $this->registerMotionPanelServiceProvider();

        $this->info('MotionPanel scaffolding installed successfully.');
    }

    /**
     * Register the MotionPanel service provider in the application configuration file.
     *
     * @return void
     */
    protected function registerMotionPanelServiceProvider()
    {
        if (
            method_exists(ServiceProvider::class, 'addProviderToBootstrapFile') &&
            ServiceProvider::addProviderToBootstrapFile(\App\Providers\MotionPanelLaravelServiceProvider::class) // @phpstan-ignore-line
        ) {
            return;
        }

        $namespace = Str::replaceLast('\\', '', $this->laravel->getNamespace());

        $appConfig = file_get_contents(config_path('app.php'));

        if (Str::contains($appConfig, $namespace . '\\Providers\\MotionPanelLaravelServiceProvider::class')) {
            return;
        }

        $lineEndingCount = [
            "\r\n" => substr_count($appConfig, "\r\n"),
            "\r" => substr_count($appConfig, "\r"),
            "\n" => substr_count($appConfig, "\n"),
        ];

        $eol = array_keys($lineEndingCount, max($lineEndingCount))[0];

        file_put_contents(config_path('app.php'), str_replace(
            "{$namespace}\\Providers\RouteServiceProvider::class," . $eol,
            "{$namespace}\\Providers\RouteServiceProvider::class," . $eol . "        {$namespace}\Providers\MotionPanelLaravelServiceProvider::class," . $eol,
            $appConfig
        ));

        file_put_contents(app_path('Providers/MotionPanelLaravelServiceProvider.php'), str_replace(
            "namespace App\Providers;",
            "namespace {$namespace}\Providers;",
            file_get_contents(app_path('Providers/MotionPanelLaravelServiceProvider.php'))
        ));
    }
}
