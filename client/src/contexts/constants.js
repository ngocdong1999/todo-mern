export const apiUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:5000/api' : 'someDeployUrl';
export const LOCAL_STORAGE_TOKEN_NAME = 'todo-app';
export const POSTS_LOADED_SUCCESS = 'POSTS_LOADED_SUCCESS';
export const POSTS_LOADED_FAIL = 'POSTS_LOADED_FAIL';
export const ADD_POST = 'ADD_POST';
export const DELETE_POST = 'DELETE_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const FIND_POST = 'FIND_POST';
export const FILTER_POSTS = 'FILTER_POSTS';