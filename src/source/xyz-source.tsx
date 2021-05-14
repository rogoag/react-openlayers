// React
import * as React from 'react';

// OpenLayers
import XYZ, { Options } from 'ol/source/XYZ';

// react-openlayers
import { SourceType } from '.';
import { TileLayerContext, TileLayerContextType } from '../layers/tile';
import Util, { ReactOpenlayersEvents } from '../util';



export interface XYZProps extends Options, SourceType<XYZ> {
  
};

export interface XYZEvents extends ReactOpenlayersEvents {

}

export class XYZReact extends React.Component<XYZProps> {
  public static contextType: React.Context<TileLayerContextType> = TileLayerContext;

  public source: XYZ;

  // Default options
  public options: Options = {
    
  }

  public events: XYZEvents = {

  };

  constructor(props: XYZProps) {
    super(props);

  }

  public render() {
    return (
        null
    );
  }

  public componentDidMount() {
    const options = Util.getOptions(this.options, this.props);
    console.log(options)
    this.context.source = new XYZ(options);
    const olEvents = Util.getEvents<XYZEvents, XYZProps>(this.events, this.props);
    Object.keys(olEvents).forEach((eventName: string) => {
      this.context.source.on(eventName, olEvents[eventName]);
    });
  }

  public componentWillReceiveProps(nextProps: XYZProps) {
    const options = Util.getOptions<Options, XYZProps>(this.options, this.props);

    // Updating options first
    Object.keys(options).forEach((option: string) => {
      if (options[option] === nextProps[option]) return;
      const newVal = nextProps[option];
      switch (option) {
        case 'renderOrder': this.context.source.set('renderOrder', newVal); break;
        case 'renderBuffer': this.context.source.set('renderBuffer', newVal); break;
        case 'updateWhileAnimating': this.context.source.set('updateWhileAnimating', newVal); break;
        case 'updateWhileInteracting': this.context.source.set('updateWhileInteracting', newVal); break;
        default:
      }
    });

    // Then update events
    const oldEvents = Util.getEvents(this.events, this.props);
    const newEvents = Util.getEvents(this.events, nextProps);
    Object.keys(this.events).forEach((eventName: string) => {
      if (oldEvents[eventName]) this.context.source.un(eventName, oldEvents[eventName]);
      if (newEvents[eventName]) this.context.source.on(eventName, newEvents[eventName]);
    })
  }

  public componentWillUnmount() {
    this.context.source.dispose();
  }

}