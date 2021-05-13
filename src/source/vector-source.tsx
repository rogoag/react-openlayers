// React
import * as React from 'react';

// OpenLayers
import VectorSource, { Options } from 'ol/source/Vector';

// react-openlayers
import { SourceType } from '.';
import { VectorLayerContext, VectorLayerContextType } from '../layers/vector';
import Util, { ReactOpenlayersEvents } from '../util';


export interface VectorSourceProps extends Options, SourceType<VectorSource> {
  
};

export interface VectorSourceEvents extends ReactOpenlayersEvents {

}

export class VectorSourceReact extends React.Component<VectorSourceProps> {
  public static contextType: React.Context<VectorLayerContextType> = VectorLayerContext;

  public source: VectorSource;

  // Default options
  public options: Options = {
    
  }

  public events: VectorSourceEvents = {

  };

  public render() {
    return null;
  }

  public componentDidMount() {
    const options = Util.getOptions(this.options, this.props);
    this.source = new VectorSource(options);
    this.context.layer = this.source;
    
    const olEvents = Util.getEvents<VectorSourceEvents, VectorSourceProps>(this.events, this.props);
    Object.keys(olEvents).forEach((eventName: string) => {
      this.source.on(eventName, olEvents[eventName]);
    });
  }

  public componentWillReceiveProps(nextProps: VectorSourceProps) {
    const options = Util.getOptions<Options, VectorSourceProps>(this.options, this.props);

    // Updating options first
    Object.keys(options).forEach((option: string) => {
      if (options[option] === nextProps[option]) return;
      /* const newVal = nextProps[option];
      switch (option) {
        case 'renderOrder': this.source.set('renderOrder', newVal); break;
        case 'renderBuffer': this.source.set('renderBuffer', newVal); break;
        case 'updateWhileAnimating': this.source.set('updateWhileAnimating', newVal); break;
        case 'updateWhileInteracting': this.source.set('updateWhileInteracting', newVal); break;
        default:
      }
      */
    });

    // Then update events
    const oldEvents = Util.getEvents(this.events, this.props);
    const newEvents = Util.getEvents(this.events, nextProps);
    Object.keys(this.events).forEach((eventName: string) => {
      if (oldEvents[eventName]) this.source.un(eventName, oldEvents[eventName]);
      if (newEvents[eventName]) this.source.on(eventName, newEvents[eventName]);
    })
  }

  public componentWillUnmount() {
    this.source.dispose();
  }

}