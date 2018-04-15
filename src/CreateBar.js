// React
import React, {Component} from 'react';

// Material
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Card, { CardContent } from 'material-ui/Card';

// BarHopper

export default class CreateBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            barName: "",
            barEmail: "",
            barAddress: "",
            barPhone: "",
            nameError: false,
            emailError: false,
            addrError: false,
            phoneError: false,
            bar_id: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    onSubmit = function () {
        // validate the input
        this.setState({
            nameError: !this.state.barName,
            emailError: !this.state.barEmail,
            phoneError: !this.state.barPhone,
            addrError: !this.state.barAddress
        })

        if (!(this.state.nameError || this.state.emailError || this.state.phoneError || this.state.addrError)) {
            const createBarUrl = 'https://barhopperapi.herokuapp.com/api/newbar';

            var data = {
                method: 'POST',
                body: JSON.stringify({
                    name: this.state.barName,
                    email: this.state.barEmail,
                    address: this.state.barAddress,
                    phone: this.state.barPhone
                }),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'x-access-token': this.props.token
                })
            }

            fetch(createBarUrl, data)
                .then((res) => {return res.json();})
                .then((res) =>{
                    if (res.success === true) {
                        this.props.handleNext({bar_id: res.bar_id});
                    }
                });
        }
    }

    render() {
        return (
            <div>
                <Card><CardContent>
                <Grid container>
                    <Grid item xs={5}>
                        <Typography style={{marginTop: "20px"}} variant="display1">
                            Describe Your Bar</Typography>
                        <br />
                        <Typography variant="subheading">
                            Tell us all about your bar. Soon you'll be able to upload a logo and a picture of your storefront!    
                        </Typography>
                    </Grid>
                    <Grid item xs={7} id="createBarForm">
                        <form>
                            <TextField fullWidth required id="barName" label="Bar Name" value={this.state.barName} error={this.state.nameError} onChange={this.handleChange('barName')} style={{marginTop: "5px"}}/>
                            <TextField fullWidth required id="barAddress" label="Address" value={this.state.barAddress} error={this.state.addrError} onChange={this.handleChange('barAddress')} style={{marginTop: "5px"}}/>
                            <TextField fullWidth required id="barEmail" label="Email" value={this.state.barEmail} error={this.state.emailError} onChange={this.handleChange('barEmail')} style={{marginTop: "5px"}}/>
                            <TextField fullWidth required id="barPhone" label="Phone #" value={this.state.barPhone} error={this.state.phoneError} onChange={this.handleChange('barPhone')} style={{marginTop: "5px"}}/>

                            <Button fullWidth style={{marginTop: "15px", backgroundColor: "#fdcd4c", color: "white"}} onClick={this.onSubmit}>Submit</Button>
                        </form>
                    </Grid>
                </Grid></CardContent></Card>
            </div>
        );
    }
}
