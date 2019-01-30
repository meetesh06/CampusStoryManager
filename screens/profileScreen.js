import React from 'react';
import { TouchableOpacity, Dimensions, AsyncStorage, View, Text } from 'react-native';
import { goInitializing } from './helpers/Navigation';
import FastImage from 'react-native-fast-image';
import Realm from '../realm';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/AntDesign';

const WIDTH = Dimensions.get('window').width;

class profileScreen extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }
    componentDidMount() {
    }

    handleLogout = async () => {
        Realm.getRealm((realm)=>{
            realm.write(async () => {
              realm.deleteAll();
              await AsyncStorage.clear();
              goInitializing();
            });
        });
    }

    render() {
        return(
            <View 
                style={{
                    flex: 1
                }}
            >
                <LinearGradient style={{ overflow: 'hidden', justifyContent: 'center', alignItems: 'center', padding : 2 }} colors={['#FF4A3F', '#FF6A15']}>
                    <FastImage
                        style={{
                            width: 84,
                            height: 84,
                            alignSelf: 'center',
                            marginTop : 30,
                        }}
                        resizeMode={FastImage.resizeMode.contain}
                        source= {require('../media/LogoWhite.png')}
                    />
                    <Text
                        style={{
                            fontFamily: 'Roboto',
                            margin: 10,
                            color: '#fff',
                            fontSize: 20
                        }}
                    >
                        Hey There, How is your day going?
                    </Text>
                </LinearGradient>
                <View
                    style={{
                        flex: 1
                    }}
                >
                    <Text
                        style={{
                            marginTop: 10,
                            fontFamily: 'Roboto-Light',
                            textAlign: 'center'
                        }}
                    >
                        This is a community for the creators, make your effors reach the right audience.
                    </Text>
                    <View
                        style={{
                            backgroundColor: '#333',
                            flex: 1,
                            margin: 10,
                            borderRadius: 10,
                            padding: 10,
                            height: 300,
                            justifyContent: 'center'
                        }}
                    >
                        <Icon style={{ textAlign: 'center', padding: 10, color: '#c0c0c0' }} size={50} name="lock1" />
                        <Text
                            style={{
                                marginTop: 10,
                                fontFamily: 'Roboto',
                                textAlign: 'center',
                                color: '#c0c0c0',
                            }}
                        >
                            SECURITY DETAILS
                        </Text>
                        <Text
                            style={{
                                marginTop: 10,
                                fontFamily: 'Roboto-Thin',
                                textAlign: 'center',
                                color: '#c0c0c0'
                            }}
                        >
                            All Data is stored locally
                        </Text>
                        <Text
                            style={{
                                marginTop: 10,
                                fontFamily: 'Roboto-Thin',
                                textAlign: 'center',
                                color: '#c0c0c0'
                            }}
                        >
                            No personal details are shared with any third party without your permission
                        </Text>
                        <TouchableOpacity
                            style={{
                                padding: 10,
                                position: 'absolute',
                                bottom: 10,
                                left: 0,
                                right: 0
                            }}
                            onPress={this.handleLogout}
                        >
                            <Text
                                style={{
                                    backgroundColor: '#c0c0c0',
                                    padding: 10,
                                    borderRadius: 10,
                                    textAlign: 'center'
                                }}
                            >
                                Logout
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }

}

export default profileScreen;