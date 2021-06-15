import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import AlertMessage from '../layouts/AlertMessage';
import CssTextField from '../../themes/CssTextField';
import useStyles from '../../themes/useStyles';




const RegisterForm = () => {
    const classes = useStyles();
    

    // Context
    const {registerUser} = useContext(AuthContext);

    // Local state
    const [registerForm, setRegisterForm] = useState({
        username:'',
        password:'',
        confirmPassword: ''
    });
    const [alert, setAlert] = useState(null);


    const { username, password, confirmPassword } = registerForm;

    const onChangeRegisterForm = (e) => {
        setRegisterForm({...registerForm, [e.target.name]: e.target.value});
        setAlert(null);
    }

    const onSubmitRegisterForm = async (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            setAlert({
                type: 'danger',
                message: 'Passwords do not match'
            })
            setTimeout(() => {
                setAlert(null)
            }, 5000)
            return
        }

        try {
            const registerData = await registerUser(registerForm);
            if(!registerData.success){
                setAlert({
                    type: 'error',
                    message: registerData.message
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
            <form className="my-4" onSubmit={onSubmitRegisterForm}>
                <AlertMessage info={alert}></AlertMessage>
                <CssTextField 
                    type='text'
                    variant='filled' 
                    label='Username' 
                    name='username' 
                    value={username} 
                    onChange={onChangeRegisterForm} 
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
                    onChange={onChangeRegisterForm} 
                    margin="normal"
                    required
                    fullWidth
                    autoComplete="password"
                />
                <CssTextField 
                    type='password'
                    variant='filled' 
                    label='Confirm password' 
                    name='confirmPassword' 
                    value={confirmPassword} 
                    onChange={onChangeRegisterForm} 
                    margin="normal"
                    required
                    fullWidth
                    autoComplete="confirmPassword"
                />
                <Button className={classes.btn} type="submit" variant="outlined" >Register</Button>
            </form>
                <Link to="/login">
                    <p className={classes.text}>Already have an account?&nbsp;
                            Sign In
                    </p>
                </Link>
        </>
    )
}

export default RegisterForm
