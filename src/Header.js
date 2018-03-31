// React
import React, {Component} from 'react';

// Material-UI
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

export default class Header extends Component {
    render() {
        return(
            <AppBar position="static" style={{backgroundColor: "#fdcd4c", padding: "10px"}}>
                <Toolbar>
                    <img src="barhopper-icon.png" alt="LOGO" style={{marginLeft: "100px", marginRight: "15px", width: "80px"}}/>
                    <Typography variant="title" color="inherit">
                        BarHopper
                    </Typography>
                </Toolbar>
            </AppBar>
        )
    }
}
