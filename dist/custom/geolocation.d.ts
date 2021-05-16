import * as React from 'react';
import { Coordinate } from 'ol/coordinate';
import { MapContextType } from '../map';
export declare type GeolocationProps = {
    tracking: boolean;
};
declare type GeolocationState = {
    location: Coordinate | null;
};
export declare class GeolocationReact extends React.Component<GeolocationProps> {
    static contextType: React.Context<MapContextType>;
    state: GeolocationState;
    private geolocation;
    constructor(props: GeolocationProps);
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: GeolocationProps): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export {};
