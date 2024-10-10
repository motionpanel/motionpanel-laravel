<?php
use MotionPanel\MotionPanelLaravel\Global\Middleware\Authorize;

return [
    /**
     * Middleware for all MotionPanel Routes
     */
    'middleware' => ['web', Authorize::class]
];