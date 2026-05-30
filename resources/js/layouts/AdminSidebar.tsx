import React from 'react';
import axios from 'axios';

export default function AdminSidebar() {
    const baseUrl = document.getElementById('root')?.getAttribute('data-base-url') || '';

    const handleLogout = async (e: React.MouseEvent) => {
        e.preventDefault();
        try {
            await axios.post(`${baseUrl}/logout`, {}, {
                headers: { 'Accept': 'application/json' }
            });
            window.location.href = `${baseUrl}/login`;
        } catch (error) {
            console.error('Error al cerrar sesión', error);
            window.location.href = `${baseUrl}/login`;
        }
    };

    return (
        <div
            className="d-flex flex-column p-3 bg-dark text-white"
            style={{
                width: '280px',
                flexShrink: 0,
                alignSelf: 'flex-start',
                position: 'sticky',
                top: 0,
                height: '100dvh',
                boxSizing: 'border-box',
                overflowY: 'auto',
            }}
        >
            <a href={`${baseUrl}/admin/dashboard`} className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <span className="fs-4 fw-bold">Gio's Admin</span>
            </a>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <a href={`${baseUrl}/admin/dashboard`} className="nav-link text-white" aria-current="page">
                        Dashboard
                    </a>
                </li>
                <li>
                    <a href={`${baseUrl}/admin/products`} className="nav-link text-white">
                        Productos
                    </a>
                </li>
                <li>
                    <a href={`${baseUrl}/admin/categories`} className="nav-link text-white">
                        Categorías
                    </a>
                </li>
                <li>
                    <a href={`${baseUrl}/admin/brands`} className="nav-link text-white">
                        Marcas
                    </a>
                </li>
                <li>
                    <a href={`${baseUrl}/admin/notes`} className="nav-link text-white">
                        Notas de olor
                    </a>
                </li>
                <li>
                    <a href={`${baseUrl}/admin/orders`} className="nav-link text-white">
                        Pedidos
                    </a>
                </li>
                <li>
                    <a href={`${baseUrl}/admin/customers`} className="nav-link text-white">
                        Clientes
                    </a>
                </li>
                <li>
                    <a href={`${baseUrl}/admin/settings`} className="nav-link text-white">
                        Configuración
                    </a>
                </li>
            </ul>
            <hr />
            <div className="dropdown">
                <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2" />
                    <strong>Admin</strong>
                </a>
                <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                    <li><a className="dropdown-item" href={`${baseUrl}/admin/settings`}>Ajustes</a></li>
                    <li><a className="dropdown-item" href={`${baseUrl}/admin/profile`}>Perfil</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" href="#" onClick={handleLogout}>Cerrar Sesión</a></li>
                </ul>
            </div>
        </div>
    );
}
