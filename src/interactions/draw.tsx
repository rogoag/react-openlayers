import * as React from 'react';

import Draw, { Options } from 'ol/interaction/Draw';
import GeometryType from 'ol/geom/GeometryType';

import { InteractionType } from '.';
import { VectorSourceContext, VectorSourceContextType } from '../source/vector-source';
import Util, { ReactOpenlayersEvent, ReactOpenlayersEvents } from '../util';

export interface DrawProps extends Options, InteractionType<Draw> {
  onChange?: ReactOpenlayersEvent
  onChangeActive?: ReactOpenlayersEvent
  onDrawend?: ReactOpenlayersEvent
  onDrawstart?: ReactOpenlayersEvent
  onPropertychange?: ReactOpenlayersEvent
}

export interface DrawEvents extends ReactOpenlayersEvents {
  'change': ReactOpenlayersEvent
  'change:active': ReactOpenlayersEvent
  'drawend': ReactOpenlayersEvent
  'drawstart': ReactOpenlayersEvent
  'propertychange': ReactOpenlayersEvent
}

export class DrawReact extends React.Component<DrawProps> {
  public static contextType: React.Context<VectorSourceContextType> = VectorSourceContext;

  public interaction: Draw;

  public options: Options = {
    clickTolerance: undefined,
    features: undefined,
    snapTolerance: undefined,
    type: GeometryType.POINT,
    maxPoints: undefined,
    minPoints: undefined,
    finishCondition: undefined,
    style: undefined,
    geometryFunction: undefined,
    geometryName: undefined,
    condition: undefined,
    freehand: undefined,
    freehandCondition: undefined,
    wrapX: undefined
  };

  public events: DrawEvents = {
    'change': undefined,
    'change:active': undefined,
    'drawend': undefined,
    'drawstart': undefined,
    'propertychange': undefined
  };

  public render() { return null; }

  public componentDidMount() {
    const options = Util.getOptions<Options, DrawProps>(this.options, this.props);
    options.source = this.context.source;
    this.interaction = new Draw(options);
    this.context.context.context.interactions.push(this.interaction);

    this.initInteraction(this.props);

    const olEvents = Util.getEvents(this.events, this.props);
    Object.keys(olEvents).forEach((eventName: string) => {
      this.interaction.on(eventName, olEvents[eventName]);
    });
  }

  public componentWillReceiveProps(nextProps: DrawProps) {
    if (nextProps !== this.props) {
      this.context.context.context.interactions.remove(this.interaction);
      const options = Util.getOptions<Options, DrawProps>(this.options, nextProps);
      options.source = this.context.source;
      this.interaction = new Draw(options);
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

  private initInteraction(props: DrawProps) {
    if (props.interactionRef) props.interactionRef(this.interaction);
    if (props.active !== undefined) this.interaction.setActive(props.active);
  }

}