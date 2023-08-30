import * as React from 'react';

import OverviewMap, { Options } from 'ol/control/OverviewMap';

import { ControlType } from '.';
import { MapContext, MapContextType } from '../map';
import Util, { ReactOpenlayersEvent, ReactOpenlayersEvents } from '../util';

export interface OverviewMapProps extends Options, ControlType<OverviewMap> {
  onChange?: ReactOpenlayersEvent
  onPropertychange?: ReactOpenlayersEvent
};

export interface OverviewMapEvents extends ReactOpenlayersEvents {
  'change': ReactOpenlayersEvent
  'propertychange': ReactOpenlayersEvent
};

export class OverviewMapReact extends React.Component<OverviewMapProps> {
  public static contextType: React.Context<MapContextType> = MapContext;

  public control: OverviewMap;

  public options: Options = {
    collapsed: undefined,
    collapseLabel: undefined,
    collapsible: undefined,
    label: undefined,
    layers: undefined,
    render: undefined,
    target: undefined,
    tipLabel: undefined,
    view: undefined
  };

  public events: OverviewMapEvents = {
    'change': undefined,
    'propertychange': undefined
  };

  public render() { return null; }

  public componentDidMount() {
    const options = Util.getOptions<Options, OverviewMapProps>(this.options, this.props);
    this.control = new OverviewMap(options);
    this.context.controls.push(this.control)

    if (this.props.controlRef) this.props.controlRef(this.control);

    const olEvents = Util.getEvents(this.events, this.props);
    Object.keys(olEvents).forEach((eventName: string) => {
      // @ts-ignore
      this.control.on(eventName, olEvents[eventName]);
    });
  }

}