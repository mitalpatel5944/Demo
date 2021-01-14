import React, { Component } from "react";
import { StatusBar, View } from "react-native";
import Router from "../navigation";
import Landing from '../screens/landing'
import { colors } from "../theme";

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      Splash: true
    }
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ Splash: false })
    }, 3000);
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor={colors.black} barStyle={'dark'} />
        {this.state.Splash ? <Landing /> : <Router />}
      </View>
    );
  }
}
