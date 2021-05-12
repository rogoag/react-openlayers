import * as React from "react";

import { Divider, Typography } from "@material-ui/core";

import {
  control, Controls, layer, Layers, MapReact
} from "react-openlayers";

import Highlighter from "../Highlighter";
import XYZ from "ol/source/XYZ";

export class Zoom extends React.Component {
  public render() {
    const vectorSource = new XYZ({
      attributions: '© Google',
      url: 'https://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}&s=Ga'
    });
    return (
      <div>
        <Typography variant="h4" paragraph>Zoom control</Typography>
        <MapReact>
          <Layers><layer.TileReact source={vectorSource} /></Layers>
          <Controls>
            <control.ZoomReact />
          </Controls>
        </MapReact>
        <br/>
        <Divider />
        <br/>
        <Highlighter lang="jsx" code={
`<Map>
  <Layers><layer.Tile/></Layers>
  <Controls>
    <control.Zoom />
  </Controls>
</Map>`
        } />
        <a href="https://github.com/allenhwkim/react-openlayers/blob/master/app/controls/zoom.tsx">source</a>
      </div>
    );
  }
}