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
    console.log(this.context);
    this.geolocation.on('change:position', (event) => {
      const newPos = event.target.get(event.key);
      this.setState({ location: newPos });
      if(this.props.tracking) {
       const view = this.context.map.getView();
       view.setCenter(newPos);
       view.setZoom(20);
      }
    });
  }

  componentWillReceiveProps(nextProps: GeolocationProps) {
    if(nextProps.tracking && nextProps.tracking !== this.props.tracking && this.state.location) {
      const view = this.context.map.getView();
      view.setCenter(this.state.location);
      view.setZoom(20);
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
              fillOptions={{color: '#3399CC'}}
              circleOptions={{radius: 6}} 
              strokeOptions={{color: '#fff', width: 2}}
            />
          )}
        </source.VectorSourceReact>
      </layer.Vector>
    );
  }
}     