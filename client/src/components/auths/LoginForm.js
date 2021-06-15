import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import {useState, useContext} from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import AlertMessage from '../layouts/AlertMessage';
import CssTextField from '../../themes/CssTextField';
import useStyles from '../../themes/useStyles';



const LoginForm = () => {
    const classes = useStyles();
    // Context
    const {loginUser} = useContext(AuthContext);

    // Local state
    const [loginForm, setLoginForm] = useState({
        username:'',
        password:'',
    });
    const [alert, setAlert] = useState(null);


    const { username, password } = loginForm;

    const onChangeLoginForm = (e) => setLoginForm({...loginForm, [e.target.name]: e.target.value});
    const onSubmitLoginForm = async (e) => {
        e.preventDefault();

        try {
            const loginData = await loginUser(loginForm);
            if(!loginData.success){
                setAlert({
                    type: 'error',
                    message: loginData.message
                })
                setTimeout(() => {
                    setAlert(null);
                },5000)

            }
        } catch (error) {
            console.log(error);
        }
        
    }

    return (
        <>
            <form onSubmit={onSubmitLoginForm}>
                <AlertMessage info={alert}></AlertMessage>
                <CssTextField 
                    type='text'
                    variant='filled' 
                    label='Username' 
                    name='username' 
                    value={username} 
                    onChange={onChangeLoginForm} 
                    margin="normal"
                    required
                    fullWidth
                    autoComplete="off"
                    autoFocus
                />
                <CssTextField 
                    type='password'
                    variant='filled' 
                    label='Password' 
                    name='password' 
                    value={password} 
                    onChange={onChangeLoginForm} 
                    margin="normal"
                    required
                    fullWidth
                    autoComplete="password"
                />
                <Button className={classes.btn} type="submit" variant="outlined">Login</Button>
            </form>
                <Link to="/register">
                    <p className={classes.text}>Don't have an account?&nbsp;
                            Sign Up
                    </p>
                </Link>
        </>
    )
}

export default LoginForm
