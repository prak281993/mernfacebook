import React,{useState,useEffect} from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import { Link,withRouter } from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';

const useStyles = makeStyles(theme => ({
    dropDown: {
        position: 'relative',
        display: 'inline-block',
        width: '100%',
        zIndex: 100,
    },
    dropDownContent: {
        position: 'absolute',
        background: 'rgba(255, 255, 255, 0.95)',
        width: '100%',
        "& a": {
            color: 'black',
            background: 'rgba(255, 255, 255, 0.95)',
            padding: '12px 16px',
            textDecoration: 'none',
            display: 'block',
            margin: 'auto',
        }
    },
    inputRoot: {
        color: fade(theme.palette.common.black, 1),
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 6),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 500,
        },
    },
})
);



function SearchBox(props) {
    const classes = useStyles();
    const [searchOn,setSearchOn]=useState(false);
    const [friends,setFriends]=useState([]);
    const [searched,setSearched]=useState([]);

    
    const handleClick=(e)=>{
        
    }

    const searchFriends=(e)=>{
        const postData={searchText:e.target.value};
        axios.post('/getallusers',postData)
        .then(result=>{
            setFriends(result.data);
        })
        .catch(err=>{
            console.log(err);
        })
    }

    let searchedFriends = (friends)?friends.map((search, index) => (
        <Link to={{
            pathname:'/timeline/'+search.userName
        }} key={index}>
            {search.name}
        </Link>
    )):null



    return (
        <div className={classes.dropDown}>
            <div>
                <Input
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput
                    }}
                    placeholder='Search...'
                    disableUnderline={true}
                    onChange={searchFriends}
                    onFocus={()=>setSearchOn(true)}/>
            </div>
            <div className={classes.dropDownContent}>
                {(searchOn)?searchedFriends:null}
            </div>
        </div>
    )
}

const mapStateToProps=state=>({
    auth:state.auth
})

export default connect(mapStateToProps)(withRouter(SearchBox));
