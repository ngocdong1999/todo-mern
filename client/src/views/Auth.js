import LoginForm from '../components/auths/LoginForm';
import RegisterForm from '../components/auths/RegisterForm';
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import {useContext} from 'react';
import {Redirect} from 'react-router-dom';
import {AuthContext} from '../contexts/AuthContext';
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from '../themes/useStyles';



const Auth = ({ authRoute }) => {

    const classes = useStyles();

    const { authState: { authLoading, isAuthenticated } } = useContext(AuthContext);

    let body;
    if(authLoading){
        body = (
            <CircularProgress style={{color : '#fff'}} />
        )
    } else if(isAuthenticated){
        return <Redirect to='/dashboard'> </Redirect>
    } else{
        body = (
            <>
                { authRoute === 'login' && <LoginForm /> }
                { authRoute === 'register' && <RegisterForm /> }
            </>
        )

    }

    return (
        <div className={classes.landing}>
            <div className={classes.darkOverlay}>
                <div className={classes.paper}>
                    <Container maxWidth='xs' component='main'>
                        <CssBaseline />
                        
                        <Typography component="h2" variant="h4" className={classes.textColor}>
                            Todo App
                        </Typography>
                        <Typography component="h4" variant="h6" className={classes.textColor}>
                            Keep track of what you are doing
                        </Typography>
                            {body}
                            
                    </Container>
                </div>
            </div>
        </div>
    )
}

export default Auth
