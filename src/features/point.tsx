import { FeatureReact, FeatureProps } from './feature';
import { Point } from 'ol/geom';
import Feature from 'ol/Feature';
import { Coordinate } from 'ol/coordinate';

export interface PointProps extends FeatureProps {
  coordinate: Coordinate,
  forceRefresh?: Boolean,
};

export class PointReact extends FeatureReact<PointProps> {
  public feature: Feature;
  public geometry: Point;

  constructor(props: PointProps) {
    super(props);

    this.geometry = new Point(this.props.coordinate);
  }

  componentWillReceiveProps(nextProps: PointProps) {
    Object.keys(nextProps).forEach((prop: string) => {
      if(JSON.stringify(nextProps[prop]) === JSON.stringify(this.props[prop] && !this.props.forceRefresh)) return;
      const newVal = nextProps[prop];
        switch(prop) {
            case 'coordinate': this.geometry.setCoordinates(newVal); break;
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
