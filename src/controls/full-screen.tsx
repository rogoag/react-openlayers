import * as React from 'react';

import olFullScreen from 'ol/control/fullscreen';

import { Util } from '../util';
import { MapContext } from '../map';

export type FullScreenProps = ol.olx.control.FullScreenOptions;

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
    this.context.mapComp.controls.push(this.control)

    let olEvents = Util.getEvents(this.events, this.props);
    for (let eventName in olEvents) {
      this.control.on(eventName, olEvents[eventName]);
    }
  }

}