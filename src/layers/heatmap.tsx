import * as React from 'react';
import ol from 'ol'
import { Util, Omit } from "../util";
import { Map } from '../map';

export interface HeatmapProps extends Omit<ol.olx.layer.HeatmapOptions, 'weight'> {
  weight?: ol.olx.layer.HeatmapOptions['weight']
}

export class Heatmap extends React.Component<HeatmapProps, any> {

  layer: ol.layer.Heatmap;

  options: HeatmapProps = {
    gradient: undefined,
    radius: undefined,
    blur: undefined,
    shadow: undefined,
    weight: undefined,
    extent: undefined,
    minResolution: undefined,
    maxResolution: undefined,
    opacity: undefined,
    source: undefined,
    visible: undefined
  };

  events: any = {
    'change': undefined,
    'change:blur': undefined,
    'change:extent': undefined,
    'change:gradient': undefined,
    'change:maxResolution': undefined,
    'change:minResolution': undefined,
    'change:opacity': undefined,
    'change:radius': undefined,
    'change:source': undefined,
    'change:visible': undefined,
    'change:zIndex': undefined,
    'postcompose': undefined,
    'precompose': undefined,
    'propertychange': undefined,
    'render': undefined
  };

  render() { return null; }

  componentDidMount() {
    let options = Util.getOptions(Object.assign(this.options, this.props));
    if (!options.weight) options.weight = 'weight';
    this.layer = new ol.layer.Heatmap(options);
    if(this.props.zIndex){
      this.layer.setZIndex(this.props.zIndex);
    }
    this.context.mapComp.layers.push(this.layer);

    let olEvents = Util.getEvents(this.events, this.props);
    for (let eventName in olEvents) {
      this.layer.on(eventName, olEvents[eventName]);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      let options = Util.getOptions(Object.assign(this.options, this.props));
      this.context.mapComp.map.removeLayer(this.layer);
      this.layer = new ol.layer.Heatmap(options);
      if (this.props.zIndex) {
        this.layer.setZIndex(this.props.zIndex);
      }
      this.context.mapComp.map.addLayer(this.layer);

      let olEvents = Util.getEvents(this.events, this.props);
      for (let eventName in olEvents) {
        this.layer.on(eventName, olEvents[eventName]);
      }
    }
  }

  componentWillUnmount() {
    this.context.mapComp.map.removeLayer(this.layer);
  }

}