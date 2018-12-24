import * as React from "react";

import { Typography, Divider } from "@material-ui/core";

import {
  interaction, layer, custom, control, //name spaces
  Interactions, Overlays, Controls,     //group
  Map, Layers, Overlay, Util    //objects
} from "react-openlayers";

import Highlighter from "../Highlighter";

export class Rotate extends React.Component<any,any> {
  render(){
    return (
      <div>
        <Typography variant="h4" paragraph>Rotate control</Typography>
        <p>Use Alt+Shift+Drag to rotate the map.</p>
        <Map>
          <Layers><layer.Tile/></Layers>
          <Controls>
            <control.Rotate />
          </Controls>
        </Map>
        <br/>
        <Divider />
        <br/>
        <Highlighter lang="jsx" code={
`<Map>
  <Layers><layer.Tile/></Layers>
  <Controls>
    <control.Rotate />
  </Controls>
</Map>`
        } />
        <a href="https://github.com/allenhwkim/react-openlayers/blob/master/app/controls/rotate.tsx">source</a>
      </div>
    );
  }
}