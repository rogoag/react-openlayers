import Feature from 'ol/Feature';
import VectorSource from 'ol/source/Vector';
import Style from 'ol/style/Style';
export declare class ClusterStyle {
    maxFeatureCount: number;
    currentResolution: number;
    source: VectorSource;
    constructor(vectorSource: VectorSource);
    vectorStyleFunction: (feature: Feature<import("ol/geom").Geometry>, resolution: number) => Style;
    selectStyleFunction: (feature: Feature<import("ol/geom").Geometry>) => Style[];
    private calculateClusterInfo;
    private createClusterStyle;
}
