
import {useContext, useEffect, useState} from 'react';
import {PostContext} from '../contexts/PostContext';
import { AuthContext } from '../contexts/AuthContext';
import SinglePost from '../components/posts/SinglePost';
import {CircularProgress, Button, Grid} from '@material-ui/core';
import AddPostModal from '../components/posts/AddPostModal';
import UpdatePostModal from '../components/posts/UpdatePostModal';
import NavbarFilterPost from '../components/layouts/NavbarFilterPost';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import NoPostCard from '../components/posts/NoPostCard';
import Alert from '@material-ui/lab/Alert';


const useStyles = makeStyles((theme) => ({
    spinnerContainer: {
        top: '50%',
        left: '50%',
        mozTransform: 'translateX(-50%) translateY(-50%)',
        webkitTransform: 'translateX(-50%) translateY(-50%)',
        transform: 'translateX(-50%) translateY(-50%)',
    },
    btnFloating: {
        position: 'fixed',
        right: '3rem',
        bottom: '3rem',
        background: '#fff',
        border: '3px solid #90caf9',
        borderRadius: '50%',
        color: '#90caf9',
        minWidth: 24,
        padding: 10,
        transition: 'all .3s ease',
        '&:hover' : {
            borderColor: '#90caf9',
            color: '#fff',
            background: '#90caf9'
        },
        [theme.breakpoints.down('xs')]: {
            right: '1.2rem',
            bottom: '1.2rem',
            padding: 6
        },
    },
    root: {
        marginTop: '1.6rem',
        paddingLeft: '28px',
        paddingRight: '28px'
    }
}))


const Dashboard = () => {
    const classes = useStyles();

    const { authState: { user: {username} } } = useContext(AuthContext);

    const { postState: {post, posts, postsLoading } , getPosts, setShowAddPostModal, showToast, setShowToast} = useContext(PostContext);

    const { show, message, type } = showToast;
    const [postsFilter, setPostsFilter] = useState(posts);
    const [tabIndex, setTabIndex] = useState(0);
    const getFilterValue = (value) => {
        filterPosts(value);
        setTabIndex(value);
    }
    const filterPosts = (value) => {
        const x = ['ALL', 'TO DO', 'DOING', 'DONE'][value];
        setPostsFilter(x === 'ALL' ? posts : posts.filter(post => post.status === x));
    }
    useEffect(() => getPosts(),[]);
    useEffect(() => {
        setPostsFilter(posts);
        filterPosts(tabIndex);
    },[posts])
    useEffect(() => {
        setTimeout(() => onCloseToast(), 4000)
    },[show])

    const onCloseToast = () => setShowToast({show: false, message: '', type: null})

    let body;
    if(postsLoading){
        body = (
            <div className={classes.spinnerContainer}>
                <CircularProgress style={{color : '#000'}} />
            </div>
        )
    }else if(posts.length === 0){
        body = (
            <NoPostCard setShowAddPostModal={setShowAddPostModal} username={username} />
        )
    } else
        body = (
            <>
                <NavbarFilterPost getFilterValue={getFilterValue} />
                <div className={classes.root}>
                    <Grid container spacing={1}>
                    {   
                        postsFilter.map((post) => (
                            <Grid item key={post._id} lg={4} md={6} sm={6} xs={12}>
                                <SinglePost post={post} />
                            </Grid>
                        ))
                    }
                    </Grid>
                </div>
                {/* Open Add Post Modal */}
                <Button className={classes.btnFloating} onClick={() => setShowAddPostModal(true)}>
                    <AddIcon fontSize='large' />
                </Button>
                
            </>
        )

    return (
        <>
            
            {body}
            <AddPostModal />
            {post !== null && <UpdatePostModal />}
            {/* After post is added, show toast */}
            { show && 
                <Alert severity={type ? 'success' : 'error'} style={{ position: 'fixed', top: '20%', right: '10px' }} onClose={setShowToast.bind(this, {show: false, message: '', type: null})}>
                    {message}
                </Alert>
            }
            
        </>
    )
}

export default Dashboard
