<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Muestra la vista de login del Admin.
     */
    public function login() 
    { 
        return view('welcome', ['page' => 'admin-login']); 
    }

    /**
     * Procesa la autenticación web para el Admin.
     */
    public function authenticate(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        // Aquí más adelante se puede incluir la validación de Roles (ej. user->roles->contains('admin'))
        if (Auth::attempt($credentials, $request->boolean('remember'))) {
            $request->session()->regenerate();

            if ($request->wantsJson()) {
                return response()->json(['message' => 'Dashboard access granted', 'user' => Auth::user()]);
            }
            
            return redirect()->intended('/admin/dashboard');
        }

        if ($request->wantsJson()) {
            return response()->json(['message' => 'Credenciales inválidas.'], 401);
        }

        throw ValidationException::withMessages([
            'email' => 'Las credenciales proporcionadas o los permisos no son correctos.',
        ]);
    }

    /**
     * Cierra la sesión desde el Dashboard.
     */
    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        if ($request->wantsJson()) {
            return response()->json(['message' => 'Sesión de admin finalizada']);
        }

        return redirect('/admin/login');
    }
}