import "../App.css";
import React, { Component, useState, useEffect } from "react";
import { connect } from "react-redux";
import Navbar from "./Navbar";
import MainBody from "./MainBody";
import Footer from "./Footer";
import { getClientID } from "../helpers/urls";
import { setClientID } from "../actions/authAction";
import Favicon from "react-favicon";
import { useLocation } from "react-router-dom";

function App(props) {
  let location = useLocation();
  const [myURL, setURL] = useState(location);
  useEffect(() => {
    const clientID = getClientID();
    props.dispatch(setClientID(clientID));

    console.log("Location changed - ", location);
    setURL({ myURL: location });
  }, [location]);

  console.log("Location is ", myURL);
  return (
    <div className="App">
      <Favicon url="https://images.pexels.com/photos/1517355/pexels-photo-1517355.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" />
      <Navbar />
      <MainBody />
      <Footer />
    </div>
  );
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(App);
