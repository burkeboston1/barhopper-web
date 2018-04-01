// React
import React, {Component} from 'react';

// Material UI
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Card from 'material-ui/Card';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import AddIcon from 'material-ui-icons/Add';
import IconButton from 'material-ui/IconButton';
import Modal from 'material-ui/Modal';

// BarHopper components
import Header from './Header';
import CreatePromo from './CreatePromo';

export default class Dashboard extends Component {

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

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

        console.log(token + " " + bar_id);

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
                <br />
                <Grid container>
                    <Grid item xs={1}></Grid>

                    <Grid item xs={10}>
                        <Grid container>
                            <Grid item xs={4} style={{marginBottom: "15px"}}>
                                <Card style={{padding: "10px"}}>
                                    <Typography variant="display2">{this.state.bar.name}</Typography>
                                    <br />
                                    <Typography>{this.state.bar.address}</Typography>
                                    <Typography>{this.state.bar.email}</Typography>
                                    <Typography>{this.state.bar.phone}</Typography>
                                </Card>
                            </Grid>

                            <Grid item xs={8}>
                                <Card style={{padding: "10px"}}>
                                    <Grid container>
                                        <Grid item xs={10}>
                                            <Typography variant="display1">Our Promotions</Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <div align="right">
                                                <IconButton onClick={this.handleOpen} style={{backgroundColor: "#fdcd4c", color: "white"}}><AddIcon /></IconButton>
                                            </div>
                                        </Grid>
                                    </Grid>
                                    <List component="nav">
                                        {
                                            this.state.promotions.map(function(promotion, i) {
                                                return (
                                                    <ListItem key={i}>
                                                        <Avatar>{promotion.name[0]}</Avatar>
                                                        <ListItemText primary={promotion.name} secondary={promotion.description}/>
                                                        <Typography variant="body2">
                                                            {new Date(Date.parse(promotion.startDate)).toDateString()}
                                                            {" - "}
                                                            {new Date(Date.parse(promotion.endDate)).toDateString()}
                                                        </Typography>
                                                    </ListItem>
                                                );
                                            })
                                        }
                                    </List>
                                </Card>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={1}></Grid>
                </Grid>

                <Modal open={this.state.open} onClose={this.handleClose}>
                    <CreatePromo />
                </Modal>
            </div>
        )
    }
}