import { FeatureReact, FeatureProps } from './feature';
import { Polygon } from 'ol/geom';
import Feature from 'ol/Feature';
import { Coordinate } from 'ol/coordinate';

export interface PolygonProps extends FeatureProps {
  coordinates: Coordinate[][] | number[],
  forceRefresh?: Boolean,
};

export class PolygonReact extends FeatureReact<PolygonProps> {
  public feature: Feature;
  public geometry: Polygon;

  constructor(props: PolygonProps) {
    super(props);

    this.geometry = new Polygon(this.props.coordinates);
  }

  componentWillReceiveProps(nextProps: PolygonProps) {
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
