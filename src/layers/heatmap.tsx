import * as React from 'react';

import olHeatmap from 'ol/layer/heatmap';

import { MapContext } from '../map';
import { Util, Omit } from '../util';
import { LayerType } from 'layers';

export interface HeatmapProps extends Omit<ol.olx.layer.HeatmapOptions, 'weight'>, LayerType<olHeatmap> {
  weight?: ol.olx.layer.HeatmapOptions['weight']
}

export class Heatmap extends React.Component<HeatmapProps, any> {
  public static contextType = MapContext;

  layer: olHeatmap;

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
    this.layer = new olHeatmap(options);
    if(this.props.zIndex){
      this.layer.setZIndex(this.props.zIndex);
    }
    this.context.layers.push(this.layer);

    let olEvents = Util.getEvents(this.events, this.props);
    for (let eventName in olEvents) {
      this.layer.on(eventName, olEvents[eventName]);
    }
  }

  componentWillReceiveProps(nextProps) {
    let options = Util.getOptions(Object.assign(this.options, this.props));

    // Updating options first
    Object.keys(options).forEach(option => {
      if (options[option] === nextProps[options]) return;
      const newVal = nextProps[option];
      switch (option) {
        case 'gradient': this.layer.setGradient(newVal); break;
        case 'radius': this.layer.setRadius(newVal); break;
        case 'blur': this.layer.setBlur(newVal); break;
        case 'shadow': this.layer.set('shadow', newVal); break;
        case 'extent': this.layer.setExtent(newVal); break;
        case 'minResolution': this.layer.setMinResolution(newVal); break;
        case 'maxResolution': this.layer.setMaxResolution(newVal); break;
        case 'opacity': this.layer.setOpacity(newVal); break;
        case 'source': this.layer.setSource(newVal); break;
        case 'visible': this.layer.setVisible(newVal); break;
        case 'zIndex': this.layer.setZIndex(newVal); break;
        case 'opacity': this.layer.setOpacity(newVal); break;
        case 'source': this.layer.setSource(newVal); break;
        case 'visible': this.layer.setVisible(newVal); break;
        case 'extent': this.layer.setExtent(newVal); break;
        case 'minResolution': this.layer.setMinResolution(newVal); break;
        case 'maxResolution': this.layer.setMaxResolution(newVal); break;
      }
    });

    // Then update events
    let oldEvents = Util.getEvents(this.events, this.props);
    let newEvents = Util.getEvents(this.events, nextProps);
    for(let eventName in this.events) {
      if (oldEvents[eventName]) this.layer.un(eventName, oldEvents[eventName]);
      if (newEvents[eventName]) this.layer.on(eventName, newEvents[eventName]);
    }
  }

  componentWillUnmount() {
    this.context.map.removeLayer(this.layer);
  }

}