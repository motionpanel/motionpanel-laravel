<?php

return [
    /**
     * Global configuration
     */
    'global' => [
        'web' => [
            'middleware' => ['web']
        ]
    ],

    /**
     * Config for Job module
     */
    'job' => [
        'api' => [
            'middleware' => ['api'],
        ]
    ]
];