// React
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

// Material-UI
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Card, { CardContent } from 'material-ui/Card';
import { FormGroup, FormControlLabel, Icon } from 'material-ui';
import Switch from 'material-ui/Switch';

// BarHopper Components
import Header from './Header';

export default class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: localStorage.getItem('Email') || '',
            password: localStorage.getItem('Password') || '',
            login: false,
            passwordError: false,
            emailError: false,
            bar_id: '',
            token: '', 
            errorMessage: '',
            rememberMeSwitch: localStorage.getItem('RememberMe')
        }

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.validateInput = this.validateInput.bind(this);
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleCheck = () => {
        this.setState({
            rememberMeSwitch: !this.state.rememberMeSwitch
        });
    }

    validateInput = function() {
        var emailError = !this.state.email;
        var passwordError = !this.state.password;
        this.setState({emailError: emailError, passwordError: passwordError});
        return !(emailError || passwordError);
    }

    onSubmit = function() {
        
        if (this.validateInput()) {
            if (this.state.rememberMeSwitch) {
                localStorage.setItem('Email', this.state.email);
                localStorage.setItem('Password', this.state.password);
                localStorage.setItem('RememberMe', this.state.rememberMeSwitch);
            } else {
                localStorage.removeItem('Email');
                localStorage.removeItem('Password');
                localStorage.removeItem('RememberMe');
            }

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

            fetch(loginUrl, data)
                .then((res) => {return res.json();})
                .then((res) =>{
                    if (res.success === true) {
                        this.setState({login: true, bar: res.bar, token: res.token});
                    } else {
                        this.setState({
                            emailError: true, 
                            passwordError: true, 
                            errorMessage: 'We don\'t have that email or password in our system.'
                        });
                    }
                });
        }
    };

    render() {
        if (this.state.login) {
            return <Redirect push to={{pathname: '/dashboard', bar: this.state.bar, token: this.state.token}}/>;
        }

        return(<div className='Login'>
            <Header loggedIn={false}/>
            <br />
            <Grid container>
                <Grid item xs={2}></Grid>
                <Grid item xs={8}><Card><CardContent>
                    <Grid container>
                    <Grid item xs={5}>
                        <Typography style={{marginTop: '20px'}} variant='display1'>
                            Login to BarHopper
                        </Typography>
                        <br />
                        <Typography variant='subheading'>
                            Login to continue promoting your bar.</Typography>
                        <br />
                    </Grid>
                    <Grid item xs={7} id='loginForm'>
                        <form style={{margin: 'auto'}}>
                            <TextField required fullWidth id='email' label='Email' error={this.state.emailError} value={this.state.email} margin='dense' onChange={this.handleChange('email')}/>
                            <TextField required fullWidth id='password' label='Password' type='password' error={this.state.passwordError} value={this.state.password} margin='dense' onChange={this.handleChange('password')}/>
                            <FormGroup row><FormControlLabel 
                                control={<Switch checked={this.state.rememberMeSwitch} onChange={this.handleCheck} />} 
                                label='Remember Me'/></FormGroup>
                            
                            <div style={{height: '150px'}}></div>
                            {
                                this.state.errorMessage ? 
                                
                                (<div>
                                    <Icon style={{display: "table-cell"}} color='error'>warning</Icon>
                                    <Typography style={{verticalAlign: "middle", display: "table-cell"}} color="error" variant='subheading'>
                                        &nbsp;&nbsp;{this.state.errorMessage}</Typography>
                                 </div>) 
                                
                                :
                                     
                                (<div></div>)
                            }
                            <Button variant='flat' fullWidth style={{backgroundColor: '#fdcd4c', color: 'white', marginTop: '10px'}} onClick={this.onSubmit}>Login</Button>
                        </form>
                    </Grid>
                    </Grid>
                </CardContent></Card></Grid>
                <Grid item xs={2}></Grid>
            </Grid>
        </div>)
    }
}