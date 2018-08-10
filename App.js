import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Button,PermissionsAndroid} from 'react-native';
import {
    MapView,
    MapTypes,
    Geolocation
} from 'react-native-baidu-map';
import Dimensions from 'Dimensions';
import {StackNavigator} from 'react-navigation';
import busList from "./app/busList";
//import Geolocation from 'Geolocation';

type Props = {};

class App extends Component<Props> {
    constructor() {
        super();
        this.state = {
            mayType: MapTypes.NORMAL,
            zoom: 15,
            center: {
                longitude: 106.5510,
                latitude: 29.5647
            },
            markers: [{
                longitude: 106.5510,
                latitude: 29.5647,
                title: '当前位置'
            }],
            trafficEnabled: false,
            baiduHeatMapEnabled: false
            /* markers: [{
                 longitude: 113.981718,
                 latitude: 22.542449,
                 title: "Window of the world"
             },{
                 longitude: 113.995516,
                 latitude: 22.537642,
                 title: ""
             }]*/

        }
    }
    getPermissons(){
        PermissionsAndroid.request(android.permission.ACCESS_FINE_LOCATION,{'title':'我要定位权限','message':'不给也得给！'});
        PermissionsAndroid.request(android.permission.ACCESS_COARSE_LOCATION);
    }

    getLocation()
    {
        this.getPermissons.bind(this)
        /*Geolocation.getCurrentPosition(
            location =>{
                this.setState({
                    center: {
                        longitude: location.coords.longitude,
                        latitude: location.coords.latitude,
                        rand: Math.random()
                    },
                    marker:{
                        longitude: location.coords.longitude,
                        latitude: location.coords.latitude,
                        title:'当前位置'
                    },
                });
            },
            error=>{
                alert("获取位置错误")
            }
        )*/
        console.warn(JSON.stringify(this.state.center))
        Geolocation.getCurrentPosition()
            .then(data => {
                this.setState({
                    center: {
                        longitude: data.longitude,
                        latitude: data.latitude,
                        rand: Math.random()
                    },
                    markers:[{
                        longitude: data.longitude,
                        latitude: data.latitude,
                        title:'当前位置'
                    }],
                });
            })
            .catch(e =>{
                console.warn(e, 'error');
            })
    }

  render() {
        let {navigate} = this.props.navigation
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Bus Position</Text>
          <Button title={'获取当前位置信息'} onPress={this.getLocation.bind(this)}/>
          <Button title={'获取附件上车点'} onPress={()=>navigate('buslist',{longtude:this.state.center.longitude,latude:this.state.center.latitude})}/>
          <MapView
              trafficEnabled={this.state.trafficEnabled}
              baiduHeatMapEnabled={this.state.baiduHeatMapEnabled}
              zoom={this.state.zoom}
              mapType={this.state.mapType}
              center={this.state.center}
              style={styles.map}
              markers={this.state.markers}
          >
          </MapView>

      </View>
    );
  }
}

const screnns = StackNavigator(
    {
        home:{screen: App},
        buslist:{screen:busList}
    },
    {
        navigationOptions:{
            header:null
        }
    }
)

export default screnns;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 200,
        marginBottom: 16
    }
});
