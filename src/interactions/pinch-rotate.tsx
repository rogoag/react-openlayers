import * as React from 'react';

import olPinchRotate from 'ol/interaction/pinchrotate';

import { MapContext } from '../map';
import { Util } from '../util';
import { InteractionType } from 'interactions';

export interface PinchRotateProps extends ol.olx.interaction.PinchRotateOptions, InteractionType<olPinchRotate> {};

export class PinchRotate extends React.Component<PinchRotateProps, any> {
  public static contextType = MapContext;

  interaction: olPinchRotate;

  options: PinchRotateProps = {
    duration: undefined,
    threshold: undefined
  };

  events: any = {
    'change': undefined,
    'change:active': undefined,
    'propertychange': undefined
  };

  render() { return null; }

  initInteraction(props) {
    if (props.interactionRef) props.interactionRef(this.interaction);
    if (props.active !== undefined) this.interaction.setActive(props.active);
  }

  componentDidMount () {
    let options = Util.getOptions(Object.assign(this.options, this.props));
    this.interaction = new olPinchRotate(options);
    this.context.interactions.push(this.interaction)

    this.initInteraction(this.props);
    
    let olEvents = Util.getEvents(this.events, this.props);
    for(let eventName in olEvents) {
      this.interaction.on(eventName, olEvents[eventName]);
    }
  }

  componentWillReceiveProps (nextProps) {
    if(nextProps !== this.props){
      this.context.map.removeInteraction(this.interaction);
      let options = Util.getOptions(Object.assign(this.options, nextProps));
      this.interaction = new olPinchRotate(options);
      this.context.map.addInteraction(this.interaction);

      this.initInteraction(nextProps);

      let olEvents = Util.getEvents(this.events, this.props);
      for(let eventName in olEvents) {
        this.interaction.on(eventName, olEvents[eventName]);
      }
    }
  }
  
  componentWillUnmount () {
    this.context.map.removeInteraction(this.interaction);
  }

}