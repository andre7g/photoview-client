import React from 'react';
import {Form, Button} from "semantic-ui-react";
import { useFormik } from "formik";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../../../gql/user" 
import * as Yup from "yup";
import { toast } from "react-toastify";
import "./PassForm.scss";

export default function PassForm(props) {
    const { onLogout } = props;
    const [updateUser] = useMutation(UPDATE_USER);

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object({
            currentPass: Yup.string().required(),
            newPass: Yup.string().required().oneOf([Yup.ref("reNewPass")]),
            reNewPass: Yup.string().required().oneOf([Yup.ref("newPass")]),
        }),
        onSubmit: async (formData) => {
            try {
                const res = await updateUser({
                    variables:{
                        input:{
                            currentPass: formData.currentPass,
                            newPass: formData.newPass 
                        },
                    },
                });
                if(!res.data.updateUser){
                    toast.error("Error al actualizar la contraseña");
                    console.log(res)
                }else{
                    onLogout();
                    toast.success("Contraseña Actualizada");
                }
            } catch (error) {
                toast.error("Error al actualizar la contraseña");
            }
        }
    });
    return (
        <Form className="pass-form" onSubmit={ formik.handleSubmit }>
            <Form.Input
                type="password"
                placeholder="Contraseña actual" 
                name="currentPass" 
                value={ formik.values.currentPass }
                onChange={formik.handleChange}
                error={ formik.errors.currentPass && true }
            />
            <Form.Input
                type="password"
                placeholder="Nueva Contraseña" 
                name="newPass"
                value={ formik.values.newPass }
                onChange={formik.handleChange}
                error={ formik.errors.newPass && true }
            />
            <Form.Input
                type="password"
                placeholder="Repetir Nueva Contraseña"
                name="reNewPass"
                value={ formik.values.reNewPass }
                onChange={formik.handleChange}
                error={ formik.errors.reNewPass && true }
            />
            <Button type="submit" className="btn-submit-form">Actualizar</Button>
        </Form>
    )
}

function initialValues(){
    return {
        currentPass: "",
        newPass:"",
        reNewPass:""
    }
}
