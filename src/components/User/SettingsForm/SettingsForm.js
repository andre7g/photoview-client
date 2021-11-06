import React from 'react';
import { Button } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { useApolloClient } from "@apollo/client";
import useAuth from '../../../hooks/useAuth';
import "./SettingsForm.scss";
import PassForm from '../PassForm/PassForm';

export default function SettingsForm(props) {
    const { setShowModal,setTittleModal,setChildrenModal } = props;
    const history = useNavigate();
    const client = useApolloClient();
    const { logout } = useAuth();

    const onChangePass = () => {
        setTittleModal("Cambiar contraseña");
        setChildrenModal(<PassForm onLogout={ onLogout }/>);
    }

    const onLogout = () =>{
        client.clearStore();
        logout();
        history("/");
    }

    return (
        <div className="settings-form">
            <Button onClick={ onChangePass } >Cambiar contraseña</Button>
            {/* <Button>Cambiar email</Button>
            <Button>Cambiar description</Button>
            <Button>Cambiar sitio web</Button> */}
            <Button onClick={ onLogout }>Cerrar session</Button>
            <Button onClick={ () => setShowModal(false) }>Cancelar</Button>
        </div>
    )
}
