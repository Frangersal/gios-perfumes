import React from 'react';

export default function Dashboard({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
    return (
        <div>
            <h3 className="fw-bold mb-4">Dashboard</h3>
            <p className="fs-5">
                Hola <span className="fw-bold text-dark">Usuario</span> (¿no eres tú? <a href="#" className="text-danger fw-semibold text-decoration-none border-bottom border-danger">Cerrar sesión</a>)
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
