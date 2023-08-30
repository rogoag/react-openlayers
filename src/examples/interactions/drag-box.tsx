import * as React from "react";

import { Divider, Typography } from "@material-ui/core";

import EventConditions from 'ol/events/condition';
import Collection from 'ol/Collection';
import Feature from 'ol/Feature';
import GeoJSONFormat from 'ol/format/GeoJSON';
import Select from 'ol/interaction/Select';
import VectorSource from 'ol/source/Vector';
import { DragBoxEvent } from 'ol/interaction/DragBox';
import { SelectEvent } from 'ol/interaction/Select';
import { interaction, Interactions, layer, Layers, MapReact } from "react-openlayers";

import Highlighter from "../Highlighter";

interface DragBoxState {
  selectedFeatures: Collection<Feature> | void
}

export class DragBox extends React.Component<{}, DragBoxState> {
  public state: DragBoxState = {
    selectedFeatures: undefined
  }

  public select: Select;
  
  public source: VectorSource = new VectorSource({
    url: 'https://openlayers.org/en/v4.6.5/examples/data/geojson/countries.geojson',
    format: new GeoJSONFormat()
  })

  constructor(props: {}) {
    super(props);
    this.select = new Select();
    this.state.selectedFeatures = this.select.getFeatures();
  }

  public clearSelectedFeatures = () => {
    if (this.state.selectedFeatures) {
      this.state.selectedFeatures.clear();
    }
  }

  public handleBoxEnd = (event: DragBoxEvent) => {
    const extent = event.target.getGeometry().getExtent();
    const selectedFeatures = this.state.selectedFeatures;
    this.source.forEachFeatureIntersectingExtent(extent, (feature: Feature) => {
      if (selectedFeatures) {
        selectedFeatures.push(feature);
      }
    });
    this.setState({ selectedFeatures })
  }

  public handleDeselect = (event: SelectEvent) => {
    if (event.deselected.length > 0) {
      this.clearSelectedFeatures();
      this.setState({ ...this.state, selectedFeatures: this.state.selectedFeatures})
    }
  }

  public render() {
    return (
      <div>
        <Typography variant="h4" paragraph>DragBox interaction</Typography>
        <br/>
        <Typography variant="subtitle2">
          Use <code>CTRL + Drag</code> to select an area
        </Typography>
        <MapReact view={{ center: [0, 0], zoom: 2 }}>
          <Layers>
            <layer.TileReact />
            <layer.Vector source={this.source} />
          </Layers>
          <Interactions>
            <interaction.SelectReact instance={this.select} onSelect={this.handleDeselect}/>
            <interaction.DragBoxReact
              condition={EventConditions.platformModifierKeyOnly}
              onBoxstart={this.clearSelectedFeatures}
              onBoxend={this.handleBoxEnd}
              />
          </Interactions>
        </MapReact>
        <p><b>Selected countries: </b>{this.state.selectedFeatures && (this.state.selectedFeatures.getArray().length === 0 ? "No selection" : this.state.selectedFeatures.getArray().map((f: Feature) => f.get('name')).join(', '))}</p>
        <br/>
        <Divider />
        <br/>
        <Highlighter lang="jsx" code={
`<Map view={{ center: [0, 0], zoom: 2 }}>
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
<p><b>Selected countries: </b>{this.state.selectedFeatures.getArray().length === 0 ? "No selection" : this.state.selectedFeatures.getArray().map(f => f.get('name')).join(', ')}</p>`
        } />
        <a href="https://github.com/allenhwkim/react-openlayers/blob/master/app/interactions/drag-box.tsx">source</a>
      </div>
    );
  }
}