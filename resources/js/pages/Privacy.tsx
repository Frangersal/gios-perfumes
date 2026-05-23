import React from 'react';
import Navbar from '../layouts/Navbar';
import Footer from '../layouts/Footer';

export default function Privacy() {
    return (
        <div className="d-flex flex-column min-vh-100 bg-white">
            <Navbar />
            
            <main className="container my-5 pb-5">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <h1 className="fw-bold mb-2">Política de Privacidad</h1>
                        <p className="text-muted mb-5">Última actualización: 22 de mayo de 2026</p>

                        <div className="content text-secondary" style={{ lineHeight: '1.8' }}>
                            <h4 className="fw-bold text-dark mt-4 mb-3">1. Recopilación de la Información</h4>
                            <p>En Gio's Perfumes, recopilamos información personal que nos proporcionas al crear una cuenta, realizar un pedido, suscribirte a nuestro boletín o contactarnos. Esta información incluye, pero no se limita a tu nombre, correo electrónico, dirección de envío y número telefónico.</p>

                            <h4 className="fw-bold text-dark mt-5 mb-3">2. Uso de tu Información</h4>
                            <p>La información recopilada se utiliza exclusivamente para procesar transacciones, mejorar nuestro portal web, ofrecer un servico al cliente de primera calidad y enviar correos sobre actualizaciones o promociones relacionadas siempre y cuando hayas dado tu consentimiento.</p>

                            <h4 className="fw-bold text-dark mt-5 mb-3">3. Protección de tus Datos</h4>
                            <p>Comprendemos que la privacidad es de vital importancia, por lo tanto, mantenemos en estricta confidencialidad tus datos. Tu información no se venderá, intercambiará, transferirá ni dará a ninguna otra empresa sin tu consentimiento, excepto para el propósito expreso de entregar el producto adquirido (ej. uso de servicios de envío DHL o FedEx).</p>

                            <h4 className="fw-bold text-dark mt-5 mb-3">4. Cookies</h4>
                            <p>Utilizamos cookies propias y de terceros para entender cómo interactúas con nuestro sitio web y brindarte una mejor experiencia de compra guardando las preferencias de tu carrito o sesión.</p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
