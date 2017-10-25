import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Tabs, Tab} from 'material-ui/Tabs';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';

class App extends React.Component {

    render() {
		
        const fontstyles = {
            fontWeight:'bold',
            fontSize: '20px',
            padding: '10px',
        }
	const styletext = {
		color: 'red',
	}

        return (
            <MuiThemeProvider>
                <div>
                    <h1>Madhwa Sangraha</h1>

                <Tabs>
			<Tab label="About Us">
			<div>
                                <h1 style={styletext}>About Us</h1>
                                <hr style={hrstyle}/>
                                <p>We are Team based out of Bengaluru. Our core competency is in creating a platform for all our users who actively contribute
								   to the culture they are brought up in. Pass on the joy of being a part of this platform and involve your own community and collaborate</p>
                                <hr/>
								<h4>Contact-us</h4>
                                <TextField hintText="yourname" floatingLabelText="Name"/><br/>
                                <TextField hintText="youremail" floatingLabelText="Email Id"/><br/>
                                <TextField hintText="yourfeedback" floatingLabelText="Feedback" multiLine={true}/><br/>
                                <Checkbox label="Please tick checkbox below. Incase we reach out to you directly"/><br/>
                                <RaisedButton label="Submit"/>
                        </div>
			</Tab>
                    </Tabs>
                </div>
            </MuiThemeProvider>
        );
    }

}

export default App;
