import * as React from "react";

import { Divider, Typography } from "@material-ui/core";

import { interaction, layer, Layers, MapReact, source, custom, feature, Overlay } from "react-openlayers";

import Highlighter from "../Highlighter";
import { Feature } from "ol";
import { Geometry } from "ol/geom";
import Collection from 'ol/Collection';
import { Coordinate } from "ol/coordinate";

export type SelectState = {
  active: boolean,
  selectedFeatures: Collection<Feature<Geometry>>;
  zoom: { value: number };
  center: {value: Coordinate};
}

export class Select extends React.Component {
  public state: SelectState;

  public zoom: {value: number}

  constructor(props: {}) {
    super(props)

    this.zoom = {value: 10};

    this.state = {
      active: true,
      selectedFeatures: new Collection([]),
      zoom: this.zoom,
      center: {value: [-87.06194122652191, 40.740451986556394]}
    }

    this.handleSelectFeature = this.handleSelectFeature.bind(this);
  }

  handleSelectFeature(event: any) {
    if(event.selected[0]) {
      this.state.selectedFeatures.dispose();
      this.setState({ selectedFeatures: new Collection([event.selected[0]]) });
    }
  }

  public componentDidUpdate(_prevProps: any, prevState: SelectState) {
    if(prevState.active !== this.state.active && prevState.active) {
      console.log('cool')
      this.state.selectedFeatures.dispose();
      this.setState({ selectedFeatures: new Collection([]) });
    }
  }

  public render() {
    return (
      <div>
        <Typography variant="h4" paragraph>Select interaction</Typography>
        <button onClick={() => this.setState({ active: !this.state.active })}>dumb button</button>
        {this.state.active && (
          <MapReact view={{projection: 'EPSG:4326'}} zoom={this.state.zoom} center={this.state.center}>
          <Layers>
            <layer.TileReact>
              <source.XYZReact 
                url={'https://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}&s=Ga'} 
                attributions={'@ Google'}
              />
            </layer.TileReact>
              <layer.Vector fadeInOptions={{startOpacity: 0, maxOpacity: 1, step: .02, interval: 25}}>
                <source.VectorSourceReact>
                  <feature.LineStringReact 
                    coordinates={[[-87.06136985536766, 40.74069077828139],[-87.06194122652191, 40.740451986556394]]} 
                    strokeOptions={{width: this.state.active ? 20: 10, color: this.state.active ? 'blue': 'green'}}
                    hideAtZoom={8}
                  />
                  <feature.LineStringReact 
                    coordinates={[[-87.05136985536766, 40.74079077828139],[-87.06194122652191, 40.740451986556394]]} 
                    strokeOptions={{width: this.state.active ? 20: 10, color: this.state.active ? 'blue': 'green'}}
                    textOptions={{text: 'LineString', font: '18px Calibri,sans-serif', fillOptions: {color: 'white'}, strokeOptions: {color: 'black', width: 2}}}
                    hideTextZoom={12}
                    hideAtZoom={8}
                  />
                  <feature.PointReact
                    coordinate={[-87.06194122652191, 40.740451986556394]} 
                    circleOptions={{
                      fillOptions: {color: 'white'},
                      radius: 5,
                      strokeOptions: {width: 2, color: 'black'},
                      blinking: true
                    }}
                    hideAtZoom={0}
                  />
                  <interaction.ModifyReact 
                    features={this.state.selectedFeatures}
                  />
                  <interaction.SelectReact style={undefined} onSelect={this.handleSelectFeature} />
                </source.VectorSourceReact>
              </layer.Vector>
            <custom.GeolocationReact tracking={false} />
          </Layers>
          {this.state.active && (
            <Overlay 
            position={[-87.06194122652191, 40.740451986556394]}
            offset={[-20, -40]}
            >
              <button>going poop</button>
            </Overlay>
          )}
          </MapReact>
        )}
      
        <br/>
        <Divider />
        <br/>
        <Highlighter lang="jsx"  code={
`<Map>
  <Layers>
    <layer.Tile />
    <layer.Vector source={markers} style={markers.style} />
  </Layers>
  <Interactions>
    <interaction.Select style={selectedMarkerStyle} />
  </Interactions>
</Map>`
        } />
        <a href="https://github.com/allenhwkim/react-openlayers/blob/master/app/interactions/select.tsx">source</a>
      </div>
    );
  }
}