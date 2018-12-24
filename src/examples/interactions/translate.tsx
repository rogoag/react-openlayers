import * as React from "react";

import { Typography, Divider } from "@material-ui/core";

import VectorSource from 'ol/source/vector';
import GeoJSONFormat from 'ol/format/geojson';
import Style from 'ol/style/style';
import CircleStyle from 'ol/style/circle';
import FillStyle from 'ol/style/fill';
import StrokeStyle from 'ol/style/stroke';
import SelectInteraction from 'ol/interaction/select';

import {
  interaction, layer, custom, control, //name spaces
  Interactions, Overlays, Controls,     //group
  Map, Layers, Overlay, Util    //objects
} from "react-openlayers";

import Highlighter from "../Highlighter";

var source = new VectorSource({
  url: 'https://rawgit.com/boundlessgeo/ol3-workshop/master/src/data/layers/7day-M2.5.json',
  format: new GeoJSONFormat()
});
var style = new Style({
  image: new CircleStyle({
    radius: 7,
    fill: new FillStyle({ color: [0, 153, 255, 1] }),
    stroke: new StrokeStyle({ color: [255, 255, 255, 0.75], width: 1.5 })
  }),
  zIndex: 100000
});

export class Translate extends React.Component<any, any> {
  render() {
    return (
      <div>
        <Typography variant="h4" paragraph>Translate interaction</Typography>
        <Typography variant="subtitle1">Try to drag a <code>Point</code>!</Typography>
        <Map>
          <Layers>
            <layer.Tile />
            <layer.Vector source={source} style={style} />
          </Layers>
          <Interactions>
            <interaction.Translate  /> 
          </Interactions>
        </Map>
        <br/>
        <Divider />
        <br/>
        <Highlighter lang="jsx" code={
`<Map>
  <Layers>
    <layer.Tile />
    <layer.Vector source={source} style={style} />
  </Layers>
  <Interactions>
    <interaction.Translate  /> 
  </Interactions>
</Map>`
        } />
        <a href="https://github.com/allenhwkim/react-openlayers/blob/master/app/interactions/translate.tsx">source</a>
      </div>
    );
  }
}