import React, { useState, useEffect } from 'react';
import Navbar from '../layouts/Navbar';
import SearchBar from '../layouts/SearchBar';
import Footer from '../layouts/Footer';
import ProfileSidebar from '../layouts/Profile/ProfileSidebar';
import Dashboard from '../layouts/Profile/Dashboard';
import Orders from '../layouts/Profile/Orders';
import Addresses from '../layouts/Profile/Addresses';
import AccountDetails from '../layouts/Profile/AccountDetails';
import ChangePassword from '../layouts/Profile/ChangePassword';

export default function Profile() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [userRole, setUserRole] = useState('...');
    const [userName, setUserName] = useState('...');

    useEffect(() => {
        const root = document.getElementById('root');
        if (root) {
            setUserRole(root.getAttribute('data-user-role') || 'Usuario Estándar');
            setUserName(root.getAttribute('data-user-name') || 'Usuario');
        }
    }, []);

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return <Dashboard setActiveTab={setActiveTab} userRole={userRole} userName={userName} />;
            case 'orders':
                return <Orders />;
            case 'addresses':
                return <Addresses />;
            case 'account':
                return <AccountDetails />;
            case 'password':
                return <ChangePassword />;
            default:
                return <Dashboard setActiveTab={setActiveTab} userRole={userRole} userName={userName} />;
        }
    };

    return (
        <div className="d-flex flex-column min-vh-100 bg-light bg-opacity-50">
            <Navbar />
            <SearchBar />

            <div className="bg-dark text-white py-5 mb-5 shadow-sm">
                <div className="container">
                    <h1 className="fw-bold fs-2 mb-0" style={{ letterSpacing: '1px' }}>Mi Cuenta</h1>
                </div>
            </div>

            <main className="container mb-5 pb-5">
                <div className="row g-5">
                    <div className="col-lg-3">
                        <ProfileSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
                    </div>
                    
                    <div className="col-lg-9">
                        <div className="card shadow-sm border-0 rounded-4 h-100 bg-white">
                            <div className="card-body p-4 p-md-5">
                                {renderContent()}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
