import * as React from "react";
import * as ReactDOM from "react-dom";
import ol from 'ol';
import * as GoogleMapsLoader from 'google-maps';
import {
  interaction, layer, custom, control, //name spaces
  Interactions, Overlays, Controls,     //group
  Map, Layers, Overlay, Util    //objects
} from "react-openlayers";

import Highlighter from "../Highlighter";

// GoogleMapsLoader.KEY = 'qwertyuiopasdfghjklzxcvbnm';
// GoogleMapsLoader.LIBRARIES = ['geometry', 'places'];
// GoogleMapsLoader.LANGUAGE = 'fr';

export class GoogleStreetViewPanorama extends React.Component<any,any> {
  render(){
    return (
      <div style={{height: '500px'}}>
        <custom.GoogleStreetViewPanorama
          position={{lat: 43.6613184, lng: -79.3941086}}
          pov={{heading: 90, pitch: 10}}
          zoom={1} 
         />
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