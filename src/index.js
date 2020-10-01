import _ from "lodash";
import React, { Component } from "react";
import ReactDom from "react-dom";
import './vue'
class App extends Component {
  render() {
    console.log(_.join(["1", "2", "3",]));
    return <div>test react</div>;
  }
}

ReactDom.render(<App />, document.getElementById("root"));

