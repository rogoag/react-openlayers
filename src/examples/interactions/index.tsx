import * as React from 'react';
import {Route} from 'react-router-dom';

import { Drawer, List, ListItem, ListItemText, withStyles, WithStyles, Button } from '@material-ui/core';
import sharedStyles from '../shared-styles';

import {DoubleClickZoom} from './double-click-zoom';
import {DragAndDrop} from './drag-and-drop';
import {DragBox} from './drag-box';
import {DragPan} from './drag-pan';
import {DragRotate} from './drag-rotate';
import {DragRotateAndZoom} from './drag-rotate-and-zoom';
import {DragZoom} from './drag-zoom';
import {Draw} from './draw';
import {KeyboardPan} from './keyboard-pan';
import {KeyboardZoom} from './keyboard-zoom';
import {Modify} from './modify';
import {MouseWheelZoom} from './mouse-wheel-zoom';
import {PinchRotate} from './pinch-rotate';
import {PinchZoom} from './pinch-zoom';
import {Pointer} from './pointer';
import {Select} from './select';
import {Snap} from './snap';
import {Translate} from './translate';

export {Select} from './select';
export {Draw} from './draw';
export {Modify} from './modify';
export {DoubleClickZoom} from './double-click-zoom';
export {DragAndDrop} from './drag-and-drop';
export {DragBox} from './drag-box';
export {DragPan} from './drag-pan';
export {DragRotateAndZoom} from './drag-rotate-and-zoom';
export {DragRotate} from './drag-rotate';
export {DragZoom} from './drag-zoom';
export {KeyboardPan} from './keyboard-pan';
export {KeyboardZoom} from './keyboard-zoom';
export {MouseWheelZoom} from './mouse-wheel-zoom';
export {PinchRotate} from './pinch-rotate';
export {PinchZoom} from './pinch-zoom';
export {Pointer} from './pointer';
export {Snap} from './snap';
export {Translate} from './translate';

class Interactions extends React.Component<WithStyles> {
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
            <Button href={"#/interactions/select"}>
              <ListItemText primary="Select"/>
            </Button>
            <Button href={"#/interactions/draw"}>
              <ListItemText primary="Draw"/>
            </Button>
            <ListItem button { ...{ to: "/interactions/modify" }}>
              <ListItemText primary="Modify"/>
            </ListItem>
            <ListItem button { ...{ to: "/interactions/double-click-zoom" }}>
              <ListItemText primary="DoubleClickZoom"/>
            </ListItem>
            <ListItem button { ...{ to: "/interactions/drag-and-drop" }}>
              <ListItemText primary="DragAndDrop"/>
            </ListItem>
            <ListItem button { ...{ to: "/interactions/drag-box" }}>
              <ListItemText primary="DragBox"/>
            </ListItem>
            <ListItem button { ...{ to: "/interactions/drag-pan" }}>
              <ListItemText primary="DragPan"/>
            </ListItem>
            <ListItem button { ...{ to: "/interactions/drag-rotate-and-zoom" }}>
              <ListItemText primary="DragRotateAndZoom"/>
            </ListItem>
            <Button href={"#/interactions/drag-pan"}>
              <ListItemText primary="DragRotate"/>
            </Button>
            <ListItem button { ...{ to: "/interactions/drag-zoom" }}>
              <ListItemText primary="DragZoom"/>
            </ListItem>
            <ListItem button { ...{ to: "/interactions/keyboard-pan" }}>
              <ListItemText primary="KeyboardPan"/>
            </ListItem>
            <ListItem button { ...{ to: "/interactions/keyboard-zoom" }}>
              <ListItemText primary="KeyboardZoom"/>
            </ListItem>
            <ListItem button { ...{ to: "/interactions/mouse-wheel-zoom" }}>
              <ListItemText primary="MouseWheelZoom"/>
            </ListItem>
            <ListItem button { ...{ to: "/interactions/pinch-rotate" }}>
              <ListItemText primary="PinchRotate"/>
            </ListItem>
            <ListItem button { ...{ to: "/interactions/pinch-zoom" }}>
              <ListItemText primary="PinchZoom"/>
            </ListItem>
            <ListItem button { ...{ to: "/interactions/pointer" }}>
              <ListItemText primary="Pointer"/>
            </ListItem>
            <ListItem button { ...{ to: "/interactions/snap" }}>
              <ListItemText primary="Snap"/>
            </ListItem>
            <ListItem button { ...{ to: "/interactions/translate" }}>
              <ListItemText primary="Translate"/>
            </ListItem>
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Route path="/interactions" exact component={Select} />
          <Route path="/interactions/select" component={Select} />
          <Route path="/interactions/draw" component={Draw} />
          <Route path="/interactions/modify" component={Modify} />
          <Route path="/interactions/double-click-zoom" component={DoubleClickZoom} />
          <Route path="/interactions/drag-and-drop" component={DragAndDrop} />
          <Route path="/interactions/drag-box" component={DragBox} />
          <Route path="/interactions/drag-pan" component={DragPan} />
          <Route path="/interactions/drag-rotate-and-zoom" component={DragRotateAndZoom} />
          <Route path="/interactions/drag-rotate" component={DragRotate} />
          <Route path="/interactions/drag-zoom" component={DragZoom} />
          <Route path="/interactions/keyboard-pan" component={KeyboardPan} />
          <Route path="/interactions/keyboard-zoom" component={KeyboardZoom} />
          <Route path="/interactions/mouse-wheel-zoom" component={MouseWheelZoom} />
          <Route path="/interactions/pinch-rotate" component={PinchRotate} />
          <Route path="/interactions/pinch-zoom" component={PinchZoom} />
          <Route path="/interactions/pointer" component={Pointer} />
          <Route path="/interactions/snap" component={Snap} />
          <Route path="/interactions/translate" component={Translate} />
        </main>
      </div>
    );
  }
}

export default withStyles(sharedStyles, { withTheme: true })(Interactions)