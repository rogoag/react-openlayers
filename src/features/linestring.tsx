import { FeatureReact, FeatureProps } from './feature';
import { LineString } from 'ol/geom';
import Feature from 'ol/Feature';
import { Coordinate } from 'ol/coordinate';

export interface LineStringProps extends FeatureProps {
  coordinates: Coordinate[],
};

export class LineStringReact extends FeatureReact<LineStringProps> {
  public feature: Feature;

  constructor(props: LineStringProps) {
    super(props);

    this.geometry = new LineString(this.props.coordinates);
  }

  public render() {
    return (
        null
    );
  }
}
