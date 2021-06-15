import { unstable_createMuiStrictModeTheme as createMuiTheme } from "@material-ui/core";
import lightBlue from '@material-ui/core/colors/lightBlue';


const theme = createMuiTheme({
    palette: {
        primary: {
            main: lightBlue[500],
        },
    },
})

export default theme;