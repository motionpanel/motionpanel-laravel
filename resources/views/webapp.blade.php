<!DOCTYPE html>
<html class="dark">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    <meta name="csrf-token" content="{{ csrf_token() }}">
    @viteReactRefresh
    {{
    Vite::useBuildDirectory("motionpanel-files")
    }}
    @vite('resources/ts/app.tsx')
</head>

<body>
    <div id="app"></div>
</body>

</html>