import * as React from "react";

import { Typography, Divider } from "@material-ui/core";

import {
  interaction, layer, custom, control, //name spaces
  Interactions, Overlays, Controls,     //group
  Map, Layers, Overlay, Util    //objects
} from "react-openlayers";

import Highlighter from "../Highlighter";

export class DoubleClickZoom extends React.Component<any, any> {
  render() {
    return (
      <div>
        <Typography variant="h4" paragraph>DoubleClickZoom interaction</Typography>
        <Map>
          <Layers>
            <layer.Tile />
          </Layers>
          <Interactions doubleClickZoom={false}>
            <interaction.DoubleClickZoom />
          </Interactions>
        </Map>
        <br/>
        <Divider />
        <br/>
        <Highlighter lang="jsx"  code={
`<Map>
  <Layers>
    <layer.Tile />
  </Layers>
  <Controls>
    <interaction.DoubleClickZoom />
  </Controls>
</Map>`
        } />
        <a href="https://github.com/allenhwkim/react-openlayers/blob/master/app/interactions/double-click-zoom.tsx">source</a>
      </div>
    );
  }
}