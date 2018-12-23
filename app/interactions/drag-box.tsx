import * as React from "react";
import * as ReactDOM from "react-dom";

import olEventConditions from 'ol/events/condition';
import olSelect from 'ol/interaction/select';
import VectorSource from 'ol/source/vector';
import GeoJSONFormat from 'ol/format/geojson';

import {
  interaction, layer, custom, control, //name spaces
  Interactions, Overlays, Controls,     //group
  Map, Layers, Overlay, Util    //objects
} from "react-openlayers";

export class DragBox extends React.Component<any, any> {
  state = {
    selectedFeatures: null
  }

  select: olSelect = null;
  
  source = new VectorSource({
    url: 'https://openlayers.org/en/v4.6.5/examples/data/geojson/countries.geojson',
    format: new GeoJSONFormat()
  })

  constructor(props) {
    super(props);
    this.select = new olSelect();
    this.state.selectedFeatures = this.select.getFeatures();
  }

  clearSelectedFeatures = () => {
    const sf = this.state.selectedFeatures;
    sf.clear()
    this.setState({ selectedFeatures: sf })
  }

  handleBoxEnd = event => {
    var extent = event.target.getGeometry().getExtent();
    const selectedFeatures = this.state.selectedFeatures;
    this.source.forEachFeatureIntersectingExtent(extent, function(feature) {
      selectedFeatures.push(feature);
    });
    this.setState({ selectedFeatures })
  }

  handleDeselect = e => {
    if (e.deselected.length > 0)
      this.clearSelectedFeatures();
  }

  render() {
    return (
      <div>
        <p>Use <code>CTRL + Drag</code> to select an area</p>
        <Map view={{ center: [0, 0], zoom: 2 }}>
          <Layers>
            <layer.Tile />
            <layer.Vector source={this.source} />
          </Layers>
          <Controls>
            <interaction.Select instance={this.select} onSelect={this.handleDeselect}/>
            <interaction.DragBox
              condition={olEventConditions.platformModifierKeyOnly}
              onBoxstart={this.clearSelectedFeatures}
              onBoxend={this.handleBoxEnd}
              />
          </Controls>
        </Map>
        <p>{this.state.selectedFeatures.length === 0 ? "No selected countries" : this.state.selectedFeatures.getArray().map(f => f.get('name')).join(', ')}</p>
        <a href="https://github.com/allenhwkim/react-openlayers/blob/master/app/interactions/drag-and-drop.tsx">source</a>
        <pre>{`
        <Map view={{ center: [0, 0], zoom: 2 }}>
          <Layers>
            <layer.Tile />
            <layer.Vector source={this.source} />
          </Layers>
          <Controls>
            <interaction.Select instance={this.select} onSelect={this.handleDeselect}/>
            <interaction.DragBox
              condition={olEventConditions.platformModifierKeyOnly}
              onBoxstart={this.clearSelectedFeatures}
              onBoxend={this.handleBoxEnd}
              />
          </Controls>
        </Map>
        <p>{this.state.selectedFeatures.length === 0 ? "No selected countries" : this.state.selectedFeatures.getArray().map(f => f.get('name')).join(', ')}</p>
        `}</pre>
      </div>
    );
  }
}