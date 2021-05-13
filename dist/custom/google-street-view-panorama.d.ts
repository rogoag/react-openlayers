import * as React from 'react';
export interface GoogleStreetViewPanoramaOptions {
    position: {
        lat: number;
        lng: number;
    };
    pov: {
        heading: number;
        pitch: number;
    };
    zoom: number;
}
export declare type GoogleStreetViewPanoramaProps = GoogleStreetViewPanoramaOptions;
export declare class GoogleStreetViewPanorama extends React.Component<GoogleStreetViewPanoramaProps> {
    static defaultProps: GoogleStreetViewPanoramaProps;
    streetView: google.maps.StreetViewPanorama;
    render(): JSX.Element;
    initialize(): void;
    componentDidMount(): void;
    componentDidUpdate(): void;
}
