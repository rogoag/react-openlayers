import * as React from "react";
import * as ReactDOM from "react-dom";
import ol from 'ol';
import {
  interaction, layer, custom, control, //name spaces
  Interactions, Overlays, Controls,     //group
  Map, Layers, Overlay, Util    //objects
} from "react-openlayers";

import Highlighter from "../Highlighter";

export class Attribution extends React.Component<any, any> {
  render() {
    return (
      <div>
        <Map>
          <Layers><layer.Tile /></Layers>
          <Controls attribution={false} zoom={false}></Controls>
        </Map>
        <a href="https://github.com/allenhwkim/react-openlayers/blob/master/app/controls/attribution.tsx">source</a>
        <Highlighter lang="jsx" code={
`<Map>
  <Layers><layer.Tile/></Layers>
  <Controls attribution={false} zoom={false}></Controls>
</Map>`
        } />
      </div>
    );
  }
}