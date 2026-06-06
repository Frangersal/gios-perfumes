<?php

namespace App\Http\Controllers;

use App\Models\Note;
use Illuminate\Http\Request;

class PageController extends Controller
{
    public function search() { return view('welcome', ['page' => 'search']); }
    public function about() { return view('welcome', ['page' => 'about']); }
    public function contact() { return view('welcome', ['page' => 'contact']); }
    public function faq() { return view('welcome', ['page' => 'faq']); }
    public function terms() { return view('welcome', ['page' => 'terms']); }
    public function privacy() { return view('welcome', ['page' => 'privacy']); }

    public function notes(Request $request)
    {
        if ($request->wantsJson() || $request->ajax()) {
            return response()->json(
                Note::orderBy('name')->get(['id', 'name', 'slug', 'image'])
            );
        }

        return view('welcome', ['page' => 'notes']);
    }
}
