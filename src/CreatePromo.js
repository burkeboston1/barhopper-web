// React
import React, {Component} from 'react';

// Material UI
import Card from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import DateTimePicker from 'material-ui-pickers/DateTimePicker';
import TimePicker from 'material-ui-pickers/TimePicker';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Switch from 'material-ui/Switch';
import Checkbox from 'material-ui/Checkbox';

export default class CreatePromo extends Component {

    debug = () => {
        console.log(this.state.recurrence.startTime.getHours());
        console.log(this.state.recurrence.endTime.getHours());
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
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

            var url = 'https://barhopperapi.herokuapp.com/api/newpromo';

            var data = {
                method: 'POST',
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
            name: "",
            description: "",
            nameError: false,
            descError: false,
            startDate: new Date(),
            endDate: new Date(),
            recurring: false,
            recurrence: {
                daysOfWeek: [false, false, false, false, false, false, false],
                startTime: new Date(), 
                endTime: new Date()
            }
        }

        //this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.validateInput = this.validateInput.bind(this);
    }

    componentWillMount() {
        this.setState({
            bar_id: this.props.bar_id,
            token: this.props.token
        })
    }

    render() {
        var { recurring } = this.state;
        return(
            <Card style={{position: "absolute", width: "40%", left: "50%", top: "50%", transform: "translate(-50%, -50%)", padding: "25px"}}>
                <Typography variant="display1">
                    Create a Promotion
                </Typography>
                <form id="createpromo">
                    <TextField id="name" label="Title" onChange={this.handleChange("name")}
                        value={this.state.name} error={this.state.nameError}
                        margin="dense" required fullWidth />

                    <TextField id="description" label="Description" onChange={this.handleChange("description")}
                        value={this.state.description} error={this.state.descError}
                        margin="dense" required fullWidth />

                    <FormGroup row>
                        <FormControlLabel control={
                            <Switch checked={recurring} onChange={this.handleCheck("recurring")} value="recurring"/>
                        }
                        label="This is a recurring promotion"
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
                                <FormControlLabel control={<Checkbox checked={this.state.recurrence.daysOfWeek[7]} onChange={this.handleCheck(6)} />} label="Saturday"/>
                            </FormGroup>

                            <TimePicker 
                                label="Start Time" 
                                value={this.state.recurrence.startTime} 
                                onChange={this.handleStartTimeChange} />

                            <span>&nbsp;&nbsp;</span>

                            <TimePicker 
                                label="End Time" 
                                value={this.state.recurrence.endTime} 
                                onChange={this.handleEndTimeChange} />
                        </div>)
                
                    }

                    <Button onClick={this.onSubmit} variant="flat" fullWidth style={{color: "white", backgroundColor: "#fdcd4c", marginTop: "15px"}}>Send It</Button>
                </form>
            </Card>
        );
    }
}
