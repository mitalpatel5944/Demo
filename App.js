/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Dimensions,
  Keyboard,
} from 'react-native';

const { height, width } = Dimensions.get('window')

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      row: '',
      column: '',
      data: []
    }
  }


  spiral = (NumCol, NumRow) => {
    const arr = [];
    // these for loop for number of row
    for (let i = 0; i < NumRow; i++) {
      arr.push([]);
    }
    let count = 1, endColumn = NumCol - 1, colIndex = 0, rowend = NumRow - 1, rowbegin = 0
    while (colIndex <= endColumn && rowbegin <= rowend) {
      // for top of the row in array
      for (let i = colIndex; i <= endColumn; i++) {
        arr[rowbegin][i] = count;
        count++;
      }
      rowbegin++;
      // for right of the column in array
      for (let i = rowbegin; i <= rowend; i++) {
        arr[i][endColumn] = count;
        count++;
      }
      endColumn--;
      // for bottom of the row in array
      for (let i = endColumn; i >= colIndex; i--) {
        arr[rowend][i] = count;
        count++;
      }
      rowend--;
      // in array top started row
      for (let i = rowend; i >= rowbegin; i--) {
        arr[i][colIndex] = count;
        count++;
      }
      colIndex++;
    }
    this.setState({ data: arr })
  }

  getArrayData = () => {
    if (this.state.row.length == 0) {
      alert("Please Enter Row")
    }
    else if (this.state.column.length == 0) {
      alert("Please Enter Column")
    } else {
      Keyboard.dismiss()
      this.spiral(parseInt(this.state.column), parseInt(this.state.row))
    }
  }

  renderInputs = () => {
    return (
      <View style={styles.inputStyle}>
        <Text style={styles.cross}>Matrix : </Text>
        <View style={styles.inputStyle}>
          <TextInput
            keyboardType={'decimal-pad'}
            value={this.state.row}
            style={styles.inputText}
            placeholder={'Row'}
            onChangeText={(text) => {
              this.setState({ row: text })
            }}
          />
          <Text style={styles.cross}>X</Text>
          <TextInput
            keyboardType={'decimal-pad'}
            value={this.state.column}
            style={styles.inputText}
            placeholder={'column'}
            onChangeText={(text) => {
              this.setState({ column: text })
            }}
          />
        </View>
      </View>
    )
  }

  renderButton = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.getArrayData()
        }}
        style={styles.btn}>
        <Text style={styles.display}>Display</Text>
      </TouchableOpacity>
    )
  }

  renderItem = ({ item, index }) => {
    let rowNum = this.state.row.length == 0 ? 1 : parseInt(this.state.row),
      colNum = this.state.column.length == 0 ? 1 : parseInt(this.state.column)
    console.log(colNum, rowNum);
    return (
      <ScrollView horizontal contentContainerStyle={{ flex: 1, marginHorizontal: 1, justifyContent: 'center' }}>
        {item.map(i => (
          <View style={[styles.squre, {
            width: width / colNum,
            height: (height - 150) / rowNum
          }]}>
            <Text numberOfLines={1} style={{
              fontSize: 10,
            }}>{i}</Text>
          </View>))}
      </ScrollView>
    )
  }

  renderTable = () => {
    return (
      <View>
        <FlatList
          data={this.state.data}
          listKey={(item, index) => 'D' + index.toString()}
          keyExtractor={(item, index) => item.id}
          renderItem={this.renderItem}
        />
      </View>
    )
  }
  render() {
    return (
      <View>
        {this.renderInputs()}
        {this.renderButton()}
        {this.renderTable()}
      </View>
    )
  }
}

export default App;

const styles = StyleSheet.create({
  inputStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    alignSelf: 'center',
    alignItems: 'center'
  },
  btn: {
    alignSelf: 'center',
    backgroundColor: 'green',
    borderRadius: 30,
    margin: 5
  },
  display: {
    padding: 10,
    color: 'white',
    fontWeight: 'bold'
  },
  cross: { textAlign: 'center' },
  squre: {
    borderWidth: 1,
    borderColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  inputText: {
    width: '40%',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10
  }
})
