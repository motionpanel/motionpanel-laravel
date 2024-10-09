<?php

use Illuminate\Support\Facades\Route;
use MotionPanel\MotionPanelLaravel\Job\Controllers\JobController;

// Define the API routes
Route::prefix('api')->group(function () {
    Route::prefix("/motionpanel")->group(function () {
        Route::get('/jobs/status', [JobController::class, 'getStatus']);
        Route::get('/jobs', [JobController::class, 'listJobs']);
        Route::get('/jobs/failed', [JobController::class, 'listFailedJobs']);
        Route::delete('/jobs/failed/{id}', [JobController::class, 'deleteFailedJob']);
        Route::delete('/jobs/{id}', [JobController::class, 'cancelJob']);
        Route::post('/jobs/failed/{id}/retry', [JobController::class, 'retryFailedJob']);
    });
});