import * as React from "react";

import { Divider, Typography } from "@material-ui/core";

import {
  control, Controls, layer, Layers, MapReact
} from "react-openlayers";

import Highlighter from "../Highlighter";

export class ScaleLine extends React.Component {
  public render() {
    return (
      <div>
        <Typography variant="h4" paragraph>ScaleLine control</Typography>
        <MapReact>
          <Layers><layer.TileReact/></Layers>
          <Controls>
            <control.ScaleLineReact />
          </Controls>
        </MapReact>
        <br/>
        <Divider />
        <br/>
        <Highlighter lang="jsx" code={
`<Map>
  <Layers><layer.Tile/></Layers>
  <Controls>
    <control.ScaleLine />
  </Controls>
</Map>`
        } />
        <a href="https://github.com/allenhwkim/react-openlayers/blob/master/app/controls/scale-line.tsx">source</a>
      </div>
    );
  }
}