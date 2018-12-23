import * as React from "react";
import * as ReactDOM from "react-dom";

import olEventConditions from 'ol/events/condition';

import {
  interaction, layer, custom, control, //name spaces
  Interactions, Overlays, Controls,     //group
  Map, Layers, Overlay, Util    //objects
} from "react-openlayers";

export class DragZoom extends React.Component<any, any> {
  render() {
    return (
      <div>
        <p>This example have disabled default <code>DragZoom</code> interaction using <code>ALT + SHIFT + Drag</code>, but it implements one that force you to use <code>CTRL + Drag</code> to select an area to zoom!</p>
        <Map view={{ center: [0, 0], zoom: 2 }}>
          <Layers>
            <layer.Tile />
          </Layers>
          <Interactions shiftDragZoom={false}>
            <interaction.DragZoom
              condition={olEventConditions.platformModifierKeyOnly}
            />
          </Interactions>
        </Map>
      </div>
    );
  }
}