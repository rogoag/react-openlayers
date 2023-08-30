import * as React from "react";

import { Divider, Typography } from "@material-ui/core";

import GeoJSONFormat from 'ol/format/GeoJSON';
import VectorSource from 'ol/source/Vector';
import CircleStyle from 'ol/style/Circle';
import FillStyle from 'ol/style/Fill';
import StrokeStyle from 'ol/style/Stroke';
import Style from 'ol/style/Style';

import {interaction, Interactions, layer, Layers, MapReact } from "react-openlayers";

import Highlighter from "../Highlighter";

const source = new VectorSource({
  url: 'https://rawgit.com/boundlessgeo/ol3-workshop/master/src/data/layers/7day-M2.5.json',
  format: new GeoJSONFormat()
});
const style = new Style({
  image: new CircleStyle({
    radius: 7,
    fill: new FillStyle({ color: [0, 153, 255, 1] }),
    stroke: new StrokeStyle({ color: [255, 255, 255, 0.75], width: 1.5 })
  }),
  zIndex: 100000
});

export class Translate extends React.Component {
  public render() {
    return (
      <div>
        <Typography variant="h4" paragraph>Translate interaction</Typography>
        <Typography variant="subtitle1">Try to drag a <code>Point</code>!</Typography>
        <MapReact>
          <Layers>
            <layer.TileReact />
            <layer.Vector source={source} style={style} />
          </Layers>
          <Interactions>
            <interaction.TranslateReact  /> 
          </Interactions>
        </MapReact>
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