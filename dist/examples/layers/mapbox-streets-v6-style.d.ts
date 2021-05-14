import Feature from 'ol/Feature';
import Style from 'ol/style/Style';
export declare type MapboxStyleFunc = (feature: Feature, resolution: number) => Style[];
export declare const createMapboxStreetsV6Style: () => (feature: Feature<import("ol/geom").Geometry>, resolution: number) => Style[];
