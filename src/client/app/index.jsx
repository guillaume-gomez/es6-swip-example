import React from 'react';
import { Navbar, MenuItem, Nav, NavDropdown, NavItem } from 'react-bootstrap';
import { render } from 'react-dom';

import AboutMe from "./AboutMe.react";
import Resume from "./Resume.react";
import StudentProjects from "./StudentProjects.react";
import PersonalProjects from "./PersonalProjects.react";
import Contribution from "./Contribution.react";

import { t } from "./Translations";

const Pages = [ "aboutMe" , "resume", "studentProjects", "personalProjects", "contribution"];

class App extends React.Component {

  constructor(props){
    super(props);
    [].forEach(item => {
      this[item] = this[item].bind(this);
    });
    this.state = {};
  }

  componentDidMount() {
    const params = this.getParams(window.location.search);
    if(Pages.includes(params)) {
      this.setState({ currentPage: params });
    }
  }

  updateQueryString(params) {
    //if (window.history.pushState) {
      //var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + `?page=${params}`;
      //window.history.pushState({path:newurl},'',newurl);
    //}
  }


  render () {
    return (<div><p>Hello world </p></div>);
  }
}

render(<App/>, document.getElementById('app'));