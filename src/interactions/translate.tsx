import * as React from 'react';

import Translate, { Options } from 'ol/interaction/Translate';

import { InteractionType } from '.';
import { MapContext, MapContextType } from '../map';
import Util, { ReactOpenlayersEvent, ReactOpenlayersEvents } from '../util';

export interface TranslateProps extends Options, InteractionType<Translate> {
  onChange?: ReactOpenlayersEvent
  onChangeActive?: ReactOpenlayersEvent
  onPropertychange?: ReactOpenlayersEvent
  onTranslateend?: ReactOpenlayersEvent
  onTranslatestart?: ReactOpenlayersEvent
  onTranslating?: ReactOpenlayersEvent
};
export interface TranslateEvents extends ReactOpenlayersEvents {
  'change': ReactOpenlayersEvent
  'change:active': ReactOpenlayersEvent
  'propertychange': ReactOpenlayersEvent
  'translateend': ReactOpenlayersEvent
  'translatestart': ReactOpenlayersEvent
  'translating': ReactOpenlayersEvent
};

export class TranslateReact extends React.Component<TranslateProps> {
  public static contextType: React.Context<MapContextType> = MapContext;

  public interaction: Translate;

  public options: Options = {
    features: undefined,
    layers: undefined
  };

  public events: TranslateEvents = {
    'change': undefined,
    'change:active': undefined,
    'propertychange': undefined,
    'translateend': undefined,
    'translatestart': undefined,
    'translating': undefined
  };

  public render() { return null; }

  public componentDidMount () {
    const options = Util.getOptions<Options, TranslateProps>(this.options, this.props);
    this.interaction = new Translate(options);
    this.context.interactions.push(this.interaction)

    this.initInteraction(this.props);
    
    const olEvents = Util.getEvents(this.events, this.props);
    Object.keys(olEvents).forEach((eventName: string) => {
      this.interaction.on(eventName, olEvents[eventName]);
    });
  }

  public componentWillReceiveProps(nextProps: TranslateProps) {
    if (nextProps !== this.props) {
      this.context.map.removeInteraction(this.interaction);
      const options = Util.getOptions<Options, TranslateProps>(this.options, nextProps);
      this.interaction = new Translate(options);
      this.context.map.addInteraction(this.interaction);

      this.initInteraction(nextProps);

      const olEvents = Util.getEvents(this.events, this.props);
      Object.keys(olEvents).forEach((eventName: string) => {
        this.interaction.on(eventName, olEvents[eventName]);
      });
    }
  }
  
  public componentWillUnmount () {
    this.context.map.removeInteraction(this.interaction);
  }

  private initInteraction(props: TranslateProps) {
    if (props.interactionRef) props.interactionRef(this.interaction);
    if (props.active !== undefined) this.interaction.setActive(props.active);
  }
}