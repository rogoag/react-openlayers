import * as React from 'react';

import ZoomSlider, { Options } from 'ol/control/ZoomSlider'

import { ControlType } from '.';
import { MapContext, MapContextType } from '../map';
import Util, { ReactOpenlayersEvent, ReactOpenlayersEvents } from '../util';

export interface ZoomSliderProps extends Options, ControlType<ZoomSlider> {
  onChange?: ReactOpenlayersEvent
  onPropertychange?: ReactOpenlayersEvent
};

export interface ZoomSliderEvents extends ReactOpenlayersEvents {
  'change': ReactOpenlayersEvent
  'propertychange': ReactOpenlayersEvent
};

export class ZoomSliderReact extends React.Component<ZoomSliderProps> {
  public static contextType: React.Context<MapContextType> = MapContext;

  public control: ZoomSlider;

  public options: Options = {
    duration: undefined,
    className: undefined,
    render: undefined
  };

  public events: ZoomSliderEvents = {
    'change': undefined,
    'propertychange': undefined
  };

  public render() { return null; }

  public componentDidMount() {
    const options = Util.getOptions<Options, ZoomSliderProps>(this.options, this.props);
    this.control = new ZoomSlider(options);
    this.context.controls.push(this.control)

    if (this.props.controlRef) this.props.controlRef(this.control);

    const olEvents = Util.getEvents(this.events, this.props);
    Object.keys(olEvents).forEach((eventName: string) => {
      this.control.on(eventName, olEvents[eventName]);
    });
  }

}