// import ol from 'ol';

declare namespace olFix {
  namespace olx {
    namespace interaction {
      export interface ExtentOptions {
        extent?: ol.Extent
        boxStyle?: ol.style.Style
        pixelTolerance?: number
        pointerStyle?: ol.style.Style
        wrapX?: boolean
      }
    }
  }
}