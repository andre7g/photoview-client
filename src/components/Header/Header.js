import React from 'react';
import { Container, Grid, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Logo from "../../assets/png/photoview.png";
import RightHeader from './RightHeader/RightHeader';
import "./Header.scss";
import Search from './Search';

export default function Header(){
    return (
        <div className="header">
            <Container>
                <Grid>
                    <Grid.Column width ={3} className="header__logo">
                        <Link to='/'>
                            <Image src={Logo} alt="Instaclone"/> 
                        </Link>
                    </Grid.Column>
                    <Grid.Column width ={10}>
                        <Search/>
                    </Grid.Column>
                    <Grid.Column width ={3}>
                        <RightHeader/>
                    </Grid.Column>
                </Grid>
            </Container>
        </div>
    );
}
