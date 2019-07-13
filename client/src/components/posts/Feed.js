import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import SinglePost from './SinglePost';
import CommentIcon from '@material-ui/icons/Comment';
import LikeIcon from '@material-ui/icons/ThumbUp';
import ShareIcon from '@material-ui/icons/Share';
import Typography from '@material-ui/core/Typography';
import Comments from './comments/Comments';
import CreateComment from './comments/CreateComment';
import { connect } from 'react-redux';
import axios from 'axios'

const useStyles = theme => ({
    root: {
        marginTop: theme.spacing(5),
        display: 'block',
        width: '80%'
    },
    list: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
    post: {
        width: '100%'
    },
    actionsResult:{
        padding: theme.spacing(1, 0),
        display: 'flex',
        maxWidth: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    actionsResultItem:{
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: 0,
    },
    actionsList: {
        padding: theme.spacing(1, 2),
        display: 'flex',
        maxWidth: '100%',
        backgroundColor: theme.palette.background.paper,
        justifyContent: 'space-around'
    },
    actionItems: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: theme.spacing(0, 2),
        '&:hover': {
            cursor: 'pointer'
        }
    },
    actionIcons: {
        margin: theme.spacing(-0.5, 0.5),
    },
    commentSection:{
        marginTop:theme.spacing(1)
    },
    createComment:{
        marginTop:theme.spacing(2)
    },
    comments:{
        marginTop:theme.spacing(1)
    },
    divider: {
        borderBottom: '1px solid #ddd',
        margin: '5px 7px 6px',
        paddingTop: '1px'
    }
})

class Feed extends Component {
    constrcutor(){
        this.state={
            ownPosts:[],
            friendsPosts:[]
        }
    }

    componentDidMount(){
        const {id}=this.props.auth.user;
        axios.post('http://localhost:8080/getfeed',{userId:id})
        .then(result=>{
            console.log(result.data)
            const ownPosts=[...result.data];
            ownPosts.map(post=> delete post.friendsposts);
            console.log(ownPosts)

        })
        .catch(err=>{
            console.log(err)
        })
    }


    render() {
        const { classes } = this.props;
        return (
            <div>
                <Paper className={classes.root}>
                    <List className={classes.list}>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src="images/flash.jpg" />
                            </ListItemAvatar>
                            <ListItemText
                                primary="The Flash"
                            />
                        </ListItem >
                    </List>
                    <SinglePost />
                    <div className={classes.actionsResult}>
                    <Typography className={classes.actionsResultItem}><LikeIcon className={classes.actionIcons} color="primary" /></Typography>
                    <Typography className={classes.actionsResultItem}>240</Typography>
                    </div>
                    <hr className={classes.divider}/>
                    <div className={classes.actionsList}>
                        <Typography className={classes.actionItems}><LikeIcon className={classes.actionIcons} color="primary" />Like</Typography>
                        <Typography className={classes.actionItems}><CommentIcon className={classes.actionIcons} color="secondary" />Comment</Typography>
                        <Typography className={classes.actionItems}><ShareIcon className={classes.actionIcons} color="primary" />Share</Typography>
                    </div>
                    <hr className={classes.divider}/>
                    <div className={classes.commentSection}>
                        <div className={classes.createComment}>
                            <CreateComment />
                        </div>
                        <div className={classes.comments}>
                            <Comments />
                        </div>
                    </div>
                </Paper>
            </div>
        )
    }
}

const mapStateToProps=state=>({
    auth:state.auth
})

export default connect(mapStateToProps)(withStyles(useStyles)(Feed));
