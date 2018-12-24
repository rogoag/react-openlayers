import * as React from "react";
import * as ReactDOM from "react-dom";

import {
  interaction, layer, custom, control, //name spaces
  Interactions, Overlays, Controls,     //group
  Map, Layers, Overlay, Util    //objects
} from "react-openlayers";

import Highlighter from "../Highlighter";

export class DragRotateAndZoom extends React.Component<any, any> {
  render() {
    return (
      <div>
        <p>Use <code>SHIFT + Drag</code> to rotate the map. Combines <code>DragRotate</code> and <code>DragZoom</code>.</p>
        <Map view={{ center: [0, 0], zoom: 2 }}>
          <Layers>
            <layer.Tile />
          </Layers>
          <Interactions >
            <interaction.DragRotateAndZoom />
          </Interactions>
        </Map>
        <Highlighter lang="jsx" code={
`<Map view={{ center: [0, 0], zoom: 2 }}>
  <Layers>
    <layer.Tile />
  </Layers>
  <Interactions >
    <interaction.DragRotateAndZoom />
  </Interactions>
</Map>`
        } />
        <a href="https://github.com/allenhwkim/react-openlayers/blob/master/app/interactions/drag-rotate-and-zoom.tsx">source</a>
      </div>
    );
  }
}