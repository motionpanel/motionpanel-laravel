<?php

namespace MotionPanel\MotionPanelLaravel\Controllers;

class DashboardController
{
    public function index()
    {
        return view("motionpanel::webapp");
    }
}
