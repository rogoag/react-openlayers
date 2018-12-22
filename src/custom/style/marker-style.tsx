import * as React from "react";
import * as ReactDOM from "react-dom";

import ol from 'ol'
import Style from 'ol/style/style';
import IconStyle from 'ol/style/icon';

export class MarkerStyle {
  src: string = 'https://openlayers.org/en/v4.0.1/examples/data/icon.png';

  constructor(src?: string) {
    this.src = src;
  }

  style = new Style({
    image: new IconStyle(/** @type {olx.style.IconOptions} */ ({
      src: this.src
    }))
  });

  selectStyleFunction = (feature)  => {
    return new Style({
      image: new IconStyle({
          anchor: [0.5, 0.96],
          color: '#4271AE',
          src: 'https://openlayers.org/en/v4.0.1/examples/data/dot.png'
        })
    })
  };
}