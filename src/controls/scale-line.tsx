import * as React from 'react';

import olScaleLine from 'ol/control/scaleline'

import { MapContext } from '../map';
import { Util } from '../util';
import { ControlType } from 'controls';

export interface ScaleLineProps extends ol.olx.control.ScaleLineOptions, ControlType<olScaleLine> {};

export class ScaleLine extends React.Component<ScaleLineProps, any> {
  public static contextType = MapContext;

  control: olScaleLine;

  options: ScaleLineProps = {
    className: undefined,
    minWidth: undefined,
    render: undefined,
    target: undefined,
    units: undefined
  };

  events: any = {
    'change': undefined,
    'change:units': undefined,
    'propertychange': undefined
  };

  render() { return null; }

  componentDidMount () {
    let options = Util.getOptions(Object.assign(this.options, this.props));
    this.control = new olScaleLine(options);
    this.context.controls.push(this.control)

    if (this.props.controlRef) this.props.controlRef(this.control);

    let olEvents = Util.getEvents(this.events, this.props);
    for(let eventName in olEvents) {
      this.control.on(eventName, olEvents[eventName]);
    }
  }

}