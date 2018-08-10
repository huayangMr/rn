import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TextInput, Button, Alert, TouchableNativeFeedback} from 'react-native';

export default class Press extends Component {
    state = {size: 20}

    render() {
        return <View>
            <Text style={{fontSize: 20}} onPress={() => {
                this.setState({size: this.state.size + 10})
            }
            }>
                变大 {this.state.size}
            </Text>
            <Text style={{fontSize: 20}} onPress={() => {
                this.setState({size: this.state.size - 10})
            }}>变小 </Text>
            <Image style={{width: this.state.size, height: this.state.size}} source={require('./ip.jpg')}/>
        </View>
    }
}

export class TestProps extends Component {
    render() {
        return (
            <Text>欢迎回来：{this.props.name}</Text>
        )
    }
}

export class Interval extends Component {
    constructor(size) {
        super();
        this.state = {isShow: true};
        setInterval(() => {
            this.setState(previousState => {
                return {isShow: !previousState.isShow}
            })
        }, 1000)
        this.size = size
    }

    render() {
        var text;
        var text2;
        if (this.state.isShow) {
            text = '一闪一闪亮晶晶！';
            text2 = ' ';
        } else {
            text = ' ';
            text2 = '一闪一闪亮晶晶！';
        }
        return (
            <View>
                <Text style={styles.red}>{text}</Text>
                <Text style={styles.blue}>{text2}</Text>
            </View>)
    }
}

export class TestInput extends Component {
    constructor() {
        super();
        this.state = {inputText: ''}
    }

    render() {
        return (
            <View style={{height: 200, width: 250, backgroundColor: 'skyblue'}}>
                <TextInput placeholder='key in your word' onChangeText={(text) => {
                    this.setState({inputText: text})
                }} style={{height: 80}}/>
                <Text style={{fontSize: 20}}>显示：{this.state.inputText}</Text>
                <Button title={'Press me'} onPress={() => {
                    Alert.alert("Hello")
                }}></Button>
                <TouchableNativeFeedback onLongPress={() => {
                    Alert.alert('长按。。。')
                }} style={{backgroundColor: '#2196F3'}}>
                    <Text style={{fontSize: 40}}>波浪效果！</Text>
                </TouchableNativeFeedback>
            </View>
        )
    }
}


export class DouBan extends Component {
    getMoviesFromApiAsync() {
         fetch("https://facebook.github.io/react-native/movies.json")
            .then(response =>response.json())
            .then(responseJson => {
                Alert.alert(responseJson.title);
            })
            .catch(error => {
                console.error(error);
            });
    }

    error(resp) {
        Alert.alert(resp)
    }

    render() {
        return (
            <View>
                <Button title={'豆瓣电影'} onPress={this.getMoviesFromApiAsync}/>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    red: {
        color: 'red',
        fontSize: 40
    },
    blue: {
        color: 'blue',
        fontSize: 40
    }
})