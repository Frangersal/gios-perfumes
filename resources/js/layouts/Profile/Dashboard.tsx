import React from 'react';
import axios from 'axios';

interface DashboardProps {
    setActiveTab: (tab: string) => void;
    userRole?: string;
    userName?: string;
}

export default function Dashboard({ setActiveTab, userRole, userName }: DashboardProps) {
    
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
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="fw-bold mb-0">Dashboard</h3>
                {userRole && (
                    <span className="badge bg-primary px-3 py-2 rounded-pill shadow-sm">
                        Rol actual: {userRole}
                    </span>
                )}
            </div>
            
            <p className="fs-5">
                Hola <span className="fw-bold text-dark">{userName || 'Usuario'}</span> (¿no eres tú? <a href="#" onClick={handleLogout} className="text-danger fw-semibold text-decoration-none border-bottom border-danger">Cerrar sesión</a>)
            </p>
            <p className="text-muted mb-4">
                Desde el panel de control de tu cuenta, puedes ver tus pedidos recientes, gestionar tus direcciones de envío y facturación, y editar tu contraseña junto con los detalles de tu cuenta.
            </p>
            
            <div className="row g-4 mt-2">
                <div className="col-md-4">
                    <div 
                        className="card bg-light shadow-sm border-0 h-100 text-center py-4 rounded-4" 
                        onClick={() => setActiveTab('orders')} 
                        style={{ cursor: 'pointer', transition: 'background 0.3s' }}
                        onMouseOver={(e) => e.currentTarget.classList.add('bg-white', 'shadow')}
                        onMouseOut={(e) => e.currentTarget.classList.remove('bg-white', 'shadow')}
                    >
                        <div className="card-body">
                            <h5 className="fw-bold mb-0">Mis Pedidos</h5>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div 
                        className="card bg-light shadow-sm border-0 h-100 text-center py-4 rounded-4" 
                        onClick={() => setActiveTab('addresses')} 
                        style={{ cursor: 'pointer', transition: 'background 0.3s' }}
                        onMouseOver={(e) => e.currentTarget.classList.add('bg-white', 'shadow')}
                        onMouseOut={(e) => e.currentTarget.classList.remove('bg-white', 'shadow')}
                    >
                        <div className="card-body">
                            <h5 className="fw-bold mb-0">Direcciones</h5>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div 
                        className="card bg-light shadow-sm border-0 h-100 text-center py-4 rounded-4" 
                        onClick={() => setActiveTab('account')} 
                        style={{ cursor: 'pointer', transition: 'background 0.3s' }}
                        onMouseOver={(e) => e.currentTarget.classList.add('bg-white', 'shadow')}
                        onMouseOut={(e) => e.currentTarget.classList.remove('bg-white', 'shadow')}
                    >
                        <div className="card-body">
                            <h5 className="fw-bold mb-0">Detalles de Cuenta</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
