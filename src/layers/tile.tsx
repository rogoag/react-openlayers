import * as React from 'react';

import olTile from 'ol/layer/tile';
import olOSMSource from 'ol/source/osm';

import { MapContext } from '../map';
import { Util, Omit } from '../util';
import { LayerType } from 'layers';

export interface TileProps extends Omit<ol.olx.layer.TileOptions, 'source'>, LayerType<olTile> {
  source?: ol.olx.layer.TileOptions['source']
}

export class Tile extends React.Component<TileProps, any> {
  public static contextType = MapContext;

  layer: olTile;

  options: TileProps = {
    zIndex: undefined,
    opacity: undefined,
    preload: undefined,
    source: undefined,
    visible: undefined,
    extent: undefined,
    minResolution: undefined,
    maxResolution: undefined,
    useInterimTilesOnError: undefined
  };

  events: any = {
    'change': undefined,
    'change:extent': undefined,
    'change:maxResolution': undefined,
    'change:minResolution': undefined,
    'change:opacity': undefined,
    'change:preload': undefined,
    'change:source': undefined,
    'change:useInterimTilesOnError': undefined,
    'change:visible': undefined,
    'change:zIndex': undefined,
    'postcompose': undefined,
    'precompose': undefined,
    'propertychange': undefined,
    'render': undefined
  };

  render() {
    return null;
  }

  componentDidMount () {
    let options = Util.getOptions(Object.assign(this.options, this.props));
    options.source = options.source || new olOSMSource();
    this.layer = new olTile(options);
    if(this.props.zIndex){
      this.layer.setZIndex(this.props.zIndex);
    }
    this.context.layers.push(this.layer)

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
        case 'preload': this.layer.setPreload(newVal); break;
        case 'source': this.layer.setSource(newVal || new olOSMSource()); break;
        case 'visible': this.layer.setVisible(newVal); break;
        case 'extent': this.layer.setExtent(newVal); break;
        case 'minResolution': this.layer.setMinResolution(newVal); break;
        case 'maxResolution': this.layer.setMaxResolution(newVal); break;
        case 'useInterimTilesOnError': this.layer.setUseInterimTilesOnError(newVal); break;
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