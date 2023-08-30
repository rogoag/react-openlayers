import * as React from 'react';

import ZoomToExtent, { Options } from 'ol/control/ZoomToExtent'

import { ControlType } from '.';
import { MapContext, MapContextType } from '../map';
import Util, { ReactOpenlayersEvent, ReactOpenlayersEvents } from '../util';

export interface ZoomToExtentProps extends Options, ControlType<ZoomToExtent> {
  onChange?: ReactOpenlayersEvent
  onPropertychange?: ReactOpenlayersEvent
};

export interface ZoomToExtentEvents extends ReactOpenlayersEvents {
  'change': ReactOpenlayersEvent
  'propertychange': ReactOpenlayersEvent
};

export class ZoomToExtentReact extends React.Component<ZoomToExtentProps> {
  public static contextType: React.Context<MapContextType> = MapContext;

  public control: ZoomToExtent;

  public options: Options = {
    className: undefined,
    target: undefined,
    label: undefined,
    tipLabel: undefined,
    extent: undefined
  };

  public events: ZoomToExtentEvents = {
    'change': undefined,
    'propertychange': undefined
  };

  public render() { return null; }

  public componentDidMount() {
    const options = Util.getOptions<Options, ZoomToExtentProps>(this.options, this.props);
    this.control = new ZoomToExtent(options);
    this.context.controls.push(this.control)

    if (this.props.controlRef) this.props.controlRef(this.control);

    const olEvents = Util.getEvents(this.events, this.props);
    Object.keys(olEvents).forEach((eventName: string) => {
      // @ts-ignore
      this.control.on(eventName, olEvents[eventName]);
    })
  }
}