// React
import React, { Component } from 'react';

// Material
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Card, { CardContent } from 'material-ui/Card';
import Icon from 'material-ui/Icon';

// BarHopper

// Cloudinary Config
import cloudinary from 'cloudinary';
cloudinary.config({ 
    cloud_name: 'barhopper', 
    api_key: '793191714338535', 
    api_secret: 'T-wqWMmUae8dZ1i88t3M7-rTNso' 
});

export default class EditBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            barName: this.props.bar.name,
            barEmail: this.props.bar.email,
            barAddress: this.props.bar.address,
            barPhone: this.props.bar.phone,
            nameError: false,
            emailError: false,
            addrError: false,
            phoneError: false,
            bar_id: this.props.bar._id, 
            logo: '', 
            image: '', 
            logoCloudUrl: '',
            imageCloudUrl: '', 
            logoError: false, 
            imageError: false
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
                     || !emailRegex.test(this.state.barEmail.toLowerCase()),
            phoneError: !this.state.barPhone,
            addrError: !this.state.barAddress, 
            logoError: !this.state.logo, 
            imageError: !this.state.image
        })

        return !(this.state.nameError || this.state.emailError || this.state.phoneError || this.state.addrError
                    || this.state.logoError || this.state.imageError);
    }

    onSubmit = function () {
        if (this.validateInput()) {
            
            this.uploadBarImages(() => {
                const editBarUrl = 'http://localhost:8080/api/bars/' + this.state.bar_id;

                var editBarData = {
                    method: 'PATCH',
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
    
                fetch(editBarUrl, editBarData)
                    .then((res) => {return res.json();})
                    .then((res) =>{
                        if (res.success === true) {
                            window.location.reload();
                        } else {
                            // TODO some error handling
                        }
                    });
            });
            
        }
    }

    render() {
        return (
            <div>
                <Card style={{position: "absolute", width: "40%", left: "50%", top: "50%", transform: "translate(-50%, -50%)", padding: "25px"}}>
                    <Typography variant='display1'>Edit Your Bar</Typography>
                <br />
                <form>
                    <TextField fullWidth required id='barName' label='Bar Name' value={this.state.barName} error={this.state.nameError} onChange={this.handleChange('barName')} style={{marginTop: '5px'}}/>
                    <TextField fullWidth required id='barAddress' label='Address' value={this.state.barAddress} error={this.state.addrError} onChange={this.handleChange('barAddress')} style={{marginTop: '5px'}}/>
                    <TextField fullWidth required id='barEmail' label='Email' value={this.state.barEmail} error={this.state.emailError} onChange={this.handleChange('barEmail')} style={{marginTop: '5px'}}/>
                    <TextField fullWidth required id='barPhone' label='Phone #' value={this.state.barPhone} error={this.state.phoneError} onChange={this.handleChange('barPhone')} style={{marginTop: '5px'}}/>
                    
                    <div style={{marginTop: '10px'}}>
                    <table><tbody><tr>
                    <td><Button
                        component="label"
                        color='primary'>
                        <Icon>file_upload</Icon>
                        &nbsp;&nbsp;Upload Bar Logo
                        <input
                            onChange={this.handleImageChange('logo')}
                            style={{ display: 'none' }}
                            type="file"
                            accept='.png, .jpg, .jpeg'
                        />
                    </Button></td>
                    <td><Typography variant='subheading'>{this.state.logo.name || 'No file selected'}</Typography></td>
                    </tr>
                    <tr>
                    <td><Button
                        component="label"
                        color='primary'>
                        <Icon>file_upload</Icon>
                        &nbsp;&nbsp;Upload Bar Image
                        <input
                            onChange={this.handleImageChange('image')}
                            style={{ display: 'none' }}
                            type="file"
                            accept='.png, .jpg, .jpeg'
                        />
                    </Button></td>
                    <td><Typography variant='subheading'>{this.state.image.name || 'No file selected'}</Typography></td>
                    </tr></tbody></table>
                    </div>

                    <Button fullWidth style={{marginTop: '15px', backgroundColor: '#fdcd4c', color: 'white'}} onClick={this.onSubmit}>Submit</Button>
                </form></Card>
            </div>
        );
    }
}
