import * as React from "react";

import { Select, MenuItem, Divider, FormControl, InputLabel, Typography } from "@material-ui/core";

import OSMSource from 'ol/source/osm';
import VectorSource from 'ol/source/vector';

import {
  interaction, layer, custom, control, //name spaces
  Interactions, Overlays, Controls,     //group
  Map, Layers, Overlay, Util    //objects
} from "react-openlayers";

import Highlighter from "../Highlighter";

var rasterTile = new OSMSource();

var vectorSource = new VectorSource({wrapX: false});

export class Draw extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      view: {
        zoom: 4,
        center: [-11000000, 4600000],
      },
      interactionType: 'Circle',
    };
  }

  render() {
    return (
      <div>
        <Typography variant="h4" paragraph>Draw interaction</Typography>
        <Map view={this.state.view}>
          <Layers>
            <layer.Tile source={rasterTile} />
            <layer.Vector source={vectorSource} />
          </Layers>
          <Interactions>
            <interaction.Draw
              source={vectorSource}
              type={this.state.interactionType} />
          </Interactions>
        </Map>
        <br/>
        <FormControl>
          <InputLabel>Type</InputLabel>
          <Select
            onChange={(event) => this.setState({interactionType: event.target.value})}
            value={this.state.interactionType}
          >
            <MenuItem value="Point">Point</MenuItem>
            <MenuItem value="Polygon">Polygon</MenuItem>
            <MenuItem value="Line">Line</MenuItem>
            <MenuItem value="Circle">Circle</MenuItem>
          </Select>
        </FormControl>
        <br/>
        <br/>
        <Divider />
        <br/>
        <Highlighter lang="jsx"  code={
`<Map view={this.state.view}>
  <Layers>
    <layer.Tile source={rasterTile} />
    <layer.Vector source={vectorSource} />
  </Layers>
  <Interactions>
    <interaction.Draw
      onDrawend={this.drawend}
      source={vectorSource}
      type={this.state.interactionType} />
  </Interactions>
</Map>`
        } />
        <a href="https://github.com/allenhwkim/react-openlayers/blob/master/app/interactions/draw.tsx">source</a>
      </div>
    );
  }
}
