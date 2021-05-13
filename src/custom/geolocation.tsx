import * as React from 'react';
import Geolocation from 'ol/Geolocation';
import { Vector } from '../layers/vector';
import VectorSource from 'ol/source/Vector';
import Point from 'ol/geom/Point';


export type GeolocationProps = {
  tracking: boolean;
};

export class GeolocationReact extends React.Component<GeolocationProps> {
  private geolocation: Geolocation;
  private tracking: boolean;
  private source: VectorSource;

  constructor(props: GeolocationProps) {
    super(props);

    this.geolocation = new Geolocation({
      trackingOptions: {
        enableHighAccuracy: true
      },
      projection: this.context.map.getView().getProjection()
    });

    this.source = new VectorSource();

    this.state = {
      location: null
    }
  }

  public componentDidMount() {
    this.geolocation.setTracking(true);
    this.geolocation.on('change:position', (event) => {
      // this.source.addFeature()
    })
  }

  public componentWillUnmount() {
    this.geolocation.setTracking(false);
  }

  public render() {
    return (
      <Vector source={this.source}>
      </Vector>
    );
  }
}