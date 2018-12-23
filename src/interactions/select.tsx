import * as React from 'react';

import olSelect from 'ol/interaction/select';

import { MapContext } from '../map';
import { Util } from '../util';
import { InteractionType } from 'interactions';

export interface SelectProps extends ol.olx.interaction.SelectOptions, InteractionType<olSelect> {
  instance?: olSelect;
}

export class Select extends React.Component<SelectProps, any> {
  public static contextType = MapContext;

  interaction: olSelect;

  options: SelectProps = {
    addCondition: undefined,
    condition: undefined,
    layers: undefined,
    style: undefined,
    removeCondition: undefined,
    toggleCondition: undefined,
    multi: undefined,
    features: undefined,
    filter: undefined,
    wrapX: undefined,
    hitTolerance: undefined
  };

  events: any = {
    'change': undefined,
    'change:active': undefined,
    'propertychange': undefined,
    'select': undefined
  };

  render() { return null; }

  initInteraction(props) {
    if (props.interactionRef) props.interactionRef(this.interaction);
    if (props.active !== undefined) this.interaction.setActive(props.active);
  }

  componentDidMount () {
    if (this.props.instance) {
      this.interaction = this.props.instance;
    } else {
      let options = Util.getOptions(Object.assign(this.options, this.props));
      this.interaction = new olSelect(options);
    }
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

      if (this.props.instance) {
        this.interaction = this.props.instance;
      } else {
        let options = Util.getOptions(Object.assign(this.options, nextProps));
        this.interaction = new olSelect(options);
      }
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