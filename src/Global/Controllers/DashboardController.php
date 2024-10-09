<?php

namespace MotionPanel\MotionPanelLaravel\Global\Controllers;

class DashboardController
{
    public function index()
    {
        return view("motionpanel::webapp");
    }
}
