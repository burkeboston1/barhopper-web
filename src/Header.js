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
        flexGrow: 1
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

        this.state = {
            loggedIn: this.props.loggedIn
        }

        this.logout = this.logout.bind(this);
    }

    logout() {
        localStorage.removeItem("Token");
        localStorage.removeItem("BarID");
        this.setState({loggedIn: false});
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="sticky" style={{padding: "10px"}}>
                    <Toolbar>
                        <Link to=""><img className={classes.logo} alt="Logo" src="barhopper-icon.png" /></Link>
                        <span className={classes.flex}>
                            <Typography variant="title" color="inherit">BarHopper</Typography>
                            <Typography variant="headline" color="inherit">Admin Dashboard</Typography>
                        </span>
                        {
                            this.state.loggedIn
                                ? 
                                <Link to="/home"><Button onClick={this.logout} style={{backgroundColor: "#fdcd4c", color: "white"}}>Logout</Button></Link>
                                :
                                <div><Link to="/login"><Button style={{backgroundColor: "#fdcd4c", color: "white", marginRight: "8px"}}>Login</Button></Link>
                                <Link to="/register"><Button style={{backgroundColor: "#fdcd4c", color: "white"}}>Register</Button></Link></div>
                        }
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
