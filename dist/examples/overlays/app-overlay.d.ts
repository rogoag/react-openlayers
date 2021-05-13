import * as React from "react";
import { Popup } from "custom/popup";
import { Overlay } from "react-openlayers";
import MapBrowserEvent from 'ol/MapBrowserEvent';
export declare class AppOverlay extends React.Component {
    overlayComp: Overlay;
    popupComp: Popup;
    showPopup: (evt: MapBrowserEvent<UIEvent>) => void;
    bindOverlayComp: (comp: Overlay) => Overlay;
    bindPopupComp: (comp: Popup) => Popup;
    render(): JSX.Element;
}
