import * as React from 'react';
import { Link, Route } from 'react-router-dom';
import './app.css';

import { Controls } from './controls';
import { Layers } from './layers';
import { Interactions } from './interactions';
import { Overlays } from './overlays';

import { Custom, EarthquakeClusters } from './custom';
export class App extends React.Component<any, any> {

  render() {
    return (
      <div className="menu">
        <h1>React OpenLayers</h1>
        <ul className="groups" role="nav">
          <li><Link to="/layers">Layers</Link></li>
          <li><Link to="/controls">Controls</Link></li>
          <li><Link to="/overlays">Overlays</Link></li>
          <li><Link to="/interactions">Interactions</Link></li>
          <li><Link to="/custom">Custom Examples</Link></li>
        </ul>

        <Route path="/" exact component={EarthquakeClusters} />
        <Route path="/controls" component={Controls}/>
        <Route path="/layers" component={Layers}/>
        <Route path="/interactions" component={Interactions}/>
        <Route path="/overlays" component={Overlays}/>
        <Route path="/custom" component={Custom} />
      </div>
    );
  }
}