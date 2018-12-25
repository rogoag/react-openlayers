import * as React from "react";

import { Divider, Typography } from "@material-ui/core";

import { custom } from "react-openlayers";

import Highlighter from "../Highlighter";

// GoogleMapsLoader.KEY = 'qwertyuiopasdfghjklzxcvbnm';
// GoogleMapsLoader.LIBRARIES = ['geometry', 'places'];
// GoogleMapsLoader.LANGUAGE = 'fr';

export class GoogleStreetViewPanorama extends React.Component {
  public render(){
    return (
      <div style={{height: '500px'}}>
        <Typography variant="h4" paragraph>Google Street View panorama</Typography>
        <custom.GoogleStreetViewPanorama
          position={{lat: 43.6613184, lng: -79.3941086}}
          pov={{heading: 90, pitch: 10}}
          zoom={1} 
        />
        <br/>
        <Divider />
        <br/>
        <Highlighter lang="jsx" code={
`<custom.GoogleStreetViewPanorama
  position={{lat: 43.6613184, lng: -79.3941086}}
  pov={{heading: 90, pitch: 10}}
  zoom={1} 
/>`
        } />
        <a href="https://github.com/allenhwkim/react-openlayers/blob/master/app/custom/google-street-view-panorama.tsx">source</a>
      </div>
    );
  }
}