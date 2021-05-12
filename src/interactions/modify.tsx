import * as React from 'react';

import Modify, { Options } from 'ol/interaction/Modify';

import { InteractionType } from '.';
import { MapContext, MapContextType } from '../map';
import Util, { ReactOpenlayersEvent, ReactOpenlayersEvents } from '../util';

export interface ModifyProps extends Options, InteractionType<Modify> {
  onChange?: ReactOpenlayersEvent
  onChangeActive?: ReactOpenlayersEvent
  onModifyend?: ReactOpenlayersEvent
  onModifystart?: ReactOpenlayersEvent
  onPropertychange?: ReactOpenlayersEvent
};

export interface ModifyEvents extends ReactOpenlayersEvents {
  'change': ReactOpenlayersEvent
  'change:active': ReactOpenlayersEvent
  'modifyend': ReactOpenlayersEvent
  'modifystart': ReactOpenlayersEvent
  'propertychange': ReactOpenlayersEvent
};

export class ModifyReact extends React.Component<ModifyProps> {
  public static contextType: React.Context<MapContextType> = MapContext;

  public interaction: Modify;

  public options: Options = {
    condition: undefined,
    deleteCondition: undefined,
    pixelTolerance: undefined,
    style: undefined,
    features: undefined,
    wrapX: undefined
  };

  public events: ModifyEvents = {
    'change': undefined,
    'change:active': undefined,
    'modifyend': undefined,
    'modifystart': undefined,
    'propertychange': undefined
  };

  public render() { return null; }

  public componentDidMount() {
    const options = Util.getOptions<Options, ModifyProps>(this.options, this.props);
    this.interaction = new Modify(options);
    this.context.interactions.push(this.interaction);

    this.initInteraction(this.props);

    const olEvents = Util.getEvents(this.events, this.props);
    Object.keys(olEvents).forEach((eventName: string) => {
      this.interaction.on(eventName, olEvents[eventName]);
    });
  }

  public componentWillReceiveProps(nextProps: ModifyProps) {
    if (nextProps !== this.props) {
      this.context.map.removeInteraction(this.interaction);
      const options = Util.getOptions<Options, ModifyProps>(this.options, nextProps);
      this.interaction = new Modify(options);
      this.context.map.addInteraction(this.interaction);

      this.initInteraction(nextProps);

      const olEvents = Util.getEvents(this.events, this.props);
      Object.keys(olEvents).forEach((eventName: string) => {
        this.interaction.on(eventName, olEvents[eventName]);
      })
    }
  }

  public componentWillUnmount() {
    this.context.map.removeInteraction(this.interaction);
  }

  private initInteraction(props: ModifyProps) {
    if (props.interactionRef) props.interactionRef(this.interaction);
    if (props.active !== undefined) this.interaction.setActive(props.active);
  }
}