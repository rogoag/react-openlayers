import * as React from 'react';

import Attribution, { Options } from 'ol/control/Attribution';

import { ControlType } from '.';
import { MapContext, MapContextType } from '../map';
import Util, { ReactOpenlayersEvent, ReactOpenlayersEvents } from '../util';

export interface AttributionProps extends Options, ControlType<Attribution> {
  onChange: ReactOpenlayersEvent
  onPropertychange: ReactOpenlayersEvent
};
export interface AttributionEvents extends ReactOpenlayersEvents {
  change?: ReactOpenlayersEvent
  propertychange?: ReactOpenlayersEvent
};

export class AttributionReact extends React.Component<AttributionProps> {
  public static contextType: React.Context<MapContextType> = MapContext;

  public control: Attribution;

  public options: Options = {
    className: undefined,
    target: undefined,
    collapsible: undefined,
    collapsed: undefined,
    tipLabel: undefined,
    label: undefined,
    collapseLabel: undefined,
    render: undefined
  };

  public events: AttributionEvents = {
    change: undefined,
    propertychange: undefined
  };

  public render() { return null; }

  public componentDidMount() {
    const options = Util.getOptions<Options, AttributionProps>(this.options, this.props);
    this.control = new Attribution(options);
    this.context.controls.push(this.control);

    if (this.props.controlRef) this.props.controlRef(this.control);

    const olEvents = Util.getEvents(this.events, this.props);
    Object.keys(olEvents).forEach((eventName: string) => {
      // @ts-ignore
      this.control.on(eventName, olEvents[eventName]);
    });
  }

}