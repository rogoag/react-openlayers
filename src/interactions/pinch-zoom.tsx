import * as React from 'react';

import olPinchZoom from 'ol/interaction/pinchzoom';

import { MapContext } from '../map';
import { Util } from '../util';
import { InteractionType } from 'interactions';

export interface PinchZoomProps extends ol.olx.interaction.PinchZoomOptions, InteractionType<olPinchZoom> {};

export class PinchZoom extends React.Component<PinchZoomProps, any> {
  public static contextType = MapContext;

  interaction: olPinchZoom;

  options: PinchZoomProps = {
    duration: undefined,
    constrainResolution: undefined
  };

  events: any = {
    'change': undefined,
    'change:active': undefined,
    'propertychange': undefined
  };

  render() { return null; }

  initInteraction() {
    if (this.props.interactionRef) this.props.interactionRef(this.interaction);
    if (this.props.active !== undefined) this.interaction.setActive(this.props.active);
  }

  componentDidMount () {
    let options = Util.getOptions(Object.assign(this.options, this.props));
    console.log('double-click-zoom options', options);
    this.interaction = new olPinchZoom(options);
    this.context.mapComp.interactions.push(this.interaction)

    this.initInteraction();
    
    let olEvents = Util.getEvents(this.events, this.props);
    for(let eventName in olEvents) {
      this.interaction.on(eventName, olEvents[eventName]);
    }
  }

  componentWillReceiveProps (nextProps) {
    if(nextProps !== this.props){
      this.context.mapComp.map.removeInteraction(this.interaction);
      let options = Util.getOptions(Object.assign(this.options, nextProps));
      this.interaction = new olPinchZoom(options);
      this.context.mapComp.map.addInteraction(this.interaction);

      this.initInteraction();

      let olEvents = Util.getEvents(this.events, this.props);
      for(let eventName in olEvents) {
        this.interaction.on(eventName, olEvents[eventName]);
      }
    }
  }
  
  componentWillUnmount () {
    this.context.mapComp.map.removeInteraction(this.interaction);
  }

}