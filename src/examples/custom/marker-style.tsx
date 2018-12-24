import * as React from "react";

import { Typography, Divider } from "@material-ui/core";

import Feature from 'ol/feature';
import Point from 'ol/geom/point';
import VectorSource from 'ol/source/vector';

import {
  interaction, layer, custom, control, //name spaces
  Interactions, Overlays, Controls,     //group
  Map, Layers, Overlay, Util    //objects
} from "react-openlayers";

import Highlighter from "../Highlighter";

var iconFeature = new Feature(new Point([0, 0]));
var source = new VectorSource({features: [iconFeature]});
var marker = new custom.style.MarkerStyle(
  'https://openlayers.org/en/v4.0.1/examples/data/icon.png'
);

export class MarkerStyle extends React.Component<any,any> {
  render(){
    return (
      <div>
        <Typography variant="h4" paragraph>Marker style</Typography>
        <Map>
          <Layers>
            <layer.Tile />
            <layer.Vector 
              style={marker.style}
              source={source}/>
          </Layers>
        </Map>
        <br/>
        <Divider />
        <br/>
        <Highlighter lang="jsx" code={
`<Map>
  <Layers>
    <layer.Tile />
    <layer.Vector 
      style={marker.style}
      source={source}/>
  </Layers>
</Map>`
        } />
        <a href="https://github.com/allenhwkim/react-openlayers/blob/master/app/custom/marker-style.tsx">source</a>
      </div>
    );
  }
}