import * as React from 'react';

import olDraw from 'ol/interaction/draw';

import { MapContext } from '../map';
import { Util } from '../util';
import { InteractionType } from 'interactions';

export interface DrawProps extends ol.olx.interaction.DrawOptions, InteractionType<olDraw> {}

export class Draw extends React.Component<DrawProps, any> {
  public static contextType = MapContext;

  interaction: olDraw;

  options: DrawProps = {
    clickTolerance: undefined,
    features: undefined,
    source: undefined,
    snapTolerance: undefined,
    type: undefined,
    maxPoints: undefined,
    minPoints: undefined,
    finishCondition: undefined,
    style: undefined,
    geometryFunction: undefined,
    geometryName: undefined,
    condition: undefined,
    freehand: undefined,
    freehandCondition: undefined,
    wrapX: undefined
  };

  events: any = {
    'change': undefined,
    'change:active': undefined,
    'drawend': undefined,
    'drawstart': undefined,
    'propertychange': undefined
  };

  render() { return null; }

  initInteraction() {
    if (this.props.interactionRef) this.props.interactionRef(this.interaction);
    if (this.props.active) this.interaction.setActive(this.props.active);
  }

  componentDidMount () {
    let options = Util.getOptions(Object.assign(this.options, this.props));
    this.interaction = new olDraw(options);
    this.context.mapComp.interactions.push(this.interaction);

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
      this.interaction = new olDraw(options);
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