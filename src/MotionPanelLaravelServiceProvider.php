<?php

namespace MotionPanel\MotionPanelLaravel;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Route;
class MotionPanelLaravelServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        $this->mergeConfigFrom(__DIR__ . '/../config/motionpanel.php', 'motionpanel');
        $this->loadViewsFrom(__DIR__ . '/../resources/views', 'motionpanel');

        Route::group(['middleware' => config('motionpanel.global.web.middleware')], function () {
            $this->loadRoutesFrom(__DIR__ . '/../src/Global/routes/web.php');
        });

        $this->publishes([
            __DIR__ . '/../public' => public_path(''),
        ], 'motionpanel-assets');

        $this->publishes([
            __DIR__ . '/../config/motionpanel.php' => config_path('motionpanel.php'),
        ], 'motionpanel-config');

        // add modules here
        $this->registerJobModule();
    }

    protected function registerJobModule()
    {
        Route::group(['middleware' => config('motionpanel.job.api.middleware')], function () {
            $this->loadRoutesFrom(__DIR__ . '/../src/Job/routes/api.php');
        });
    }
}