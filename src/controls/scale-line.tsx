import * as React from 'react';

import ScaleLine, { Options } from 'ol/control/ScaleLine'

import { ControlType } from '.';
import { MapContext, MapContextType } from '../map';
import Util, { ReactOpenlayersEvent, ReactOpenlayersEvents } from '../util';

export interface ScaleLineProps extends Options, ControlType<ScaleLine> {
  onChange?: ReactOpenlayersEvent
  onChangeUnits?: ReactOpenlayersEvent
  onPropertychange?: ReactOpenlayersEvent
};

export interface ScaleLineEvents extends ReactOpenlayersEvents {
  'change': ReactOpenlayersEvent
  'change:units': ReactOpenlayersEvent
  'propertychange': ReactOpenlayersEvent
};

export class ScaleLineReact extends React.Component<ScaleLineProps> {
  public static contextType: React.Context<MapContextType> = MapContext;

  public control: ScaleLine;

  public options: Options = {
    className: undefined,
    minWidth: undefined,
    render: undefined,
    target: undefined,
    units: undefined
  };

  public events: ScaleLineEvents = {
    'change': undefined,
    'change:units': undefined,
    'propertychange': undefined
  };

  public render() { return null; }

  public componentDidMount() {
    const options = Util.getOptions<Options, ScaleLineProps>(this.options, this.props);
    this.control = new ScaleLine(options);
    this.context.controls.push(this.control)

    if (this.props.controlRef) this.props.controlRef(this.control);

    const olEvents = Util.getEvents(this.events, this.props);
    Object.keys(olEvents).forEach((eventName: string) => {
      this.control.on(eventName, olEvents[eventName]);
    })
  }

}