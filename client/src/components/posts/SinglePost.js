import ActionButtons from '../layouts/ActionButtons';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        boxShadow: '0 .5rem 1rem rgba(0,0,0,.15)!important',
        borderWidth: '2px',
        borderStyle: 'solid',
    },
    Badge: {
        display: 'inline',
        color: '#fff',
        borderRadius: '30px',
        padding: '2px 4px',
        fontSize: '12px',
        lineHeight: '14px',
        fontWeight: '600'
    },
    Title: {
        fontSize: '16px',
        fontWeight: '600',
        color: 'rgba(0, 0, 0, 0.7)',
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 2,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        height: '42px',
    },
    Description:{
        marginTop: '.5rem',
        fontSize: '14px',
        fontWeight: '400',
        color: 'rgba(0, 0, 0, 0.5)',
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 1,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        height: '21px',
        [theme.breakpoints.down('sm')]: {
            marginTop: 0
        }
    }

}))


const SinglePost = ({ post: { _id, title, description, status, url } }) => {
    const classes = useStyles();
    const statusColor = status === 'DONE' ? '#28a745' : status === 'DOING' ? '#ffc107' : '#dc3545';
    return (
        <Card className={classes.root} style={{ borderColor: statusColor }}>
            <CardContent>
                <Grid container>
                    <Grid item  md={7} xs={12}>
                        <Typography variant='h5' className={classes.Title}>{title}</Typography>
                        <div className={classes.Badge} style={{ backgroundColor: statusColor }}>
                            {status}
                        </div>
                    </Grid>
                    <Grid item  md={5} xs={12}>
                        <ActionButtons url={url} _id={_id} />
                    </Grid>
                </Grid>
                <Typography className={classes.Description}>
                    {description}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default SinglePost
