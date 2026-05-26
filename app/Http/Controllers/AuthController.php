<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Models\User;

class AuthController extends Controller
{
    /**
     * Muestra la vista de login.
     */
    public function login()
    {
        return view('welcome', ['page' => 'login']);
    }

    /**
     * Muestra la vista de registro.
     */
    public function register()
    {
        return view('welcome', ['page' => 'register']);
    }

    /**
     * Procesa la solicitud de autenticación (Login).
     */
    public function authenticate(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        // Verificamos credenciales SIN iniciar sesión ni regenerar tokens aún
        if (Auth::validate($credentials)) {
            
            $user = Auth::getProvider()->retrieveByCredentials($credentials);

            // Si el usuario es administrador, rechazarlo en el login normal simulando error de credenciales
            if (!$user->hasRole('Cliente')) {
                if ($request->wantsJson()) {
                    return response()->json(['message' => 'Las credenciales proporcionadas no son correctas.'], 401);
                }
                throw ValidationException::withMessages([
                    'email' => 'Las credenciales proporcionadas no son correctas.',
                ]);
            }

            // Si pasa la validación, procedemos a loguearlo oficialmente
            Auth::login($user, $request->boolean('remember'));
            $request->session()->regenerate();

            if ($request->wantsJson()) {
                return response()->json(['message' => 'Login exitoso', 'user' => $user]);
            }
            
            return redirect()->intended('/profile');
        }

        if ($request->wantsJson()) {
            return response()->json(['message' => 'Las credenciales proporcionadas no son correctas.'], 401);
        }

        throw ValidationException::withMessages([
            'email' => 'Las credenciales proporcionadas no son correctas.',
        ]);
    }

    /**
     * Procesa la creación de un nuevo usuario (Registro).
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'phone' => ['nullable', 'string', 'max:20'],
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'phone' => $validated['phone'] ?? null,
        ]);

        // Autenticar al usuario inmediatamente después del registro
        Auth::login($user);

        if ($request->wantsJson()) {
            return response()->json(['message' => 'Registro exitoso', 'user' => $user]);
        }

        return redirect()->route('profile.index');
    }

    /**
     * Cierra la sesión del usuario.
     */
    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        if ($request->wantsJson()) {
            return response()->json(['message' => 'Sesión cerrada']);
        }

        return redirect('/');
    }
}
