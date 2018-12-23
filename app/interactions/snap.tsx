import * as React from "react";
import * as ReactDOM from "react-dom";

import VectorSource from 'ol/source/vector';
import Style from 'ol/style/style';
import StrokeStyle from 'ol/style/stroke';
import FillStyle from 'ol/style/fill';
import CircleStyle from 'ol/style/circle';

import {
  interaction, layer, custom, control, //name spaces
  Interactions, Overlays, Controls,     //group
  Map, Layers, Overlay, Util    //objects
} from "react-openlayers";


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

  constructor(props) {
    super(props);

    this.source = new VectorSource();
  }

  handleFormChange = e => {
    const type = e.target.getAttribute('name');
    const value = e.target.value;
    if (type === 'draw-type') {
      /** @todo */
    } else if (type === 'interaction') {
      /** @todo */
    }
  }
  
  render() {
    return (
      <div>
        <Map view={{ center: [0, 0], zoom: 2 }}>
          <Layers>
            <layer.Tile />
            <layer.Vector source={this.source} style={vectorStyle}/>
          </Layers>
          <Interactions>
            <interaction.Snap source={this.source} />
          </Interactions>
        </Map>
        <form id="options-form" autoComplete="off" onChange={this.handleFormChange}>
          <div className="radio">
            <label>
              <input type="radio" name="interaction" value="draw" id="draw" defaultChecked />
                Draw
            </label>
          </div>
            <div className="radio">
              <label>
                <input type="radio" name="interaction" value="modify" />
                  Modify
              </label>
            </div>
              <div className="form-group">
                <label>Draw type</label>
                <select name="draw-type" id="draw-type">
                  <option value="Point">Point</option>
                  <option value="LineString">LineString</option>
                  <option value="Polygon">Polygon</option>
                  <option value="Circle">Circle</option>
                </select>
              </div>
            </form>
          </div>
          );
        }
}