import learnItLogo from '../../assets/logo.svg';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link as RouterLink  } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { AppBar, Toolbar, Typography, Button, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        color: '#fff'
    },
    AppBar:{
        color: '#fff',
        backgroundColor: '#2196f3'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    brand: {
        color: '#fff',
        fontWeight:'600',
        marginRight: '1rem',
        '&:hover':{
            color: '#fff',
            textDecoration: 'none'
        },
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        },
    },
    navbar: {
        flexGrow: 1,
    },
    Link: {
        color: '#fff',
        fontWeight:'400',
        '&:hover': {
            color: '#fff',
        }
    },
    wellcome: {
        color: '#fff',
        fontSize: '1rem',
        fontWeight: '300',
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        },
    },
    whiteColor: {
        color: '#fff'
    }
}));

const NavbarMenu = () => {
    const classes = useStyles();
    const {authState: { user: { username } }, logoutUser} = useContext(AuthContext);

    const logout = () => logoutUser();

    return (
        <div className={classes.root}>
            <AppBar position='static' className={classes.AppBar}>
                <Toolbar>
                    <Button  className={classes.menuButton} href='/dashboard'>
                        <img src={learnItLogo} alt='Logo Todo App' width='32' height='32'/>
                    </Button>
                    <Typography variant="h6">
                        <Link component={RouterLink} to='/dashboard' className={classes.brand}>
                            Todo App
                        </Link>
                    </Typography>
                    <Typography className={classes.navbar}>
                        <Link className={classes.Link} component={RouterLink} to="/about" >About</Link>
                    </Typography>
                    <Typography className={classes.wellcome}>
                        Wellcome {username}
                    </Typography>
                    <Button className={classes.whiteColor} color="inherit" onClick={logout}>
                        <ExitToAppIcon />
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default NavbarMenu
