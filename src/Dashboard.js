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
import { Redirect } from 'react-router-dom';
import { Avatar } from 'material-ui';

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

    constructor (props) {
        super(props);

        this.state = {
            token: '',
            bar: {},
            createOpen: false, 
            editOpen: false, 
            selectedPromo: '', 
            loggedIn: true
        };

        this.handleCreateOpen = this.handleCreateOpen.bind(this);
        this.handleCreateClose = this.handleCreateClose.bind(this);
        this.handleEditOpen = this.handleEditOpen.bind(this);
        this.handleEditClose = this.handleEditClose.bind(this);
    }

    componentWillMount() {
        // Get bar_id, token from props or local storage
        var token = this.props.location.token || this.props.token || localStorage.getItem('Token');
        var bar = this.props.location.bar || this.props.bar || JSON.parse(localStorage.getItem('BarObject'));

        // Save token, bar_id in local storage in case of page refresh
        localStorage.setItem('Token', token);
        localStorage.setItem('BarObject', JSON.stringify(bar));

        this.setState({
            token: token, 
            bar: bar
        });
    }

    render() {

        if (!this.state.loggedIn) {
            return <Redirect push to={{pathname: '/login'}}/>;
        }

        return (
            <div style={{flexGrow: '1'}}>
                <Header loggedIn={true}/>
                <br />
                <Grid container>
                    <Grid item xs={1}></Grid>

                    <Grid item xs={10}>
                    <Grid container>

                        <Grid item xs={4} style={{marginBottom: '5px'}}>
                            <Card>
                                <img alt='bar_photo' src={this.state.bar.imageUrl} style={{width: '100%'}}/>
                                <CardContent>
                                    <Avatar src={this.state.bar.logoUrl} style={{width: "70px", height: "70px", display: "table-cell"}} />
                                    <Typography variant='display2' style={{display: "table-cell", verticalAlign: "middle", paddingLeft: '15px'}}>{this.state.bar.name}</Typography>
                                    <br />
                                    <Typography>{this.state.bar.address}</Typography>
                                    <Typography>{this.state.bar.email}</Typography>
                                    <Typography>{this.state.bar.phone}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={8}>
                            <PromotionList bar_id={this.state.bar._id} handleCreateOpen={this.handleCreateOpen} handleEditOpen={this.handleEditOpen} handleConfirmOpen={this.handleConfirmOpen}/>
                        </Grid>

                    </Grid></Grid>
                    <Grid item xs={1}></Grid>
                </Grid>

                <Modal open={this.state.createOpen} onClose={this.handleCreateClose}>
                    <CreatePromo bar_id={this.state.bar._id} token={this.state.token}/>
                </Modal>
                <Modal open={this.state.editOpen} onClose={this.handleEditClose}>
                    <EditPromo bar_id={this.state.bar._id} token={this.state.token} promotion={this.state.selectedPromo}/>
                </Modal>
            </div>
        );
    }
}
