<?php

namespace MotionPanel\MotionPanelLaravel;
use Illuminate\Support\Facades\Gate;
use Request;

trait AuthorizesRequest
{

    /** 
     * The callback that should be used to authenticate MotionPanel users.
     *
     * @var \Closure
     */
    public static $authUsing;

    /**
     * Register the callback that should be used to authenticate MotionPanel users.
     *
     * @param  \Closure  $callback
     * @return static
     */
    public static function auth($callback)
    {
        static::$authUsing = $callback;
        return new static;
    }

    /**
     * Register MotionPanel Gate
     * @param \Illuminate\Http\Request $request
     * return bool
     */
    public static function check($request)
    {
        return (static::$authUsing ?: function () {
            return app()->environment('local') ||
                Gate::check('viewMotionPanel', [Request::user()]);
        })($request);
    }
}