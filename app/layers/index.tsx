import * as React from 'react';
import {Link, Route} from 'react-router-dom';

import {Tile} from './tile';
import {Vector} from './vector';
import {Heatmap} from './heatmap';
import {Image} from './image';
import {VectorTile} from './vector-tile';
import {VectorTile2} from './vector-tile-2';
import {OSMVectorTiles} from './osm-vector-tiles';

export {Tile} from './tile';
export {Vector} from './vector';
export {Heatmap} from './heatmap';
export {Image} from './image';
export {VectorTile} from './vector-tile';
export {VectorTile2} from './vector-tile-2';
export {OSMVectorTiles} from './osm-vector-tiles';

export class Layers extends React.Component<any, any> {
  render() {
    return (
      <div>
        <h1>Layers</h1>
        <ul role="nav" className="group-menu">
          <li><Link to="/layers/tile">Tile</Link></li>
          <li><Link to="/layers/vector">Vector</Link></li>
          <li><Link to="/layers/vector-tile">Vector Tile</Link></li>
          <li><Link to="/layers/osm-vector-tiles">OSM Vector Tiles</Link></li>
          <li><Link to="/layers/heatmap">Heatmap</Link></li>
          <li><Link to="/layers/image">Image</Link></li>
        </ul>
        <div className="contents">
          <Route path="/layers" exact component={Tile} />
          <Route path="/layers/tile" component={Tile} />
          <Route path="/layers/vector" component={Vector} />
          <Route path="/layers/heatmap" component={Heatmap} />
          <Route path="/layers/image" component={Image} />
          <Route path="/layers/vector-tile" component={VectorTile} />
          <Route path="/layers/vector-tile-2" component={VectorTile2} />
          <Route path="/layers/osm-vector-tiles" component={OSMVectorTiles} />
        </div>
      </div>
    );
  }
}