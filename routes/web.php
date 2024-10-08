<?php

use Illuminate\Support\Facades\Route;
use MotionPanel\MotionPanelLaravel\Controllers\DashboardController;

Route::middleware("web")->group(function () {
    Route::prefix(config('motionpanel.homepage-root-path'))->group(function () {
        Route::get(
            "{any?}",
            [DashboardController::class, 'index']
        )->where('any', '.*');
        Route::get("/", function () {
            return "hello";
        });
    });
});

