import * as React from 'react';

import DragPan, { Options } from 'ol/interaction/DragPan';

import { InteractionType } from '.';
import { MapContext, MapContextType } from '../map';
import Util, { ReactOpenlayersEvent, ReactOpenlayersEvents } from '../util';

export interface DragPanProps extends Options, InteractionType<DragPan> {
  onChange?: ReactOpenlayersEvent
  onChangeActive?: ReactOpenlayersEvent
  onPropertychange?: ReactOpenlayersEvent
};

export interface DragPanEvents extends ReactOpenlayersEvents {
  'change': ReactOpenlayersEvent
  'change:active': ReactOpenlayersEvent
  'propertychange': ReactOpenlayersEvent
}


export class DragPanReact extends React.Component<DragPanProps> {
  public static contextType: React.Context<MapContextType> = MapContext;

  public interaction?: DragPan;

  public options: DragPanProps = {
    condition: undefined,
    kinetic: undefined
  };

  public events: DragPanEvents = {
    'change': undefined,
    'change:active': undefined,
    'propertychange': undefined
  };

  public render() { return null; }

  public componentDidMount() {
    const options = Util.getOptions<Options, DragPanProps>(this.options, this.props);
    this.interaction = new DragPan(options);
    this.context.interactions.push(this.interaction)

    this.initInteraction(this.props);

    const olEvents = Util.getEvents(this.events, this.props);
    Object.keys(olEvents).forEach((eventName: string) => {
      this.interaction && this.interaction.on(eventName, olEvents[eventName]);
    })
  }

  public componentWillReceiveProps(nextProps: DragPanProps) {
    if (nextProps !== this.props) {
      this.context.interactions.remove(this.interaction);
      const options = Util.getOptions<Options, DragPanProps>(this.options, nextProps);
      this.interaction = new DragPan(options);
      this.context.interactions.push(this.interaction);

      this.initInteraction(nextProps);

      const olEvents = Util.getEvents(this.events, this.props);
      Object.keys(olEvents).forEach((eventName: string) => {
        this.interaction && this.interaction.on(eventName, olEvents[eventName]);
      });
    }
  }

  public componentWillUnmount() {
    this.context.interactions.remove(this.interaction);
  }

  private initInteraction(props: DragPanProps) {
    if(this.interaction) {
      if (props.interactionRef) props.interactionRef(this.interaction);
      if (props.active !== undefined) this.interaction.setActive(props.active);
    }
  }

}