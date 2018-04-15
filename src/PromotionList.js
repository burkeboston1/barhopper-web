// React
import React, { Component } from 'react';

// Material
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Card, { CardContent } from 'material-ui/Card';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import AddIcon from 'material-ui-icons/Add';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import EditIcon from 'material-ui-icons/Edit';
import Button from 'material-ui/Button';
import Modal from 'material-ui/Modal';

// BarHopper

export default class PromotionList extends Component {

	deleteSelectedPromo() {
        var promo_id = this.state.selectedPromo;

		const deletePromoUrl = 'https://barhopperapi.herokuapp.com/api/promotions/' + promo_id;
		
		var data = {
			method: 'DELETE', 
			headers: new Headers({
                'Content-Type': 'application/json',
                'x-access-token': this.state.token
            })
		};

		fetch(deletePromoUrl, data).then((res) => {return res.json()})
        	.then((res) => {
        		if (res.success === true) {
                    this.setState({ confirmOpen: false })
                    window.location.reload();
        		}
        	})
    }

    confirmDelete = (promo_id) => {
        this.setState({ 
            confirmOpen: true, 
            selectedPromo: promo_id
        });
    }
    
    handleConfirmOpen = () => {
        this.setState({ confirmOpen: true });
    }

    handleConfirmClose = () => {
        this.setState({ confirmOpen: false });
    }

	constructor(props) {
		super(props);

		this.state = {
			bar_id: localStorage.getItem("BarID"), 
			token: localStorage.getItem("Token"),
            promotions: [], 
            selectedPromo: "",
            confirmOpen: false
		};

		this.deleteSelectedPromo = this.deleteSelectedPromo.bind(this);
        this.handleConfirmOpen = this.handleConfirmOpen.bind(this);
        this.handleConfirmClose = this.handleConfirmClose.bind(this);
	}

	componentWillMount() {
		const getPromosUrl = 'https://barhopperapi.herokuapp.com/api/promotions/bar/' + this.state.bar_id;

        var data = {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'x-access-token': this.state.token
            })
        }

        fetch(getPromosUrl, data).then((res) => {return res.json()})
        	.then((res) => {
        		if (res.success === true) {
        			this.setState({promotions: res.results})
        		}
        	})
	}

	render() {
		return (
            <div>
                <Card>
                    <CardContent>
                        <Grid container>
                            <Grid item xs={10}>
                                <Typography variant="display1">Our Promotions</Typography>
                            </Grid>
                            <Grid item xs={2} align="right">
                                <IconButton onClick={this.props.handleCreateOpen} style={{backgroundColor: "#fdcd4c", color: "white"}}><AddIcon /></IconButton>
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
                                        
                                        <IconButton color="primary" onClick={() => this.props.handleEditOpen(promotion)}>
                                            <EditIcon />
                                        </IconButton>

                                        <IconButton aria-label="Delete" style={{color: "red"}} onClick={() => this.confirmDelete(promotion._id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItem>
                                );
                            }, this)
                        }
                    </List>
                </Card>

                <Modal open={this.state.confirmOpen} onClose={this.handleConfirmClose}>
                    <Card style={{position: "absolute", width: "40%", left: "50%", top: "50%", transform: "translate(-50%, -50%)", padding: "25px"}}>
                        <Typography variant="display1">Delete Promotion</Typography>
                        <br />
                        <Typography variant="body1">Are you sure you wish to delete this promotion?</Typography>
                        <br />
                        <Button fullWidth style={{backgroundColor: "red", color: "white"}} onClick={this.deleteSelectedPromo}>Delete</Button>
                    </Card>
                </Modal>
            </div>
			)
	}
}