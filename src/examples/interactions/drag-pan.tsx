import * as React from "react";

import { Divider, Typography } from "@material-ui/core";

import { Interactions, layer, Layers, MapReact } from "react-openlayers";

import Highlighter from "../Highlighter";

export class DragPan extends React.Component {
  public render() {
    return (
      <div>
        <Typography variant="h4" paragraph>DragPan interaction</Typography>
        <Typography variant="subtitle1">This example have disabled default DragPan interaction, but it implements one that force you to use <code>CTRL + Drag</code> to move around.</Typography>
        <MapReact view={{ center: [0, 0], zoom: 2 }}>
          <Layers>
            <layer.TileReact />
          </Layers>
          <Interactions dragPan={true}>
          </Interactions>
        </MapReact>
        <br/>
        <Divider />
        <br/>
        <Highlighter lang="jsx" code={
`<Map view={{ center: [0, 0], zoom: 2 }}>
  <Layers>
    <layer.Tile />
  </Layers>
  <Interactions dragPan={false}>
    <interaction.DragPan
      condition={platformModifierKeyOnly}
    />
  </Interactions>
</Map>`
        } />
        <a href="https://github.com/allenhwkim/react-openlayers/blob/master/app/interactions/drag-pan.tsx">source</a>
      </div>
    );
  }
}