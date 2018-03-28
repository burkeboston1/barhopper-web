import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

export default class Header extends Component {
    render() {
        return(
            <AppBar position="static" color="default" style={{padding: "5px"}}>
                <Toolbar>
                    <img src="barhopper-icon.png" alt="LOGO" style={{marginLeft: "100px", marginRight: "15px", width: "100px"}}/>
                    <Typography variant="title" color="inherit">
                        BarHopper
                    </Typography>
                </Toolbar>
            </AppBar>
        )
    }
}
