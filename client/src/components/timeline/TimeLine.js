import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import UserAbout from './about/UserAbout';
import CreatePost from '../posts/CreatePost';
import PhotoGrid from './photos/PhotoGrid';
import FriendGrid from './friends/FriendGrid';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CheckIcon from '@material-ui/icons/Check';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import {connect} from 'react-redux';

const useStyles = theme => ({
    timeline: {
        width: '85%',
        marginLeft: '5%'
    },
    timeLineCover: {
        borderRadius: '2px'
    },
    coverPhoto: {
        width: '100%',
        height: 'auto',
        "& > img": {
            width: '100%',
            height: '400px',
            border: '1px solid #888888',
            boxShadow: '1px 1px #888888',
        }
    },
    profilePicture: {
        transform: 'translate(-35%,-80%)',
        position: 'absolute',
        left: '10%',
        "&  img": {
            padding: theme.spacing(0.25, 0.25),
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            border: '2px solid #fff',
            background: '#fff',
            zIndex: 100
        }
    },
    timeLineNav: {
        paddingLeft: '30%',
        borderRadius: 'none',
        background: '#fff'
    },
    navList: {
        margin: 0,
        padding: 0,
        display: 'flex',
        listStyleType: 'none',
        borderLeft: '1px solid #e9eaed',
    },
    listItem: {
        borderRight: '1px solid #e9eaed',
        height: '43px',
        lineHeight: 3.05,
        padding: '17px 17px',
        position: 'relative',
        verticalAlign: 'middle',
        whiteSpace: 'nowrap',
        color: '#385898',
        cursor: 'pointer',
        textDecoration: 'none',
        fontSize: '16px',
        fontWeight: 600
    },
    totalFriends: {
        color: '#89919c',
        fontSize: '11px',
        fontWeight: 'normal',
        paddingLeft: '6px',
    },
    pageDetails: {
        marginTop: theme.spacing(2)
    },
    RightContent: {
        marginLeft: '20px',
        width: '120%'
    },
    photoGrid: {
        marginTop: theme.spacing(2)
    },
    friendGrid: {
        marginTop: theme.spacing(2)
    },
    actionContainer: {
        width: '100%',
        position: 'absolute'
    },
    interactingActions: {
        position: 'absolute',
        display: 'flex',
        padding: '0px 12px',
        bottom: '20px',
        left: '20%',
        "& div a": {
            padding: '4px 16px',
            background: '#e9eaed',
            border: '1px solid #ccd0d5',
            cursor: 'pointer'
        }
    },
    otherActions: {
        marginLeft: theme.spacing(2),
        display: 'flex'
    },
    typography: {
        padding: '8px 16px 4px 22px',
        fontSize: '14px',
    },
    arrowFriend: {
        content: " ",
        position: 'absolute',
        left: '5%',
        bottom: '100%',
        borderWidth: '10px',
        borderStyle: 'solid',
        borderColor: 'transparent transparent white'
    },
    arrowFollow: {
        content: " ",
        position: 'absolute',
        right: '5%',
        bottom: '100%',
        borderWidth: '10px',
        borderStyle: 'solid',
        borderColor: 'transparent transparent white'
    },
    popperElement: {
        zIndex: 50,
        maxWidth: '300px',
        minWidth: '192px',
    },
    popperContent: {
        transform: 'translate3d(0, 11px, 0px)',
        "& p:hover": {
            color: '#fff',
            background: '#385898',
            cursor: 'pointer'
        }
    },
    divider: {
        borderBottom: '1px solid #ddd',
        margin: '5px 7px 6px',
        paddingTop: '1px'
    }
});

class TimeLine extends Component {
    constructor() {
        super();
        this.state = {
            isFriend: false,
            isFollowing: false,
            anchorE1: null,
            anchorE2: null
        }
    }

    handleFriendPopper = (event) => {
        this.setState({
            anchorE1: (this.state.anchorE1) ? null : event.currentTarget,
            anchorE2: null
        })
    }

    handleFollowPopper = (event) => {
        this.setState({
            anchorE2: (this.state.anchorE2) ? null : event.currentTarget,
            anchorE1: null
        })
    }

    handleMouseOutFriend = (event) => {
        this.setState({ anchorE1: null, anchorE2: null })
    }
    handleMouseOutFollow = (event) => {
        this.setState({ anchorE2: null, anchorE1: null })
    }

    render() {
        const { classes } = this.props;
        const {user} = this.props.auth;

        var openFriend = Boolean(this.state.anchorE1);
        var openFollow = Boolean(this.state.anchorE2);

        return (
            <div className={classes.timeline} >
                <div className={classes.timeLineCover} >
                    <div className={classes.coverPhoto} >
                        <img src="images/batman.jpg" />
                    </div>
                    <div className={classes.profilePicture} >
                        <a href="#" >
                            <img src="images/flash.jpg"
                                alt="Prakhar Tiwari" />
                        </a>
                    </div>
                    <div className={classes.timeLineNav} >
                        <div className={classes.actionContainer} >
                            <div className={classes.interactingActions} >
                                <div > {
                                    (this.state.isFriend) ?
                                        <a onClick={this.handleFriendPopper}
                                            variant="contained"
                                            color="default" > Friends </a> : <a variant="contained"
                                                color="default" > Add Friend </a>
                                }
                                    <Popper className={classes.popperElement}
                                        anchorEl={this.state.anchorE1}
                                        open={openFriend}
                                        placement='bottom-start'
                                        disablePortal={true}
                                        modifiers={
                                            {
                                                flip: {
                                                    enabled: false,
                                                },
                                                preventOverflow: {
                                                    enabled: false,
                                                    boundariesElement: 'scrollParent',
                                                },
                                            }
                                        } >
                                        <Paper className={classes.popperContent} >
                                            <div className={classes.arrowFriend} > </div>
                                            <Typography className={classes.typography} > Get Notifications </Typography>
                                            <hr className={classes.divider} />
                                            <Typography className={classes.typography} > Close Friends </Typography>
                                            <hr className={classes.divider} />
                                            <Typography className={classes.typography} > Unfriend </Typography>
                                        </Paper>
                                    </Popper>
                                </div>
                                <div className={classes.otherActions} >
                                    <div> {
                                        (this.state.isFollowing) ?
                                            <a onClick={this.handleFollowPopper}
                                                variant="contained"
                                                color="default" > Following </a> :
                                            <a variant="contained"
                                                color="default" > Follow </a>
                                    }

                                        <Popper className={classes.popperElement}
                                            anchorEl={this.state.anchorE2}
                                            open={openFollow}
                                            placement='bottom-end'
                                            disablePortal={true}
                                            modifiers={
                                                {
                                                    flip: {
                                                        enabled: false,
                                                    },
                                                    preventOverflow: {
                                                        enabled: false,
                                                        boundariesElement: 'scrollParent',
                                                    },
                                                }
                                            } >
                                            <Paper className={classes.popperContent} >
                                                <div className={classes.arrowFollow} > </div>
                                                <Typography className={classes.typography} > See First </Typography>
                                                <hr className={classes.divider} />
                                                <Typography className={classes.typography} > Default </Typography>
                                                <hr className={classes.divider} />
                                                <Typography className={classes.typography} > Unfollow </Typography>
                                            </Paper>
                                        </Popper>
                                    </div>
                                    <div>
                                        <a variant="contained"
                                            color="default" > Message </a>
                                        <a variant="contained"
                                            color="default" > ... </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <ul className={classes.navList} >
                            <li> < a href="#"
                                className={classes.listItem} > TimeLine </a></li >
                            <li> < a href="#"
                                className={classes.listItem} > About </a></li >
                            <li> < a href="#"
                                className={classes.listItem} > Friends <span className={classes.totalFriends} > 100 </span></a > </li> <li> < a href="#"
                                    className={classes.listItem} > Photos </a></li >
                            <li> < a href="#"
                                className={classes.listItem} > Archive </a></li >
                            <li> < a href="#"
                                className={classes.listItem} > More </a></li >
                        </ul>
                    </div>
                </div>

                <div className={classes.pageDetails} >
                    <Grid container spacing={0} >
                        <Grid item xs={5} >
                            <div className={classes.leftContent} >
                                <div className={classes.userAbout} >
                                    <UserAbout />
                                </div> <div className={classes.photoGrid} >
                                    <
                                        PhotoGrid />
                                </div> <div className={classes.friendGrid} >
                                    <
                                        FriendGrid />
                                </div>

                            </div>
                        </Grid>

                        <Grid item xs={7} >
                            <div className={classes.RightContent} >
                                <div className={classes.CreatePost} >
                                    <CreatePost />
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
        )
    }
}

const mapStateToProps=state=>({
    auth:state.auth
})

export default connect(mapStateToProps)(withStyles(useStyles)(TimeLine));