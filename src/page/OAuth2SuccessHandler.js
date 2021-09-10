import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { baseURL } from "../const";

class OAuth2RedirectHandler extends Component {
  getUrlParameter(name) {
    name = name.replace(/[[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");

    var results = regex.exec(this.props.location.search);
    return results === null
      ? ""
      : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

  render() {
    const code = this.getUrlParameter("code");
    const error = this.getUrlParameter("error");

    if (code) {
      localStorage.setItem("code", code);
      fetch(baseURL + "/api/v1/tokens", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: localStorage.getItem("code") }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
      return (
        <Redirect
          to={{
            pathname: "/",
            state: { from: this.props.location },
          }}
        />
      );
    } else {
      return (
        <Redirect
          to={{
            pathname: "/login",
            state: {
              from: this.props.location,
              error: error,
            },
          }}
        />
      );
    }
  }
}

export default OAuth2RedirectHandler;
