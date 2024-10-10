<?php
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Queue;
use Illuminate\Support\Facades\Config;
use MotionPanel\MotionPanelLaravel\Job\Controllers\JobController;
use MotionPanel\MotionPanelLaravel\Job\Resources\JobResource;

// Mock the JobResource to avoid real resource transformation during tests
JobResource::fake();

// Test listJobs() when queue connection is 'database'
it('lists jobs from database when queue connection is database', function () {
    // Mock the queue connection configuration to 'database'
    Config::set('queue.default', 'database');

    // Mock DB::table to return a collection of jobs
    $mockedJobs = collect([
        (object) ['id' => 1, 'payload' => 'test_payload_1', 'created_at' => now()],
        (object) ['id' => 2, 'payload' => 'test_payload_2', 'created_at' => now()],
    ]);
    DB::shouldReceive('table->orderBy->get')
        ->once()
        ->andReturn($mockedJobs);

    // Call the listJobs method
    $controller = new JobController();
    $response = $controller->listJobs();

    // Assert that the response contains the mocked jobs in the resource format
    expect($response->toArray(null))->toHaveCount(2);
});

// Test listJobs() when queue connection is 'redis'
it('lists jobs from redis when queue connection is redis', function () {
    // Mock the queue connection configuration to 'redis'
    Config::set('queue.default', 'redis');

    // Mock Queue::getRedis()->lrange to return a list of jobs
    $mockedJobs = ['job_1', 'job_2', 'job_3'];
    Queue::shouldReceive('getRedis->lrange')
        ->with('queues:default', 0, -1)
        ->once()
        ->andReturn($mockedJobs);

    // Call the listJobs method
    $controller = new JobController();
    $response = $controller->listJobs();

    // Assert that the response contains the mocked jobs in the resource format
    expect($response->toArray(null))->toHaveCount(3);
});
