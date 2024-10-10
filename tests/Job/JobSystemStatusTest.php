<?php
use Illuminate\Support\Facades\DB;
use Orchestra\Testbench\Concerns\WithWorkbench;
use Illuminate\Foundation\Testing\RefreshDatabase;
use function Pest\Laravel\{get, delete, post};

uses(WithWorkbench::class);
uses(RefreshDatabase::class);

it('system status return 200', function () {
    $response = get('/api/motionpanel/jobs/system-status');
    $response->assertStatus(200);
});