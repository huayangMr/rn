
/*import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,ScrollView,FlatList} from 'react-native';
import Hello from './hello'
import Press, {TestProps,Interval,TestInput,DouBan} from "./Press";

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});*/

/*
type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      /!* { <View style={{flex:1}}>
          <Interval/>
            <Hello/>
          <Press />
          <TestProps name={'陈华洋'}/>
        </View>}*!/
     /!* <ScrollView style={{flex:1/!*, flexDirection:'column',justifyContent: 'space-between',alignItems: 'center'*!/}>
          <View style={{width:150,height:150,backgroundColor:'powderblue'}}><Text style={{fontSize: 40,textAlign:'center',marginTop: 20}}>ANDROID</Text></View>
          <View style={{width:150,height:150,backgroundColor:'steelblue'}}></View>
          <View style={{width:150,height:150,backgroundColor: 'skyblue'}}></View>
          <TestInput/>
          <View><Text style={{fontSize: 40,textAlign:'center',marginTop: 20}}>ANDROID</Text></View>
          <View><Text style={{fontSize: 40,textAlign:'center',marginTop: 20}}>ANDROID</Text></View>
          <View><Text style={{fontSize: 40,textAlign:'center',marginTop: 20}}>ANDROID</Text></View>
          <View><Text style={{fontSize: 40,textAlign:'center',marginTop: 20}}>ANDROID</Text></View>
      </ScrollView>*!/
        <View style={styles.container}>
          <DouBan/>
          <FlatList
          data={[{key:'hello'},{key:'hello'},{key:'hello'},{key:'hello'},{key:'hello'},{key:'hello'},{key:'hello'},{key:'hello'},{key:'hello'},{key:'hello'},{key:'hello'},
              {key:'hello'},{key:'hello'},{key:'hello'},{key:'hello'},{key:'hello'},{key:'hello'},{key:'hello'},{key:'hello'},{key:'hello'},{key:'hello'},{key:'hello'},{key:'hello'}]}
          renderItem={({item})=>{
              return <Text style={styles.item}>{item.key}</Text>
          }}
          >
          </FlatList>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
      backgroundColor:'steelblue'
  },
  item :{
    fontSize: 18,
    padding: 10,
      height:44,
      backgroundColor: 'skyblue',
      color:'white'
  } ,
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
*/



import React, { Component } from "react";

import { Image, FlatList, StyleSheet, Text, View } from "react-native";

var REQUEST_URL =
    "https://raw.githubusercontent.com/facebook/react-native/0.51-stable/docs/MoviesExample.json";

var MOCKED_MOVIES_DATA = [
    {
        title: "标题",
        year: "2015",
        posters: { thumbnail: "http://i.imgur.com/UePbdph.jpg" }
    }
];

export default class SampleAppMovies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loaded: false
        };
        // 在ES6中，如果在自定义的函数里使用了this关键字，则需要对其进行“绑定”操作，否则this的指向会变为空
        // 像下面这行代码一样，在constructor中使用bind是其中一种做法（还有一些其他做法，如使用箭头函数等）
        this.fetchData = this.fetchData.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        fetch(REQUEST_URL)
            .then(response => response.json())
            .then(responseData => {
                // 注意，这里使用了this关键字，为了保证this在调用时仍然指向当前组件，我们需要对其进行“绑定”操作
                this.setState({
                    data: this.state.data.concat(responseData.movies),
                    loaded: true
                });
            });
    }

    render() {
        if (!this.state.loaded) {
            return this.renderLoadingView();
        }

        return (
            <FlatList
                data={this.state.data}
                renderItem={this.renderMovie}
                style={styles.list}
            />
        );
    }

    renderLoadingView() {
        return (
            <View style={styles.container}>
                <Text>Loading movies...</Text>
            </View>
        );
    }

    renderMovie({ item }) {
        var movie = MOCKED_MOVIES_DATA[0];
        // { item }是一种“解构”写法，请阅读ES2015语法的相关文档
        // item也是FlatList中固定的参数名，请阅读FlatList的相关文档
        return (
            <View style={styles.container}>
                <Image
                    source={{ uri: item.posters.thumbnail }}
                    style={styles.thumbnail}
                />
                <View style={styles.rightContainer}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.year}>{item.year}</Text>
                </View>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF",
        marginTop:20
    },
    rightContainer: {
        flex:1,
        height:200,
        backgroundColor:'skyblue'
    },
    title: {
        fontSize: 20,
        marginBottom: 8,
        textAlign: "center"
    },
    year: {
        textAlign: "center"
    },
    thumbnail: {
        width: 150,
        height: 200
    },
    list: {
        paddingTop: 20,
        backgroundColor: "#F5FCFF",
        padding: 20
    }
});