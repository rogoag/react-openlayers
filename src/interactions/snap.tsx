import * as React from 'react';

import olSnap from 'ol/interaction/snap';

import { MapContext } from '../map';
import { Util } from '../util';
import { InteractionType } from 'interactions';

export interface SnapProps extends ol.olx.interaction.SnapOptions, InteractionType<olSnap> {};

export class Snap extends React.Component<SnapProps, any> {
  public static contextType = MapContext;

  interaction: olSnap;

  options: SnapProps = {
    features: undefined,
    edge: undefined,
    vertex: undefined,
    pixelTolerance: undefined,
    source: undefined
  };

  events: any = {
    'change': undefined,
    'change:active': undefined,
    'propertychange': undefined
  };

  render() { return null; }

  initInteraction() {
    if (this.props.interactionRef) this.props.interactionRef(this.interaction);
    if (this.props.active) this.interaction.setActive(this.props.active);
  }

  componentDidMount () {
    let options = Util.getOptions(Object.assign(this.options, this.props));
    this.interaction = new olSnap(options);
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
      this.interaction = new olSnap(options);
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