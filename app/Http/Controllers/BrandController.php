<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use Illuminate\Http\Request;

class BrandController extends Controller
{
    public function index(Request $request)
    {
        if ($request->wantsJson() || $request->ajax()) {
            return response()->json(
                Brand::orderBy('name')->get(['id', 'name', 'logo', 'description', 'country_of_origin'])
            );
        }

        return view('welcome', ['page' => 'brands']);
    }

    public function show($slug)
    {
        return view('welcome', ['page' => 'brand-detail']);
    }
}
