import * as React from 'react';

import Modify, { Options } from 'ol/interaction/Modify';

import { InteractionType } from '.';
import { VectorSourceContext, VectorSourceContextType } from '../source/vector-source';
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
  public static contextType: React.Context<VectorSourceContextType> = VectorSourceContext;

  public interaction: Modify;

  public options: Options = {
    condition: undefined,
    deleteCondition: undefined,
    pixelTolerance: undefined,
    style: undefined,
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
    options.features = this.context.features;
    console.log('FEATURES', this.context.features);
    this.interaction = new Modify(options);
    this.context.context.context.interactions.push(this.interaction);

    this.initInteraction(this.props);

    const olEvents = Util.getEvents(this.events, this.props);
    Object.keys(olEvents).forEach((eventName: string) => {
      this.interaction.on(eventName, olEvents[eventName]);
    });
  }

  public componentWillReceiveProps(nextProps: ModifyProps) {
    if (nextProps !== this.props) {
      console.log(this.context.context)
      this.context.context.context.interactions.remove(this.interaction);
      const options = Util.getOptions<Options, ModifyProps>(this.options, nextProps);
      options.features = this.context.features;
      this.interaction = new Modify(options);
      this.context.context.context.interactions.push(this.interaction);

      this.initInteraction(nextProps);

      const olEvents = Util.getEvents(this.events, this.props);
      Object.keys(olEvents).forEach((eventName: string) => {
        this.interaction.on(eventName, olEvents[eventName]);
      })
    }
  }

  public componentWillUnmount() {
    this.context.context.context.interactions.remove(this.interaction);
  }

  private initInteraction(props: ModifyProps) {
    if (props.interactionRef) props.interactionRef(this.interaction);
    if (props.active !== undefined) this.interaction.setActive(props.active);
  }
}