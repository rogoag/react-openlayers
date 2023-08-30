import * as React from 'react';

import Extent from 'ol/interaction/Extent';

import { InteractionType } from '.';
import { MapContext, MapContextType } from '../map';
import Util, { ReactOpenlayersEvent, ReactOpenlayersEvents } from '../util';

export type ExtentOptions = olFix.olx.interaction.ExtentOptions;
export interface ExtentProps extends ExtentOptions, InteractionType<Extent> {
  onEvent?: ReactOpenlayersEvent
  onChange?: ReactOpenlayersEvent
  onChangeActive?: ReactOpenlayersEvent
  onPropertychange?: ReactOpenlayersEvent
};

export interface ExtentEvents extends ReactOpenlayersEvents {
  'Event': ReactOpenlayersEvent
  'change': ReactOpenlayersEvent
  'change:active': ReactOpenlayersEvent
  'propertychange': ReactOpenlayersEvent
};

export class ExtentReact extends React.Component<ExtentProps> {
  public static contextType: React.Context<MapContextType> = MapContext;

  public interaction: Extent;

  public options: ExtentOptions = {
    extent: undefined,
    boxStyle: undefined,
    pixelTolerance: undefined,
    pointerStyle: undefined,
    wrapX: undefined
  };

  public events: ExtentEvents = {
    'Event': undefined,
    'change': undefined,
    'change:active': undefined,
    'propertychange': undefined
  };

  public render() { return null; }

  public componentDidMount() {
    const options = Util.getOptions<ExtentOptions, ExtentProps>(this.options, this.props);
    this.interaction = new Extent(options);
    this.context.interactions.push(this.interaction)

    this.initInteraction(this.props);

    const olEvents = Util.getEvents(this.events, this.props);
    Object.keys(olEvents).forEach((eventName: string) => {
      // @ts-ignore
      this.interaction.on(eventName, olEvents[eventName]);
    });
  }

  public componentWillReceiveProps(nextProps: ExtentProps) {
    if (nextProps !== this.props) {
      this.context.map.removeInteraction(this.interaction);
      const options = Util.getOptions<ExtentOptions, ExtentProps>(this.options, nextProps);
      this.interaction = new Extent(options);
      this.context.map.addInteraction(this.interaction);

      this.initInteraction(nextProps);

      const olEvents = Util.getEvents(this.events, this.props);
      Object.keys(olEvents).forEach((eventName: string) => {
        // @ts-ignore
        this.interaction.on(eventName, olEvents[eventName]);
      })
    }
  }

  public componentWillUnmount() {
    this.context.map.removeInteraction(this.interaction);
  }

  public initInteraction(props: ExtentProps) {
    if (props.interactionRef) props.interactionRef(this.interaction);
    if (props.active !== undefined) this.interaction.setActive(props.active);
  }
}