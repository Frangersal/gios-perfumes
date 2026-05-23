import React from 'react';

export default function AdminSidebar() {
    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 bg-dark text-white" style={{ width: '280px', minHeight: '100vh' }}>
            <a href="/admin/dashboard" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <span className="fs-4 fw-bold">Gio's Admin</span>
            </a>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <a href="/admin/dashboard" className="nav-link text-white" aria-current="page">
                        Dashboard
                    </a>
                </li>
                <li>
                    <a href="/admin/products" className="nav-link text-white">
                        Productos
                    </a>
                </li>
                <li>
                    <a href="/admin/categories" className="nav-link text-white">
                        Categorías
                    </a>
                </li>
                <li>
                    <a href="/admin/orders" className="nav-link text-white">
                        Pedidos
                    </a>
                </li>
                <li>
                    <a href="/admin/customers" className="nav-link text-white">
                        Clientes
                    </a>
                </li>
                <li>
                    <a href="/admin/settings" className="nav-link text-white">
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
                    <li><a className="dropdown-item" href="/admin/settings">Ajustes</a></li>
                    <li><a className="dropdown-item" href="/admin/profile">Perfil</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" href="/admin/login">Cerrar Sesión</a></li>
                </ul>
            </div>
        </div>
    );
}
