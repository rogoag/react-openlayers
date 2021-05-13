import * as React from "react";
import Map from 'ol/Map';
export declare class DragAndDrop extends React.Component {
    map: Map;
    handleAddFeatures: () => void;
    render(): JSX.Element;
    private handleMapRef;
}
