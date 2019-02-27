import React from 'react';
import {TextInput, TouchableOpacity, View, Text, Image, ActivityIndicator, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Feather'
import { goHome } from './helpers/Navigation';
import Constants from '../constants';
import urls from '../URLS';
import SessionStore from '../SessionStore';

class App extends React.Component {
    constructor(props){
        super(props);
    }

    state = {
        loading: false,
        email: '',
        password: '',
        error : ''
    }

    UNSAFE_componentWillMount(){
        const val = new SessionStore().getValue(Constants.SET_UP_STATUS);
        if(val === true){
            goHome();
        }
    }

    updataStatusAndToken = (token, data) => {
        const store = new SessionStore();
        store.putValue(Constants.TOKEN, token);
        store.putValue(Constants.USER_DATA, data)
        store.putValue(Constants.SET_UP_STATUS, true);
        store.setValueBulk();
		goHome();
	}

    validData = (email, password) => {
        const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        const match = re.test(email);
        return match && password.length > 5;
    }

    handleLogin = (email, password, loading) => {
        if(loading) return;
        this.setState({ loading: true, error : ''});
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);

        axios.post(urls.URL_SIGNIN, formData, {
			headers: {
			  'Content-Type': 'multipart/form-data',
			}
		  }).then((result) => {
            if(!result.data.error){
                this.setState({loading : false, error : ''}, ()=>{
                    this.updataStatusAndToken(result.data.token, result.data.data);
                });
            } else {
                this.setState({error : 'Wrong email or password', loading : false});
            }
		  }).catch((e)=>{
            console.log(e);
            this.setState({error : 'Check Your Internet', loading : false});
          });
    }

    continueNext = () => {
        goHome();
    };

    render() {
        const {
            email, password, loading, error
        } = this.state;
        const enabled = this.validData(email, password);
        return(
            <View style={{ flex: 1 }}>
            <StatusBar hidden />
                <LinearGradient style={{ flex: 1 }} colors={['#514A9D', '#24C6DC']}>
                    <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
                        <Image source={require('../media/LogoWhite.png')} style={{ width: 100, height: 100, resizeMode: 'contain', alignSelf: 'center' }} />
                        <Text style={{ marginTop: 20, fontFamily: 'Roboto-Regular', textAlign: 'center', color: '#fff', fontSize: 25 }}>Creator's Studio</Text>
                        <Text style={{ marginTop: 10, fontFamily: 'Roboto-Light', textAlign: 'center', color: '#fff', fontSize: 14 }}>Thinking BIG, Changing Lives</Text>
                        
                        <View style={{justifyContent : 'center', marginTop : 50}}>
                            <View style={{flexDirection : 'row', margin : 10, marginBottom : 1,  backgroundColor : '#fff', borderRadius : 10, justifyContent : 'center', alignItems : 'center'}}>
                                <TextInput
                                    autoCapitalize = 'none'
                                    keyboardType = 'email-address'
                                    keyboardAppearance = 'dark'
                                    style = {{flex : 1, fontSize : 18, margin : 15, color : '#222'}}
                                    placeholder = 'E-mail ID'
                                    placeholderTextColor = '#555'
                                    value = {email}
                                    onChangeText = {(val)=>this.setState({email : val})}
                                />
                            </View>

                            <View style={{flexDirection : 'row', margin : 10, marginTop : 1,  backgroundColor : '#fff', borderRadius : 10, justifyContent : 'center', alignItems : 'center'}}>
                                <TextInput
                                    autoCapitalize = 'none'
                                    secureTextEntry = {true}
                                    style = {{flex : 1, fontSize : 18, margin : 15, color : '#222'}}
                                    placeholder = 'Password'
                                    placeholderTextColor = '#555'
                                    value = {password}
                                    onChangeText = {(val)=>this.setState({password : val})}
                                />
                            </View>
                            
                            {
                                loading &&
                                <ActivityIndicator style={{ padding: 20 }} size="small" color="#fff" />
                            }
                            {
                                error !== '' &&
                                <Text style = {{fontSize : 15, color : 'yellow', textAlign : 'center', margin : 5}}>{error}</Text>
                            }
                            <View style={{flexDirection : 'row', margin : 10, padding : 5, marginTop : 1,  backgroundColor : '#fff', borderRadius : 40, alignSelf : 'center'}}>
                                <TouchableOpacity activeOpacity = {enabled ? 0.5 : 0.95} onPress = {()=> enabled ? this.handleLogin(email, password, loading) : console.log('NO WAY')}>
                                    <Icon name = 'arrow-right-circle' size = {35} color = {enabled ? '#444' : '#ddd'} style={{margin : 5}} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View style={{position : 'absolute', bottom : 20, alignSelf : 'center'}}>
                        <Text style={{color : '#fff', fontSize : 12, textAlign : 'center', fontFamily : 'Roboto-Light'}}>Campus Story 2019</Text>
                    </View>
                </LinearGradient>
            </View>
        );
    }

    
}

export default App;