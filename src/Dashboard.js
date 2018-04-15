// React
import React, {Component} from 'react';

// Material UI
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Card, { CardContent } from 'material-ui/Card';
import Modal from 'material-ui/Modal';

// BarHopper components
import CreatePromo from './CreatePromo';
import Header from './Header';
import PromotionList from './PromotionList';
import EditPromo from './EditPromo';

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default class Dashboard extends Component {

    handleCreateOpen = () => {
        this.setState({ createOpen: true });
    }

    handleCreateClose = () => {
        this.setState({ createOpen: false });
    }

    handleEditOpen = (selected) => {
        this.setState({ editOpen: true, selectedPromo: selected });
    }

    handleEditClose = () => {
        this.setState({ editOpen: false });
    }

    formatDate = (dateStr) => {
        var date = new Date(dateStr);
        return days[date.getDay()] + " " + date.getMonth() + "/" + date.getDay()
        + " @ " + date.getHours() + ":" + date.getMinutes();
    }

    constructor (props) {
        super(props);

        this.state = {
            bar_id: "",
            token: "",
            bar: {
                name: "",
                address: "",
                email: "",
                phone: ""
            },
            createOpen: false, 
            editOpen: false, 
            selectedPromo: ""
        };

        this.handleCreateOpen = this.handleCreateOpen.bind(this);
        this.handleCreateClose = this.handleCreateClose.bind(this);
        this.handleEditOpen = this.handleEditOpen.bind(this);
        this.handleEditClose = this.handleEditClose.bind(this);
    }

    componentWillMount() {
        // Get bar_id, token from props or local storage
        var token = this.props.location.token || this.props.token || localStorage.getItem("Token");
        var bar_id = this.props.location.bar_id || this.props.bar_id || localStorage.getItem("BarID");

        // Save token, bar_id in local storage in case of page refresh
        localStorage.setItem("Token", token);
        localStorage.setItem("BarID", bar_id);

        const getBarUrl = 'https://barhopperapi.herokuapp.com/api/bars/' + bar_id;

        var data = {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'x-access-token': token
            })
        };

        fetch(getBarUrl, data)
        .then((res) => {return res.json();})
        .then((res) => {
            if (res.success === true) {
                this.setState({
                    bar: res.bar,
                    bar_id: bar_id,
                    token: token
                });
            }
        });
    }

    render() {

        return (
            <div>
                <Header loggedIn={true}/>
                <br />
                <Grid container>
                    <Grid item xs></Grid>

                    <Grid container xs={10}>

                        <Grid item xs={4} style={{marginBottom: "5px"}}>
                            <Card>
                                <img alt="bar_photo" src="ho_house.jpg" style={{width: "100%"}}/>
                                <CardContent>
                                    <Typography variant="display2">{this.state.bar.name}</Typography>
                                    <br /> 
                                    <Typography>{this.state.bar.address}</Typography>
                                    <Typography>{this.state.bar.email}</Typography>
                                    <Typography>{this.state.bar.phone}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={8}>
                            <PromotionList handleCreateOpen={this.handleCreateOpen} handleEditOpen={this.handleEditOpen} handleConfirmOpen={this.handleConfirmOpen}/>
                        </Grid>

                    </Grid>
                    <Grid item xs></Grid>
                </Grid>

                <Modal open={this.state.createOpen} onClose={this.handleCreateClose}>
                    <CreatePromo />
                </Modal>
                <Modal open={this.state.editOpen} onClose={this.handleEditClose}>
                    <EditPromo promotion={this.state.selectedPromo}/>
                </Modal>
            </div>
        );
    }
}
