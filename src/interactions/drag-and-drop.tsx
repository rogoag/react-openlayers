import * as React from 'react';

import olDragAndDrop from 'ol/interaction/draganddrop';

import { MapContext } from '../map';
import { Util, Omit } from '../util';

export interface DragAndDropProps extends Omit<ol.olx.interaction.DragAndDropOptions, 'projection'> {
  projection?: ol.olx.interaction.DragAndDropOptions['projection']
}

export class DragAndDrop extends React.Component<DragAndDropProps, any> {
  public static contextType = MapContext;

  interaction: olDragAndDrop;

  options: DragAndDropProps = {
    formatConstructors: undefined,
    projection: undefined,
    target: undefined
  };

  events: any = {
    'addfeatures': undefined,
    'change': undefined,
    'change:active': undefined,
    'propertychange': undefined
  };

  render() { return null; }

  componentDidMount () {
    let options = Util.getOptions(Object.assign(this.options, this.props));
    console.log('options', options);
    this.interaction = new olDragAndDrop(options);
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
      this.interaction = new olDragAndDrop(options);
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