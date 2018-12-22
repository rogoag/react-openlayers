import * as React from 'react';

import olOverviewMap from 'ol/control/overviewmap'

import { Util } from '../util';
import { MapContext } from '../map';


export type OverviewMapProps = ol.olx.control.OverviewMapOptions;

export class OverviewMap extends React.Component<OverviewMapProps, any> {
  public static contextType = MapContext;

  control: olOverviewMap;

  options: OverviewMapProps = {
    collapsed: undefined,
    collapseLabel: undefined,
    collapsible: undefined,
    label: undefined,
    layers: undefined,
    render: undefined,
    target: undefined,
    tipLabel: undefined,
    view: undefined
  };

  events: any = {
    'change': undefined,
    'propertychange': undefined
  };

  render() { return null; }

  componentDidMount() {
    let options = Util.getOptions(Object.assign(this.options, this.props));
    this.control = new olOverviewMap(options);
    this.context.mapComp.controls.push(this.control)

    let olEvents = Util.getEvents(this.events, this.props);
    for (let eventName in olEvents) {
      this.control.on(eventName, olEvents[eventName]);
    }
  }

}