import * as React from 'react';
import ol from 'ol'
import {Util} from "../util";
import {Map} from '../map';

export type TranslateProps = ol.olx.interaction.TranslateOptions;


export class Translate extends React.Component<TranslateProps, any> {

  interaction: ol.interaction.Translate;

  options: TranslateProps = {
    features: undefined,
    layers: undefined,
    hitTolerance: undefined
  };

  events: any = {
    'change': undefined,
    'change:active': undefined,
    'propertychange': undefined,
    'translateend': undefined,
    'translatestart': undefined,
    'translating': undefined
  };

  render() { return null; }

  componentDidMount () {
    let options = Util.getOptions(Object.assign(this.options, this.props));
    this.interaction = new ol.interaction.Translate(options);
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
      this.interaction = new ol.interaction.Translate(options);
      this.context.mapComp.map.addInteraction(this.interaction);

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