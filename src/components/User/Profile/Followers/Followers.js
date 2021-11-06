import React,{ useEffect, useState } from "react";
import {  } from "semantic-ui-react";
import ModalBasic from '../../../ModalBasic';
import { size } from "lodash";
import { useQuery } from "@apollo/client";
import { GET_FOLLOWERS,GET_FOLLOWS } from "../../../../gql/follow";
import "./Followers.scss";
import ListUsers from "../../ListUsers/ListUsers";


export default function Followers(props) {
    const { username, totalPublications } = props;

    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState("");
    const [childrenModal, setchildrenModal] = useState(null);


    const { data:dataFollowers,
        loading:loadingFollowers, 
        startPolling : startPollingFollowers, 
        stopPolling : stopPollingFollowers} = useQuery(GET_FOLLOWERS,{
        variables:{
            username
        }
    });
    const { data:dataFollows,
        loading:loadingFollows, 
        startPolling : startPollingFollows, 
        stopPolling : stopPollingFollows} = useQuery(GET_FOLLOWS,{
        variables:{
            username
        }
    });

    useEffect(() => {
        startPollingFollowers(1000);
        return () => {
            stopPollingFollowers();
        }
    }, [startPollingFollowers, stopPollingFollowers]);

    useEffect(() => {
        startPollingFollows(1000);
        return () => {
            stopPollingFollows();
        }
    }, [startPollingFollows, stopPollingFollows]);



    if(loadingFollowers || loadingFollows) return null;
    const { getFollowers } = dataFollowers;
    const { getFollows } = dataFollows;

    const openFollowers = () =>{
        setTitleModal("Seguidores");
        setchildrenModal(<ListUsers users = {getFollowers} setShowModal={setShowModal}/>);
        setShowModal(true);
    }
    const openFollows = () =>{
        setTitleModal("Seguidos");
        setchildrenModal(<ListUsers users = {getFollows} setShowModal={setShowModal}/>);
        setShowModal(true);
    }
    

    return (
        <>
            <div className="followers">
                <p><span>{totalPublications}</span> publicaciones</p>
                <p className="link" onClick={ openFollowers }><span>{ size(getFollowers) }</span> seguidores</p>
                <p className="link" onClick={ openFollows }><span>{ size(getFollows) }</span> seguidos</p>
            </div>
            <ModalBasic show={ showModal } setShow={ setShowModal } tittle={ titleModal }>
                { childrenModal }
            </ModalBasic>
        </>
    )
}
