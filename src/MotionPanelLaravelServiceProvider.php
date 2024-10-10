<?php

namespace MotionPanel\MotionPanelLaravel;
use MotionPanel\MotionPanelLaravel\Global\Console;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Route;

class MotionPanelLaravelServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        if ($this->app->runningInConsole()) {
            $this->commands([
                Console\InstallCommand::class,
                Console\PublishCommand::class,
            ]);
        }

        $this->mergeConfigFrom(__DIR__ . '/../config/motionpanel.php', 'motionpanel');
        $this->loadViewsFrom(__DIR__ . '/../resources/views', 'motionpanel');

        Route::group(['middleware' => config('motionpanel.middleware')], function () {
            $this->loadRoutesFrom(__DIR__ . '/../src/Global/routes/web.php');
        });

        $this->publishes([
            __DIR__ . '/../public' => public_path(''),
        ], 'motionpanel-assets');

        $this->publishes([
            __DIR__ . '/../config/motionpanel.php' => config_path('motionpanel.php'),
        ], 'motionpanel-config');

        $this->publishes([
            __DIR__ . '/../stubs/MotionPanelLaravelServiceProvider.stub' => app_path('Providers/MotionPanelLaravelServiceProvider.php'),
        ], 'motionpanel-provider');

        // add modules here
        $this->registerJobModule();
    }



    protected function registerJobModule()
    {
        Route::group(['middleware' => config('motionpanel.middleware')], function () {
            $this->loadRoutesFrom(__DIR__ . '/../src/Job/routes/api.php');
        });
    }


}