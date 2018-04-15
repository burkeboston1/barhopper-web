// React
import React, { Component } from 'react';

// Material-UI
import Stepper, { Step, StepLabel } from 'material-ui/Stepper';
import Typography from 'material-ui/Typography';
import { Grid, CircularProgress } from 'material-ui';

// BarHopper
import Header from './Header';
import Signup from './Signup';
import CreateBar from './CreateBar';
import Redirect from 'react-router-dom/Redirect';

function getSteps() {
    return ['Register', 'Describe Your Bar'];
}

export default class Register extends Component {
    getStepContent = function(step) {
        switch (step) {
            case 0: 
                return (<Signup handleNext={this.handleNext}/>);
            case 1: 
                return (<CreateBar handleNext={this.handleNext} token={this.state.token}/>);
            default: 
                return 'Unknown step';
        }
    }
 
    handleNext = (newState) => {
        const { activeStep } = this.state;

        this.setState({
            activeStep: activeStep + 1
        });
        this.setState(newState);

        if (activeStep === 1) {
            setTimeout(() => {
                this.setState({
                    registered: true
                })
            }, 2000);
        }
    };

    handleReset = () => {
        this.setState({
          activeStep: 0,
        });
    };


    constructor(props) {
        super(props);

        this.state = ({
            activeStep: 0, 
            registered: false
        });
    }

    render() {
        const steps = getSteps();
        const { activeStep, registered } = this.state;

        if (registered) {
            return <Redirect push to={{pathname: "/dashboard", bar_id: this.state.bar_id, token: this.state.token}}/>
        }

        return (
            <div><Header loggedIn={false} /><Grid container>
                <Grid item xs={2}></Grid>
                <Grid item xs={8}>
                <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => {
                        return (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        )
                    })}
                </Stepper>
                <div style={{padding: "15px"}}>
                    {activeStep === steps.length ? (
                        <div align="center">
                            <Typography align="center" variant="display1">You're All Set!</Typography>
                            <br />
                            <Typography align="center" variant="subheading">Taking you to the dashboard</Typography>
                            <br />
                            <CircularProgress size={100} style={{color: "#fdcd4c"}} thickness={6} />
                        </div>
                    ) : (
                        <div>
                            <div>{this.getStepContent(activeStep)}</div>
                        </div>
                    )}
                </div>
                </Grid>
                <Grid item xs={2}></Grid>
            </Grid></div>
        )
    }
}