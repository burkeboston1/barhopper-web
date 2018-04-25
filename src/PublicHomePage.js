// React
import React, { Component } from 'react';

// Material
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

// BarHopper
import Header from './Header';
export default class PublicHomePage extends Component {

	render() {
		return (
			<div>
				<Header loggedIn={false}/>
				<br />
				<Grid container>
					<Grid item xs></Grid>
					
					<Grid item xs={4}>
						<Typography align="center" variant="display3">Welcome to BarHopper</Typography>
					</Grid>
					
					<Grid item xs></Grid>	
				</Grid>
			</div>
			);
	}
}