import * as React from "react";
import * as ReactDOM from "react-dom";

import ol from 'ol';
import StamenSource from 'ol/source/stamen';

import {
  interaction, layer, custom, control, //name spaces
  Interactions, Overlays, Controls,     //group
  Map, Layers, Overlay, Util    //objects
} from "react-openlayers";

export class Tile extends React.Component<any,any> {
  render(){
    return (
      <div>
        <Map>
          <Layers>
            <layer.Tile source={new StamenSource({ layer: 'watercolor' })}/>
          </Layers>
        </Map>
        <a href="https://github.com/allenhwkim/react-openlayers/blob/master/app/layers/tile.tsx">Source Code</a>
        <pre>{`
        <Map>
          <Layers>
            <layer.Tile source={new StamenSource({ layer: 'watercolor' })}/>
          </Layers>
        </Map>
        `}</pre>
      </div>
    );
  }
}