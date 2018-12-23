import * as React from "react";
import * as ReactDOM from "react-dom";

import olEventConditions from 'ol/events/condition';

import {
  interaction, layer, custom, control, //name spaces
  Interactions, Overlays, Controls,     //group
  Map, Layers, Overlay, Util    //objects
} from "react-openlayers";

export class DragPan extends React.Component<any, any> {
  render() {
    return (
      <div>
        <p>This example have disabled default DragPan interaction, but it implements one that force you to use <code>CTRL + Drag</code> to move around!</p>
        <Map view={{ center: [0, 0], zoom: 2 }}>
          <Layers>
            <layer.Tile />
          </Layers>
          <Interactions dragPan={false}>
            <interaction.DragPan
              condition={olEventConditions.platformModifierKeyOnly}
            />
          </Interactions>
        </Map>
        <a href="https://github.com/allenhwkim/react-openlayers/blob/master/app/interactions/drag-pan.tsx">source</a>
        <pre>{`
        <Map view={{ center: [0, 0], zoom: 2 }}>
          <Layers>
            <layer.Tile />
          </Layers>
          <Interactions dragPan={false}>
            <interaction.DragPan
              condition={olEventConditions.platformModifierKeyOnly}
            />
          </Interactions>
        </Map>
        `}</pre>
      </div>
    );
  }
}