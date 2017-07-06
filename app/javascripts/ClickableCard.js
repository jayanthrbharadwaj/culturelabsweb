/**
 * Created by jayanth on 17/04/17.
 */
import React from "react";
import {Card, RaisedButton} from "material-ui";
const getStyles = () => ({
    clickableCard: {
        style: {
            height: 'auto',
            width: '100%',
            margin: '0px',
            padding: '0px'
        }
    },
    cardStyle: {
        style: {
            height: '100%',
            flex: '1'
        },
        containerStyle: {
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
        }
    },
});


class ClickableCard extends React.Component {
    // ... do props checks ...
    // ... events ....
    render(){
        const styles = getStyles();
        return (
            <RaisedButton
                style={{
                    ...styles.clickableCard.style,
                    ...this.props.style
                }}
            >
                <Card
                    className={this.props.className}
                    style={styles.cardStyle.style}
                    containerStyle={Object.assign(styles.cardStyle.containerStyle, this.props.containerStyle)}>
                    {/* --- Card childs --- */}
                </Card>
            </RaisedButton>
        );
    }
}

export default ClickableCard;