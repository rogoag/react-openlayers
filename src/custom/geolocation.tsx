import * as React from 'react';
import Geolocation from 'ol/Geolocation';
import { layer } from '../layers/index';
import { feature } from '../features/index';
import { source } from '../source/index';
import { Coordinate } from 'ol/coordinate';
import { MapContextType, MapContext } from '../map';


export type GeolocationProps = {
  tracking: boolean;
};

type GeolocationState = {
  location: Coordinate | null;
}

export class GeolocationReact extends React.Component<GeolocationProps> {
  public static contextType: React.Context<MapContextType> = MapContext;

  public state: GeolocationState;

  private geolocation: Geolocation;

  constructor(props: GeolocationProps) {
    super(props);

    this.geolocation = new Geolocation({
      trackingOptions: {
        enableHighAccuracy: true
      },
      tracking: true
    });

    this.state = {
      location: null,
    }
  }

  public componentDidMount() {
    this.geolocation.setTracking(true);
    this.geolocation.on('change', () => {
      const view = this.context.map.getView()
      this.geolocation.setProjection(view.getProjection());
      const newPos = this.geolocation.getPosition();
      this.setState({ location: newPos });
      if(this.props.tracking) {
       view.setCenter(newPos);
      }
    });
  }

  componentWillReceiveProps(nextProps: GeolocationProps) {
    if(nextProps.tracking && nextProps.tracking !== this.props.tracking && this.state.location) {
      const view = this.context.map.getView();
      view.setCenter(this.state.location);
      view.setZoom(15);
    }
  }

  public componentWillUnmount() {
    this.geolocation.setTracking(false);
  }

  public render() {
    return (
      <layer.Vector>
        <source.VectorSourceReact>
          {this.state.location && (
            <feature.PointReact 
              coordinate={this.state.location}
              circleOptions={{radius: 6, strokeOptions: {color: '#fff', width: 2}, fillOptions: {color: '#3399CC'}}} 
            />
          )}
        </source.VectorSourceReact>
      </layer.Vector>
    );
  }
}     