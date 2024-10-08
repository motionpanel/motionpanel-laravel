<?php

namespace MotionPanel\MotionPanelLaravel\Job\Controllers;

use Illuminate\Support\Facades\Queue;
use Illuminate\Support\Facades\DB;
use Illuminate\Queue\Failed\FailedJobProviderInterface;
use MotionPanel\MotionPanelLaravel\Job\Resources\FailedJobResource;
use MotionPanel\MotionPanelLaravel\Job\Resources\JobResource;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schema;

class JobController
{
    public function getStatus()
    {
        $jobsTableExists = false;
        $failedJobsTableExists = false;
        $queueConnection = config('queue.default');
        if ($queueConnection === 'database') {
            $jobsTableExists = Schema::hasTable('jobs');
            $failedJobsTableExists = Schema::hasTable('failed_jobs');
        }
        if ($queueConnection === 'database') {
            return response()->json([
                'data' => [
                    'jobs_table_exists' => $jobsTableExists,
                    'failed_jobs_table_exists' => $failedJobsTableExists,
                    'queue_connection' => $queueConnection
                ]
            ]);
        } else {
            return response()->json([
                'data' => [
                    'queue_connection' => $queueConnection
                ]
            ]);
        }

    }

    public function listJobs()
    {
        $queueConnection = config('queue.default');
        $jobs = [];

        if ($queueConnection === 'database') {
            // Retrieve pending jobs from jobs table
            $jobs = DB::table('jobs')->orderBy('created_at', 'asc')->get();
        } elseif ($queueConnection === 'redis') {
            // For redis, use Queue::getRedis to access jobs
            $jobs = Queue::getRedis()->lrange('queues:default', 0, -1);
        }
        return JobResource::collection($jobs);
    }

    public function listFailedJobs()
    {
        // Get all failed jobs
        $failedJobs = app(FailedJobProviderInterface::class)->all();
        return FailedJobResource::collection($failedJobs);
    }

    function deleteFailedJob($id)
    {
        $failedJobs = app(FailedJobProviderInterface::class);
        $job = $failedJobs->find($id);
        if ($job) {
            $failedJobs->forget($id);
            return response()->json(['message' => 'Failed job deleted successfully']);
        }
        return response()->json(['message' => 'Failed job not found'], 404);
    }

    public function cancelJob($id)
    {
        $queueConnection = config('queue.default');

        if ($queueConnection === 'database') {
            // Remove pending job from the database jobs table
            DB::table('jobs')->where('id', $id)->delete();
        } elseif ($queueConnection === 'redis') {
            // For redis, find the job in the Redis list and remove it
            // Assuming we have the job payload identifier, we'll use LREM to remove it
            Queue::getRedis()->lrem('queues:default', 0, $id); // Note: You may need to adjust how you search for and identify the job
        }

        return response()->json(['message' => 'Job canceled successfully']);
    }

    public function retryFailedJob($id)
    {
        $failedJobs = app(FailedJobProviderInterface::class);
        $job = $failedJobs->find($id);
        if (!$job) {
            return response()->json(['message' => 'Failed job not found'], 404);
        }

        // return response()->json(['message' => 'Failed job not found'], 404);
        $exitCode = Artisan::call("queue:retry $id");
        if ($exitCode === 0) {
            return response()->json(['message' => 'Job retried successfully']);
        } else {
            return response()->json(['message' => 'Failed to retry job'], 500);
        }
    }
}
