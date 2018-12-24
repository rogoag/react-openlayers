import * as React from "react";

import { Typography, Divider } from "@material-ui/core";

import olEventConditions from 'ol/events/condition';

import {
  interaction, layer, custom, control, //name spaces
  Interactions, Overlays, Controls,     //group
  Map, Layers, Overlay, Util    //objects
} from "react-openlayers";

import Highlighter from "../Highlighter";

export class KeyboardZoom extends React.Component<any, any> {
  render() {
    return (
      <div>
        <Typography variant="h4" paragraph>KeyboardZoom interaction</Typography>
        <Typography variant="subtitle1">This example have disabled default <code>KeyboardZoom</code> interaction which use + and - keys, but it implements one that force you to use <code>SHIFT + [+ | -]</code> to zoom the map.</Typography>
        <Map view={{ center: [0, 0], zoom: 2 }}>
          <Layers>
            <layer.Tile />
          </Layers>
          <Interactions keyboard={false}>
            <interaction.KeyboardPan />
            <interaction.KeyboardZoom
              condition={olEventConditions.shiftKeyOnly}
            />
          </Interactions>
        </Map>
        <br/>
        <Divider />
        <br/>
        <Highlighter lang="jsx" code={
`<Map view={{ center: [0, 0], zoom: 2 }}>
  <Layers>
    <layer.Tile />
  </Layers>
  <Interactions keyboard={false}>
    <interaction.KeyboardPan />
    <interaction.KeyboardZoom
      condition={olEventConditions.shiftKeyOnly}
    />
  </Interactions>
</Map>`
        } />
        <a href="https://github.com/allenhwkim/react-openlayers/blob/master/app/interactions/keyboard-zoom.tsx">source</a>
      </div>
    );
  }
}