import * as React from 'react';

import olZoom from 'ol/control/zoom'

import { MapContext } from '../map';
import { Util } from '../util';
import { ControlType } from 'controls';

export interface ZoomProps extends ol.olx.control.ZoomOptions, ControlType<olZoom> {};

export class Zoom extends React.Component<ZoomProps, any> {
  public static contextType = MapContext;

  control: olZoom;

  options: ZoomProps = {
    duration: undefined,
    className: undefined,
    zoomInLabel: undefined,
    zoomOutLabel: undefined,
    zoomInTipLabel: undefined,
    zoomOutTipLabel: undefined,
    delta: undefined
  };

  events: any = {
    'change': undefined,
    'propertychange': undefined
  };

  render() {
    return null;
  }

  componentDidMount () {
    let options = Util.getOptions(Object.assign(this.options, this.props));
    this.control = new olZoom(options);
    this.context.controls.push(this.control)

    if (this.props.controlRef) this.props.controlRef(this.control);

    let olEvents = Util.getEvents(this.events, this.props);
    for(let eventName in olEvents) {
      this.control.on(eventName, olEvents[eventName]);
    }
  }

}