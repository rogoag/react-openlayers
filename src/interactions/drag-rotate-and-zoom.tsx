import * as React from 'react';

import olDragRotateAndZoom from 'ol/interaction/dragrotateandzoom';

import { MapContext } from '../map';
import { Util } from '../util';
import { InteractionType } from 'interactions';

export interface DragRotateAndZoomProps extends ol.olx.interaction.DragRotateAndZoomOptions, InteractionType<olDragRotateAndZoom> {};

export class DragRotateAndZoom extends React.Component<DragRotateAndZoomProps, any> {
  public static contextType = MapContext;

  interaction: olDragRotateAndZoom;

  options: DragRotateAndZoomProps = {
    condition: undefined,
    duration: undefined
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
    this.interaction = new olDragRotateAndZoom(options);
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
      this.interaction = new olDragRotateAndZoom(options);
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