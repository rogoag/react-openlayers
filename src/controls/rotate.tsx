import * as React from 'react';

import Rotate, { Options } from 'ol/control/Rotate'

import { ControlType } from '.';
import { MapContext, MapContextType } from '../map';
import Util, { ReactOpenlayersEvent, ReactOpenlayersEvents } from '../util';

export interface RotateProps extends Options, ControlType<Rotate> {
  onChange?: ReactOpenlayersEvent
  onPropertychange?: ReactOpenlayersEvent
};

export interface RotateEvents extends ReactOpenlayersEvents {
  'change': ReactOpenlayersEvent
  'propertychange': ReactOpenlayersEvent
};

export class RotateReact extends React.Component<RotateProps> {
  public static contextType: React.Context<MapContextType> = MapContext;

  public control: Rotate;

  public options: Options = {
    className: undefined,
    label: undefined,
    tipLabel: undefined,
    duration: undefined,
    autoHide: undefined,
    render: undefined,
    resetNorth: undefined,
    target: undefined
  };

  public events: RotateEvents = {
    'change': undefined,
    'propertychange': undefined
  };

  public render() { return null; }

  public componentDidMount() {
    const options = Util.getOptions<Options, RotateProps>(this.options, this.props);
    this.control = new Rotate(options);
    this.context.controls.push(this.control)

    if (this.props.controlRef) this.props.controlRef(this.control);

    const olEvents = Util.getEvents(this.events, this.props);
    Object.keys(olEvents).forEach((eventName: string) => {
      // @ts-ignore
      this.control.on(eventName, olEvents[eventName]);
    })
  }

}