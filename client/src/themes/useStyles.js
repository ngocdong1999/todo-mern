import { makeStyles } from "@material-ui/core/styles";
import imageBg from '../assets/hero-bg.png';

const useStyles = makeStyles({
    text: {
        color: '#90caf9',
        '&:hover':{
            textDecoration: 'underline'
        }
    },
    btn:{
        borderColor: '#fff',
        color: '#fff',
        margin: '1rem 0',
        '&:hover': {
            borderColor: '#90caf9',
            color: '#90caf9'
        },
        '& span': {
            transition: 'color .3s ease'
        }
    },
    landing: {
        position: 'relative',
        background: `url(${imageBg}) no-repeat center center/cover`,
        height: '100vh',
        backgroundColor: '#111'
    },
    darkOverlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
	    height: '100%',
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: 'auto',
        justifyContent: 'center',
        textAlign: 'center',
        height: '100%'
    },
    textColor: {
        color: '#fff'
    },
    

})

export default useStyles;