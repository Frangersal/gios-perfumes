<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BrandController extends Controller
{
    public function index()
    {
        return view('welcome', ['page' => 'brands']);
    }

    public function show($slug)
    {
        return view('welcome', ['page' => 'brand-detail']);
    }
}
