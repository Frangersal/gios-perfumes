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

        if (Auth::validate($credentials)) {
            
            $user = Auth::getProvider()->retrieveByCredentials($credentials);

            // Verificar que el usuario tenga un rol administrativo ANTES de loguear
            if (!$user->hasRole(['Super admin', 'Vendedor', 'Almacenista', 'Soporte'])) {
                if ($request->wantsJson()) {
                    return response()->json(['message' => 'Las credenciales proporcionadas no son correctas.'], 401);
                }
                throw ValidationException::withMessages([
                    'email' => 'Las credenciales proporcionadas no son correctas.',
                ]);
            }

            Auth::login($user, $request->boolean('remember'));
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
            'email' => 'Las credenciales proporcionadas no son correctas.',
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
