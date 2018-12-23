import * as React from 'react';

import olPointer from 'ol/interaction/pointer';

import { MapContext } from '../map';
import { Util } from '../util';
import { InteractionType } from 'interactions';

export interface PointerProps extends ol.olx.interaction.PointerOptions, InteractionType<olPointer> {};

export class Pointer extends React.Component<PointerProps, any> {
  public static contextType = MapContext;

  interaction: olPointer;

  options: PointerProps = {
    handleDownEvent: undefined,
    handleDragEvent: undefined,
    handleEvent: undefined,
    handleMoveEvent: undefined,
    handleUpEvent: undefined
  };

  events: any = {
    'change': undefined,
    'change:active': undefined,
    'propertychange': undefined
  };

  render() { return null; }

  componentDidMount () {
    let options = Util.getOptions(Object.assign(this.options, this.props));
    this.interaction = new olPointer(options);
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
      this.interaction = new olPointer(options);
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