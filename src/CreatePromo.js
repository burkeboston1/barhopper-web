// React
import React, {Component} from 'react';

// Material UI
import Card from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import DateTimePicker from 'material-ui-pickers/DateTimePicker';

export default class CreatePromo extends Component {

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

    onSubmit = function() {
        var url = 'https://barhopperapi.herokuapp.com/api/newpromo';

        var data = {
            method: 'POST',
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
                window.location.reload();
            });
    }

    constructor(props) {
        super(props);

        this.state = {
            bar_id: "",
            token: "",
            name: "",
            description: "",
            startDate: new Date(),
            endDate: new Date(),
            recurring: false,
            recurrence: {
                daysOfWeek: "",
                startTime: "",
                endTime: ""
            }
        }

        //this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
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
                    Create a Promotion
                </Typography>
                <form>
                    <TextField id="name" label="Title" onChange={this.handleChange("name")} value={this.state.name} margin="dense" required fullWidth />
                    <TextField id="description" label="Description" onChange={this.handleChange("description")} value={this.state.description} margin="dense" required fullWidth />

                    <DateTimePicker
                        label="Start Date and Time"
                        style={{marginTop: "15px"}}
                        value={this.state.startDate}
                        onChange={this.handleStartDateChange}
                        />

                    &nbsp;&nbsp;

                    <DateTimePicker
                        label="End Date and Time"
                        style={{marginTop: "15px"}}
                        value={this.state.endDate}
                        onChange={this.handleEndDateChange}
                        />
                    <Button onClick={this.onSubmit} variant="flat" fullWidth style={{backgroundColor: "#fdcd4c", marginTop: "10px"}}>Send It</Button>
                </form>
            </Card>
        );
    }
}