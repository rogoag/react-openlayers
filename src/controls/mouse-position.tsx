import * as React from 'react';
import ol from 'ol'
import {Util} from '../util';
import {Map} from '../map';

export type MousePositionProps = ol.olx.control.MousePositionOptions;

export class MousePosition extends React.Component<MousePositionProps, any> {

  control: ol.control.MousePosition;

  options: MousePositionProps = {
    className: undefined,
    coordinateFormat: undefined,
    projection: undefined,
    render: undefined,
    target: undefined,
    undefinedHTML: undefined
  };

  events: any = {
    'change': undefined,
    'change:coordinateFormat': undefined,
    'change:projection': undefined,
    'propertychange': undefined
  };

  render() { return null; }

  componentDidMount () {
    let options = Util.getOptions(Object.assign(this.options, this.props));
    this.control = new ol.control.MousePosition(options);
    this.context.mapComp.controls.push(this.control)

    let olEvents = Util.getEvents(this.events, this.props);
    for(let eventName in olEvents) {
      this.control.on(eventName, olEvents[eventName]);
    }
  }
}