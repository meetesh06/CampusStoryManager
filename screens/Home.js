import React from 'react';
import { View, TouchableOpacity, Platform, Image } from 'react-native';
import FastImage from 'react-native-fast-image'
import { Navigation } from 'react-native-navigation'

class Home extends React.Component {
    state = {
        email: ''
    }
    render() {
        return(
            <View style={{ flex: 1 }}>
                <View elevation={5} 
                    style = {{ 
                        backgroundColor : '#fff', 
                        minHeight : Platform.OS === 'android' ? 70 : 90, 
                        paddingTop : Platform.OS === 'android'? 8 : 30, 
                        shadowColor: "#000000",
                        shadowOpacity: 0.1,
                        shadowRadius: 0.5,
                        shadowOffset: {
                            height: 2,
                            width: 2
                        }
                }}>
                    <Image style={{ margin: 5, alignSelf: 'center', width: 50, height: 50 }} source={require('../media/app-bar/logo.png')}></Image>
                </View>
                <View
                    style={{
                        justifyContent: 'center',
                        borderColor: "#c0c0c0",
                        borderWidth: 3,
                        borderRadius: 15,
                        margin: 10,
                        flexDirection: 'row',
                        height: 200
                    }}
                >
                    <TouchableOpacity
                        style={{ 
                            alignSelf: 'center',
                            margin: 5,
                            borderRadius: 10
                        }}
                        onPress={
                            () => Navigation.push(this.props.componentId, {
                                component: {
                                  name: 'Create Event Screen',
                                //   passProps: {
                                //     id
                                //   },
                                  options: {
                                    topBar: {
                                        visible: false
                                    }
                                  }
                                }
                              })
                        }
                    >
                        <FastImage
                            style={{ 
                                alignSelf: 'center',
                                width: 150, 
                                height: 150,
                                borderRadius: 10
                            }}
                            source={require('../media/createEvent.jpg')}
                            resizeMode={FastImage.resizeMode.contain}
                        />

                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ 
                            alignSelf: 'center',
                            margin: 5,
                            borderRadius: 10
                        }}
                    >
                        <FastImage
                            style={{ 
                                alignSelf: 'center',
                                width: 150, 
                                height: 150,
                                borderRadius: 10
                            }}
                            source={require('../media/createPost.jpg')}
                            resizeMode={FastImage.resizeMode.contain}
                        />

                    </TouchableOpacity>

                </View>
            </View>
        );
    }
}

export default Home;