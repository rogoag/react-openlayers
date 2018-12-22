import * as React from 'react';
import ol from 'ol'
import {Util} from "../util";
import {Map} from '../map';

export type ExtentProps = olFix.olx.interaction.ExtentOptions;


export class Extent extends React.Component<ExtentProps, any> {

  interaction: any;

  options: ExtentProps = {
    extent: undefined,
    boxStyle: undefined,
    pixelTolerance: undefined,
    pointerStyle: undefined,
    wrapX: undefined
  };

  events: any = {
    'Event': undefined,
    'change': undefined,
    'change:active': undefined,
    'propertychange': undefined
  };

  render() { return null; }

  componentDidMount () {
    let options = Util.getOptions(Object.assign(this.options, this.props));
    console.log('options', options);
    this.interaction = new ol.interaction['Extent'](options);
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
      this.interaction = new ol.interaction['Extent'](options);
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