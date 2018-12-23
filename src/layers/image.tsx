import * as React from 'react';

import olImage from 'ol/layer/image';

import { MapContext } from '../map';
import { Util } from '../util';
import { LayerType } from 'layers';

export interface ImageProps extends ol.olx.layer.ImageOptions, LayerType<olImage> {};


export class Image extends React.Component<ImageProps, any> {
  public static contextType = MapContext;

  layer: olImage;

  options: ImageProps = {
    opacity: undefined,
    source: undefined,
    visible: undefined,
    extent: undefined,
    minResolution: undefined,
    maxResolution: undefined
  };

  events: any = {
    'change': undefined,
    'change:extent': undefined,
    'change:gradient': undefined,
    'change:maxResolution': undefined,
    'change:minResolution': undefined,
    'change:opacity': undefined,
    'change:source': undefined,
    'change:visible': undefined,
    'change:zIndex': undefined,
    'postcompose': undefined,
    'precompose': undefined,
    'propertychange': undefined,
    'render': undefined
  };

  constructor(props) { 
    super(props);
  }

  render() { return null; }

  componentDidMount () {
    let options = Util.getOptions(Object.assign(this.options, this.props));
    this.layer = new olImage(options);
    if(this.props.zIndex){
      this.layer.setZIndex(this.props.zIndex);
    }
    this.context.layers.push(this.layer);

    let olEvents = Util.getEvents(this.events, this.props);
    for(let eventName in olEvents) {
      this.layer.on(eventName, olEvents[eventName]);
    }
  }

  componentWillReceiveProps (nextProps) {
    let options = Util.getOptions(Object.assign(this.options, this.props));

    // Updating options first
    Object.keys(options).forEach(option => {
      if (options[option] === nextProps[options]) return;
      const newVal = nextProps[option];
      switch (option) {
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
  
  componentWillUnmount () {
    this.context.map.removeLayer(this.layer);
  }

}