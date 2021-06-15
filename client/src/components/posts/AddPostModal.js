import {useContext, useState, forwardRef } from 'react';
import { PostContext } from '../../contexts/PostContext';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles({
    root: {
        '& #form-dialog-title': {
            borderBottom: '1px solid #dbdbdb',
        }
    },
    DialogActions: {
        padding: '8px 24px 24px'
    }
})

const AddPostModal = forwardRef(() => {
    const classes = useStyles();
    // Contexts
    const { showAddPostModal, setShowAddPostModal, addNewPost, setShowToast } = useContext(PostContext);

    // State
    const [newPost, setNewPost] = useState({
        title: '',
        description: '',
        url: '',
        status: 'TO DO'
    });
    const { title, description, url } = newPost;

    const onChangeNewPostForm = (e) => {
        setNewPost({
            ...newPost,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitNewPostForm = async (e) => {
        e.preventDefault();
        try {
            const { success, message } = await addNewPost(newPost);
            closeDialog();
            setShowToast({show: true, message, type: success})
            
        } catch (error) {
            
        }
    }

    const closeDialog = () => {
        setNewPost({
            title: '',
            description: '',
            url: '',
            status: 'TO DO'
        })
        setShowAddPostModal(false)
    }

    return (
        <Dialog className={classes.root} open={showAddPostModal} onClose={closeDialog} aria-labelledby="form-dialog-title">
            <DialogTitle id='form-dialog-title'>
                What do you want to do?
            </DialogTitle>
            <form onSubmit={onSubmitNewPostForm}>
                <DialogContent>
                    <TextField
                        autoFocus
                        variant='outlined'
                        margin="dense"
                        name="title"
                        label="Title"
                        type="text"
                        value={title}
                        onChange={onChangeNewPostForm}
                        fullWidth
                        required
                    />
                    <TextField
                        multiline={true}
                        rows={3}
                        margin="dense"
                        name="description"
                        label="Description"
                        variant='outlined'
                        type="text"
                        value={description}
                        onChange={onChangeNewPostForm}
                        fullWidth
                    />
                    <TextField
                        variant='outlined'
                        margin="dense"
                        name="url"
                        label="Url"
                        type="text"
                        value={url}
                        onChange={onChangeNewPostForm}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions className={classes.DialogActions}>
                    <Button onClick={closeDialog} variant='contained' color='secondary'>
                        Cancel
                    </Button>
                    <Button type='submit' variant='contained' color='primary' >
                        Todo!
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}
)
export default AddPostModal
