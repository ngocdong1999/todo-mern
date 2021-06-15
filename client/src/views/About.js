import Button from "@material-ui/core/Button";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';


const useStyles = makeStyles({
    root: {
        marginTop: '8rem',
        '& .MuiGrid-item': {
            textAlign: 'center'
        }
    },
    title: {
        textAlign: 'center',
        fontSize: '18px',
        fontWeight: '600',
        marginBottom: '1rem'
    }
})

const About = () => {
    const classes = useStyles();
    return (
        <Grid container justify='center' className={classes.root}>
            <Grid item>
                <Typography className={classes.title} >Make by {<FavoriteIcon color='secondary' />} with &lt;/&gt; from NgocDong Tran</Typography>
                <Button variant='outlined' href='https://www.facebook.com/dongtran.27799/' size='large'>
                    Visit developer for request!
                </Button>
            </Grid>
        </Grid>
    )
}

export default About
