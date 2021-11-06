import React, { useState, useEffect } from 'react';
import { Image } from 'semantic-ui-react';
import { map } from 'lodash';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_PUBLICATIONS_FOLLOWS } from '../../../gql/publication';
import NoImage from '../../../assets/png/avatar.png';
import "./Feed.scss";


export default function Feed() {
    const { data, loading } = useQuery(GET_PUBLICATIONS_FOLLOWS);
    if(loading) return null;
    const { getPublicationsFollows } = data;

    return (
        <div className="feed">
            { map(getPublicationsFollows, (publication, index) => (
                <div key={ index } className="feed__box">
                    <Link to={ `/${publication.idUser.username}` }>
                        <div className="feed__box-user">
                            <Image
                                src={publication.idUser.avatar || NoImage} avatar
                            />
                            <span>{ publication.idUser.name }</span>
                        </div>
                    
                    </Link>
                <div
                    className="feed__box-photo"
                    style={{ backgroundImage: `url("${publication.file}")` }}
                />

                </div>
            ))}
        </div>
    )
}
