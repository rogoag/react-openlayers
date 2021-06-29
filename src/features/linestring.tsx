import { FeatureReact, FeatureProps } from './feature';
import { LineString } from 'ol/geom';
import Feature from 'ol/Feature';
import { Coordinate } from 'ol/coordinate';


export interface LineStringProps extends FeatureProps {
    coordinates: Coordinate[] | number[],
    forceRefresh?: Boolean,
}

export class LineStringReact extends FeatureReact<LineStringProps> {
  public feature: Feature;
  public geometry: LineString;


  constructor(props: LineStringProps) {
    super(props);

    this.geometry = new LineString(this.props.coordinates);
  }

  componentWillReceiveProps(nextProps: LineStringProps) {
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
