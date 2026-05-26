<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function show($slug = null)
    {
        return view('welcome', ['page' => 'category']);
    }
}
