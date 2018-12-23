import * as React from "react";
import * as ReactDOM from "react-dom";

import {
  interaction, layer, custom, control, //name spaces
  Interactions, Overlays, Controls,     //group
  Map, Layers, Overlay, Util    //objects
} from "react-openlayers";

import Highlighter from "../Highlighter";

export class MouseWheelZoom extends React.Component<any, any> {
  render() {
    return (
      <div>
        <p>This example have disabled default <code>MouseWheel</code> interaction, and replace it with a customized one having a logner duration for a slower zoom.</p>
        <Map view={{ center: [0, 0], zoom: 2 }}>
          <Layers>
            <layer.Tile />
          </Layers>
          <Interactions mouseWheelZoom={false}>
            <interaction.MouseWheelZoom
              duration={2000}
            />
          </Interactions>
        </Map>
        <Highlighter lang="jsx" code={
`<Map view={{ center: [0, 0], zoom: 2 }}>
  <Layers>
    <layer.Tile />
  </Layers>
  <Interactions mouseWheelZoom={false}>
    <interaction.MouseWheelZoom
      duration={2000}
    />
  </Interactions>
</Map>`
        } />
        <a href="https://github.com/allenhwkim/react-openlayers/blob/master/app/interactions/mouse-wheel-zoom.tsx">source</a>
      </div>
    );
  }
}