import * as React from 'react';
import { Link, Route } from 'react-router-dom';
import './app.css';

// Material-UI
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  withStyles,
  Theme,
  createStyles,
  WithStyles,
} from '@material-ui/core';

import Layers from './layers';
import Controls from './controls';
import Interactions from './interactions';
import Overlays from './overlays';
import Custom from './custom';

const styles = (theme: Theme) => createStyles({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  toolbar: {
    justifyContent: "space-between"
  }
})

class App extends React.Component<WithStyles, any> {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar} position="fixed">
          <Toolbar className={classes.toolbar}>
            <Typography variant="h6" color="inherit" noWrap>react-openlayers</Typography>
            <div>
              <Button color="inherit" href="#/layers">Layers</Button>
              <Button color="inherit" href="#/controls">Controls</Button>
              <Button color="inherit" href="#/overlays">Overlays</Button>
              <Button color="inherit" href="#/interactions">Interactions</Button>
              <Button color="inherit" href="#/custom">Custom examples</Button>
            </div>
          </Toolbar>
        </AppBar>
        <Route path="/" exact component={Layers}/>
        <Route path="/layers" component={Layers}/>
        <Route path="/controls" component={Controls}/>
        <Route path="/interactions" component={Interactions}/>
        <Route path="/overlays" component={Overlays}/>
        <Route path="/custom" component={Custom} />
      </div>
      // <div className="menu">
      //   <h1>React OpenLayers</h1>
      //   <ul className="groups" role="nav">
      //     <li><Link to="/layers">Layers</Link></li>
      //     <li><Link to="/controls">Controls</Link></li>
      //     <li><Link to="/overlays">Overlays</Link></li>
      //     <li><Link to="/interactions">Interactions</Link></li>
      //     <li><Link to="/custom">Custom Examples</Link></li>
      //   </ul>

      //   <Route path="/" exact component={EarthquakeClusters} />
      //   <Route path="/controls" component={Controls}/>
      //   <Route path="/layers" component={Layers}/>
      //   <Route path="/interactions" component={Interactions}/>
      //   <Route path="/overlays" component={Overlays}/>
      //   <Route path="/custom" component={Custom} />
      // </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(App)