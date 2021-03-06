import React from 'react';
import { makeStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ImageIcon from '@material-ui/icons/Image';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import { green } from '@material-ui/core/colors';
import Photo from './Photo';

const useStyles = makeStyles(theme => ({
    photoGrid: {
        padding: theme.spacing(3, 2),
    },
    titleBar: {
        "& ul,& ul li": {
            margin: 0,
            padding: 0
        },
        "& ul li span": {
            fontSize: '20px'
        }
    },
    pictureGrid: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        height: 450,
        "& img": {
            cursor: 'pointer'
        },
        "& video": {
            cursor: 'pointer',
            width: '100%',
            height: '100%'
        }
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
    photoAvatar: {
        margin: 10,
        color: '#fff',
        backgroundColor: green[500],
    }
}))

export default function PhotoGrid(props) {
    const classes = useStyles();
    const [isImage, setIsImage] = React.useState(false);
    const [openPhoto, setOpenPhoto] = React.useState(false);
    const [imageDetails, setImageDetails] = React.useState(null);
    const { posts } = props;

    const onPhotoClick = (image) => {
        setOpenPhoto(true);
        setIsImage(true);
        setImageDetails(image);
    }

    const onVideoClick = (video) => {
        setOpenPhoto(true);
        setIsImage(false);
        setImageDetails(video);
    }

    const picturePost = posts.filter(post => post.images && post.images.length > 0)
        .map(post => {
            return post.images.map(image => {
                return {
                    _id: post._id,
                    image: image.imageUrl,
                    createdBy: post.createdBy,
                    comments: post.comments,
                    like: post.like,
                    profileImage: post.profileImage,
                    userName: post.userName
                }
            })
        }).flat(1);

    const videoPost = posts.filter(post => post.videos && post.videos.length > 0)
        .map(post => {
            return post.videos.map(image => {
                return {
                    _id: post._id,
                    video: image.videoUrl,
                    createdBy: post.createdBy,
                    comments: post.comments,
                    like: post.like,
                    profileImage: post.profileImage,
                    userName: post.userName
                }
            })
        }).flat(1);

    return (
        <div>
            <Paper className={classes.photoGrid}>
                <div className={classes.titleBar}>
                    <List>
                        <ListItem>
                            <Avatar className={classes.photoAvatar}>
                                <ImageIcon />
                            </Avatar>
                            <ListItemText primary="Photos" />
                        </ListItem>
                    </List>
                </div>
                <div className={classes.pictureGrid}>
                    <GridList cellHeight={120} className={classes.gridList} cols={3}>
                        {picturePost.map(post => (
                            <GridListTile key={post._id + '-' + post.image} cols={1}>
                                <img onError={(e) => { e.target.src='images/404.png' }} onClick={() => onPhotoClick(post)} src={post.image} />
                            </GridListTile>
                        ))}
                        {videoPost.map(post => (
                            <GridListTile key={post._id + '-' + post.video} cols={1}>
                                <video onClick={() => onVideoClick(post)} src={post.video} />
                            </GridListTile>
                        ))}
                    </GridList>
                    {(openPhoto) ? <Photo isImage={isImage} openPhoto={openPhoto} imageDetails={imageDetails} onclose={() => {
                        setOpenPhoto(false)
                    }} /> : null}
                </div>
            </Paper>
        </div>
    )
}
