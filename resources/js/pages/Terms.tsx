import React from 'react';
import Navbar from '../layouts/Navbar';
import SearchBar from '../layouts/SearchBar';
import Footer from '../layouts/Footer';

export default function Terms() {
    return (
        <div className="d-flex flex-column min-vh-100 bg-white">
            <Navbar />
            <SearchBar />
            
            <main className="container my-5 pb-5">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <h1 className="fw-bold mb-2">Términos y Condiciones</h1>
                        <p className="text-muted mb-5">Última actualización: 22 de mayo de 2026</p>

                        <div className="content text-secondary" style={{ lineHeight: '1.8' }}>
                            <h4 className="fw-bold text-dark mt-4 mb-3">1. Introducción</h4>
                            <p>Bienvenido a Gio's Perfumes. Al acceder y usar nuestro sitio web, aceptas estar sujeto a los siguientes términos y condiciones. Si no estás de acuerdo con alguna parte, no debes acceder al sitio o utilizar nuestros servicios.</p>

                            <h4 className="fw-bold text-dark mt-5 mb-3">2. Compras y Pagos</h4>
                            <p>Nos reservamos el derecho de rechazar cualquier pedido que realices. A nuestro exclusivo criterio, podemos limitar o cancelar las cantidades compradas por persona, por hogar o por pedido. Los precios de nuestros productos están sujetos a cambios sin previo aviso.</p>

                            <h4 className="fw-bold text-dark mt-5 mb-3">3. Envíos y Entregas</h4>
                            <p>Gio's Perfumes no se hace responsable por demoras que sean responsabilidad exclusiva de la empresa de paquetería una vez que el paquete ha sido entregado. Asegúrate de proporcionar una dirección correcta y detallada al momento del checkout.</p>

                            <h4 className="fw-bold text-dark mt-5 mb-3">4. Propiedad Intelectual</h4>
                            <p>Todo el contenido incluido en el sitio, como textos, gráficos, logotipos, imágenes y software, es propiedad de Gio's Perfumes o de sus proveedores de contenido y está protegido por las leyes de propiedad industrial aplicables.</p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
