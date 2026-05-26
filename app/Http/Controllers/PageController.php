<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PageController extends Controller
{
    public function search() { return view('welcome', ['page' => 'search']); }
    public function about() { return view('welcome', ['page' => 'about']); }
    public function contact() { return view('welcome', ['page' => 'contact']); }
    public function faq() { return view('welcome', ['page' => 'faq']); }
    public function terms() { return view('welcome', ['page' => 'terms']); }
    public function privacy() { return view('welcome', ['page' => 'privacy']); }
}
