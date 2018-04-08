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

// BarHopper

export default class PromotionList extends Component {

	deletePromotion(promo_id) {
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
        			this.forceUpdate();
        		}
        	})
	}

	constructor(props) {
		super(props);

		this.state = {
			bar_id: localStorage.getItem("BarID"), 
			token: localStorage.getItem("Token"),
			promotions: []
		};

		this.deletePromotion = this.deletePromotion.bind(this);
	}

	componentWillUpdate() {
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
			<Card>
                <CardContent>
                    <Grid container>
                        <Grid item xs={10}>
                            <Typography variant="display1">Our Promotions</Typography>
                        </Grid>
                        <Grid item xs={2} align="right">
                            <IconButton onClick={this.props.handleOpen} style={{backgroundColor: "#fdcd4c", color: "white"}}><AddIcon /></IconButton>
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
                                    
                                    <IconButton aria-label="Delete" color="primary" onClick={() => this.deletePromotion(promotion._id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItem>
                            );
                        }, this)
                    }
                </List>
            </Card>
			)
	}
}