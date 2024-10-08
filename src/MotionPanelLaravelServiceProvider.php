<?php

namespace MotionPanel\MotionPanelLaravel;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Route;
class MotionPanelLaravelServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        $this->mergeConfigFrom(__DIR__ . '/../config/motionpanel.php', 'motionpanel');
        Route::group(['middleware' => $this->routeConfiguration()['web-middleware']], function () {
            $this->loadRoutesFrom(__DIR__ . '/../routes/web.php');
        });

        Route::group(['middleware' => $this->routeConfiguration()['api-middleware']], function () {
            $this->loadRoutesFrom(__DIR__ . '/../routes/api.php');
        });

        $this->loadViewsFrom(__DIR__ . '/../resources/views', 'motionpanel');
        $this->publishes([
            __DIR__ . '/../public' => public_path(''),
        ], 'motionpanel');

        $this->publishes([
            __DIR__ . '/../config/motionpanel.php' => config_path('motionpanel.php'),
        ], 'motionpanel');

    }

    protected function routeConfiguration()
    {
        return [
            'web-middleware' => config('motionpanel.web-middleware'),
            'api-middleware' => config('motionpanel.api-middleware'),
        ];
    }
}