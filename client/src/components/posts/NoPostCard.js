
import { Button, Card, CardContent, CardActions, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '6rem auto',
        border: '1px solid lightblue',
        maxWidth: '200px',
        textAlign: 'center',
        boxShadow: '0px 2px 1px -1px rgba(33, 150, 243, 0.2), 0px 1px 1px 0px rgba(33, 150, 243, 0.14), 0px 1px 10px 0px rgba(33, 150, 243, 0.12)',
        '& .MuiCardActions-root': {
            justifyContent: 'center',
            paddingBottom: '16px'
        },
        [theme.breakpoints.between('xs', 'sm')]: {
            maxWidth: '300px'
        },
        [theme.breakpoints.between('sm', 'md')]: {
            maxWidth: '500px'
        },
        [theme.breakpoints.between('md', 'lg')]: {
            margin: '10rem auto',
            maxWidth: '700px'
        },
    },
    title:{
        fontWeight: 600,
        fontSize: '20px',
    },
    wellcome: {
        fontWeight: 400,
        fontSize: '18px',
    },
    description: {
        fontWeight: 400,
        fontSize: '18px',
    }
}))

const NoPostCard = ({setShowAddPostModal, username}) => {
    const classes = useStyles()
    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography variant='h5' className={classes.title}>
                    Hi, {username}
                </Typography>
                <Typography className={classes.wellcome}>Wellcome to Todo App</Typography>
                <Typography className={classes.description}>
                    Click the button below to track your first job to do!
                </Typography>
            </CardContent>
            <CardActions>
                <Button variant='contained' color='primary' onClick={setShowAddPostModal.bind(this,true)}>Todo!</Button>
            </CardActions>
        </Card>
    )
}

export default NoPostCard
