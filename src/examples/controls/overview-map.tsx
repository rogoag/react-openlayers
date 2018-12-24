import * as React from "react";

import { Typography, Divider } from "@material-ui/core";

import {
  interaction, layer, custom, control, //name spaces
  Interactions, Overlays, Controls,     //group
  Map, Layers, Overlay, Util    //objects
} from "react-openlayers";

import Highlighter from "../Highlighter";

export class OverviewMap extends React.Component<any,any> {
  render(){
    return (
      <div>
        <Typography variant="h4" paragraph>OverviewMap control</Typography>
        <Map>
          <Layers><layer.Tile/></Layers>
          <Controls>
            <control.OverviewMap />
          </Controls>
        </Map>
        <br/>
        <Divider />
        <br/>
        <Highlighter lang="jsx" code={
`<Map>
  <Layers><layer.Tile/></Layers>
  <Controls>
    <control.OverviewMap />
  </Controls>
</Map>`
        } />
        <a href="https://github.com/allenhwkim/react-openlayers/blob/master/app/controls/overview-map.tsx">source</a>
      </div>
    );
  }
}