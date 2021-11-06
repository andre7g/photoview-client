import React from 'react'
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import { REGISTER } from "../../../gql/user";
import "./RegisterForm.scss";

export default function RegisterForm(props) {
    const {setShowLogin} = props;

    const [register] = useMutation(REGISTER);

    const formmik = useFormik({
        initialValues:initialValues(),
        validationSchema:Yup.object({
            name: Yup.string().required('Tu nombre es obligatorio.'),
            username: Yup.string().matches(/^[a-zA-Z0-9-]*$/, "El nombre del usuario no puede tener espacio").required("El username es obligatorio."),
            email: Yup.string().email("El email no es válido.").required("Correo es obligatorio"),
            password: Yup.string()
                .required("La contraseña es obligatoria")
                .oneOf([Yup.ref("repeatPassword")],"Las contraseñas no coinciden."),
            repeatPassword: Yup.string()
                .required("La contraseña es obligatoria")
                .oneOf([Yup.ref("password")],"Las contraseñas no coinciden.")
        }),
        onSubmit: async (formData)=>{
            try {
                const newUser = formData;
                delete newUser.repeatPassword;
                
                await register({
                    variables:{
                        input: newUser,
                    },
                });
                toast.success("Usuario registrado correctamente");
                setShowLogin(true);
            } catch (error) {
                toast.error(error.message);
                console.log(error.message)
            }
        }
    });

    return (
        <>
            <h2 className="register-form-title">Registrate</h2>
            <Form className="register-form" onSubmit={formmik.handleSubmit}>
                <Form.Input
                    type="text"
                    placeholder= "Nombre y Apellidos"
                    name="name"
                    value={formmik.values.name}
                    onChange={formmik.handleChange}
                    error={formmik.errors.name}
                />
                <Form.Input
                    type="text"
                    placeholder= "Nombre de Usuario"
                    name="username"
                    value={formmik.values.username}
                    onChange={formmik.handleChange}
                    //error={formmik.errors.username && true} && true para no mostrar el mensaje
                    error={formmik.errors.username}
                />
                <Form.Input
                    type="text"
                    placeholder= "Correp Electronico"
                    name="email"
                    value={formmik.values.email}
                    onChange={formmik.handleChange}
                    error={formmik.errors.email}
                />
                <Form.Input
                    type="password"
                    placeholder= "Contraseña"
                    name="password"
                    value={formmik.values.password}
                    onChange={formmik.handleChange}
                    error={formmik.errors.password}
                />
                <Form.Input
                    type="password"
                    placeholder= "Repetir Contraseña"
                    name="repeatPassword"
                    value={formmik.values.repeatPassword}
                    onChange={formmik.handleChange}
                    error={formmik.errors.repeatPassword}
                />
            <Button type="submit" className="btn-submit-form">Registrarse</Button>
            {/* <Button type="button" onClick={formmik.handleReset}>Reset</Button> */}
            </Form>
        </>
    )
}

function initialValues() {
    return{
        name: "",
        username:"",
        email:"",
        password:"",
        repeatPassword:"",
    };
}
