import React from 'react';
import axios from 'axios';

interface Props {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

export default function ProfileSidebar({ activeTab, setActiveTab }: Props) {
    const tabs = [
        { id: 'dashboard', label: 'Dashboard' },
        { id: 'orders', label: 'Mis Pedidos' },
        { id: 'addresses', label: 'Direcciones' },
        { id: 'account', label: 'Detalles de Cuenta' },
        { id: 'password', label: 'Cambiar Contraseña' },
    ];

    const handleLogout = async (e: React.MouseEvent) => {
        e.preventDefault();
        try {
            await axios.post('logout', {}, {
                headers: { 'Accept': 'application/json' }
            });
            window.location.href = 'login';
        } catch (error) {
            console.error('Error al cerrar sesión', error);
            window.location.href = 'login';
        }
    };

    return (
        <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-0">
                <div className="list-group list-group-flush rounded-4">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            className={`list-group-item list-group-item-action py-3 px-4 fw-semibold border-0 ${activeTab === tab.id ? 'active bg-dark text-white' : 'text-dark'}`}
                            onClick={() => setActiveTab(tab.id)}
                            style={{ cursor: 'pointer' }}
                        >
                            {tab.label}
                        </button>
                    ))}
                    <button onClick={handleLogout} className="list-group-item list-group-item-action py-3 px-4 fw-semibold text-danger border-0">
                        Cerrar Sesión
                    </button>
                </div>
            </div>
        </div>
    );
}
