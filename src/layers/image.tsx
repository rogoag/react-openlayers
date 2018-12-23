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
    this.context.mapComp.layers.push(this.layer);

    let olEvents = Util.getEvents(this.events, this.props);
    for(let eventName in olEvents) {
      this.layer.on(eventName, olEvents[eventName]);
    }
  }

  componentWillReceiveProps (nextProps) {
    if(nextProps !== this.props){
      let options = Util.getOptions(Object.assign(this.options, this.props));
      this.context.mapComp.map.removeLayer(this.layer);
      this.layer = new olImage(options);
      if(this.props.zIndex){
        this.layer.setZIndex(this.props.zIndex);
      }
      this.context.mapComp.map.addLayer(this.layer);

      if (this.props.layerRef) this.props.layerRef(this.layer);

      let olEvents = Util.getEvents(this.events, this.props);
      for(let eventName in olEvents) {
        this.layer.on(eventName, olEvents[eventName]);
      }
    }
  }
  
  componentWillUnmount () {
    this.context.mapComp.map.removeLayer(this.layer);
  }

}