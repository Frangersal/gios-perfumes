import React, { useState } from 'react';
import OrderDetail from './OrderDetail';

export default function Orders() {
    const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

    // Si hay una orden seleccionada mostramos el detalle
    if (selectedOrder) {
        return <OrderDetail orderId={selectedOrder} onBack={() => setSelectedOrder(null)} />;
    }

    const orders = [
        { id: '#1023', date: '21 May, 2026', status: 'Entregado', total: '$4,900.00' },
        { id: '#1024', date: '18 May, 2026', status: 'En Tránsito', total: '$2,350.00' }
    ];

    return (
        <div>
            <h3 className="fw-bold mb-4">Historial de Compras</h3>
            <div className="table-responsive rounded-3 border">
                <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                        <tr>
                            <th scope="col" className="p-3">Pedido</th>
                            <th scope="col" className="p-3">Fecha</th>
                            <th scope="col" className="p-3">Estado</th>
                            <th scope="col" className="p-3">Total</th>
                            <th scope="col" className="p-3">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="border-top-0">
                        {orders.map(order => (
                            <tr key={order.id}>
                                <td className="fw-bold p-3">{order.id}</td>
                                <td className="p-3 text-muted">{order.date}</td>
                                <td className="p-3">
                                    <span className={`badge rounded-pill ${order.status === 'Entregado' ? 'bg-success' : 'bg-warning text-dark'}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="p-3">{order.total} <span className="text-muted small">por 1 artículo</span></td>
                                <td className="p-3">
                                    <button 
                                        className="btn btn-sm btn-dark rounded-pill px-3 fw-semibold" 
                                        onClick={() => setSelectedOrder(order.id)}
                                    >
                                        Ver Detalles
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
