import { GoogleStreetViewPanorama } from './google-street-view-panorama';
import { Popup } from './popup';
import { ClusterStyle } from './style/cluster-style';
import { MarkerStyle } from './style/marker-style';
declare const custom: {
    style: {
        MarkerStyle: typeof MarkerStyle;
        ClusterStyle: typeof ClusterStyle;
    };
    control: {};
    Popup: typeof Popup;
    GoogleStreetViewPanorama: typeof GoogleStreetViewPanorama;
};
export { custom };