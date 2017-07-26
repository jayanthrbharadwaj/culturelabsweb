import React from "react";
import {GridList, GridTile} from "material-ui";
import {browserHistory} from "react-router";
import utils from "../utils/constants";
import GAEventLogger from '../analytics/GAEventLogger';

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    gridList: {
        width: 500,
        height: 450,
        overflowY: 'auto',
    },
};

/**
 * A simple example of a scrollable `GridList` containing a [Subheader](/#/components/subheader).
 */
class SeriesHomeTab extends React.Component {
    constructor(props) {
        super(props);
        this.series = []
        this.logPageEvent()
    }

    componentWillReceiveProps(nextProps) {
        if (null != nextProps.newsList.items) {
            for (var i = 0; i < nextProps.newsList.items.length; i++) {
                if (nextProps.newsList.items[i].sys.contentType.sys.id == utils.data.series) {
                    this.series.push(nextProps.newsList.items[i]);
                }
            }
        }
    }

    handleListItemClick(clickedObject) {
        browserHistory.push({
            pathname: '/seriesdetail',
            state: {clickedObject: clickedObject, fullObject: this.props.newsList.items}
        });
    }

    render() {
        return (
            <div style={styles.root}>
                <GridList
                    cols={2}
                    padding={10}
                cellHeight={200}>
                    {null != this.series && this.series.map(function (item, i) {
                            return <GridTile
                                key={item.fields.subtext}
                                title={" "}
                                actionPosition="left"
                                titlePosition="top"
                                titleBackground="linear-gradient(to bottom, rgba(255,152,0,0.7) 0%,rgba(255,152,0,0.3) 70%,rgba(255,152,0,0) 100%)"
                                style={{boxShadow: '2px 2px 10px orange'}}
                                onTouchTap={function (e) {
                                    this.handleListItemClick({clicked:item})
                                }.bind(this)}
                            >
                                <div>{item.fields.title}</div>
                            </GridTile>
                        }.bind(this)
                    )}
                </GridList>
            </div>
        )
    }
}

export default SeriesHomeTab;