/**
 * Created by jayanth on 30/03/17.
 */
import React, {PropTypes} from 'react';
import {withRouter} from 'react-router'
import utils from '../utils/constants'
import GAEventLogger from '../analytics/GAEventLogger';
import Whatsapp from "react-share-icons/lib/Whatsapp";
import ShareUrlBuilder from '../share/ShareUrlBuilder';

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

class SankalpaMantraScreen extends React.Component {

    constructor(props) {
        super(props);
        this.logPageEvent()
    }

    componentDidMount() {
        this.initBundleObject();
    }

    componentWillReceiveProps(nextProps) {
    }

    state = {
        slideIndex: 0,
        newsStateObj: false,
        finished: false,
        stepIndex: 0,
        answerIndex: -1,
        correctAnswerIndex: -1
    };

    render() {
        const {finished, stepIndex} = this.state;
        return (
            <div>
                <a href={"whatsapp://send?"+this.title} style={utils.allPostsStyle.noscroll} data-action={this.shareUrl}>
                    <Whatsapp /></a>
                <Card>
                    <CardTitle
                        style={utils.kannadaStyle.titleStyle}
                        title={this.title}/>
                    <CardText
                        style={utils.kannadaStyle.subtitleStyle}>{this.description}</CardText>
                </Card>
                <Divider />
                <List>
                    {null != this.splitString && this.splitString.map((row, index) => (
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
                {null != this.questionaireJson && <Paper zDepth={1}>
                    <CardTitle
                        style={utils.kannadaStyle.titleStyle}
                        title="ಥಟ್ ಅಂತ ಹೇಳಿ"/>
                    <Stepper activeStep={stepIndex}>
                        {this.questionaireJson.map((row, index) => (
                            <Step>
                                <StepLabel>{"Q " + (index + 1)}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    < div >
                        {null != this.questionaireJson &&
                        <p style={this.styles.listHeaderStyle}>{this.questionaireJson[stepIndex].question1}</p>}
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
                }
            </div>
        );
    }

    initBundleObject() {
        if (null != this.props.location && null != this.props.location.state && this.props.location.state.clickedObject != null) {
            this.questionaireJson = this.getQuestionaireJSON(this.props.location.state.fullObject);
            this.title = this.props.location.state.clickedObject.clicked.fields.title;
            this.description = this.props.location.state.clickedObject.clicked.fields.description;
            this.shareUrl = ShareUrlBuilder.createShareUrl(this.props.location.state.clickedObject.clicked)
            this.itemId = this.props.location.state.clickedObject.clicked.sys.contentType.sys.id;
            console.log("shareurl " + this.shareUrl);
        } else {
            this.itemId = this.props.bundleObject.sys.contentType.sys.id;
            this.title = this.props.bundleObject.fields.title;
            this.description = this.props.bundleObject.fields.description;
            this.shareUrl = ShareUrlBuilder.createShareUrl(this.props.bundleObject)
            console.log("shareurl " + this.shareUrl);
        }
        this.getSplitString(this.description);
        this.setState({newsStateObj: true})
    }


    getQuestionaireJSON(object) {
        for (let i = 0; i < object.length; i++) {
            if (object[i].fields.questionAire != null) {
                return object[i].fields.questionAire.rows
            }
        }
    }

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

    getSplitString(description) {
        this.splitString = description.split(";")
    }

    logPageEvent() {
        GAEventLogger.logPageViewEvent(this.itemId);
    }

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
}

export default withRouter(SankalpaMantraScreen)
