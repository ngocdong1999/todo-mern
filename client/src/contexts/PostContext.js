import {createContext, useReducer, useState} from 'react';
import axios from 'axios';
import { postReducer } from '../reducers/postReducer';
import { apiUrl, POSTS_LOADED_SUCCESS, POSTS_LOADED_FAIL, ADD_POST, DELETE_POST, UPDATE_POST, FIND_POST } from './constants';

export const PostContext = createContext();

const PostContextProvider = ({children}) => {
    // Local state
    const [postState, dispatch] = useReducer(postReducer, {
        post: null,
        posts: [],
        postsLoading: true,
        postsFilter: []
    })

    const [showAddPostModal, setShowAddPostModal] = useState(false);
    const [showUpdatePostModal, setShowUpdatePostModal] = useState(false);
    const [showToast, setShowToast] = useState({
        show: false,
        message: '',
        type: null
    })



    // Get all posts
    const getPosts = async () => {
        try {
            const response = await axios.get(`${apiUrl}/posts`);
            if(response.data.success){
                dispatch({
                    type: POSTS_LOADED_SUCCESS,
                    payload: response.data.posts
                })
            }
        } catch (error) {
            dispatch({
                type: POSTS_LOADED_FAIL
            })
        }
    }

    // Add New Post
    const addNewPost = async (postForm) => {
        try {
            const response = await axios.post(`${apiUrl}/posts`,postForm);
            if(response.data.success){
                dispatch({
                    type: ADD_POST,
                    payload: response.data.post
                })
                return response.data
            }
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'Server error' }
        }
    }
    // Delete Post
    const deletePost = async (id) => {
        try {
            const response = await axios.delete(`${apiUrl}/posts/${id}`);
            if(response.data.success){
                dispatch({
                    type: DELETE_POST,
                    payload: id
                })
            }
            return response.data
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'Server error' }
        }
    }
    // Update Post
    const updatePost = async (updatedPost) => {
        try {
            const response = await axios.put(`${apiUrl}/posts/${updatedPost._id}`, updatedPost);
            if(response.data.success){
                dispatch({
                    type: UPDATE_POST,
                    payload: response.data.post
                })
            }
            return response.data
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'Server error' }
        }
    }

    // Find post when user is updating post
    const findPost = (id) => {
        const post = postState.posts.find(post => post._id === id);
        if(post){
            dispatch({
                type: FIND_POST,
                payload: post
            })
        }
    }

    

    const postContextData = { postState, getPosts, showAddPostModal, setShowAddPostModal, addNewPost,updatePost, deletePost, findPost, showToast, setShowToast, showUpdatePostModal, setShowUpdatePostModal };
    return (
        <PostContext.Provider value={postContextData}>
            {children}
        </PostContext.Provider>
    )
}

export default PostContextProvider;