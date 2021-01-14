//Global Libraries
import React, { Component } from "react";
import { View, Text } from "react-native";

import { colors, fonts, images } from "../../theme";

class Landing extends Component {


  renderLoading = () => (
    <View>
      <Text style={{ fontFamily: fonts.pbo, alignSelf: 'center', fontSize: 20 }}>Welcome...</Text>
    </View>
  );

  render() {
    return <View style={{ backgroundColor: colors.warning, flex: 1, justifyContent: 'center' }}>{this.renderLoading()}</View>;
  }

}



export default Landing
