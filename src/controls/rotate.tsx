import * as React from 'react';
import ol from 'ol'
import {Util} from '../util';
import {Map} from '../map';

export type RotateProps = ol.olx.control.RotateOptions;

export class Rotate extends React.Component<RotateProps, any> {

  control: ol.control.Rotate;

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
    this.control = new ol.control.Rotate(options);
    this.context.mapComp.controls.push(this.control)

    let olEvents = Util.getEvents(this.events, this.props);
    for(let eventName in olEvents) {
      this.control.on(eventName, olEvents[eventName]);
    }
  }

}