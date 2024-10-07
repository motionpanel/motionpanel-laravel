<?php

$global_config = json_decode(file_get_contents(__DIR__ . '/config.json'), true);

return [
    'homepage-root-path' => $global_config['homepage-root-path'],
];