import * as GoogleMapsLoader from 'google-maps';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

export interface GoogleStreetViewPanoramaOptions {
  position: { lat: number; lng: number },
  pov: { heading: number; pitch: number },
  zoom: number
}
export type GoogleStreetViewPanoramaProps = GoogleStreetViewPanoramaOptions;

export class GoogleStreetViewPanorama extends React.Component<GoogleStreetViewPanoramaProps> {

  public static defaultProps: GoogleStreetViewPanoramaProps = {
      position: { lat: 46.9171876, lng: 17.8951832 },
      pov: { heading: 0, pitch: 0 },
      zoom: 1
  }
  public streetView: google.maps.StreetViewPanorama;

  public render() {
    return (<div style={{ height: '100%' }}></div>);
  }

  public initialize() {
    GoogleMapsLoader.load((google: GoogleMapsLoader.google) => {
      this.streetView = new google.maps.StreetViewPanorama(
        ReactDOM.findDOMNode(this) as Element,
        this.props
      );
    });
  }

  public componentDidMount() {
    this.initialize();
  }

  public componentDidUpdate() {
    this.initialize();
  }
}