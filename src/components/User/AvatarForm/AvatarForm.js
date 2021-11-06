import React, { useCallback, useState } from 'react';
import { Button } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import { UPDATE_AVATAR, GET_USER, DELETE_AVATAR } from "../../../gql/user";

import "./AvatarForm.scss";
export default function AvatarForm( props ) {
    const { setShowModal, auth } = props;
    const [loading, setLoading] = useState(false);

    const [ updateAvatar ] = useMutation(UPDATE_AVATAR, {
        update( cache, { data:{ updateAvatar } } ){
            const { getUser } = cache.readQuery({
                query: GET_USER,
                variables: { username: auth.username }, 
            });

            cache.writeQuery({
                query: GET_USER,
                variables: { username: auth.username }, 
                data: {
                    getUser: { ...getUser, avatar: updateAvatar.urlAvatar }
                }
            });

        },
    });

    const [ deleteAvatar ] = useMutation(DELETE_AVATAR,{
        update( cache){
            const { getUser } = cache.readQuery({
                query: GET_USER,
                variables: { username: auth.username }, 
            });

            cache.writeQuery({
                query: GET_USER,
                variables: { username: auth.username }, 
                data: {
                    getUser: { ...getUser, avatar: "" }
                }
            });

        },
    });

    const onDeleteAvatar = async () =>{
        try {
            setLoading(true);
            const res = await deleteAvatar();
            const { data } = res;

            if(!data.deleteAvatar){
                toast.warning("Error al borrar avatar.");
                setLoading(false);
            }else{
                setShowModal(false);
                setLoading(false);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const onDrop = useCallback( async(acceptedFile)=> {
        const file = acceptedFile[0];
        try {
            setLoading(true);
            const res = await updateAvatar( {variables: {file}} );
            const { data } = res;
            if(!data.updateAvatar.status){
                toast.warning("Error al actualizar el avatar");
                setLoading(false);
            }else{
                setLoading(false);
                setShowModal(false);
            }
            console.log(res);
        } catch (error) {
            console.log(error)
        }
    },[]);

    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/jpeg, image/png",
        noKeyboard: true,
        multiple: false,
        onDrop
    })

    return (
        <div className="avatar-form">
            <Button { ...getRootProps() } loading={ loading } >Cargar Foto</Button>
            <Button onClick={onDeleteAvatar} loading={ loading }>Eliminar Foto Actual</Button>
            <Button onClick={ () => setShowModal(false) } loading={ loading }>Cancelar</Button>
            <input { ...getInputProps() } />
        </div>
    )
}
