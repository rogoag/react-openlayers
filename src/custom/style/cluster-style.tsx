import Extent from 'ol/extent'
import Feature from 'ol/Feature'
import VectorSource from 'ol/source/Vector'
import CircleStyle from 'ol/style/circle'
import FillStyle from 'ol/style/Fill'
import RegularShapeStyle from 'ol/style/RegularShape'
import StrokeStyle from 'ol/style/Stroke'
import Style from 'ol/style/Style'
import TextStyle from 'ol/style/Text'

export class ClusterStyle {

  public maxFeatureCount: number;
  public currentResolution: number;
  public source: VectorSource;

  constructor(vectorSource: VectorSource) {
    this.source = vectorSource;
  }

  public vectorStyleFunction = (feature: Feature, resolution: number) => {
    if (resolution !== this.currentResolution) {
      this.calculateClusterInfo(resolution);
      this.currentResolution = resolution;
    }
    let style;
    const size = feature.get('features').length;
    if (size > 1) {
      style = new Style({
        image: new CircleStyle({
          radius: feature.get('radius'),
          fill: new FillStyle({
            color: [255, 153, 0, Math.min(0.8, (size / this.maxFeatureCount) + 0.4)]
          })
        }),
        text: new TextStyle({
          text: size.toString(),
          fill: new FillStyle({ color: '#fff' }),
          stroke: new StrokeStyle({ color: 'rgba(0, 0, 0, 0.6)', width: 3 })
        })
      });
    } else {
      const originalFeature = feature.get('features')[0];
      style = this.createClusterStyle(originalFeature);
    }

    return style;
  };

  public selectStyleFunction = (feature: Feature) => {
    const invisibleFill = new FillStyle({ color: 'rgba(255, 255, 255, 0.01)' });
    const styles = [new Style({
      image: new CircleStyle({
        radius: feature.get('radius'),
        fill: invisibleFill
      })
    })];
    const originalFeatures = feature.get('features');
    let originalFeature;

    for (let i = originalFeatures.length - 1; i >= 0; i = i - 1) {
      originalFeature = originalFeatures[i];
      styles.push(this.createClusterStyle(originalFeature));
    }

    return styles;
  };

  private calculateClusterInfo(resolution: number) {
    this.maxFeatureCount = 0;
    const features = this.source.getFeatures();
    let feature;
    let radius;
    for (let i = features.length - 1; i >= 0; i = i - 1) {
      feature = features[i];
      const originalFeatures = feature.get('features');
      const extent = Extent.createEmpty();
      let j;
      let jj;
      // tslint:disable-next-line
      for (j = 0, jj = originalFeatures.length; j < jj; j = j + 1) {
        Extent.extend(extent, originalFeatures[j].getGeometry().getExtent());
      }
      this.maxFeatureCount = Math.max(this.maxFeatureCount, jj);
      radius = (Extent.getWidth(extent) + Extent.getHeight(extent)) * 0.25 /
          resolution;
      feature.set('radius', radius);
    }
  }

  private createClusterStyle(feature: Feature) {
    const clusterFill = new FillStyle({ color: 'rgba(255, 153, 0, 0.8)' });
    const clusterStroke = new StrokeStyle({ color: 'rgba(255, 204, 0, 0.2)', width: 1 });
    // 2012_Earthquakes_Mag5.kml stores the magnitude of each earthquake in a
    // standards-violating <magnitude> tag in each Placemark.  We extract it
    // from the Placemark's name instead.
    const name = feature.get('name');
    const magnitude = parseFloat(name.substr(2));
    const radius = (magnitude - 5) * 20 + 5;

    return new Style({
      geometry: feature.getGeometry(),
      image: new RegularShapeStyle({
        radius1: radius,
        radius2: 3,
        points: 5,
        angle: Math.PI,
        fill: clusterFill,
        stroke: clusterStroke
      })
    });
  }
}