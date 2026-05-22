import React from 'react';

export default function ProductGallery() {
    return (
        <div className="d-flex flex-column gap-3 sticky-top" style={{ top: '80px', zIndex: 1}}>
            <img 
                src="https://placehold.co/600x600/e9ecef/212529?text=Perfume+Principal" 
                className="img-fluid rounded shadow-sm w-100" 
                alt="Imagen Original" 
            />
            <div className="d-flex gap-2 justify-content-between">
                <img src="https://placehold.co/150x150/e9ecef/212529?text=Vista+1" className="img-fluid rounded" style={{width: '23%', cursor: 'pointer', border: '2px solid #000'}} alt="Galeria 1" />
                <img src="https://placehold.co/150x150/e9ecef/212529?text=Vista+2" className="img-fluid rounded opacity-50 hover-opacity-100" style={{width: '23%', cursor: 'pointer'}} alt="Galeria 2" />
                <img src="https://placehold.co/150x150/e9ecef/212529?text=Vista+3" className="img-fluid rounded opacity-50" style={{width: '23%', cursor: 'pointer'}} alt="Galeria 3" />
                <img src="https://placehold.co/150x150/e9ecef/212529?text=Vista+4" className="img-fluid rounded opacity-50" style={{width: '23%', cursor: 'pointer'}} alt="Galeria 4" />
            </div>
        </div>
    );
}
