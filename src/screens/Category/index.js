//Global Libraries
import React, { Component } from "react";
import { View, Text } from "react-native";

//Local Libraries
import apis from "../../lib/apis";
import log from "../../lib/log";



class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [],
      citiesCount: 0
    };
  }

  componentDidMount() {
    this.getData();
  }


  getData = () => {
    // apis
    //   .getCities()
    //   .then(res => {
    //     if (res.ok) {
    //       log.success("API Calling Success :-", res.data);
    //       this.setState({
    //         cities: res.data.cities,
    //         citiesCount: res.data.count
    //       });
    //     } else {
    //       log.error("API Calling Failed :-", res.problem);
    //       log.info("API Calling Failed Detail:-", res);
    //     }
    //   })
    //   .catch(err => {
    //     log.error("API Calling Failed :-", err);
    //   });
  };



  render() {
    return (
      <View>
        <Text>
          Jelllo
       </Text>
      </View>
    );
  }
}


export default Category
