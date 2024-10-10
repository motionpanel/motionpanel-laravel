<?php

namespace MotionPanel\MotionPanelLaravel\Global\Middleware;

use MotionPanel\MotionPanelLaravel\MotionPanelLaravel;

class Authorize
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return \Illuminate\Http\Response
     */
    public function handle($request, $next)
    {
        return MotionPanelLaravel::check($request) ? $next($request) : abort(403);
    }
}
