import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';

const styles = {
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
    },
    logo: {
        marginLeft: 10,
        marginRight: 20,
        width: 80
    },
};

class ButtonAppBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="sticky" style={{padding: "10px"}}>
                    <Toolbar>
                        <Link to="dashboard"><img className={classes.logo} src="barhopper-icon.png" /></Link>
                        <span className={classes.flex}>
                            <Typography variant="title" color="inherit">BarHopper</Typography>
                            <Typography variant="headline" color="inherit">Admin Dashboard</Typography>
                        </span>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

ButtonAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);
