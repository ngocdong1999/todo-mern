import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useState} from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        flexGrow: 1
    },
    Tabs: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        color: '#2196f3',
        '& .MuiTabs-indicator': {
            backgroundColor: '#2196f3'
        },
        '& span.MuiTab-wrapper': {
            fontWeight: '600'
        }
    },
    

});

const NavbarFilterPost = ({getFilterValue}) => {
    const classes = useStyles();

    const [value, setValue] = useState(0);

    

    const handleChange = (event, newValue) => {
        setValue(newValue);
        getFilterValue(newValue);
        
    };
    return (
        <div className={classes.root}>
            <Paper square>
                <Tabs
                    className={classes.Tabs}
                    value={value}
                    onChange={handleChange}
                >
                    <Tab label="All" />
                    <Tab label="To Do"/>
                    <Tab label="Doing" />
                    <Tab label="Done" />
                </Tabs>
            </Paper>
        </div>
    )
}

export default NavbarFilterPost
