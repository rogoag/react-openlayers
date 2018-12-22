import * as React from 'react';

import olZoomToExtent from 'ol/control/zoomtoextent'

import { MapContext } from '../map';
import { Util } from '../util';

export type ZoomToExtentProps = ol.olx.control.ZoomToExtentOptions;


export class ZoomToExtent extends React.Component<ZoomToExtentProps, any> {
  public static contextType = MapContext;

  control: olZoomToExtent;

  options: ZoomToExtentProps = {
    className: undefined,
    target: undefined,
    label: undefined,
    tipLabel: undefined,
    extent: undefined
  };

  events: any = {
    'change': undefined,
    'propertychange': undefined
  };

  render() { return null; }

  componentDidMount () {
    let options = Util.getOptions(Object.assign(this.options, this.props));
    this.control = new olZoomToExtent(options);
    this.context.mapComp.controls.push(this.control)

    let olEvents = Util.getEvents(this.events, this.props);
    for(let eventName in olEvents) {
      this.control.on(eventName, olEvents[eventName]);
    }
  }

}