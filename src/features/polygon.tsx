import { FeatureReact, FeatureProps } from './feature';
import { Polygon } from 'ol/geom';
import Feature from 'ol/Feature';
import { Coordinate } from 'ol/coordinate';

export interface PolygonProps extends FeatureProps {
  coordinates: Coordinate[][] | number[],
};

export class PolygonReact extends FeatureReact<PolygonProps> {
  public feature: Feature;

  constructor(props: PolygonProps) {
    super(props);

    this.geometry = new Polygon(this.props.coordinates);
  }

  public render() {
    return (
        null
    );
  }
}
