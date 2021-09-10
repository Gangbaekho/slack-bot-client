import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import HomePage from "../page/HomePage";
import OAuth2SuccessHandler from "../page/OAuth2SuccessHandler";

const RootRouter = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={HomePage} exact />
        <Route path="/oauth2/redirect" component={OAuth2SuccessHandler} exact />
      </Switch>
    </BrowserRouter>
  );
};

export default RootRouter;
