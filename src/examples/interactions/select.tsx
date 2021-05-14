import * as React from "react";

import { Divider, Typography } from "@material-ui/core";

import { interaction, Interactions, layer, Layers, MapReact, source, custom } from "react-openlayers";

import Highlighter from "../Highlighter";

export type SelectState = {
  active: boolean
}

export class Select extends React.Component {
  public state: SelectState;
  constructor(props: {}) {
    super(props)

    this.state = {
      active: true
    }
  }

  componentDidMount() {
    setTimeout(() => this.setState({ active: false}), 2500);
  }

  public render() {
    return (
      <div>
        <Typography variant="h4" paragraph>Select interaction</Typography>
        <MapReact view={{zoom: 5, projection: 'EPSG:4326'}}>
          <Layers>
            <layer.TileReact>
              <source.XYZReact 
                url={'https://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}&s=Ga'} 
                attributions={'@ Google'}
              />
            </layer.TileReact>
            <custom.GeolocationReact tracking={true} />
          </Layers>
          <Interactions>
            <interaction.SelectReact />
          </Interactions>
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