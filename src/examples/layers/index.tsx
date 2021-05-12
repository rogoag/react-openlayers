import * as React from 'react';
import {Route} from 'react-router-dom';

import { Drawer, List, ListItem, ListItemText, withStyles, WithStyles } from '@material-ui/core';
import sharedStyles from '../shared-styles';

import {Heatmap} from './heatmap';
import {Image} from './image';
import {Tile} from './tile';
import {Vector} from './vector';

export {Tile} from './tile';
export {Vector} from './vector';
export {Heatmap} from './heatmap';
export {Image} from './image';

class Layers extends React.Component<WithStyles> {
  public render() {
    const { classes } = this.props;

    return (
      <div className={classes.categoryRoot}>
        <Drawer open
          variant="permanent"
          anchor="left"
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.toolbar} />
          <List>
            <ListItem button { ...{ to: "/layers/tile" }}>
              <ListItemText primary="Tile" />
            </ListItem>
            <ListItem button { ...{ to: "/layers/vector" }}>
              <ListItemText primary="Vector" />
            </ListItem>
            <ListItem button { ...{ to: "/layers/vector-tile" }}>
              <ListItemText primary="Vector Tile" />
            </ListItem>
            <ListItem button { ...{ to: "/layers/osm-vector-tiles" }}>
              <ListItemText primary="OSM Vector Tiles" />
            </ListItem>
            <ListItem button { ...{ to: "/layers/heatmap" }}>
              <ListItemText primary="Heatmap" />
            </ListItem>
            <ListItem button { ...{ to: "/layers/image" }}>
              <ListItemText primary="Image" />
            </ListItem>
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Route path="/" exact component={Tile} />
          <Route path="/layers" exact component={Tile} />
          <Route path="/layers/tile" component={Tile} />
          <Route path="/layers/vector" component={Vector} />
          <Route path="/layers/heatmap" component={Heatmap} />
          <Route path="/layers/image" component={Image} />
        </main>
      </div>
    );
  }
}

export default withStyles(sharedStyles, { withTheme: true })(Layers)
