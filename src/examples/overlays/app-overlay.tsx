import * as React from "react";

import { Divider, Typography } from "@material-ui/core";

import olProj from 'ol/proj';
import StamenSource from 'ol/source/Stamen';

import { Popup } from "custom/popup";
import { control, Controls, custom, layer, Layers, MapReact, Overlay, Overlays } from "react-openlayers";

import MapBrowserEvent from 'ol/MapBrowserEvent';

import Highlighter from "../Highlighter";

//AppOverlay to avoid conflict to Overlay
export class AppOverlay extends React.Component {
  public overlayComp: Overlay;
  public popupComp: Popup;

  public showPopup = (evt: MapBrowserEvent<any>) => {
    this.overlayComp.overlay.setPosition(evt.coordinate);
    const lonlat = olProj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');

    this.popupComp.setContents(
      `<p>You clicked here:</p><code> ${lonlat[0]}, ${lonlat[1]}</code>`
    );
    this.popupComp.show();
  }

  public bindOverlayComp = (comp: Overlay) => this.overlayComp = comp;
  public bindPopupComp = (comp: Popup) => this.popupComp = comp;

  public render(){
    return (
      <div>
        <Typography variant="h4" paragraph>Overlay</Typography>
        <MapReact onClick={this.showPopup}>
          <Layers>
            <layer.TileReact source={new StamenSource({ layer: 'watercolor' })}/>
          </Layers>
          <Controls>
            <control.FullScreenReact></control.FullScreenReact>
          </Controls>
          <Overlays>
            <Overlay ref={this.bindOverlayComp}>
              <custom.Popup ref={this.bindPopupComp}>
              </custom.Popup>
            </Overlay>
          </Overlays>
        </MapReact>
        <br/>
        <Divider />
        <br/>
        <Highlighter lang="jsx" code={
`<Map onClick={this.showPopup}>
  <Layers>
    <layer.Tile source={new StamenSource({ layer: 'watercolor' })}/>
  </Layers>
  <Overlays>
    <Overlay ref={comp => this.overlayComp = comp}>
      <custom.Popup ref={comp => this.popupComp = comp}>
      </custom.Popup>
    </Overlay>
  </Overlays>
</Map>`
        } />
        <a href="https://github.com/allenhwkim/react-openlayers/blob/master/app/overlays/app-overlay.tsx">Source Code</a>
      </div>
    );
  }

}