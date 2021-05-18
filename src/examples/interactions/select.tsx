import * as React from "react";

import { Divider, Typography } from "@material-ui/core";

import { interaction, layer, Layers, MapReact, source, custom, feature } from "react-openlayers";

import Highlighter from "../Highlighter";
import { Feature } from "ol";
import { Geometry } from "ol/geom";
import GeometryType from 'ol/geom/GeometryType';
import Collection from 'ol/Collection';

export type SelectState = {
  active: boolean,
  selectedFeatures: Collection<Feature<Geometry>>;
}

export class Select extends React.Component {
  public state: SelectState;
  constructor(props: {}) {
    super(props)

    this.state = {
      active: true,
      selectedFeatures: new Collection([])
    }
  }

  componentDidMount() {
    setTimeout(() => this.setState({ active: false}), 5000);
  }

  public render() {
    return (
      <div>
        <Typography variant="h4" paragraph>Select interaction</Typography>
        <MapReact view={{projection: 'EPSG:4326', center: [-87.06136985536766, 40.74069077828139], zoom: 18}}>
          <Layers>
            <layer.TileReact>
              <source.XYZReact 
                url={'https://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}&s=Ga'} 
                attributions={'@ Google'}
              />
            </layer.TileReact>
              <layer.Vector>
                <source.VectorSourceReact>
                  <feature.LineStringReact 
                    coordinates={[[-87.06136985536766, 40.74069077828139],[-87.06194122652191, 40.740451986556394]]} 
                    strokeOptions={{width: this.state.active ? 20: 10, color: this.state.active ? 'blue': 'green'}}
                  />
                  <feature.LineStringReact 
                    coordinates={[[-87.05136985536766, 40.74079077828139],[-87.06194122652191, 40.740451986556394]]} 
                    strokeOptions={{width: this.state.active ? 20: 10, color: this.state.active ? 'blue': 'green'}}
                  />
                  {this.state.active && (
                    <interaction.ModifyReact 
                      onModifyend={(event) => {console.log(event)}}
                      features={this.state.selectedFeatures}
                    />
                  )}
                  <interaction.DrawReact type={GeometryType.POINT} onDrawend={(event) => { console.log(event) }} styleOptions={{pointColor: 'green'}} />
                </source.VectorSourceReact>
              </layer.Vector>
            <custom.GeolocationReact tracking={false} />
          </Layers>
        </MapReact>
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