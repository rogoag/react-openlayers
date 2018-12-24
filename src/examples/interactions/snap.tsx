import * as React from "react";

import { Typography, Divider, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Grid, InputLabel, Select, MenuItem } from "@material-ui/core";

import VectorSource from 'ol/source/vector';
import Style from 'ol/style/style';
import StrokeStyle from 'ol/style/stroke';
import FillStyle from 'ol/style/fill';
import CircleStyle from 'ol/style/circle';
import olSelect from 'ol/interaction/select';

import {
  interaction, layer, custom, control, //name spaces
  Interactions, Overlays, Controls,     //group
  Map, Layers, Overlay, Util    //objects
} from "react-openlayers";

import Highlighter from "../Highlighter";


const vectorStyle = new Style({
  fill: new FillStyle({
    color: 'rgba(255, 255, 255, 0.2)'
  }),
  stroke: new StrokeStyle({
    color: '#ffcc33',
    width: 2
  }),
  image: new CircleStyle({
    radius: 7,
    fill: new FillStyle({
      color: '#ffcc33'
    })
  })
});

export class Snap extends React.Component<any, any> {
  source: VectorSource = null;

  draws = {
    Point: null,
    LineString: null,
    Polygon: null,
    Circle: null,
  };

  select = null;

  state = {
    drawType: 'Point',
    activeInteraction: 'draw'
  }

  constructor(props) {
    super(props);
    this.source = new VectorSource();
    this.select = new olSelect()
  }

  handleDrawTypeChange = e => {
    const type = e.target.value;
    this.setState({ ...this.state, drawType: type })
  }

  handleInteractionChange = e => {
    const interactionType = e.target.value;
    this.setState({ ...this.state, activeInteraction: interactionType })
  }

  handleSelectChangeActive = () => {
    const selectedFeatures = this.select.getFeatures();
    selectedFeatures.forEach(selectedFeatures.remove, selectedFeatures);
  }

  render() {
    const { drawType, activeInteraction } = this.state;

    return (
      <div>
        <Typography variant="h4" paragraph>Snap interaction</Typography>
        <Typography variant="subtitle1">The <code>Snap</code> interaction offer snapping capabilities. Try drawing a <code>LineString</code> and some <code>Point</code>s, then select the <code>Modify</code> option and try to move a <code>Point</code> near the <code>LineString</code>.</Typography>
        <Map view={{ center: [0, 0], zoom: 2 }}>
          <Layers>
            <layer.Tile />
            <layer.Vector source={this.source} style={vectorStyle} />
          </Layers>
          <Interactions>
            <interaction.Select instance={this.select}
              active={activeInteraction === 'modify'}
              onChangeActive={this.handleSelectChangeActive}
            />
            <interaction.Modify
              features={this.select.getFeatures()}
              active={activeInteraction === 'modify'}
            />

            <interaction.Draw
              source={this.source}
              type="Point"
              active={activeInteraction === 'draw' && drawType === 'Point'}
            />
            <interaction.Draw
              source={this.source}
              type="LineString"
              active={activeInteraction === 'draw' && drawType === 'LineString'}
            />
            <interaction.Draw
              source={this.source}
              type="Polygon"
              active={activeInteraction === 'draw' && drawType === 'Polygon'}
            />
            <interaction.Draw
              source={this.source}
              type="Circle"
              active={activeInteraction === 'draw' && drawType === 'Circle'}
            />
            <interaction.Snap source={this.source} />
          </Interactions>
        </Map>
        <br/>
        <Grid container spacing={16}>
          <Grid item sm={6}>
            <FormControl>
              <FormLabel>Interaction</FormLabel>
              <RadioGroup
                aria-label="Interaction"
                name="gender1"
                value={this.state.activeInteraction}
                onChange={this.handleInteractionChange}
              >
                <FormControlLabel  value="draw" control={<Radio />} label="Draw" />
                <FormControlLabel value="modify" control={<Radio />} label="Modify" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item sm={6}>
            <FormControl>
              <InputLabel>Type</InputLabel>
              <Select
                onChange={this.handleDrawTypeChange}
                value={this.state.drawType}
              >
                <MenuItem value="Point">Point</MenuItem>
                <MenuItem value="Polygon">Polygon</MenuItem>
                <MenuItem value="LineString">LineString</MenuItem>
                <MenuItem value="Circle">Circle</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Divider />
        <br/>
        <Highlighter lang="jsx" code={
`<Map view={{ center: [0, 0], zoom: 2 }}>
  <Layers>
    <layer.Tile />
    <layer.Vector source={this.source} style={vectorStyle} />
  </Layers>
  <Interactions>
    <interaction.Select instance={this.select} active={activeInteraction === 'modify'} onChangeActive={this.handleSelectChangeActive} />
    <interaction.Modify features={this.select.getFeatures()} active={activeInteraction === 'modify'} />

    <interaction.Draw type="Point" source={this.source} active={activeInteraction === 'draw' && drawType === 'Point'} />
    <interaction.Draw type="LineString" source={this.source} active={activeInteraction === 'draw' && drawType === 'LineString'} />
    <interaction.Draw type="Polygon" source={this.source} active={activeInteraction === 'draw' && drawType === 'Polygon'} />
    <interaction.Draw type="Circle" source={this.source} active={activeInteraction === 'draw' && drawType === 'Circle'} />
    <interaction.Snap source={this.source} />
  </Interactions>
</Map>`
        } />
        <a href="https://github.com/allenhwkim/react-openlayers/blob/master/app/interactions/snap.tsx">source</a>
      </div>
    );
  }
}