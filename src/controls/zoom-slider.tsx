import * as React from 'react';
import ol from 'ol'
import {Util} from '../util';
import {Map} from '../map';

export type ZoomSliderProps = ol.olx.control.ZoomSliderOptions;

export class ZoomSlider extends React.Component<ZoomSliderProps, any> {

  control: ol.control.ZoomSlider;

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
    this.control = new ol.control.ZoomSlider(options);
    this.context.mapComp.controls.push(this.control)

    let olEvents = Util.getEvents(this.events, this.props);
    for(let eventName in olEvents) {
      this.control.on(eventName, olEvents[eventName]);
    }
  }

}