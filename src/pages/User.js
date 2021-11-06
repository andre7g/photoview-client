import React, {useEffect} from 'react';
import { size } from 'lodash';
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PUBLICATIONS } from "../gql/publication";
import Profile from '../components/User/Profile';
import Publications from '../components/Publications/Publications';

export default function User(){
    const { username } = useParams();
    const { data, loading, startPolling, stopPolling } = useQuery(GET_PUBLICATIONS,{
        variables:{
            username
        },
    });

    useEffect(() => {
        startPolling(1000);
        return()=>{
            stopPolling();
        }
    }, [startPolling,startPolling]);

    if(loading) return null;
    const { getPublications } = data;
    return (
        <>
            <Profile username={username} totalPublications={ size(getPublications) } />
            <Publications getPublications={ getPublications } />
        </>
    )
}
