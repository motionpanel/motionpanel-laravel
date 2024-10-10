<?php

use Illuminate\Support\Facades\Route;
use MotionPanel\MotionPanelLaravel\Job\Controllers\JobController;

// Define the API routes
Route::prefix('api')->group(function () {
    Route::prefix("/motionpanel")->group(function () {
        Route::get('/jobs/system-status', [JobController::class, 'getStatus']);

        Route::get('/jobs', [JobController::class, 'listJobs']);
        Route::delete('/jobs/{id}', [JobController::class, 'cancelJob']);
        Route::get('/failed-jobs', [JobController::class, 'listFailedJobs']);
        Route::post('/failed-jobs/{id}/retry', [JobController::class, 'retryFailedJob']);
        Route::delete('/failed-jobs/{id}', [JobController::class, 'deleteFailedJob']);
    });
});