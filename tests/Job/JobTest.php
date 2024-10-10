<?php
use Illuminate\Support\Facades\DB;
use Orchestra\Testbench\Concerns\WithWorkbench;
use Illuminate\Foundation\Testing\RefreshDatabase;
use function Pest\Laravel\{get, delete};

uses(WithWorkbench::class);
uses(RefreshDatabase::class);

function insertJob()
{
    DB::table('jobs')->insert(
        [
            'id' => 50,
            'queue' => 'default',
            'payload' => '{"uuid":"121dfdd4-e9f9-4d39-8fec-7fd923bdf04b","displayName":"App\\Jobs\\TestJob","job":"Illuminate\\Queue\\CallQueuedHandler@call","maxTries":null,"maxExceptions":null,"failOnTimeout":false,"backoff":null,"timeout":null,"retryUntil":null,"data":{"commandName":"App\\Jobs\\TestJob","command":"O:16:\"App\\Jobs\\TestJob\":0:{}"},"telescope_uuid":"9d319f3c-cce5-405d-8cc5-bbb07158eaa7"}',
            'attempts' => 0,
            'reserved_at' => NULL,
            'available_at' => 1728364505,
            'created_at' => 1728364505
        ]
    );
}

it('job list return exact 1 job', function () {
    insertJob();
    $response = get('/api/motionpanel/jobs');
    $response->assertStatus(200);
    expect($response['data'])->toHaveCount(1);
});

it('success delete a job', function () {
    insertJob();
    $response = delete('/api/motionpanel/jobs/50');
    $response->assertStatus(200);
    $response_jobs = get('/api/motionpanel/jobs');
    expect($response_jobs['data'])->toHaveCount(0);
});