/**
 * Created by jayanth on 30/03/17.
 */
import React, {PropTypes} from 'react';
import {withRouter} from 'react-router'
import utils from '../utils/constants'
import {
    Card,
    CardTitle,
    CardText,
    Divider,
    Toggle,
    List,
    ListItem,
    Step,
    Stepper,
    StepLabel,
    Paper,
    RaisedButton
} from 'material-ui';

class SubhaashitaScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    flexContainer = {
        display: 'flex',
        flexDirection: 'row',
        padding: 0,
    };

    styles = {
        block: {
            maxWidth: 250,
        },
        toggle: {
            marginBottom: 16,
        },
        thumbOff: {
            backgroundColor: '#ffcccc',
        },
        trackOff: {
            backgroundColor: '#ff9d9d',
        },
        thumbSwitched: {
            backgroundColor: 'red',
        },
        trackSwitched: {
            backgroundColor: '#ff9d9d',
        },
        labelStyle: {
            color: 'red',
            fontSize: 10
        },
        listHeaderStyle: {
            color: 'orange',
            fontSize: 20,
            marginLeft: 15
        },
    };


    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    }
    state = {
        slideIndex: 0,
        newsStateObj: false,
        finished: false,
        stepIndex: 0,
        answerIndex: -1,
        correctAnswerIndex: -1
    };

    handleNext = () => {
        const {stepIndex} = this.state;
        if (this.state.correctAnswerIndex != -1) {
            this.setState({
                answerIndex: -1,
                correctAnswerIndex: -1,
                stepIndex: stepIndex >= this.questionaireJson.length - 1 ? 0 : stepIndex + 1,
                finished: stepIndex >= this.questionaireJson.length - 1,
            });
        }
    };

    handleClick = (item) => {
        this.setState({
            answerIndex: item.clicked
        });
        if (item.correctAnswer == (item.clickAnswer)) {
            this.setState({
                correctAnswerIndex: item.clicked
            });
        } else {
            this.setState({
                correctAnswerIndex: -1
            });
        }
    };

    getQuestionaireJSON(object) {
        for (let i = 0; i < object.length; i++) {
            if (object[i].fields.questionaireJson != null) {
                return object[i].fields.questionaireJson.rows
            }
        }
    }

    render() {
        const {router, params, location, routes} = this.props
        const {finished, stepIndex} = this.state;
        this.splitString = this.props.location.state.clickedObject.clicked.fields.description
        this.questionaireJson = this.getQuestionaireJSON(this.props.location.state.fullObject);
        this.splitString = this.splitString.split(";")
        return (
            <div>

                <Card>
                    <CardTitle
                        style={utils.kannadaStyle.kannadaTitleStyle}
                        title={this.props.location.state.clickedObject.clicked.fields.title}/>
                    <CardText
                        style={utils.kannadaStyle.kannadaSubtitleStyle}>{this.props.location.state.clickedObject.clicked.fields.description}</CardText>
                </Card>
                <Divider />
                <List>
                    {this.splitString.map((row, index) => (
                        <div>
                            <Divider/>
                            <ListItem disabled={true} primaryText={this.splitString[index].split(":")[0]}>
                            </ListItem>
                            <div style={this.styles.listHeaderStyle}>{this.splitString[index].split(":")[1]}</div>
                        </div>
                    ))}
                </List>
                <Toggle
                    label="Take me to top"
                    thumbStyle={this.styles.thumbOff}
                    trackStyle={this.styles.trackOff}
                    thumbSwitchedStyle={this.styles.thumbSwitched}
                    trackSwitchedStyle={this.styles.trackSwitched}
                    labelStyle={this.styles.labelStyle}
                />
                <br/>
                <Paper zDepth={1}>
                    <CardTitle
                        style={utils.kannadaStyle.kannadaTitleStyle}
                        title="ಥಟ್ ಅಂತ ಹೇಳಿ"/>
                    <Stepper activeStep={stepIndex}>
                        {null != this.questionaireJson && this.questionaireJson.map((row, index) => (
                            <Step>
                                <StepLabel>{"Q " + (index + 1)}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <div>
                        <p style={this.styles.listHeaderStyle}>{this.questionaireJson[stepIndex].question1}</p>
                        <div style={{marginTop: 12}}>
                            {null != this.questionaireJson && this.questionaireJson[stepIndex].answers.map((row, index) => (
                                <RaisedButton
                                    label={row}
                                    fullWidth={false}
                                    secondary={this.state.answerIndex == index}
                                    primary={this.state.correctAnswerIndex == index}
                                    onTouchTap={function (e) {
                                        this.handleClick({
                                            clicked: index,
                                            clickAnswer: row,
                                            correctAnswer: this.questionaireJson[stepIndex].correctAnswer
                                        })
                                    }.bind(this)}
                                    style={{marginRight: 12, marginBottom: 20}}
                                />
                            ))}
                            <br/>
                            <RaisedButton
                                label={stepIndex === 2 ? 'Finish' : 'Next'}
                                primary={true}
                                fullWidth={true}
                                onTouchTap={this.handleNext}
                            />
                        </div>
                    </div>
                </Paper>
            </div>
        );
    }
}

export default withRouter(SubhaashitaScreen)
