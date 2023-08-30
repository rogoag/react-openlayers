import * as React from 'react';

import DragAndDrop, { Options, DragAndDropEvent } from 'ol/interaction/DragAndDrop';

import { InteractionType } from '.';
import { MapContext, MapContextType } from '../map';
import Util, { ReactOpenlayersEvent, ReactOpenlayersEvents } from '../util';

export interface DragAndDropProps extends Options, InteractionType<DragAndDrop> {
  onAddfeatures?: ReactOpenlayersEvent<DragAndDropEvent>
  onChange?: ReactOpenlayersEvent
  onChangeActive?: ReactOpenlayersEvent
  onPropertychange?: ReactOpenlayersEvent
}

export interface DragAndDropEvents extends ReactOpenlayersEvents {
  'addfeatures': ReactOpenlayersEvent<DragAndDropEvent>
  'change': ReactOpenlayersEvent
  'change:active': ReactOpenlayersEvent
  'propertychange': ReactOpenlayersEvent
}

export class DragAndDropReact extends React.Component<DragAndDropProps> {
  public static contextType: React.Context<MapContextType> = MapContext;

  public interaction: DragAndDrop;

  public options: Options = {
    formatConstructors: undefined,
    projection: undefined,
    target: undefined
  };

  public events: DragAndDropEvents = {
    'addfeatures': undefined,
    'change': undefined,
    'change:active': undefined,
    'propertychange': undefined
  };

  public render() { return null; }

  public componentDidMount() {
    const options = Util.getOptions<Options, DragAndDropProps>(this.options, this.props);
    this.interaction = new DragAndDrop(options);
    this.context.interactions.push(this.interaction)

    this.initInteraction(this.props);

    const olEvents = Util.getEvents(this.events, this.props);
    Object.keys(olEvents).forEach((eventName: string) => {
      // @ts-ignore
      this.interaction.on(eventName, olEvents[eventName]);
    });
  }

  public componentWillReceiveProps(nextProps: DragAndDropProps) {
    if (nextProps !== this.props) {
      this.context.map.removeInteraction(this.interaction);
      const options = Util.getOptions<Options, DragAndDropProps>(this.options, nextProps);
      this.interaction = new DragAndDrop(options);
      this.context.map.addInteraction(this.interaction);

      this.initInteraction(nextProps);

      const olEvents = Util.getEvents(this.events, this.props);
      Object.keys(olEvents).forEach((eventName: string) => {
        // @ts-ignore
        this.interaction.on(eventName, olEvents[eventName]);
      });
    }
  }

  public componentWillUnmount() {
    this.context.map.removeInteraction(this.interaction);
  }

  private initInteraction(props: DragAndDropProps) {
    if (props.interactionRef) props.interactionRef(this.interaction);
    if (props.active !== undefined) this.interaction.setActive(props.active);
  }
}