import { withStyles } from "@material-ui/styles";
import TextField  from "@material-ui/core/TextField";

const CssTextField = withStyles({
    root: {
        borderColor: 'rgba(255, 255, 255, 0.23)',
        color: 'rgba(255, 255, 255, 0.23)',
        '& label':{
            color: 'rgba(255, 255, 255, 0.7)'
        },
        '& .MuiFilledInput-underline': {
            color:'#fff'
        },
        '& .MuiFilledInput-underline:before': {
            borderBottomColor: 'rgba(255, 255, 255, 0.23)',
        },
        '&:hover': {
            '& .MuiFilledInput-underline:before': {
                borderBottomColor: '#fff',
            },
        },
    },
})(TextField);

export default CssTextField;

