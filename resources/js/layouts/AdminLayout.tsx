import React from 'react';
import AdminSidebar from './AdminSidebar';
import AdminNavbar from './AdminNavbar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="d-flex" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
            <AdminSidebar />
            <div className="d-flex flex-column flex-grow-1">
                <AdminNavbar />
                <main className="p-4" style={{ overflowY: 'auto', height: 'calc(100vh - 70px)' }}>
                    {children}
                </main>
            </div>
        </div>
    );
}
