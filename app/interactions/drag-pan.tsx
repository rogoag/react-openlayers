import * as React from "react";
import * as ReactDOM from "react-dom";

import {
  interaction, layer, custom, control, //name spaces
  Interactions, Overlays, Controls,     //group
  Map, Layers, Overlay, Util    //objects
} from "react-openlayers";

export class DragPan extends React.Component<any, any> {
  render() {
    return (
      <div>
        <Map view={{ center: [0, 0], zoom: 2 }}>
          <Layers>
            <layer.Tile />
          </Layers>
          <Interactions >
            <interaction.DragPan />
          </Interactions>
        </Map>
      </div>
    );
  }
}