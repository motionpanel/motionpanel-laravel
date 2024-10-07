<?php

namespace MotionPanel\MotionPanelLaravel;
use Illuminate\Support\ServiceProvider;
class MotionPanelLaravelServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        $this->mergeConfigFrom(__DIR__ . '/../config/motionpanel.php', 'motionpanel');
        $this->loadRoutesFrom(__DIR__ . '/../routes/web.php');
        $this->loadRoutesFrom(__DIR__ . '/../routes/api.php');
        $this->loadViewsFrom(__DIR__ . '/../resources/views', 'motionpanel');
        $this->publishes([
            __DIR__ . '/../public' => public_path(''),
        ], 'motionpanel');
    }
}