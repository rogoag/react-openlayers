import * as React from 'react';
import ol from 'ol'
import {Util} from '../util';
import {Map} from '../map';

export type ScaleLineProps = ol.olx.control.ScaleLineOptions;

export class ScaleLine extends React.Component<ScaleLineProps, any> {

  control: ol.control.ScaleLine;

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
    this.control = new ol.control.ScaleLine(options);
    this.context.mapComp.controls.push(this.control)

    let olEvents = Util.getEvents(this.events, this.props);
    for(let eventName in olEvents) {
      this.control.on(eventName, olEvents[eventName]);
    }
  }

}