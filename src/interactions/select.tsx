import * as React from 'react';

import Select, { Options, SelectEvent } from 'ol/interaction/Select';

import { InteractionType } from '.';
import { VectorSourceContext, VectorSourceContextType } from '../source/vector-source';
import Util, { ReactOpenlayersEvent, ReactOpenlayersEvents } from '../util';
import Layer from 'ol/layer/Layer';

export interface SelectProps extends Options, InteractionType<Select> {
  instance?: Select;
  onChange?: ReactOpenlayersEvent
  onChangeActive?: ReactOpenlayersEvent
  onPropertychange?: ReactOpenlayersEvent
  onSelect?: ReactOpenlayersEvent<SelectEvent>
  onAnyClick?: Function;
}

export interface SelectEvents extends ReactOpenlayersEvents {
  'change': ReactOpenlayersEvent
  'change:active': ReactOpenlayersEvent
  'propertychange': ReactOpenlayersEvent
  'select': ReactOpenlayersEvent
}

export class SelectReact extends React.Component<SelectProps> {
  public static contextType: React.Context<VectorSourceContextType> = VectorSourceContext;

  public interaction: Select;

  public options: Options = {
    addCondition: undefined,
    condition: undefined,
    layers: undefined,
    removeCondition: undefined,
    toggleCondition: undefined,
    multi: undefined,
    features: undefined,
    filter: undefined,
    hitTolerance: undefined,
  };

  public events: SelectEvents = {
    'change': undefined,
    'change:active': undefined,
    'propertychange': undefined,
    'select': undefined
  };

  public render() { return null; }

  public componentDidMount() {
    if (this.props.instance) {
      this.interaction = this.props.instance;
    } else {
      const options = Util.getOptions<Options, SelectProps>(this.options, this.props);
      this.interaction = new Select({...options, layers: this.filterLayer.bind(this)});
    }
    this.context.context.context.interactions.push(this.interaction)

    this.initInteraction(this.props);

    const olEvents = Util.getEvents(this.events, this.props);
    Object.keys(olEvents).forEach((eventName: string) => {
      this.interaction.on(eventName, olEvents[eventName]);
    });
  }

  public componentWillReceiveProps(nextProps: SelectProps) {
    if (nextProps !== this.props) {
      this.context.context.context.interactions.remove(this.interaction);

      if (this.props.instance) {
        this.interaction = this.props.instance;
      } else {
        const options = Util.getOptions<Options, SelectProps>(this.options, nextProps);
        this.interaction = new Select({...options, layers: this.filterLayer.bind(this)});
      }
      this.context.context.context.interactions.push(this.interaction);

      this.initInteraction(nextProps);

      const olEvents = Util.getEvents(this.events, this.props);
      Object.keys(olEvents).forEach((eventName: string) => {
        this.interaction.on(eventName, olEvents[eventName]);
      });
    }
  }

  public componentWillUnmount() {
    this.context.context.context.interactions.remove(this.interaction);
  }

  private initInteraction(props: SelectProps) {
    if (props.interactionRef) props.interactionRef(this.interaction);
    if (props.active !== undefined) this.interaction.setActive(props.active);
  }

  private filterLayer(layer: Layer) {
    return this.context.context.layer === layer;
  }
}