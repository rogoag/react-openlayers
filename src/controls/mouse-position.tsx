import * as React from 'react';

import olMousePosition from 'ol/control/mouseposition'

import { Util } from '../util';
import { MapContext } from '../map';
import { ControlType } from 'controls';

export interface MousePositionProps extends ol.olx.control.MousePositionOptions, ControlType<olMousePosition> {};

export class MousePosition extends React.Component<MousePositionProps, any> {
  public static contextType = MapContext;

  control: olMousePosition;

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

  componentDidMount() {
    let options = Util.getOptions(Object.assign(this.options, this.props));
    this.control = new olMousePosition(options);
    this.context.controls.push(this.control)

    if (this.props.controlRef) this.props.controlRef(this.control);


    let olEvents = Util.getEvents(this.events, this.props);
    for (let eventName in olEvents) {
      this.control.on(eventName, olEvents[eventName]);
    }
  }
}