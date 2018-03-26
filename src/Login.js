import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import {Link} from 'react-router-dom';

export default class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    onSubmit = function() {

        const loginUrl = 'https://barhopperapi.herokuapp.com/api/authenticate';

        var data = {
            method: 'POST',
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }

        fetch(loginUrl, data).then((res) => {
            console.log('Response came back with status ' + res.status);
        });
    };

    render() {
        return(<div className="Signup">
            <AppBar position="static" color="default" style={{padding: "5px"}}>
                <Toolbar>
                    <img src="barhopper-icon.png" alt="LOGO" style={{marginLeft: "100px", marginRight: "15px", width: "100px"}}/>
                    <Typography variant="title" color="inherit">
                        BarHopper
                    </Typography>
                </Toolbar>
            </AppBar>

            <Grid container>
                <Grid item xs={4}></Grid>
                <Grid item xs={4} id="loginForm">
                    <Typography style={{marginTop: "20px", textAlign: "center"}} variant="display1" color="inherit">
                        Login to BarHopper
                    </Typography>
                    <form style={{margin: "auto"}}>
                        <TextField fullWidth id="email" label="Email" value={this.state.email} margin="normal" onChange={this.handleChange('email')}/>
                        <TextField fullWidth id="password" label="Password" value={this.state.password} margin="normal" onChange={this.handleChange('password')}/>
                        <br />
                        <br />
                        <Button variant="flat" fullWidth style={{backgroundColor: "#fdcd4c"}} onClick={this.onSubmit}>Login</Button>
                        <Link to="/signup"><Button variant="flat" fullWidth style={{marginTop: "5px"}}>Register</Button></Link>
                    </form>
                </Grid>
                <Grid item xs={4}></Grid>
            </Grid>
        </div>)
    }
}
