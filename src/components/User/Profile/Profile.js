import React, { useState } from 'react';
import { Grid, Image } from "semantic-ui-react";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../../gql/user";
import userAuth from "../../../hooks/useAuth";
import UserNotFound from '../../UserNotFound/UserNotFound';
import ModalBasic from '../../ModalBasic';
import AvatarForm from '../AvatarForm';
import ImageNoFound from "../../../assets/png/avatar.png"
import HeaderProfile from './HeaderProfile';
import SettingsForm from '../SettingsForm/SettingsForm';
import "./Profile.scss";
import Followers from './Followers/Followers';

export default function Profile(props) {
    const { username,totalPublications } = props;
    
    const [showModal, setShowModal] = useState(false);
    const [tittleModal, setTittleModal] = useState("");
    const [childrenModal, setChildrenModal] = useState(null);
    const { auth } = userAuth();
    const { data, loading, error } = useQuery(GET_USER, {
        variables: { username },
    });

    if(loading) return null;
    if(error) return <UserNotFound/>
    
    const { getUser } = data;

    const handleModal = (type) =>{
        switch (type) {
            case "avatar":
                setTittleModal("Cambiar foto de perfil");
                setChildrenModal(<AvatarForm setShowModal={setShowModal} auth={ auth } />);
                setShowModal(true);
                break;
            case "settings":
                setTittleModal("Ajustes");
                setChildrenModal(
                    <div>
                        <SettingsForm setShowModal={setShowModal} setTittleModal={ setTittleModal } setChildrenModal={ setChildrenModal }/>
                    </div>
                );
                setShowModal(true);
                break;
        
            default:
                break;
        }
    }
    
    return (
        <>
            <Grid className="profile">
                <Grid.Column width={5} className="profile__left">
                    <Image src={ getUser.avatar ? getUser.avatar : ImageNoFound } 
                    avatar 
                    onClick={ () => username === auth.username && handleModal("avatar") } />
                </Grid.Column>
                <Grid.Column width={11} className="profile__right">
                    <HeaderProfile getUser={ getUser } auth={auth} handleModal={ handleModal }/>
                    <Followers username={ username } totalPublications={ totalPublications } />
                    <div className="other">
                        <p className="name">{ getUser.name }</p>
                        { getUser.siteWeb && (
                            <a href={ getUser.siteWeb } className="siteWeb" target="_blank">
                                { getUser.siteWeb }
                            </a>
                        )}
                        { getUser.description && (
                            <p>{ getUser.description }</p>    
                        )}
                    </div>
                </Grid.Column>
            </Grid>  
            <ModalBasic show={ showModal } setShow={ setShowModal } tittle={ tittleModal } >
                { childrenModal }
            </ModalBasic>
        </>
    )
}
