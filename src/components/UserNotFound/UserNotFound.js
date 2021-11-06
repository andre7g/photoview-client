import React from 'react';
import { Link } from 'react-router-dom';
import "./UserNotFound.scss";

export default function UserNotFound() {
    return (
        <div className="user-not-found">
            <p>Usuario no encontrado</p>
            <p>Es posible que el ususairo de haya eliminado.</p>
            <Link to="/">
                Volver al Inicio
            </Link>
        </div>
    )
}
