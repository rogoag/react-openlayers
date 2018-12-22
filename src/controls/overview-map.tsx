import * as React from 'react';
import ol from 'ol'
import {Util} from '../util';
import {Map} from '../map';

export type OverviewMapProps = ol.olx.control.OverviewMapOptions;

export class OverviewMap extends React.Component<OverviewMapProps, any> {

  control: ol.control.OverviewMap;

  options: OverviewMapProps = {
    collapsed: undefined,
    collapseLabel: undefined,
    collapsible  : undefined,
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

  componentDidMount () {
    let options = Util.getOptions(Object.assign(this.options, this.props));
    this.control = new ol.control.OverviewMap(options);
    this.context.mapComp.controls.push(this.control)

    let olEvents = Util.getEvents(this.events, this.props);
    for(let eventName in olEvents) {
      this.control.on(eventName, olEvents[eventName]);
    }
  }

}