<?php
namespace MotionPanel\MotionPanelLaravel;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Gate;

class MotionPanelLaravelApplicationServiceProvider extends ServiceProvider
{
    public function boot()
    {
        $this->authorization();
    }
    protected function authorization()
    {
        $this->gate();

        MotionPanelLaravel::auth(function ($request) {
            return app()->environment('local') ||
                Gate::check('viewMotionPanel', [$request->user()]);
        });
    }

    protected function gate()
    {
        Gate::define('viewMotionPanel', function ($user) {
            return in_array($user->email, [
                // 
            ]);
        });
    }
}