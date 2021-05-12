import * as React from 'react';

import FullScreen, { Options } from 'ol/control/FullScreen';

import { ControlType } from '.';
import { MapContext, MapContextType } from '../map';
import Util, { ReactOpenlayersEvent, ReactOpenlayersEvents } from '../util';

export interface FullScreenProps extends Options, ControlType<FullScreen> {
  onchange?: ReactOpenlayersEvent
  onpropertychange?: ReactOpenlayersEvent
};

export interface FullScreenEvents extends ReactOpenlayersEvents {
  'change': ReactOpenlayersEvent
  'propertychange': ReactOpenlayersEvent
};

export class FullScreenReact extends React.Component<FullScreenProps> {
  public static contextType: React.Context<MapContextType> = MapContext;

  public control: FullScreen;

  public options: Options = {
    className: undefined,
    label: undefined,
    labelActive: undefined,
    tipLabel: undefined,
    keys: undefined,
    target: undefined,
    source: undefined
  };

  public events: FullScreenEvents = {
    'change': undefined,
    'propertychange': undefined
  };

  public render() { return null; }

  public componentDidMount() {
    const options = Util.getOptions<Options, FullScreenProps>(this.options, this.props);
    this.control = new FullScreen(options);
    this.context.controls.push(this.control)

    if (this.props.controlRef) this.props.controlRef(this.control);

    const olEvents = Util.getEvents(this.events, this.props);
    Object.keys(olEvents).forEach((eventName: string) => {
      this.control.on(eventName, olEvents[eventName]);
    });
  }

}