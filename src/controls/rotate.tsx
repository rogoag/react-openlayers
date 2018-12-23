import * as React from 'react';

import olRotate from 'ol/control/rotate'

import { MapContext } from '../map';
import { Util } from '../util';
import { ControlType } from 'controls';

export interface RotateProps extends ol.olx.control.RotateOptions, ControlType<olRotate> {};

export class Rotate extends React.Component<RotateProps, any> {
  public static contextType = MapContext;

  control: olRotate;

  options: RotateProps = {
    className: undefined,
    label: undefined,
    tipLabel  : undefined,
    duration: undefined,
    autoHide: undefined,
    render: undefined,
    resetNorth: undefined,
    target: undefined
  };

  events: any = {
    'change': undefined,
    'propertychange': undefined
  };

  render() { return null; }

  componentDidMount () {
    let options = Util.getOptions(Object.assign(this.options, this.props));
    this.control = new olRotate(options);
    this.context.mapComp.controls.push(this.control)

    if (this.props.controlRef) this.props.controlRef(this.control);

    let olEvents = Util.getEvents(this.events, this.props);
    for(let eventName in olEvents) {
      this.control.on(eventName, olEvents[eventName]);
    }
  }

}