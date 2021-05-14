import { FeatureReact, FeatureProps } from './feature';
import { Point } from 'ol/geom';
import Feature from 'ol/Feature';
import { Coordinate } from 'ol/coordinate';

export interface PointProps extends FeatureProps {
  coordinate: Coordinate,
};

export class PointReact extends FeatureReact<PointProps> {
  public feature: Feature;

  constructor(props: PointProps) {
    super(props);

    this.geometry = new Point(this.props.coordinate);
  }

  public render() {
    return (
        null
    );
  }
}
