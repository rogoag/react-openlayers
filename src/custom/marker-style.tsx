import * as React from "react";
import * as ReactDOM from "react-dom";
import ol from 'ol'

// Why the hell do we have src/custom/marker-style and src/custom/style/marker-style ??
export class MarkerStyle {
  src: string = 'https://openlayers.org/en/v4.0.1/examples/data/icon.png';

  style = new ol.style.Style({
    image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
      src: this.src
    }))
  });

  constructor(src?: string) {
    this.src = src;
    // return this.style;
  }

  selectStyleFunction = (feature)  => {
    return new ol.style.Style({
      image: new ol.style.Icon({
          anchor: [0.5, 0.96],
          color: '#4271AE',
          src: 'https://openlayers.org/en/v4.0.1/examples/data/dot.png'
        })
    })
  };
}