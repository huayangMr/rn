import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Button,FlatList} from 'react-native';

export default class busList extends Component{
    constructor(){
        super();
        this.state={
            responseData:null
        }
    }

    componentDidMount() {
        var locationxy = this.props.navigation.state.params.longtude+","+this.props.navigation.state.params.latude;
        var requestUrl = 'http://api.map.baidu.com/parking/search?location='+locationxy+ '&coordtype=bd09ll&ak=xpRlqc6iqwTyBSjdfPnun3I9tpLE7VRG&mcode=B5:2C:4F:1A:8F:02:7D:19:72:19:34:D0:E9:8E:C8:6D:26:3E:69:63;com.weatherapp'
        fetch(requestUrl)
            .then(response=>response.json())
            .then(responseCode=>{
               // console.warn(JSON.stringify(responseCode.recommendStops))
                this.setState({responseData: responseCode.recommendStops});
            })
            .catch(error=>{
                console.warn("获取上车点错误")
            })
    }

    render(){
        return(
            <View style={{flex: 1}}>
                <Text style={styles.title}>Bus List</Text>
                <FlatList style={styles.list} data={this.state.responseData}  renderItem = {this.listRender} />
            </View>
        );
    }

    listRender({item}){
        return(
            <View style={styles.box}>
                <View style={{flex:7}}>
                <Button style={{fontSize:20}} title={item.name}></Button>
                </View>
                <View style={{flex:3}}>
                    <Text style={{textAlign: 'right'}}>{item.distance} m</Text>
                </View>
                </View>
        );
    }
}

const styles = StyleSheet.create(
    {
        box:{flexDirection: 'row',backgroundColor:'#0000',marginTop: 20},
        list:{flex:1,backgroundColor:'white'},
        title:{fontSize: 35,textAlign: 'center',backgroundColor: 'white'}
    }
)