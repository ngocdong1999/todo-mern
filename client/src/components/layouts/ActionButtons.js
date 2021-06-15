import Button from "@material-ui/core/Button";
import ButtonGroup  from "@material-ui/core/ButtonGroup";
import { PostContext } from "../../contexts/PostContext";
import { useContext } from "react";
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.down('sm')]: {
            margin:'8px 0',
        },
        '& .MuiButton-outlined':{
            [theme.breakpoints.down('sm')]: {
                padding: '4px 8px',
            },
        }
    }
}))


const ActionButtons = ({ url, _id }) => {
    const classes = useStyles();
    const { deletePost, findPost, setShowUpdatePostModal, setShowToast } = useContext(PostContext);

    const choosePost = id => {
        findPost(id);
        setShowUpdatePostModal(true);
    }
    const onDeletePost = async (id) => {
        const { message, success } = await deletePost(id);
        setShowToast({show: true, message, type: success});
    }

    return (
        <div className={classes.root}>
            <ButtonGroup variant='outlined' color='primary' aria-label="outlined primary button group">
                <Button  href={url} target='_blank'>
                    <PlayCircleOutlineIcon color='primary' />
                </Button>
                <Button  onClick={choosePost.bind(this, _id)}>
                    <CreateIcon color='primary' />
                </Button>
                <Button  onClick={() => onDeletePost(_id)}>
                    <DeleteIcon color='secondary' />
                </Button>
            </ButtonGroup>
        </div>
    )
}

export default ActionButtons
