<?php

namespace MotionPanel\MotionPanelLaravel\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController
{
    public function index()
    {
        return view("motionpanel::webapp");
    }
}
