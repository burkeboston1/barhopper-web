// React
import React, { Component } from 'react';

// Materialimport Card from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import DateTimePicker from 'material-ui-pickers/DateTimePicker';
import Card from 'material-ui/Card';

export default class EditPromo extends Component {
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleStartDateChange = (date) => {
        this.setState({ startDate: date });
    }

    handleEndDateChange = (date) => {
        this.setState({ endDate: date });
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

            var url = 'http://localhost:8080/api/promotions/' + this.props.promotion._id;

            var data = {
                method: 'PATCH',
                body: JSON.stringify({
                    name: this.state.name,
                    description: this.state.description,
                    startDate: this.state.startDate,
                    endDate: this.state.endDate,
                    bar_id: this.state.bar_id
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
            recurring: false,
            recurrence: {
                daysOfWeek: "",
                startTime: "",
                endTime: ""
            }
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.validateInput = this.validateInput.bind(this);
    }

    componentWillMount() {
        this.setState({
            bar_id: localStorage.getItem('BarID'),
            token: localStorage.getItem('Token')
        })
    }

    render() {
        return(
            <Card style={{position: "absolute", width: "40%", left: "50%", top: "50%", transform: "translate(-50%, -50%)", padding: "25px"}}>
                <Typography variant="display1">
                    Update a Promotion
                </Typography>
                <form>
                    <TextField id="name" label="Title" onChange={this.handleChange("name")}
                        value={this.state.name} error={this.state.nameError}
                        margin="dense" required fullWidth />

                    <TextField id="description" label="Description" onChange={this.handleChange("description")}
                        value={this.state.description} error={this.state.descError}
                        margin="dense" required fullWidth />

                    <DateTimePicker
                        label="Start Date and Time"
                        disablePast
                        style={{marginTop: "15px"}}
                        value={this.state.startDate}
                        onChange={this.handleStartDateChange}
                        />

                    &nbsp;&nbsp;

                    <DateTimePicker
                        label="End Date and Time"
                        disablePast
                        minDate={this.state.startDate}
                        minDateMessage="End date must come after start date"
                        style={{marginTop: "15px"}}
                        value={this.state.endDate}
                        onChange={this.handleEndDateChange}
                        />
                    <Button onClick={this.onSubmit} variant="flat" fullWidth style={{backgroundColor: "#fdcd4c", marginTop: "15px"}}>Update</Button>
                </form>
            </Card>
        )
    }
}