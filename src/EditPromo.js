// React
import React, { Component } from 'react';

// Materialimport Card from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import DateTimePicker from 'material-ui-pickers/DateTimePicker';
import Card from 'material-ui/Card';
import TimePicker from 'material-ui-pickers/TimePicker';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Switch from 'material-ui/Switch';
import Checkbox from 'material-ui/Checkbox';
import moment from 'moment';

export default class EditPromo extends Component {
    debug = () => {
        console.log(this.state.recurrence.startTime.getHours());
        console.log(this.state.recurrence.endTime.getHours());
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleCheck = name => event => {
        if (typeof name === "number") {
            var recurrence = {...this.state.recurrence};
            recurrence.daysOfWeek[name] = event.target.checked;
            this.setState({ recurrence });
        } else {
            this.setState({ [name]: event.target.checked });
        }
    };

    handleStartDateChange = (date) => {
        this.setState({ startDate: date });
    }

    handleEndDateChange = (date) => {
        this.setState({ endDate: date });
    }

    handleStartTimeChange = (time) => {
        var recurrence = {...this.state.recurrence};
        recurrence.startTime = new Date(time);
        this.setState({ recurrence });
    }

    handleEndTimeChange = (time) => {
        var recurrence = {...this.state.recurrence};
        recurrence.endTime = new Date(time);
        this.setState({ recurrence });
    }

    validateInput = function() {
        var nameError = !this.state.name;
        var descError = !this.state.description;
        this.setState({
            nameError: nameError,
            descError: descError
        })
        return !nameError || !descError;
    }

    onSubmit = function() {
        // validate input
        if (this.validateInput()) {

            var url = 'https://barhopperapi.herokuapp.com/api/promotions/' + this.props.promotion._id;

            var data = {
                method: 'PATCH',
                body: JSON.stringify({
                    name: this.state.name,
                    description: this.state.description,
                    startDate: this.state.startDate,
                    endDate: this.state.endDate,
                    bar_id: this.state.bar_id, 
                    recurring: this.state.recurring,
                    startTime: this.state.recurrence.startTime, 
                    endTime: this.state.recurrence.endTime, 
                    daysOfWeek: this.state.recurrence.daysOfWeek
                }),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'x-access-token': this.state.token
                })
            };

            fetch(url, data)
                .then((res) => {return res.json();})
                .then((res) => {
                    if (res.success === true) {
                        window.location.reload();
                    }
                });
        }
    }

    constructor(props) {
        super(props);

        this.state = {
            bar_id: "",
            token: "",
            name: this.props.promotion.name,
            description: this.props.promotion.description,
            nameError: false,
            descError: false,
            startDate: this.props.promotion.startDate,
            endDate: this.props.promotion.endDate,
            recurring: this.props.promotion.recurring,
            recurrence: {
                daysOfWeek: this.props.promotion.recurrence.daysOfWeek, 
                startTime: new Date(this.props.promotion.recurrence.startTime), 
                endTime: new Date(this.props.promotion.recurrence.endTime)
            }
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.validateInput = this.validateInput.bind(this);
        console.log(this.state.recurrence.endTime.getHours())
    }

    componentWillMount() {
        this.setState({
            bar_id: localStorage.getItem('BarID'),
            token: localStorage.getItem('Token')
        })
    }

    render() {
        var { recurring } = this.state;
        return(
            <Card style={{position: "absolute", width: "40%", left: "50%", top: "50%", transform: "translate(-50%, -50%)", padding: "25px"}}>
                <Typography variant="display1">
                    Update Promotion
                </Typography>
                <form>
                    <TextField id="name" label="Title" onChange={this.handleChange("name")}
                        value={this.state.name} error={this.state.nameError}
                        margin="dense" required fullWidth />

                    <TextField id="description" label="Description" onChange={this.handleChange("description")}
                        value={this.state.description} error={this.state.descError}
                        margin="dense" required fullWidth />

                    <FormGroup row>
                        <FormControlLabel control={
                            <Switch disabled={true} checked={recurring} onChange={this.handleCheck("recurring")} value="recurring"/>
                        }
                        label="Recurring promotion"
                        />
                    </FormGroup>

                    { !recurring ? 
                    
                        (<div>
                            <DateTimePicker
                                label="Start Date and Time"
                                disablePast
                                style={{marginTop: "15px"}}
                                value={this.state.startDate}
                                onChange={this.handleStartDateChange}/>

                            <span>&nbsp;&nbsp;</span>

                            <DateTimePicker
                                label="End Date and Time"
                                disablePast
                                minDate={this.state.startDate}
                                minDateMessage="End date must come after start date"
                                style={{marginTop: "15px"}}
                                value={this.state.endDate}
                                onChange={this.handleEndDateChange}/>
                        </div>)

                        :

                        (<div>
                            <FormGroup row>
                                <FormControlLabel control={<Checkbox checked={this.state.recurrence.daysOfWeek[0]} onChange={this.handleCheck(0)} />} label="Sunday" />
                                <FormControlLabel control={<Checkbox checked={this.state.recurrence.daysOfWeek[1]} onChange={this.handleCheck(1)} />} label="Monday"/>
                                <FormControlLabel control={<Checkbox checked={this.state.recurrence.daysOfWeek[2]} onChange={this.handleCheck(2)} />} label="Tuesday"/>
                                <FormControlLabel control={<Checkbox checked={this.state.recurrence.daysOfWeek[3]} onChange={this.handleCheck(3)} />} label="Wednesday"/>
                                <FormControlLabel control={<Checkbox checked={this.state.recurrence.daysOfWeek[4]} onChange={this.handleCheck(4)} />} label="Thursday"/>
                                <FormControlLabel control={<Checkbox checked={this.state.recurrence.daysOfWeek[5]} onChange={this.handleCheck(5)} />} label="Friday"/>
                                <FormControlLabel control={<Checkbox checked={this.state.recurrence.daysOfWeek[6]} onChange={this.handleCheck(6)} />} label="Saturday"/>
                            </FormGroup>

                            <TimePicker 
                                label="Start Time" 
                                value={this.state.recurrence.startTime} 
                                onChange={this.handleStartTimeChange} />

                            <span>&nbsp;&nbsp;</span>

                            <TimePicker 
                                label="End Time" 
                                value={this.state.recurrence.endTime} 
                                minDate={this.state.recurrence.startTime}
                                minDateMessage="End time must come after start time"
                                onChange={this.handleEndTimeChange} />
                        </div>)
                
                    }
                    
                    <Button onClick={this.onSubmit} variant="flat" fullWidth style={{backgroundColor: "#fdcd4c", marginTop: "15px"}}>Update</Button>
                </form>
            </Card>
        )
    }
}