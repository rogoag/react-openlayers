import * as React from "react";

import { Typography, Divider } from "@material-ui/core";

import VectorTileSource from 'ol/source/vectortile';
import MVTFormat from 'ol/format/mvt';
import olTilegrid from 'ol/tilegrid';

import {
  interaction, layer, custom, control, //name spaces
  Interactions, Overlays, Controls,     //group
  Map, Layers, Overlay, Util    //objects
} from "react-openlayers";

import Highlighter from "../Highlighter";

import {createMapboxStreetsV6Style} from './mapbox-streets-v6-style';

var key = 'pk.eyJ1IjoiYWxsZW5od2tpbSIsImEiOiJjajBlbzkzazYwMWh1Mndya3R2amw0ang1In0.QU0YtPQ0-IgHMLt574HGlw';
var source = new VectorTileSource({
  projection: undefined,
  attributions: '© <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> ' +
    '© <a href="https://www.openstreetmap.org/copyright">' +
    'OpenStreetMap contributors</a>',
  format: new MVTFormat(),
  tileGrid: olTilegrid.createXYZ({maxZoom: 22}),
  // tilePixelRatio: 16,
  url: 'https://{a-d}.tiles.mapbox.com/v4/mapbox.mapbox-streets-v6/' +
      '{z}/{x}/{y}.vector.pbf?access_token=' + key
});

export class VectorTile extends React.Component<any,any> {
  render(){
    let style = createMapboxStreetsV6Style();
    return (
      <div>
        <Typography variant="h4" paragraph>Vector Tile layer</Typography>
        <Map view={{center: [0,0], zoom:2}}>
          <Layers>
            <layer.VectorTile source={source} style={createMapboxStreetsV6Style()} />
          </Layers>
        </Map>
        <br/>
        <Divider />
        <br/>
        <Highlighter lang="jsx" code={
`<Map view={{center: [0,0], zoom:2}}>
  <Layers>
    <layer.VectorTile source={source} style={createMapboxStreetsV6Style()} />
  </Layers>
`
        } />
        <a href="https://github.com/allenhwkim/react-openlayers/blob/master/app/layers/vector-tile.tsx">Source Code</a>
      </div>
    );
  }
}

