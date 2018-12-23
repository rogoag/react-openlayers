import * as React from 'react';

import olFullScreen from 'ol/control/fullscreen';

import { Util } from '../util';
import { MapContext } from '../map';
import { ControlType } from 'controls';

export interface FullScreenProps extends ol.olx.control.FullScreenOptions, ControlType<olFullScreen> {};

export class FullScreen extends React.Component<FullScreenProps, any> {
  public static contextType = MapContext;

  control: olFullScreen;

  options: FullScreenProps = {
    className: undefined,
    label: undefined,
    labelActive: undefined,
    tipLabel: undefined,
    keys: undefined,
    target: undefined,
    source: undefined
  };

  events: any = {
    'change': undefined,
    'propertychange': undefined
  };

  render() { return null; }

  componentDidMount() {
    let options = Util.getOptions(Object.assign(this.options, this.props));
    this.control = new olFullScreen(options);
    this.context.controls.push(this.control)

    if (this.props.controlRef) this.props.controlRef(this.control);

    let olEvents = Util.getEvents(this.events, this.props);
    for (let eventName in olEvents) {
      this.control.on(eventName, olEvents[eventName]);
    }
  }

}