import { Route, Redirect } from 'react-router-dom';
import {useContext} from 'react';
import {AuthContext} from '../../contexts/AuthContext';
import NavbarMenu from '../layouts/NavbarMenu';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles({
    spinnerContainer: {
        top: '50%',
        left: '50%',
        mozTransform: 'translateX(-50%) translateY(-50%)',
        webkitTransform: 'translateX(-50%) translateY(-50%)',
        transform: 'translateX(-50%) translateY(-50%)',
    },
})

const ProtectedRoute = ({component: Component, ...rest}) => {
    const classes = useStyles();
    const { authState: { authLoading, isAuthenticated } } = useContext(AuthContext);
    if(authLoading)
        return (
            <div className={classes.spinnerContainer}>
                <CircularProgress style={{color : '#000'}} />
            </div>
        )
    return (
        <Route {...rest} render={props =>
            isAuthenticated ? (
                <>
                    <NavbarMenu></NavbarMenu>
                    <Component {...rest} {...props} />
                </>
            ) : (
            <Redirect to='/login' />
            )}
        />
    )
}

export default ProtectedRoute
