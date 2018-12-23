import * as React from 'react';

import olDragZoom from 'ol/interaction/dragzoom';

import { MapContext } from '../map';
import { Util } from '../util';
import { InteractionType } from 'interactions';

export interface DragZoomProps extends ol.olx.interaction.DragZoomOptions, InteractionType<olDragZoom> {};

export class DragZoom extends React.Component<DragZoomProps, any> {
  public static contextType = MapContext;

  interaction: olDragZoom;

  options: DragZoomProps = {
    className: undefined,
    condition: undefined,
    duration: undefined,
    out: undefined
  };

  events: any = {
    'boxdrag': undefined,
    'boxend': undefined,
    'boxstart': undefined,
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
    this.interaction = new olDragZoom(options);
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
      this.interaction = new olDragZoom(options);
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