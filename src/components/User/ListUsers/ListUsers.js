import React from 'react';
import  { map, size } from "lodash";
import {Image} from "semantic-ui-react";
import {useNavigate} from "react-router-dom";
import ImageNot from "../../../assets/png/avatar.png";
import "./ListUsers.scss";

export default function ListUsers(props) {
    const { users, setShowModal } = props;
    const history = useNavigate();

    const goToUser = (username) => {
        setShowModal(false);
        history(`/${username}`);
    };

    return (
        <div className="list-users">
        { size(users) === 0 ? (
           <p className="list-users__not-users">No hay usuarios</p>
        ):(
            map( users, (user, index) => (
                <div key={index} className="list-users__user" onClick={()=>goToUser(user.username)}>
                    <Image src={ user.avatar || ImageNot } avatar />
                    <di>
                        <p>{ user.name }</p>
                        <p>{ user.username }</p>
                    </di>
                </div>
            ))   
        )}
        </div>
    );
}
