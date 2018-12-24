import * as React from "react";
import * as ReactDOM from "react-dom";

import {
  interaction, layer, custom, control, //name spaces
  Interactions, Overlays, Controls,     //group
  Map, Layers, Overlay, Util    //objects
} from "react-openlayers";

import Highlighter from "../Highlighter";

export class PinchZoom extends React.Component<any, any> {
  render() {
    return (
      <div>
        <p>This example have disabled default <code>PinchZoom</code> interaction to provide one that zoom to the closest integer zoom level after gesture ends.</p>
        <Map view={{ center: [0, 0], zoom: 2 }}>
          <Layers>
            <layer.Tile />
          </Layers>
          <Interactions pinchRotate={false} pinchZoom={false}>
            <interaction.PinchZoom constrainResolution={true}/>
          </Interactions>
        </Map>
        <Highlighter lang="jsx" code={
`<Map view={{ center: [0, 0], zoom: 2 }}>
  <Layers>
    <layer.Tile />
  </Layers>
  <Interactions pinchRotate={false} pinchZoom={false}>
    <interaction.PinchZoom constrainResolution={true}/>
  </Interactions>
</Map>`
        } />
        <a href="https://github.com/allenhwkim/react-openlayers/blob/master/app/interactions/pinch-zoom.tsx">source</a>
      </div>
    );
  }
}