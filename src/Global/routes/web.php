<?php

use Illuminate\Support\Facades\Route;
use MotionPanel\MotionPanelLaravel\Global\Controllers\DashboardController;

Route::prefix("/motionpanel")->group(function () {
    Route::get(
        "{any?}",
        [DashboardController::class, 'index']
    )->where('any', '.*');
});

