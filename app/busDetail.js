import React,{Component} from 'react';
import {StyleSheet,View,Text} from 'react-native';

export default class busDetail extends Component{
    render(){
        return(
            <View>
                <Text style={styles.text}>hello</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create(
    {
        text:{fontSize:20,backgroundColor:'blue'}
    }
);