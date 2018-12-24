import * as React from "react";

import { Typography, Divider } from "@material-ui/core";

import {
  interaction, layer, custom, control, //name spaces
  Interactions, Overlays, Controls,     //group
  Map, Layers, Overlay, Util    //objects
} from "react-openlayers";

import Highlighter from "../Highlighter";

export class PinchRotate extends React.Component<any, any> {
  render() {
    return (
      <div>
        <Typography variant="h4" paragraph>PinchRotate interaction</Typography>
        <Typography variant="subtitle1">This example have disabled default <code>PinchRotate</code> interaction to provide one that require a minimum of 30deg rotation before rotating the view.</Typography>
        <Map view={{ center: [0, 0], zoom: 2 }}>
          <Layers>
            <layer.Tile />
          </Layers>
          <Interactions pinchRotate={false} pinchZoom={false}>
            <interaction.PinchRotate threshold={30 * Math.PI / 180}/>
          </Interactions>
        </Map>
        <br/>
        <Divider />
        <br/>
        <Highlighter lang="jsx" code={
`<Map view={{ center: [0, 0], zoom: 2 }}>
  <Layers>
    <layer.Tile />
  </Layers>
  <Interactions pinchRotate={false} pinchZoom={false}>
    <interaction.PinchRotate threshold={30 * Math.PI / 180}/>
  </Interactions>
</Map>`
        } />
        <a href="https://github.com/allenhwkim/react-openlayers/blob/master/app/interactions/pinch-rotate.tsx">source</a>
      </div>
    );
  }
}