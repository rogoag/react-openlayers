import * as React from 'react';

import Zoom, { Options } from 'ol/control/Zoom'

import { ControlType } from '.';
import { MapContext, MapContextType } from '../map';
import Util, { ReactOpenlayersEvent, ReactOpenlayersEvents } from '../util';

export interface ZoomProps extends Options, ControlType<Zoom> {
  onChange?: ReactOpenlayersEvent
  onPropertychange?: ReactOpenlayersEvent
};

export interface ZoomPropsEvents extends ReactOpenlayersEvents {
  'change': ReactOpenlayersEvent
  'propertychange': ReactOpenlayersEvent
};


export class ZoomReact extends React.Component<ZoomProps> {
  public static contextType: React.Context<MapContextType> = MapContext;

  public control: Zoom;

  public options: Options = {
    duration: undefined,
    className: undefined,
    zoomInLabel: undefined,
    zoomOutLabel: undefined,
    zoomInTipLabel: undefined,
    zoomOutTipLabel: undefined,
    delta: undefined
  };

  public events: ZoomPropsEvents = {
    'change': undefined,
    'propertychange': undefined
  };

  public render() { return null; }

  public componentDidMount() {
    const options = Util.getOptions<Options, ZoomProps>(this.options, this.props);
    this.control = new Zoom(options);
    this.context.controls.push(this.control)

    if (this.props.controlRef) this.props.controlRef(this.control);

    const olEvents = Util.getEvents(this.events, this.props);
    Object.keys(olEvents).forEach((eventName: string) => {
      // @ts-ignore
      this.control.on(eventName, olEvents[eventName]);
    });
  }
}