import * as React from 'react'; 

import { DefaultsOptions } from 'ol/interaction';


export type InteractionsProps = DefaultsOptions;

export class Interactions extends React.Component<InteractionsProps> {
  public render() {
    return (<div>{this.props.children}</div>);
  }
}