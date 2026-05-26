import React from 'react';
import AdminSidebar from './AdminSidebar';
import AdminNavbar from './AdminNavbar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div
            style={{
                minHeight: '100vh',
                backgroundColor: '#f8f9fa',
                display: 'grid',
                gridTemplateColumns: '280px minmax(0, 1fr)',
            }}
        >
            <AdminSidebar />
            <div className="d-flex flex-column" style={{ minWidth: 0 }}>
                <AdminNavbar />
                <main className="p-4" style={{ boxSizing: 'border-box' }}>
                    {children}
                </main>
            </div>
        </div>
    );
}
