// React
import React, { Component } from 'react';

// Material
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Card, { CardContent } from 'material-ui/Card';
import { Input } from 'material-ui';

// BarHopper

// Cloudinary Config
import cloudinary from 'cloudinary';
cloudinary.config({ 
    cloud_name: 'barhopper', 
    api_key: '793191714338535', 
    api_secret: 'T-wqWMmUae8dZ1i88t3M7-rTNso' 
});

export default class CreateBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            barName: '',
            barEmail: '',
            barAddress: '',
            barPhone: '',
            nameError: false,
            emailError: false,
            addrError: false,
            phoneError: false,
            bar_id: '', 
            logo: '', 
            image: '', 
            logoCloudUrl: '',
            imageCloudUrl: ''
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

    handleImageChange = name => event => {
        this.setState({
            [name]: event.target.files[0]
        })
    }

    uploadBarImages = function(callback) {
        var logoReader = new FileReader();
        var imageReader = new FileReader();

        logoReader.onloadend = () => {
            cloudinary.uploader.upload(logoReader.result, (res) => {
                this.setState({ logoCloudUrl: res.secure_url });
				imageReader.readAsDataURL(this.state.image);
			})
        }
        imageReader.onloadend = () => {
            cloudinary.uploader.upload(imageReader.result, (res) => {
                this.setState({ imageCloudUrl: res.secure_url });
                callback();
			})
        }

        logoReader.readAsDataURL(this.state.logo);
    }

    // Returns true if input is valid
    validateInput = function () {
        var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        this.setState({
            nameError: !this.state.barName,
            emailError: !this.state.barEmail 
                     || !emailRegex.test(this.state.email.toLowerCase()),
            phoneError: !this.state.barPhone,
            addrError: !this.state.barAddress
        })

        return !(this.state.nameError || this.state.emailError || this.state.phoneError || this.state.addrError)
    }

    onSubmit = function () {
        if (this.validateInput()) {
            
            this.uploadBarImages(() => {
                const createBarUrl = 'https://barhopperapi.herokuapp.com/api/newbar';

                var createBarData = {
                    method: 'POST',
                    body: JSON.stringify({
                        name: this.state.barName,
                        email: this.state.barEmail,
                        address: this.state.barAddress,
                        phone: this.state.barPhone, 
                        logoUrl: this.state.logoCloudUrl, 
                        imageUrl: this.state.imageCloudUrl
                    }),
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        'x-access-token': this.props.token
                    })
                }
    
                fetch(createBarUrl, createBarData)
                    .then((res) => {return res.json();})
                    .then((res) =>{
                        if (res.success === true) {
                            this.props.handleNext({bar_id: res.bar_id});
                        }
                    });
            });
            
        }
    }

    render() {
        return (
            <div>
                <Card><CardContent>
                <Grid container>
                    <Grid item xs={5}>
                        <Typography style={{marginTop: '20px'}} variant='display1'>
                            Describe Your Bar</Typography>
                        <br />
                        <Typography variant='subheading'>
                            Tell us all about your bar. 
                        </Typography>
                    </Grid>
                    <Grid item xs={7} id='createBarForm'>
                        <form>
                            <TextField fullWidth required id='barName' label='Bar Name' value={this.state.barName} error={this.state.nameError} onChange={this.handleChange('barName')} style={{marginTop: '5px'}}/>
                            <TextField fullWidth required id='barAddress' label='Address' value={this.state.barAddress} error={this.state.addrError} onChange={this.handleChange('barAddress')} style={{marginTop: '5px'}}/>
                            <TextField fullWidth required id='barEmail' label='Email' value={this.state.barEmail} error={this.state.emailError} onChange={this.handleChange('barEmail')} style={{marginTop: '5px'}}/>
                            <TextField fullWidth required id='barPhone' label='Phone #' value={this.state.barPhone} error={this.state.phoneError} onChange={this.handleChange('barPhone')} style={{marginTop: '5px'}}/>
                            <Input type='file' id='logo' label='Bar Logo' onChange={this.handleImageChange('logo')} accept='.png, .jpg, .jpeg'/>
                            <Input type='file' id='image' label='Picture of Bar' onChange={this.handleImageChange('image')} accept='.png, .jpg, .jpeg'/>

                            <Button fullWidth style={{marginTop: '15px', backgroundColor: '#fdcd4c', color: 'white'}} onClick={this.onSubmit}>Submit</Button>
                        </form>
                    </Grid>
                </Grid></CardContent></Card>
            </div>
        );
    }
}
