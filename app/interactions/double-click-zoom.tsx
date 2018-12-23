import * as React from "react";
import * as ReactDOM from "react-dom";

import {
  interaction, layer, custom, control, //name spaces
  Interactions, Overlays, Controls,     //group
  Map, Layers, Overlay, Util    //objects
} from "react-openlayers";

export class DoubleClickZoom extends React.Component<any, any> {
  render() {
    return (
      <div>
        <Map>
          <Layers>
            <layer.Tile />
          </Layers>
          <Interactions>
            <interaction.DoubleClickZoom />
          </Interactions>
        </Map>
        <a href="https://github.com/allenhwkim/react-openlayers/blob/master/app/interactions/double-click-zoom.tsx">source</a>
        <pre>{`
          <Map>
            <Layers>
              <layer.Tile />
            </Layers>
            <Controls>
              <interaction.DoubleClickZoom />
            </Controls>
          </Map>
        `}</pre>
      </div>
    );
  }
}