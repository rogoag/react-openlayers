import * as React from "react";

import { Divider, Typography } from "@material-ui/core";

import {
  Controls, //name spaces
  layer, Layers, //group
  MapReact //objects
} from "react-openlayers";

import Highlighter from "../Highlighter";

export class Attribution extends React.Component {
  public render() {
    return (
      <div>
        <Typography variant="h4" paragraph>Attribution control</Typography>
        <MapReact>
          <Layers><layer.Vector /></Layers>
          <Controls attribution={false} zoom={false}></Controls>
        </MapReact>
        <br />
        <Divider />
        <br />
        <Highlighter lang="jsx" code={
`<Map>
  <Layers><layer.Tile/></Layers>
  <Controls attribution={false} zoom={false}></Controls>
</Map>`
        } />
        <a href="https://github.com/allenhwkim/react-openlayers/blob/master/app/controls/attribution.tsx">source</a>
      </div>
    );
  }
}