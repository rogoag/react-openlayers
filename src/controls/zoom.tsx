import * as React from 'react';
import ol from 'ol'
import {Util} from '../util';
import {Map} from '../map';

export type ZoomProps = ol.olx.control.ZoomOptions;

export class Zoom extends React.Component<ZoomProps, any> {

  control: ol.control.Zoom;

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
    this.control = new ol.control.Zoom(options);
    this.context.mapComp.controls.push(this.control)

    let olEvents = Util.getEvents(this.events, this.props);
    for(let eventName in olEvents) {
      this.control.on(eventName, olEvents[eventName]);
    }
  }

}