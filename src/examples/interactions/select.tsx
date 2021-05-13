import * as React from "react";

import { Divider, Typography } from "@material-ui/core";


import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';


import { custom, interaction, Interactions, layer, Layers, MapReact, Util, source } from "react-openlayers";

import Highlighter from "../Highlighter";

const iconFeature = new Feature(new Point([0, 0]));
const marker = new custom.style.MarkerStyle(
  'https://openlayers.org/en/v4.6.5/examples/data/icon.png'
);
marker.style.getImage().setOpacity(0.5);

const selectedMarkerStyle = Util.cloneStyle(marker.style);
selectedMarkerStyle.getImage().setScale(4);

export class Select extends React.Component {
  public render() {
    return (
      <div>
        <Typography variant="h4" paragraph>Select interaction</Typography>
        <MapReact>
          <Layers>
            <layer.TileReact />
            <layer.Vector style={marker.style}>
              <source.VectorSourceReact features={[iconFeature]} />
            </layer.Vector>
          </Layers>
          <Interactions>
            <interaction.SelectReact style={selectedMarkerStyle} />
          </Interactions>
        </MapReact>
        <br/>
        <Divider />
        <br/>
        <Highlighter lang="jsx"  code={
`<Map>
  <Layers>
    <layer.Tile />
    <layer.Vector source={markers} style={markers.style} />
  </Layers>
  <Interactions>
    <interaction.Select style={selectedMarkerStyle} />
  </Interactions>
</Map>`
        } />
        <a href="https://github.com/allenhwkim/react-openlayers/blob/master/app/interactions/select.tsx">source</a>
      </div>
    );
  }
}