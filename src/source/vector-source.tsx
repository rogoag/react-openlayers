// React
import * as React from 'react';

// OpenLayers
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Geometry from 'ol/geom/Geometry';
import Collection from 'ol/Collection';
import { AttributionLike } from 'ol/source/Source';

// react-openlayers
import { SourceType } from '.';
import { VectorLayerContext, VectorLayerContextType } from '../layers/vector';

export type VectorSourceContextType = VectorSourceReact | void;
export const VectorSourceContext = React.createContext<VectorSourceContextType>(undefined);

export interface VectorSourceProps extends SourceType<VectorSource> {
  attributions?: AttributionLike;
  url?: string;
  useSpatialIndex?: boolean;
  wrapX?: boolean;
};

export class VectorSourceReact extends React.Component<VectorSourceProps> {
  public static contextType: React.Context<VectorLayerContextType> = VectorLayerContext;

  public source: VectorSource;
  public features: Feature<Geometry>[] | Collection<Feature<Geometry>>;

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
    this.context.source = new VectorSource({...this.props, features: this.features});
  }

  public componentWillReceiveProps(nextProps: VectorSourceProps) {
    // Updating options first
    Object.keys(nextProps).forEach((option: string) => {
      if (nextProps[option] === this.props[option]) return;
      const newVal = nextProps[option];
      switch (option) {
        case 'url':
          this.context.source.setUrl(newVal);
        case 'attributions':
          this.context.source.setAttributions(newVal);
        default:
      }
    });
  }

  public componentWillUnmount() {
    this.context.source.dispose();
  }

}