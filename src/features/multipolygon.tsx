import { FeatureReact, FeatureProps } from './feature';
import { MultiPolygon, Polygon } from 'ol/geom';
import Feature from 'ol/Feature';
import { Coordinate } from 'ol/coordinate';

export interface MultiPolygonProps extends FeatureProps {
  coordinates: (Coordinate[][] | Polygon)[],
  forceRefresh?: Boolean,
};

export class MultiPolygonReact extends FeatureReact<MultiPolygonProps> {
  public feature: Feature
  public geometry: MultiPolygon;

  constructor(props: MultiPolygonProps) {
    super(props);

    this.geometry = new MultiPolygon(this.props.coordinates);
  }

  componentWillReceiveProps(nextProps: MultiPolygonProps) {
    Object.keys(nextProps).forEach((prop: string) => {
      if(JSON.stringify(nextProps[prop]) === JSON.stringify(this.props[prop] && !this.props.forceRefresh)) return;
      const newVal = nextProps[prop];
        switch(prop) {
            case 'coordinates': this.geometry.setCoordinates(newVal); break;
            default:
                this.handleStyleUpdates(prop, nextProps);
        }
    });
  }

  public render() {
    return (
        null
    );
  }
}
