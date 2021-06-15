import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import {useContext, useState, useEffect } from 'react';
import { PostContext } from '../../contexts/PostContext';


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

const UpdatePostModal = () => {
    const classes = useStyles()

    // Contexts
    const { postState: {post},showUpdatePostModal, setShowUpdatePostModal, updatePost, setShowToast } = useContext(PostContext);
    // State
    
    const [newUpdatePost, setNewUpdatePost] = useState(post);

    useEffect(() => {
        setNewUpdatePost(post)
    }, [post])
    const { title, description, url, status } = newUpdatePost;
    const onChangeNewPostForm = (e) => {
        setNewUpdatePost({
            ...newUpdatePost,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitNewPostForm = async (e) => {
        e.preventDefault();
        try {
            const { success, message } = await updatePost(newUpdatePost);
            closeDialog();
            setShowToast({show: true, message, type: success})
            
        } catch (error) {
            
        }
    }

    const closeDialog = () => {
        setNewUpdatePost(post);
        setShowUpdatePostModal(false);
    }

    return (
        <Dialog className={classes.root} open={showUpdatePostModal} onClose={closeDialog} aria-labelledby="form-dialog-title">
            <DialogTitle id='form-dialog-title'>
                Making progress?
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
                    <TextField
                        variant='outlined'
                        select
                        margin='dense'
                        SelectProps={{
                            native: true,
                        }}
                        name='status'
                        label="Status"
                        value={status}
                        onChange={onChangeNewPostForm}
                        fullWidth
                    >
                        <option value='TO DO'>TO DO</option>
                        <option value='DOING'>DOING</option>
                        <option value='DONE'>DONE</option>
                    </TextField>
                </DialogContent>
                <DialogActions className={classes.DialogActions}>
                    <Button onClick={closeDialog} variant='contained' color='secondary'>
                        Cancel
                    </Button>
                    <Button type='submit' variant='contained' color='primary' >
                        Save!
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default UpdatePostModal
