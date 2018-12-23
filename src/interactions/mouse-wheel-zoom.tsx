import * as React from 'react';

import olMouseWheelZoom from 'ol/interaction/mousewheelzoom';

import { MapContext } from '../map';
import { Util } from '../util';
import { InteractionType } from 'interactions';

export interface MouseWheelZoomProps extends ol.olx.interaction.MouseWheelZoomOptions, InteractionType<olMouseWheelZoom> {};

export class MouseWheelZoom extends React.Component<MouseWheelZoomProps, any> {
  public static contextType = MapContext;

  interaction: olMouseWheelZoom;

  options: MouseWheelZoomProps = {
    duration: undefined,
    timeout: undefined,
    useAnchor: undefined
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
    this.interaction = new olMouseWheelZoom(options);
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
      this.interaction = new olMouseWheelZoom(options);
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