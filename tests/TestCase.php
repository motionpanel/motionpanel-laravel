<?php

namespace MotionPanel\MotionPanelLaravel\Tests;
use MotionPanel\MotionPanelLaravel\MotionPanelLaravelServiceProvider;
use Orchestra\Testbench\TestCase as Orchestra;

abstract class TestCase extends Orchestra
{
    protected function setUp(): void
    {
        parent::setUp();
    }

    protected function getPackageProviders($app)
    {
        return [
            MotionPanelLaravelServiceProvider::class,
        ];
    }

    public function getEnvironmentSetUp($app)
    {
        config()->set('queue.default', 'database');
    }

}
