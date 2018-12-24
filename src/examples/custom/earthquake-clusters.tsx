import * as React from "react";
import * as ReactDOM from "react-dom";

import ClusterSource from 'ol/source/cluster';
import VectorSource from 'ol/source/vector';
import StamenSource from 'ol/source/stamen';
import KMLFormat from 'ol/format/kml';

import {
  interaction, layer, custom, control, //name spaces
  Interactions, Overlays, Controls,     //group
  Map, Layers, Overlay, Util    //objects
} from "react-openlayers";

import Highlighter from "../Highlighter";

var vectorSource= new ClusterSource({
  distance: 40,
  source: new VectorSource({
    url: 'http://openlayers.org/en/latest/examples/data/kml/2012_Earthquakes_Mag5.kml',
    format: new KMLFormat({
      extractStyles: false
    })
  })
});

var tileSource = new StamenSource({
  layer: 'toner'
});

var selectCondition = function(evt) {
  return evt.originalEvent.type == 'mousemove' ||
    evt.type == 'singleclick';
};

var cluster = new custom.style.ClusterStyle(vectorSource);

export class EarthquakeClusters extends React.Component<any,any> {
  render(){
    return (
      <div>
        <p>This example parses a KML file and renders the features as clusters on a vector layer. The styling in this example is quite involved. Single earthquake locations (rendered as stars) have a size relative to their magnitude. Clusters have an opacity relative to the number of features in the cluster, and a size that represents the extent of the features that make up the cluster. When clicking or hovering on a cluster, the individual features that make up the cluster will be shown.
        To achieve this, we make heavy use of style functions and <code>ol.style.Style#geometry.</code></p>
        <Map view={{center: [0,0], zoom:2}}>
          <Interactions>
            <interaction.Select
             condition={selectCondition} 
             style={cluster.selectStyleFunction} />
          </Interactions>
          <Layers>
            <layer.Tile source={tileSource}/>
            <layer.Vector 
              source={vectorSource} 
              style={cluster.vectorStyleFunction}/>
          </Layers>
        </Map>
        <Highlighter lang="jsx" code={
`<Map view={{center: [0,0], zoom:2}}>
  <Interactions>
    <interaction.Select
      condition={selectCondition} 
      style={cluster.selectStyleFunction} />
  </Interactions>
  <Layers>
    <layer.Tile source={tileSource}/>
    <layer.Vector 
      source={vectorSource} 
      style={cluster.vectorStyleFunction}/>
  </Layers>
</Map>`
        } />
        <a href="https://github.com/allenhwkim/react-openlayers/blob/master/app/custom/earthquake-clusters.tsx">source</a>
      </div>
    );
  }
}