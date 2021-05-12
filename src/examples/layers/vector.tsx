import * as React from "react";

import { Divider, Typography } from "@material-ui/core";

import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorSource from 'ol/source/Vector';

import { custom, layer, Layers, MapReact } from "react-openlayers";

import Highlighter from "../Highlighter";

const iconFeature = new Feature(new Point([0, 0]));
const source = new VectorSource({features: [iconFeature]});
const marker = new custom.style.MarkerStyle(
  'https://openlayers.org/en/v4.0.1/examples/data/icon.png'
);

export class Vector extends React.Component {
  public render(){
    return (
      <div>
        <Typography variant="h4" paragraph>Vector layer</Typography>
        <MapReact>
          <Layers>
            <layer.TileReact />
            <layer.Vector source={source} style={marker.style} zIndex={1}/>
          </Layers>
        </MapReact>
        <br/>
        <Divider />
        <br/>
        <Highlighter lang="jsx" code={
`<MapReact>
  <Layers>
    <layer.TileReact />
    <layer.Vector source={source} style={marker.style} zIndex="1"/>
  </Layers>
</MapReact>`
        } />
        <a href="https://github.com/allenhwkim/react-openlayers/blob/master/app/layers/vector.tsx">Source Code</a>
      </div>
    );
  }
}