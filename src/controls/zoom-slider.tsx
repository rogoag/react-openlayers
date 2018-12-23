import * as React from 'react';

import olZoomSlider from 'ol/control/zoomslider'

import { MapContext } from '../map';
import { Util } from '../util';
import { ControlType } from 'controls';

export interface ZoomSliderProps extends ol.olx.control.ZoomSliderOptions, ControlType<olZoomSlider> {};

export class ZoomSlider extends React.Component<ZoomSliderProps, any> {
  public static contextType = MapContext;

  control: olZoomSlider;

  options: ZoomSliderProps = {
    duration: undefined,
    className: undefined,
    maxResolution: undefined,
    minResolution: undefined,
    render: undefined
  };

  events: any = {
    'change': undefined,
    'propertychange': undefined
  };

  render() { return null; }

  componentDidMount () {
    let options = Util.getOptions(Object.assign(this.options, this.props));
    this.control = new olZoomSlider(options);
    this.context.mapComp.controls.push(this.control)

    if (this.props.controlRef) this.props.controlRef(this.control);

    let olEvents = Util.getEvents(this.events, this.props);
    for(let eventName in olEvents) {
      this.control.on(eventName, olEvents[eventName]);
    }
  }

}