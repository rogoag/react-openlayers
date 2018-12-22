import * as React from 'react';
import {Link, Route} from 'react-router-dom';
import {AppOverlay} from './app-overlay';

export class Overlays extends React.Component<any, any> {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h1>Controls</h1>
        <ul role="nav" className="group-menu">
          <li><Link to="overlays/overlay">Overlay</Link></li>
        </ul>

        <div className="contents">
          <Route component={AppOverlay} />
          <Route path="overlay" component={AppOverlay} />
        </div>
      </div>
    );
  }
}
