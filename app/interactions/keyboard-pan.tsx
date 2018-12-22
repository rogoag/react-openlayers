import * as React from "react";
import * as ReactDOM from "react-dom";
import ol from 'ol';
import {
  interaction, layer, custom, control, //name spaces
  Interactions, Overlays, Controls,     //group
  Map, Layers, Overlay, Util    //objects
} from "react-openlayers";

export class KeyboardPan extends React.Component<any, any> {
  render() {
    return (
      <div className="todo">
        TODO: Coming Soon(PR would be highly appreciated)
      </div>
    );
  }
}