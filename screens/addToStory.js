import React from 'react';
import { AsyncStorage, Alert, TextInput, ScrollView, KeyboardAvoidingView, TouchableOpacity, Text, View, Platform, Image } from 'react-native';
// import Icon from 'react-native-vector-icons/Feather'
import axios from 'axios';
import ImagePicker from 'react-native-image-picker';
import Constants from '../constants';
import { Navigation } from 'react-native-navigation'
import FastImage from 'react-native-fast-image'
import LinearGradient from 'react-native-linear-gradient';
const TOKEN = Constants.TOKEN;

class addToStory extends React.Component {
    constructor(props) {
        super(props);
        this.valid = this.valid.bind(this);
        this.handleCreatePost = this.handleCreatePost.bind(this);
        this.openImagePicker = this.openImagePicker.bind(this);
    }
    state = {
        message: '',
        response: null,
        loading: false,
        video: false
    }

    openImagePicker = (options, video) => {
        ImagePicker.launchImageLibrary(options, (response) => {
            console.log('Response = ', response);
          
            if (response.didCancel) {
                this.setState({ response: null, video })
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                this.setState({
                    response,
                    video
                });
            }
          });
    }

    handleCreatePost = async () => {
        if(!this.valid()) return;
        this.setState({ loading: true });
        const formData = new FormData();
        formData.append("message", this.state.title);
        const response = this.state.response;
        if( response === null ) {
            console.log("POST CREATION");
            axios.post("https://www.mycampusdock.com/channels/manager/create-post", formData, {
			headers: {
			  'Content-Type': 'multipart/form-data',
			//   'Accept': 'application/json',
			  'x-access-token': await AsyncStorage.getItem(TOKEN)
			}
		  })
		  .then( (result) => {
                result = result.data;
                console.log(result);
                if(!result.error) {
                    Navigation.pop(this.props.componentId);
                    Alert.alert("Post Created successfully");
                } else {
                }
                this.setState({ loading: false });
		  })
		  .catch( (err) => {
			  	console.log("DOPE ", err);
			  	Alert.alert(
					err.toString()
				)
				this.setState({ loading: false });
			})
        } else {
            formData.append("file", { 
                uri: response.uri,
                type: response.type,
                name: response.fileName 
            });
            axios.post("https://www.mycampusdock.com/channels/manager/create-image-post", formData, {
			headers: {
			  'Content-Type': 'multipart/form-data',
			//   'Accept': 'application/json',
			  'x-access-token': await AsyncStorage.getItem(TOKEN)
			}
		  })
		  .then( (result) => {
                result = result.data;
                console.log(result);
                if(!result.error) {
                    Navigation.pop(this.props.componentId);
                    Alert.alert("Post(Image) Created successfully");
                } else {
                }
                this.setState({ loading: false });
		  })
		  .catch( (err) => {
			  	console.log("DOPE ", err);
			  	Alert.alert(
					err.toString()
				)
				this.setState({ loading: false });
			})
        }
        
        
    }

    valid = () => {
        if(this.state.image !== null) return true;
        if(this.state.message.length < 5) {
            Alert.alert("Invalid Message(atleast 5 characters)");
            return false;
        }
        
        return true;
    }

    render() {
        return(
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <KeyboardAvoidingView behavior={ Platform.OS === 'android' ? "" : "padding" } style={{ flex: 1, marginBottom : Platform.OS === 'android' ? 0 : 35, paddingBottom: 10, backgroundColor: '#fff', borderRadius: 10, marginLeft: 10, marginRight: 10, paddingTop: 0, paddingLeft: 10, paddingRight: 10 }}> 
                    <ScrollView
                        keyboardShouldPersistTaps='handled'
                    >
                        {
                            this.state.response !== null &&
                            this.state.video === false &&
                            <FastImage 
                                source={{
                                    uri: this.state.response.uri
                                }}
                                style={{
                                    flex: 1,
                                    height: 300,
                                    margin: 5,
                                    borderRadius: 10
                                }}
                                resizeMode={FastImage.resizeMode.cover}
                            />   
                        }
                        {
                            this.state.response === null &&
                            <LinearGradient style={{ 
                                    flex: 1,
                                    borderRadius: 10,
                                    margin: 5,
                                    alignSelf: 'center',
                                    width: "100%",
                                    height: 300,
                                    justifyContent: 'center'
                                }} 
                                colors={['#0056e5', '#85f5ff']}
                            >
                                <Text
                                    style={{
                                        fontFamily: 'Roboto',
                                        fontSize: 20,
                                        margin: 5,
                                        color: '#fff',
                                        textAlign: 'center'
                                    }}
                                >
                                    {
                                        this.state.message === "" ? "What's on your mind ?" : this.state.message
                                    }
                                    
                                </Text>
                            </LinearGradient>
                        }
                        <Text
                            style={{
                                fontFamily: 'Roboto-Thin',
                            }}
                        >
                            Photo/Video are optional
                        </Text>
                        <View
                                style={{
                                    bottom: 10,
                                    justifyContent: 'center',
                                    borderRadius: 15,
                                    margin: 10,
                                    flexDirection: 'row',
                                    height: 100
                                }}
                            >
                                
                                <TouchableOpacity
                                    style={{ 
                                        alignSelf: 'center',
                                        margin: 5,
                                        borderRadius: 10
                                    }}
                                    onPress={
                                        () => this.openImagePicker({
                                            title: 'Select a video file',
                                            mediaType: 'video',
                                            storageOptions:{
                                                skipBackup:true,
                                                path:'images'
                                              }
                                        }, true)
                                    }
                                >
                                    <FastImage
                                        style={{ 
                                            alignSelf: 'center',
                                            width: 150, 
                                            height: 150,
                                            borderRadius: 10
                                        }}
                                        source={require('../media/uploadVideo.png')}
                                        resizeMode={FastImage.resizeMode.contain}
                                    />

                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{ 
                                        alignSelf: 'center',
                                        margin: 5,
                                        borderRadius: 10
                                    }}
                                    onPress={
                                        () => this.openImagePicker({
                                            title: 'Select a photo file',
                                            storageOptions:{
                                                skipBackup:true,
                                                path:'images'
                                              }
                                        }, false)
                                    }
                                >
                                    <FastImage
                                        style={{ 
                                            alignSelf: 'center',
                                            width: 150, 
                                            height: 150,
                                            borderRadius: 10
                                        }}
                                        source={require('../media/uploadPhoto.png')}
                                        resizeMode={FastImage.resizeMode.contain}
                                    />

                                </TouchableOpacity>
                            </View>
                        <Text
                            style={{
                                fontFamily: 'Roboto-Thin',
                            }}
                        >
                            Message
                        </Text>
                        <TextInput
                            multiline={true}
                            numberOfLines={5}
                            style={{
                                padding: 10, 
                                fontSize: 20, 
                                backgroundColor: '#f9f5ed', 
                                borderRadius: 10, 
                                marginTop: 10,
                                minHeight: 80
                            }}
                            onChangeText={(message) => this.setState({message})}
                            value={this.state.message}
                            autoCapitalize={"none"}
                            placeholder="Your message here"
                        />
                        <TouchableOpacity 
                            style={{
                                backgroundColor: this.state.loading ? "#c0c0c0" : "red",
                                marginTop: 15,
                                borderRadius: 10,
                                padding: 10
                            }}
                            disabled={this.state.loading}
                            onPress={() => Alert.alert(
                                'Create Post',
                                'Are you sure you want to create this post ?',
                                [
                                  {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                  {text: 'OK', onPress: () => this.handleCreatePost()},
                                ],
                                { cancelable: false }
                              )}
                        >
                            <Text
                                style={{
                                    textAlign: 'center',
                                    fontFamily: 'Roboto',
                                    fontSize: 20,
                                    color: "#fff"
                                }}
                            >
                                CREATE POST
                            </Text>
                        </TouchableOpacity>
                        <View
                            style={{
                                height: 10
                            }}
                        >

                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
                
            </View>
        );
    }
}

export default addToStory;