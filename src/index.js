import _ from "lodash";
import React, { Component } from "react";
import ReactDom from "react-dom";
import fn from './vue.js'
import './index.css'
import './index.less'
import json from './json/loader-test.json'
fn()
class App extends Component {
  render() {
    console.log(_.join(["1", "2", "3",]));
    return <div>
        <p>test react</p>
        {/* <pre>
          {{json}}
        </pre> */}
      </div>;
  }
}

ReactDom.render(<App />, document.getElementById("root"));

