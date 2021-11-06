import React, {useState}from 'react';
import "./LoginForm.scss";
import { Form,Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../../gql/user";
import { setToken, decodeToken } from "../../../utils/token";
import useAuth from '../../../hooks/useAuth';

export default function LoginForm() {

    const [error, setError] = useState("");
    
    const [login] = useMutation(LOGIN);

    const {setUser} = useAuth();


    const formmik = useFormik({
        initialValues:initialValues(),
        validationSchema:Yup.object({
            email: Yup.string().email("El correo no es válido.").required("Correo es obligatorio"),
            password: Yup.string()
                .required("La contraseña es obligatoria"),
        }),
        onSubmit: async (formData)=>{
            setError("");
            try {
                const {data} = await login({
                    variables:{
                        input: formData,
                    },
                });
                const { token } = data.login;
                setToken(token);
                setUser(decodeToken(token));
                //console.log(token);
            } catch (error) {
                setError(error.message);
            }
        }
    });

    return (
        <>
        <h2 className="register-form-title">Iniciar sesión</h2>
        <Form className="login-form" onSubmit={formmik.handleSubmit}>
            <Form.Input
                type="text"
                placeholder= "Correo"
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
            <Button type="submit" className="btn-submit-form">Iniciar Sesión</Button>
            {error && <p className="submit-error">{error}</p>}
        </Form>
        </>
    )
}
function initialValues() {
    return{
        email: "",
        password:"",
    };
}