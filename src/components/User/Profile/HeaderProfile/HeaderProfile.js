import React from 'react'
import { Button } from "semantic-ui-react";
import { useQuery, useMutation } from "@apollo/client";
import { IS_FOLLOW, FOLLOW, UN_FOLLOW } from "../../../../gql/follow";
import "./HeaderProfile.scss";
export default function HeaderProfile(props) {
    const { getUser, auth, handleModal } = props;
    const { data , loading, refetch } = useQuery(IS_FOLLOW,{
        variables: { username : getUser.username }
    });

    const [ follow ] = useMutation(FOLLOW);
    const onFollow = async () => {
        try {
            await follow({
                variables: {
                    username : getUser.username,
                }
            });
            refetch();
        } catch (error) {
            console.log(error);
        }
    }

    const [ unFollow ] = useMutation(UN_FOLLOW);
    const onUnFollow = async () => {
        try {
            await unFollow({
                variables: {
                    username : getUser.username,
                }
            });
            refetch();
        } catch (error) {
            console.log(error);
        }
    }

    const buttonFollow = () => {
        if(data.isFollow){
            return( <Button className="btn-danger" onClick={ onUnFollow }> Dejar de Seguir</Button>   )
        }else{
            return( <Button className="btn-action" onClick={ onFollow }> Seguir</Button>   )
        }
    }

    return (
        <div className="header-profile">
            <h2>{ getUser.username }</h2>
            { getUser.username === auth.username ? (
                <Button onClick={ () => handleModal("settings") }>Ajustes</Button>
            ) : 
            (
                !loading && buttonFollow()
            )}
        </div>
    )
}
