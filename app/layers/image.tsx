import * as React from "react";
import * as ReactDOM from "react-dom";

import olExtent from 'ol/extent';
import Projection from 'ol/proj/projection'
import ImageStaticSource from 'ol/source/imagestatic'

import {
  interaction, layer, custom, control, //name spaces
  Interactions, Overlays, Controls,     //group
  Map, Layers, Overlay, Util    //objects
} from "react-openlayers";

import Highlighter from "../Highlighter";

var extent: any = [0, 0, 1024, 968];
var projection = new Projection({
  code: 'xkcd-image',
  units: 'pixels',
  extent: extent
});
var view = {
  projection: projection,
  center: olExtent.getCenter(extent),
  zoom: 2,
  maxZoom: 9
};
var imageSource = new ImageStaticSource({
  attributions: '© <a href="http://xkcd.com/license.html">xkcd</a>',
  url: 'https://imgs.xkcd.com/comics/online_communities.png',
  projection: projection,
  imageExtent: extent
});

export class Image extends React.Component<any,any> {
  render(){
    return (
      <div>
        <Map view={view}>
          <Layers>
            <layer.Image source={imageSource} />
          </Layers>
        </Map>
        <a href="https://github.com/allenhwkim/react-openlayers/blob/master/app/layers/image.tsx">source</a>
        <Highlighter lang="jsx" code={
`<Map view={view}>
  <Layers>
    <layer.Image source={imageSource} />
  </Layers>
</Map>`
        } />
      </div>
    );
  }
}