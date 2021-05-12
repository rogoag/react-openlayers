import * as React from 'react';

import MousePosition from 'ol/control/MousePosition'

import { ControlType } from '.';
import { MapContext, MapContextType } from '../map';
import { Options } from 'ol/control/MousePosition';
import Util, { ReactOpenlayersEvent, ReactOpenlayersEvents } from '../util';

export interface MousePositionProps extends Options, ControlType<MousePosition> {
  onChange?: ReactOpenlayersEvent
  onChangeCoordinateFormat?: ReactOpenlayersEvent
  onChangeProjection?: ReactOpenlayersEvent
  onPropertychange?: ReactOpenlayersEvent
};

export interface MousePositionEvents extends ReactOpenlayersEvents {
  'change': ReactOpenlayersEvent
  'change:coordinateFormat': ReactOpenlayersEvent
  'change:projection': ReactOpenlayersEvent
  'propertychange': ReactOpenlayersEvent
};

export class MousePositionReact extends React.Component<MousePositionProps> {
  public static contextType: React.Context<MapContextType> = MapContext;

  public control: MousePosition;

  public options: Options = {
    className: undefined,
    coordinateFormat: undefined,
    projection: undefined,
    render: undefined,
    target: undefined,
    undefinedHTML: undefined
  };

  public events: MousePositionEvents = {
    'change': undefined,
    'change:coordinateFormat': undefined,
    'change:projection': undefined,
    'propertychange': undefined
  };

  public render() { return null; }

  public componentDidMount() {
    const options = Util.getOptions<Options, MousePositionProps>(this.options, this.props);
    this.control = new MousePosition(options);
    this.context.controls.push(this.control)

    if (this.props.controlRef) this.props.controlRef(this.control);


    const olEvents = Util.getEvents(this.events, this.props);
    Object.keys(olEvents).forEach((eventName: string) => {
      this.control.on(eventName, olEvents[eventName]);
    });
  }
}