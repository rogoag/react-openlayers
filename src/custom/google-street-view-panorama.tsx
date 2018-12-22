import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as GoogleMapsLoader from 'google-maps';


export interface GoogleStreetViewPanoramaOptions {
  position: {lat: number, lng: number},
  pov: {heading: number, pitch: number},
  zoom: number
}
export interface GoogleStreetViewPanoramaProps {
  streetViewPanoramaOptions?: GoogleStreetViewPanoramaOptions
}

export class GoogleStreetViewPanorama extends React.Component<any, any> {
  streetView: google.maps.StreetViewPanorama;

  render() {
    return (<div style={{height: '100%'}}></div>);
  }

  initialize() {
    GoogleMapsLoader.load(google => {
      this.streetView = new google.maps.StreetViewPanorama(
        ReactDOM.findDOMNode(this),
        this.props
      );
    });
  }

  componentDidMount () {
    this.initialize();
  }

  componentDidUpdate () {
    this.initialize();
  }

  static defaultProps = {
    streetViewPanoramaOptions : {
      position: {lat: 46.9171876, lng: 17.8951832},
      pov: {heading: 0, pitch: 0},
      zoom: 1
    }
  }
}