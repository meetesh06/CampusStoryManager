import React from 'react';
import { KeyboardAvoidingView, TextInput, ScrollView, TouchableOpacity, View, Text, Image, AsyncStorage, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AnimatedImageButton from '../components/Button';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Kohana } from 'react-native-textinput-effects';
import axios from 'axios';
// import { Navigation } from 'react-native-navigation'
import { goHome } from './helpers/Navigation';

import Constants from '../constants';
const SET_UP_STATUS = Constants.SET_UP_STATUS;
const TOKEN = Constants.TOKEN;
const PASSWORD = Constants.PASSWORD;
const EMAIL = Constants.EMAIL;

class App extends React.Component {
    async componentDidMount() {
        try {
            // goHome();
          const status = await AsyncStorage.getItem(SET_UP_STATUS);
          if (status === "true") {
            goHome();
          } else {
            this.setState({ loading: false });
          }
        } catch (err) {
          console.log('error: ', err)
          this.setState({ loading: false });
        }
    }
    updataStatusAndToken = async (token) => {
		await AsyncStorage.setItem(TOKEN, token);
		await AsyncStorage.setItem(SET_UP_STATUS, "true");
		goHome();
	}
    // static options(passProps) {
	// 	return {
	// 	  topBar: {
	// 		visible: false,
	// 	  }
	// 	};
	// }
    constructor(props) {
        super(props);
        this.continueNext = this.continueNext.bind(this);
        this.validData = this.validData.bind(this);
        this.updataStatusAndToken = this.updataStatusAndToken.bind(this);
        this.state = {
            login: false,
            loading: true,
            email: '',
            password: ''
        }
    }
    validData = () => {
        return this.state.email !== "" && this.state.password != "";
    }

    handleLogin = () => {
        if(!this.validData() || this.state.loading) return;
        const { email, password } = this.state;
        const formData = new FormData();
        const updataStatusAndToken = this.updataStatusAndToken;
        formData.append(EMAIL, this.state.email);
        formData.append(PASSWORD, this.state.password);
        this.setState({ loading: true });
        axios.post("https://www.mycampusdock.com/auth/manager/signin", formData, {
			headers: {
			  'Content-Type': 'multipart/form-data',
			//   'Accept': 'application/json',
			//   'x-access-token': this.props.auth.user_token
			}
		  })
		  .then( (result) => {
				result = result.data;
			  if(!result.error) {
					try {
						console.log(result);
						updataStatusAndToken(result.token);
					} catch (error) {
						console.log(error);
						Alert.alert(
							"An unknown error occured"
						)
					}
			  } else {
					console.log("SERVER REPLY ERROR");
					Alert.alert(
						"'An unknown error occured',"
					);
					this.setState({ loading: false });
			  }
			
		  })
		  .catch( (err) => {
			  	console.log("DOPE ", err);
			  	Alert.alert(
					err.toString()
				)
				this.setState({ loading: false });
			})
    }

    continueNext = () => {
        goHome();
    };
    render() {
        return(
            <View style={{ flex: 1 }}>
                <LinearGradient style={{ flex: 1 }} colors={['#FF4A3F', '#FF6A15']}>
                    
                    <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
                        <Image source={require('../media/LogoWhite.png')} style={{ width: 100, height: 100, resizeMode: 'contain', alignSelf: 'center' }} />
                        <Text style={{ marginTop: 20, fontFamily: 'Roboto-Regular', textAlign: 'center', color: '#fff', fontSize: 25 }}>Enter Login Details</Text>
                    </View>
                        <KeyboardAvoidingView behavior="padding" style={{ flex: 1, marginBottom: 35, paddingBottom: 10, backgroundColor: '#fff', borderRadius: 10, marginLeft: 10, marginRight: 10, paddingTop: 0, paddingLeft: 10, paddingRight: 10 }}>  
                                
                                <TextInput
                                    style={{ padding: 10, fontSize: 20, backgroundColor: '#f9f5ed', borderRadius: 10, marginTop: 10 }}
                                    onChangeText={(email) => this.setState({email})}
                                    value={this.state.email}
                                    autoCapitalize={"none"}
                                    textContentType="emailAddress"
                                    placeholder="Email Address"
                                />
                                <TextInput
                                    style={{ padding: 10, fontSize: 20, backgroundColor: '#f9f5ed', borderRadius: 10, marginTop: 10 }}
                                    onChangeText={(password) => this.setState({password})}
                                    value={this.state.password}
                                    autoCapitalize={"none"}
                                    textContentType="password"
                                    secureTextEntry={true}
                                    placeholder="Password"
                                />
                                

                            <View style={{ position: 'absolute', bottom: 5, flex: 1, left: 0, right: 0, marginTop: 20, backgroundColor: this.validData() ? '#553fff' : '#c0c0c0', borderRadius: 10, margin: 10 }}>
                                <TouchableOpacity disabled={this.state.loading} onPress={this.handleLogin}>
                                    {
                                        this.state.loading &&
                                        <ActivityIndicator style={{ padding: 20 }} size="small" color="#fff" />
                                    }
                                    {
                                        !this.state.loading &&
                                        <Text style={{ color: '#fff', fontFamily: 'Roboto-Regular', fontSize: 20, textAlign: 'center', padding: 20}}>
                                            LOGIN
                                        </Text>
                                    }
                                </TouchableOpacity>
                            </View>
                        </KeyboardAvoidingView>
                </LinearGradient>
            </View>
        );
    }

    
}

export default App;