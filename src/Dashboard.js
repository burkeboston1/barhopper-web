// React
import React, {Component} from 'react';

// Material UI
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Card, { CardContent } from 'material-ui/Card';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import AddIcon from 'material-ui-icons/Add';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import Modal from 'material-ui/Modal';

// BarHopper components
import Header from './Header';
import CreatePromo from './CreatePromo';

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default class Dashboard extends Component {

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    formatDate = (dateStr) => {
        var date = new Date(dateStr);
        return days[date.getDay()] + " " + date.getMonth() + "/" + date.getDay()
        + " @ " + date.getHours() + ":" + date.getMinutes();
    }

    constructor(props) {
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
            promotions: [],
            open: false
        }

        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    componentWillMount() {
        // Get bar_id, token from props or local storage
        var token = this.props.location.token || localStorage.getItem("Token");
        var bar_id = this.props.location.bar_id || localStorage.getItem("BarID");

        // Save token, bar_id in local storage in case of page refresh
        localStorage.setItem("Token", token);
        localStorage.setItem("BarID", bar_id);

        const getBarUrl = 'https://barhopperapi.herokuapp.com/api/bars/' + bar_id;
        const getPromosUrl = 'https://barhopperapi.herokuapp.com/api/promotions/bar/' + bar_id;

        var data = {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'x-access-token': token
            })
        }

        fetch(getBarUrl, data)
        .then((res) => {return res.json();})
        .then((res) => {
            if (res.success === true) {
                fetch(getPromosUrl, data)
                .then((pRes) => {return pRes.json()})
                .then((pRes) => {
                    this.setState({
                        bar: res.bar,
                        bar_id: bar_id,
                        token: token,
                        promotions: pRes.results
                    });
                });
            }
        });
    }

    render() {

        return (
            <div>
                <Header />
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
                            <Card>
                                <CardContent>
                                    <Grid container>
                                        <Grid item xs={10}>
                                            <Typography variant="display1">Our Promotions</Typography>
                                        </Grid>
                                        <Grid item xs={2} align="right">
                                            <IconButton onClick={this.handleOpen} style={{backgroundColor: "#fdcd4c", color: "white"}}><AddIcon /></IconButton>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                                <List component="nav">
                                    {
                                        this.state.promotions.map(function(promotion, i) {
                                            return (
                                                <ListItem key={i}>
                                                    <Avatar>{promotion.name[0]}</Avatar>
                                                    <ListItemText primary={promotion.name} secondary={promotion.description}/>
                                                    <Typography variant="body1">
                                                        {this.formatDate(promotion.startDate)}
                                                    </Typography>
                                                    <Typography style={{fontStyle: "italic"}}>
                                                        &nbsp;&nbsp;thru&nbsp;&nbsp;
                                                    </Typography>
                                                    <Typography variant="body1">
                                                        {this.formatDate(promotion.endDate)}
                                                    </Typography>
                                                    <IconButton aria-label="Delete" color="primary">
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </ListItem>
                                            );
                                        }, this)
                                    }
                                </List>
                            </Card>
                        </Grid>

                    </Grid>
                    <Grid item xs></Grid>
                </Grid>

                <Modal open={this.state.open} onClose={this.handleClose}>
                    <CreatePromo />
                </Modal>
            </div>
        )
    }
}
