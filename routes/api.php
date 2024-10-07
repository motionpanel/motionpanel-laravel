<?php

use Illuminate\Support\Facades\Route;
use MotionPanel\MotionPanelLaravel\Controllers\JobController;

// Define the API routes
Route::middleware("api")->prefix('api')->group(function () {
    Route::prefix(config('motionpanel.homepage-root-path'))->group(function () {
        Route::get('/jobs', [JobController::class, 'listJobs']);
        Route::get('/jobs/failed', [JobController::class, 'listFailedJobs']);
        Route::delete('/jobs/failed/{id}', [JobController::class, 'deleteFailedJob']);
        Route::delete('/jobs/{id}', [JobController::class, 'cancelJob']);
        Route::post('/jobs/failed/{id}/retry', [JobController::class, 'retryFailedJob']);
    });
});