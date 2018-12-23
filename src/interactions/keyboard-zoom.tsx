import * as React from 'react';

import olKeyboardZoom from 'ol/interaction/keyboardzoom';

import { MapContext } from '../map';
import { Util } from '../util';
import { InteractionType } from 'interactions';

export interface KeyboardZoomProps extends ol.olx.interaction.KeyboardZoomOptions, InteractionType<olKeyboardZoom> {};

export class KeyboardZoom extends React.Component<KeyboardZoomProps, any> {
  public static contextType = MapContext;

  interaction: olKeyboardZoom;

  options: KeyboardZoomProps = {
    condition: undefined,
    duration: undefined,
    delta: undefined
  };

  events: any = {
    'change': undefined,
    'change:active': undefined,
    'propertychange': undefined
  };

  render() { return null; }

  componentDidMount () {
    let options = Util.getOptions(Object.assign(this.options, this.props));
    console.log('options', options);
    this.interaction = new olKeyboardZoom(options);
    this.context.mapComp.interactions.push(this.interaction)
    
    let olEvents = Util.getEvents(this.events, this.props);
    for(let eventName in olEvents) {
      this.interaction.on(eventName, olEvents[eventName]);
    }
  }

  componentWillReceiveProps (nextProps) {
    if(nextProps !== this.props){
      this.context.mapComp.map.removeInteraction(this.interaction);
      let options = Util.getOptions(Object.assign(this.options, nextProps));
      this.interaction = new olKeyboardZoom(options);
      this.context.mapComp.map.addInteraction(this.interaction);

      if (this.props.interactionRef) this.props.interactionRef(this.interaction);

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