import React, { useCallback,useState } from 'react';
import { Modal, Icon, Button, Dimmer, Loader } from"semantic-ui-react";
import { toast } from "react-toastify";
import { useDropzone } from"react-dropzone";
import { PUBLISH } from "../../../gql/publication";
import "./ModalUpload.scss";
import { useMutation } from '@apollo/client';


export default function ModalUpload(props) {
    const { show,setShow } = props;
    const [fileUpload, setFileUpload] = useState(null);

    const [isLoadin, setIsLoadin] = useState(false);


    const [ publish ] = useMutation(PUBLISH);



    const onDrop = useCallback((acceptedFile) => {
        const file = acceptedFile[0];
        setFileUpload({
            type: "image",
            file,
            preview: URL.createObjectURL(file)
        });
    });

    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/jpeg, image/png",
        noKeyboard: true,
        multiple: false,
        onDrop
    });

    const onCloseModal = () =>{
        setIsLoadin(false);
        setFileUpload(null);
        setShow(false);
    }

    const onPublish = async () =>{
        try {
            setIsLoadin(true);
            const res = await publish({
                variables:{
                    file: fileUpload.file,
                },
            });
            const { data } = res;
            if(!data.publish.status){
                toast.warning("Error en la publicación.");
                setIsLoadin(false);
            }else{
                onCloseModal();
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Modal size="small" open={ show } onClose={ onCloseModal } className="modal-upload">
            <div { ...getRootProps() } className="dropzone" style={ fileUpload && { border:0 } }>
                { !fileUpload && (
                    <>
                        <Icon name='cloud upload'/>
                        <p>Arrastra una imagen para publicar.</p> 
                    </>
                )}
                <input {...getInputProps()} />
            </div>
            {fileUpload?.type == "image" && (
                <div className="image" style={{ backgroundImage: `url("${fileUpload.preview}")` }}/>
            )}

            { fileUpload &&(
                <Button className="btn-upload btn-action" onClick={ onPublish }>
                    Publicar
                </Button>
            ) }
            { isLoadin && (
                <Dimmer active className="publishing">
                    <Loader/>
                    <p>Publicando...</p>
                </Dimmer>
            )}  
        </Modal>
    )
}
