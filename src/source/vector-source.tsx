// React
import * as React from 'react';

// OpenLayers
import VectorSource, { Options } from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Geometry from 'ol/geom/Geometry';
import Collection from 'ol/Collection';

// react-openlayers
import { SourceType } from '.';
import { VectorLayerContext, VectorLayerContextType } from '../layers/vector';
import Util, { ReactOpenlayersEvents } from '../util';

export type VectorSourceContextType = VectorSourceReact | void;
export const VectorSourceContext = React.createContext<VectorSourceContextType>(undefined);

export interface VectorSourceProps extends Options, SourceType<VectorSource> {
  
};

export interface VectorSourceEvents extends ReactOpenlayersEvents {

}

export class VectorSourceReact extends React.Component<VectorSourceProps> {
  public static contextType: React.Context<VectorLayerContextType> = VectorLayerContext;

  public source: VectorSource;
  public features: Feature<Geometry>[] | Collection<Feature<Geometry>>;

  // Default options
  public options: Options = {
    
  }

  public events: VectorSourceEvents = {

  };

  constructor(props: VectorSourceProps) {
    super(props);

    this.features = new Collection([]);
  }

  public render() {
    return (
      <VectorSourceContext.Provider value={this}>
        {this.props.children}
      </VectorSourceContext.Provider>
    );
  }

  public componentDidMount() {
    const options = Util.getOptions(this.options, this.props);
    console.log(options)
    this.context.source = new VectorSource({...options, features: this.features});
    const olEvents = Util.getEvents<VectorSourceEvents, VectorSourceProps>(this.events, this.props);
    Object.keys(olEvents).forEach((eventName: string) => {
      this.context.source.on(eventName, olEvents[eventName]);
    });
  }

  public componentWillReceiveProps(nextProps: VectorSourceProps) {
    const options = Util.getOptions<Options, VectorSourceProps>(this.options, this.props);

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