import React,{ useState, useEffect }from 'react';
import { Search as SearchUser, Image } from "semantic-ui-react"; 
import { Link } from 'react-router-dom';
import { size } from 'lodash';
import { useQuery } from "@apollo/client";
import { SEARCH } from '../../../gql/user';
import ImgageNo from '../../../assets/png/avatar.png';
import "./Search.scss";

export default function Search() {
    const [search, setSearch] = useState(null);
    const [result, setResult] = useState([]);
    const {data, loading} = useQuery(SEARCH, {
        variables:{ search }
    });

    useEffect(() => {
        if(size( data?.search) > 0){
            const users = [];
            data.search.forEach(( user,index ) => {
                users.push({
                    key:index,
                    title:user.name,
                    username: user.username,
                    avatar: user.avatar
                });
            });
            setResult(users);
        }else{
            setResult([]);
        }
    }, [data]);
    
    const onChange = (e) =>{
        if(e.target.value){
            setSearch(e.target.value);
        }else{
            setSearch(null);
        }
    };
    const handleResultSelect = () =>{
        setSearch(null);
        setResult([]);
    }
    return (
        <SearchUser
            className="search-user"
            fluid
            input={ { icon:"search", iconPosition:"left" } }
            loading={ loading }
            value={ search || "" }
            onSearchChange={ onChange }
            onResultSelect={ handleResultSelect }
            results={ result }
            resultRenderer={ (e) => <ResultsSearch data={e} /> }
        />
    );
}

function ResultsSearch(props){
    const { data } = props;
    console.log(data)
    return (
        <Link  className="search-users__item" to={ `/${data.username}` }> 
            <Image src={data.avatar || ImgageNo}/>
            <div>
                <p>
                    { data.title }
                </p>
                <p>
                    { data.username }
                </p>
            </div>
        </Link>
    );
}