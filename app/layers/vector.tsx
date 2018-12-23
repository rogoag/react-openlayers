import * as React from "react";
import * as ReactDOM from "react-dom";

import ol from 'ol';
import Feature from 'ol/feature';
import Point from 'ol/geom/point';
import VectorSource from 'ol/source/vector';

import {
  interaction, layer, custom, control, //name spaces
  Interactions, Overlays, Controls,     //group
  Map, Layers, Overlay, Util    //objects
} from "react-openlayers";

import Highlighter from "../Highlighter";

console.log({
  ol,
  Point,
  Map
});

var iconFeature = new Feature(new Point([0, 0]));
var source = new VectorSource({features: [iconFeature]});
var marker = new custom.style.MarkerStyle(
  'https://openlayers.org/en/v4.0.1/examples/data/icon.png'
);

export class Vector extends React.Component<any,any> {
  render(){
    return (
      <div>
        <Map>
          <Layers>
            <layer.Tile/>
            <layer.Vector source={source} style={marker.style} zIndex={1}/>
          </Layers>
        </Map>
        <a href="https://github.com/allenhwkim/react-openlayers/blob/master/app/layers/vector.tsx">Source Code</a>
        <Highlighter lang="jsx" code={
`<Map>
  <Layers>
    <layer.Tile/>
    <layer.Vector source={source} style={marker.style} zIndex="1"/>
  </Layers>
</Map>`
        } />
      </div>
    );
  }
}