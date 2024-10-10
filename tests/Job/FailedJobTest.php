<?php
use Illuminate\Support\Facades\DB;
use Orchestra\Testbench\Concerns\WithWorkbench;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(WithWorkbench::class);
uses(RefreshDatabase::class);

function insertFailedJob()
{
    DB::table("failed_jobs")->insert(
        [
            "id" => 10,
            "uuid" => "5ae7c1ad-5e9d-44f8-b7bb-04b7c42cad40",
            "connection" => 'database',
            "queue" => 'default',
            "payload" => "sample payload",
            "exception" => "sample exception",
            "failed_at" => "2024-10-08 05:11:58"
        ]
    );
}

it('return failed job list', function () {
    insertFailedJob();
    $response = $this->get('/api/motionpanel/failed-jobs');
    $response->assertStatus(200);
    expect($response['data'])->toHaveCount(1);
});

it("success delete a failed job", function () {
    insertFailedJob();
    $response = $this->delete('/api/motionpanel/failed-jobs/5ae7c1ad-5e9d-44f8-b7bb-04b7c42cad40');
    $response->assertStatus(200);
    $response_jobs = $this->get('/api/motionpanel/failed-jobs');
    expect($response_jobs['data'])->toHaveCount(0);
});

it("success retry a failed job", function () {
    insertFailedJob();
    $response = $this->post('/api/motionpanel/failed-jobs/5ae7c1ad-5e9d-44f8-b7bb-04b7c42cad40/retry');
    $response->assertStatus(200);
    $response_jobs = $this->get('/api/motionpanel/failed-jobs');
    expect($response_jobs['data'])->toHaveCount(0);
});