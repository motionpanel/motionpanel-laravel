<?php

use Illuminate\Support\Facades\Route;
use MotionPanel\MotionPanelLaravel\Controllers\DashboardController;
use MotionPanel\MotionPanelLaravel\Middleware\HandleInertiaRequests;

Route::prefix(config('motionpanel.homepage-root-path'))->group(function () {
    Route::get(
        "{any?}",
        [DashboardController::class, 'index']
    )->where('any', '.*');
});

