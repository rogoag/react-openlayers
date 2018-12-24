import * as React from "react";
import * as ReactDOM from "react-dom";

import StamenSource from 'ol/source/stamen';
import VectorSource from 'ol/source/vector';
import KMLFormat from 'ol/format/kml';

import {
  interaction, layer, custom, control, //name spaces
  Interactions, Overlays, Controls,     //group
  Map, Layers, Overlay, Util    //objects
} from "react-openlayers";

import Highlighter from "../Highlighter";

let tileSource = new StamenSource({
  layer: 'toner'
});

let heatmapSource = new VectorSource({
  url: 'http://openlayers.org/en/latest/examples/data/kml/2012_Earthquakes_Mag5.kml',
  format: new KMLFormat({
    extractStyles: false
  })
});

export class Heatmap extends React.Component<any,any> {
  render(){
    return (
      <div>
        <Map view={{center:[0,0], zoom:1}}>
          <Layers>
            <layer.Tile source={tileSource} />
            <layer.Heatmap source={heatmapSource} blur={15} radius={5} />
          </Layers>
        </Map>
        <Highlighter lang="jsx"  code={
`<Map center={[0,0]} view={{center:[0,0], zoom:1}}>
  <Layers>
    <layer.Tile source={tileSource} />
    <layer.Heatmap source={heatmapSource} blur={15} radius={5} />
  </Layers>
</Map>`
        } />
        <a href="https://github.com/allenhwkim/react-openlayers/blob/master/app/layers/heatmap.tsx">source</a>
      </div>
    );
  }
}