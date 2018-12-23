import * as React from 'react';
import { Link, Route } from 'react-router-dom';

import { Attribution } from './attribution';
import { FullScreen } from './full-screen';
import { MousePosition } from './mouse-position';
import { OverviewMap } from './overview-map';
import { Rotate } from './rotate';
import { ScaleLine } from './scale-line';
import { ZoomSlider } from './zoom-slider';
import { ZoomToExtent } from './zoom-to-extent';
import { Zoom } from './zoom';

export { Attribution } from './attribution';
export { FullScreen } from './full-screen';
export { MousePosition } from './mouse-position';
export { OverviewMap } from './overview-map';
export { Rotate } from './rotate';
export { ScaleLine } from './scale-line';
export { ZoomSlider } from './zoom-slider';
export { ZoomToExtent } from './zoom-to-extent';
export { Zoom } from './zoom';

export class Controls extends React.Component<any, any> {
  render() {
    return (
      <div>
        <h1>Controls</h1>
        <ul role="nav" className="group-menu">
          <li><Link to="/controls/attribution">Attribution</Link></li>
          <li><Link to="/controls/full-screen">FullScreen</Link></li>
          <li><Link to="/controls/mouse-position">MousePosition</Link></li>
          <li><Link to="/controls/overview-map">OverviewMap</Link></li>
          <li><Link to="/controls/rotate">Rotate</Link></li>
          <li><Link to="/controls/scale-line">ScaleLine</Link></li>
          <li><Link to="/controls/zoom-slider">ZoomSlider</Link></li>
          <li><Link to="/controls/zoom-to-extent">ZoomToExtent</Link></li>
          <li><Link to="/controls/zoom">Zoom</Link></li>
        </ul>

        <div className="contents">
          <Route path="/controls" exact component={Attribution} />
          <Route path="/controls/attribution" component={Attribution} />
          <Route path="/controls/full-screen" component={FullScreen} />
          <Route path="/controls/mouse-position" component={MousePosition} />
          <Route path="/controls/overview-map" component={OverviewMap} />
          <Route path="/controls/rotate" component={Rotate} />
          <Route path="/controls/scale-line" component={ScaleLine} />
          <Route path="/controls/zoom-slider" component={ZoomSlider} />
          <Route path="/controls/zoom-to-extent" component={ZoomToExtent} />
          <Route path="/controls/zoom" component={Zoom} />
        </div>
      </div>
    );
  }
}