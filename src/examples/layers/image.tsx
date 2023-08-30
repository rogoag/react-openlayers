import * as React from "react";

import { Divider, Typography } from "@material-ui/core";

import { getCenter } from 'ol/extent';
import Projection from 'ol/proj/Projection';
import ImageStaticSource from 'ol/source/ImageStatic'

import { layer, Layers, MapReact } from "react-openlayers";

import Highlighter from "../Highlighter";

const extent: [number, number, number, number] = [0, 0, 1024, 968];
const projection = new Projection({
  code: 'xkcd-image',
  units: 'pixels',
  extent: extent
});
const view = {
  projection: projection,
  center: getCenter(extent),
  zoom: 2,
  maxZoom: 9
};
const imageSource = new ImageStaticSource({
  attributions: '© <a href="http://xkcd.com/license.html">xkcd</a>',
  url: 'https://imgs.xkcd.com/comics/online_communities.png',
  projection: projection,
  imageExtent: extent
});

export class Image extends React.Component {
  public render(){
    return (
      <div>
        <Typography variant="h4" paragraph>Image layer</Typography>
        <MapReact view={view}>
          <Layers>
            <layer.Image source={imageSource} />
          </Layers>
        </MapReact>
        <br/>
        <Divider />
        <br/>
        <Highlighter lang="jsx" code={
`<Map view={view}>
  <Layers>
    <layer.Image source={imageSource} />
  </Layers>
</Map>`
        } />
        <a href="https://github.com/allenhwkim/react-openlayers/blob/master/app/layers/image.tsx">source</a>
      </div>
    );
  }
}