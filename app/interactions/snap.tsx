import * as React from "react";
import * as ReactDOM from "react-dom";

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

    console.log("Snap render", drawType, activeInteraction)
    return (
      <div>
        <p>The <code>Snap</code> interaction offer snapping capabilities. Try drawing a <code>LineString</code> and some <code>Point</code>s, then select the <code>Modify</code> option and try to move a <code>Point</code> near a <code>LineString</code></p>
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
        <form id="options-form" autoComplete="off">
          <div className="radio" onChange={this.handleInteractionChange}>
            <label>
              <input type="radio" name="interaction" value="draw" id="draw" defaultChecked/>
              Draw
            </label>
            <br/>
            <label>
              <input type="radio" name="interaction" value="modify" />
              Modify
              </label>
          </div>
          <div className="form-group">
            <label>Draw type</label>
            <select name="draw-type" id="draw-type" onChange={this.handleDrawTypeChange}>
              <option value="Point">Point</option>
              <option value="LineString">LineString</option>
              <option value="Polygon">Polygon</option>
              <option value="Circle">Circle</option>
            </select>
          </div>
        </form>
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