<?php

namespace App\Http\Controllers;

use App\Models\Note;
use Illuminate\Http\Request;

class PageController extends Controller
{
    public function search(Request $request)
    {
        if ($request->wantsJson() || $request->ajax()) {
            $q = $request->input('q');
            $products = \App\Models\Product::with(['brand', 'images', 'variants'])
                ->when($q, function ($query, $q) {
                    $query->where('name', 'like', "%{$q}%")
                          ->orWhere('description', 'like', "%{$q}%")
                          ->orWhere('gender', 'like', "%{$q}%")
                          ->orWhere('country_of_origin', 'like', "%{$q}%")
                          ->orWhere('olfactory_family', 'like', "%{$q}%")
                          ->orWhereHas('brand', function ($qBuilder) use ($q) {
                              $qBuilder->where('name', 'like', "%{$q}%");
                          })
                          ->orWhereHas('tags', function ($qBuilder) use ($q) {
                              $qBuilder->where('name', 'like', "%{$q}%");
                          })
                          ->orWhereHas('notes', function ($qBuilder) use ($q) {
                              $qBuilder->where('name', 'like', "%{$q}%");
                          });
                })
                ->where('status', 'available')
                ->get();
            return response()->json($products);
        }

        return view('welcome', ['page' => 'search']);
    }
    public function about() { return view('welcome', ['page' => 'about']); }
    public function contact() { return view('welcome', ['page' => 'contact']); }
    public function faq() { return view('welcome', ['page' => 'faq']); }
    public function terms() { return view('welcome', ['page' => 'terms']); }
    public function privacy() { return view('welcome', ['page' => 'privacy']); }

    public function notes(Request $request)
    {
        if ($request->wantsJson() || $request->ajax()) {
            return response()->json(
                Note::orderBy('name')->get(['id', 'name', 'slug', 'image', 'description'])
            );
        }

        return view('welcome', ['page' => 'notes']);
    }
}
