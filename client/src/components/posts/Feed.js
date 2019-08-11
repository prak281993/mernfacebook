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
import axios from 'axios';
import { getFeed, likePost } from '../../actions/postActions';

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
    actionsResult: {
        padding: theme.spacing(1, 0),
        display: 'flex',
        maxWidth: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    actionsResultItem: {
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
<<<<<<< HEAD
        color: '#385898',
    },
    takeAction: {
        margin: theme.spacing(-0.5, 0.5),
        color: '#e9eaed'
    },
    likeResultIcon: {
        margin: theme.spacing(-0.5, 0.5),
    },
    commentSection: {
        marginTop: theme.spacing(1)
    },
    createComment: {
        marginTop: theme.spacing(2)
    },
=======
        color:'#385898',
    },
    takeAction:{
        margin: theme.spacing(-0.5, 0.5),
        color:'#e9eaed'
    },
    likeResultIcon:{
        margin: theme.spacing(-0.5, 0.5),
    },
    commentSection: {
        marginTop: theme.spacing(1)
    },
    createComment: {
        marginTop: theme.spacing(2)
    },
>>>>>>> d4b7a394787a9248ce27b16d5e143bb9be3c778e
    comments: {
        marginTop: theme.spacing(1)
    },
    divider: {
        borderBottom: '1px solid #ddd',
        margin: '5px 7px 6px',
        paddingTop: '1px'
    }
})

class Feed extends Component {

    componentDidMount() {
        const { id } = this.props.auth.user;
        this.props.getFeed(id);
    }

<<<<<<< HEAD
    componentDidUpdate(prevProps) {
        if (prevProps.post.allPosts !== this.props.post.allPosts) {
            const { id } = this.props.auth.user;
            this.props.getFeed(id);
        }
    }

=======
>>>>>>> d4b7a394787a9248ce27b16d5e143bb9be3c778e
    handleLike = (postId) => {
        const { id } = this.props.auth.user;
        this.props.likePost(postId, id);
    }


    render() {
        const { classes } = this.props;
        const { allPosts } = this.props.post;
        const { user } = this.props.auth;
        return (
            <div>
                {
                    (allPosts) ? allPosts.map(post => (
                        <Paper key={post._id} className={classes.root}>
                            <List className={classes.list}>
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
<<<<<<< HEAD
                                        <Avatar alt="Remy Sharp" src={'/' + post.createdBy.profileImage} />
=======
                                        <Avatar alt="Remy Sharp" src={'/'+post.createdBy.profileImage} />
>>>>>>> d4b7a394787a9248ce27b16d5e143bb9be3c778e
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={post.createdBy.name}
                                    />
                                </ListItem >
                            </List>
                            <SinglePost post={post} />
                            <div className={classes.actionsResult}>
                                <Typography className={classes.actionsResultItem}><LikeIcon className={classes.likeResultIcon} color="primary" /></Typography>
                                <Typography className={classes.actionsResultItem}>{(post.like.length > 0) ? post.like.length : 0}</Typography>
                            </div>
                            <hr className={classes.divider} />
                            <div className={classes.actionsList}>
<<<<<<< HEAD
                                <Typography onClick={() => this.handleLike(post._id)} className={classes.actionItems}><LikeIcon className={post.like.find(l => l.user === user.id) ? classes.actionIcons : classes.takeAction} />Like</Typography>
=======
                                <Typography onClick={() => this.handleLike(post._id)} className={classes.actionItems}><LikeIcon className={post.like.find(l=> l.user === user.id)?classes.actionIcons:classes.takeAction} />Like</Typography>
>>>>>>> d4b7a394787a9248ce27b16d5e143bb9be3c778e
                                <Typography className={classes.actionItems}><CommentIcon className={classes.actionIcons} />Comment</Typography>
                                <Typography className={classes.actionItems}><ShareIcon className={classes.actionIcons} />Share</Typography>
                            </div>
                            <hr className={classes.divider} />
                            <div className={classes.commentSection}>
                                <div className={classes.createComment}>
                                    <CreateComment postId={post._id} />
                                </div>
                                <div className={classes.comments}>
<<<<<<< HEAD
                                    {(post.comments) ? post.comments.map(comment => (
                                        <Comments key={comment._id} comment={comment} />
                                    )) : null}
=======
                                    {(post.comments)?post.comments.map(comment=>(
                                        <Comments key={comment._id} comment={comment} />
                                    )):null}
>>>>>>> d4b7a394787a9248ce27b16d5e143bb9be3c778e
                                </div>
                            </div>
                        </Paper>
                    )) :
                        null
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    post: state.post
})

export default connect(mapStateToProps, { getFeed, likePost })(withStyles(useStyles)(Feed));
