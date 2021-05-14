import { FeatureReact, FeatureProps } from './feature';
import { MultiPolygon, Polygon } from 'ol/geom';
import Feature from 'ol/Feature';
import { Coordinate } from 'ol/coordinate';

export interface MultiPolygonProps extends FeatureProps {
  coordinates: (Coordinate[][] | Polygon)[],
};

export class MultiPolygonReact extends FeatureReact<MultiPolygonProps> {
  public feature: Feature;

  constructor(props: MultiPolygonProps) {
    super(props);

    this.geometry = new MultiPolygon(this.props.coordinates);
  }

  public render() {
    return (
        null
    );
  }
}
