import * as React from "react";
import Draw from 'ol/interaction/Draw';
import olSelect from 'ol/interaction/Select';
import VectorSource from 'ol/source/Vector';
import GeometryType from 'ol/geom/GeometryType';
interface SnapState {
    drawType: GeometryType;
    activeInteraction: 'draw' | 'modify';
}
interface Draws {
    Point: Draw | void;
    LineString: Draw | void;
    Polygon: Draw | void;
    Circle: Draw | void;
}
export declare class Snap extends React.Component<{}, SnapState> {
    source: VectorSource;
    draws: Draws;
    select: olSelect;
    state: SnapState;
    constructor(props: {});
    handleDrawTypeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    handleInteractionChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    handleSelectChangeActive: () => void;
    render(): JSX.Element;
}
export {};
