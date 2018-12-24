import * as React from "react";
import * as ReactDOM from "react-dom";

import {Route, HashRouter} from 'react-router-dom';

import {App} from './app';

ReactDOM.render((
  <HashRouter>
    <Route path="/" component={App} />
  </HashRouter>
), document.getElementById('app'));
