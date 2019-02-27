import React from 'react';
import { NativeModules, Dimensions, AsyncStorage, Alert, TextInput, ScrollView, KeyboardAvoidingView, TouchableOpacity, Text, View, Platform, Image } from 'react-native';
// import Icon from 'react-native-vector-icons/Feather'
import axios from 'axios';
import ImagePicker from 'react-native-image-picker';
import Constants from '../constants';
import { Navigation } from 'react-native-navigation';
import FastImage from 'react-native-fast-image'
import Video from 'react-native-video';
import LinearGradient from 'react-native-linear-gradient';
import RNVideoHelper from 'react-native-video-helper';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import reactNativeVideoHelper from 'react-native-video-helper';
import RNFetchBlob from 'rn-fetch-blob';

const TOKEN = Constants.TOKEN;

class addToStory extends React.Component {
    constructor(props) {
        super(props);
        this.valid = this.valid.bind(this);
        this.handleCreatePost = this.handleCreatePost.bind(this);
        this.openImagePicker = this.openImagePicker.bind(this);
        this.completedEditing = this.completedEditing.bind(this);
    }
    state = {
        message: '',
        response: null,
        loading: false,
        video: false,
        progress: 0
    }

    completedEditing = (err, data) => {
        console.log("COMPLETED EDITING");
        if(err) return;
        RNFetchBlob.fs.readStream(data, 'utf8')
            .then((stream) => {
                let data = ''
                stream.open()
                stream.onData((chunk) => {
                    data += chunk
                })
                stream.onEnd(() => {
                    console.log(data)
                })
            })
            .catch(err => console.log(err))
        this.setState({
            response: { uri: data },
            video: true
        });
    }

    openImagePicker = (options, video) => {
        if (Platform.OS === "android" && video) {
            NativeModules.MkaerVideoPicker.openPicker()
                .then((data) => {
                    data = JSON.parse(data);
                    console.log(data);
                    Navigation.showModal({
                        stack: {
                          children: [{
                            component: {
                              name: 'Video Modal Screen',
                              passProps: {
                                uri: data.uri,
                                completedEditing: this.completedEditing
                              },
                              options: {
                                topBar: {
                                  visible: false,
                                  drawBehind: true
                                }
                              }
                            }
                          }]
                        }
                      });
                })
        } else {
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
    }

    handleCreatePost = async () => {
        if(!this.valid()) return;
        this.setState({ loading: true });
        const context = this;
        const formData = new FormData();
        formData.append("message", this.state.message);
        const response = this.state.response;
        if( response === null ) {
            console.log("POST CREATION");
            axios.post("https://www.mycampusdock.com/channels/manager/create-post", formData, {
            //axios.post("http://127.0.0.1:65534/channels/manager/create-post", formData, {
            onUploadProgress: function(progressEvent) {
                let percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total )
                context.setState({ progress: percentCompleted });
            },
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
            if(this.state.video) {
                if(Platform.OS === 'android') {
                    formData.append("file", { 
                        uri: response.uri,
                        type: "video/mp4",
                        name: "story.mp4"
                    });
                } else {
                    formData.append("file", { 
                        uri: response.uri,
                        type: response.type,
                        name: response.fileName
                    });
                }
                // console.log(formData);
                
                axios.post("https://www.mycampusdock.com/channels/manager/create-video-post", formData, {
                onUploadProgress: function(progressEvent) {
                    let percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total )
                    context.setState({ progress: percentCompleted });
                },
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'x-access-token': await AsyncStorage.getItem(TOKEN)
                }
                })
                .then( (result) => {
                    result = result.data;
                    console.log(result);
                    if(!result.error) {
                        Navigation.pop(this.props.componentId);
                        Alert.alert("Post(Video) Created successfully");
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
                // const options = {
                //     url: 'https://www.mycampusdock.com/channels/manager/create-video-post',
                //     path: response.uri,
                //     method: 'POST',
                //     field: formData, // -- test this
                //     type: 'multipart',
                //     headers: {
                //         'Content-Type': 'multipart/form-data',
                //         'x-access-token': await AsyncStorage.getItem(TOKEN)
                //     },
                //     // Below are options only supported on Android
                //     notification: {
                //       enabled: true
                //     }
                //   }
                  
                //   Upload.startUpload(options).then((uploadId) => {
                //     console.log('Upload started')
                //     Upload.addListener('progress', uploadId, (data) => {
                //     //   console.log(`Progress: ${data.progress}%`)
                //         context.setState({ progress: data.progress });
                //     })
                //     Upload.addListener('error', uploadId, (data) => {
                //       console.log(`Error: ${data.error}%`)
                //     })
                //     Upload.addListener('cancelled', uploadId, (data) => {
                //       console.log(`Cancelled!`)
                //     })
                //     Upload.addListener('completed', uploadId, (data) => {
                //         // data includes responseCode: number and responseBody: Object
                //         const result = JSON.parse(data.responseBody);

                //         console.log(result);
                //         if(!result.error) {
                //             Navigation.pop(this.props.componentId);
                //             Alert.alert("Post(Video) Created successfully");
                //         } else {
                //         }
                //         this.setState({ loading: false });
                //     })
                //   }).catch((err) => {
                //     console.log('Upload error!', err)
                //   })
                  
            } else {
                console.log(response);
                formData.append("file", { 
                    uri: response.uri,
                    type: response.type,
                    name: response.fileName 
                });
                axios.post("https://www.mycampusdock.com/channels/manager/create-image-post", formData, {
                onUploadProgress: function(progressEvent) {
                    let percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total )
                    context.setState({ progress: percentCompleted });
                },
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
        const barWidth = Dimensions.get('screen').width - 40;
        return(
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <KeyboardAvoidingView behavior={ Platform.OS === 'android' ? "" : "padding" } style={{ flex: 1, marginBottom : Platform.OS === 'android' ? 0 : 35, paddingBottom: 10, backgroundColor: '#fff', borderRadius: 10, marginLeft: 10, marginRight: 10, paddingTop: 0, paddingLeft: 10, paddingRight: 10 }}> 
                    <ScrollView
                        keyboardShouldPersistTaps='handled'
                    >
                        
                        {
                            this.state.response !== null &&
                            this.state.video === true &&
                            <Video 
                                source={{uri: this.state.response.uri }}
                                controls={true}
                                style={{
                                    backgroundColor: '#000',
                                    flex: 1,
                                    height: 300,
                                    margin: 5,
                                    borderRadius: 10
                                }} />
                        }
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
                                            videoQuality: 'medium',
                                            allowsEditing: true,
                                            durationLimit: 10,
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
                        <View
                            style={{
                                marginTop: 15
                            }}
                        >
                            <ProgressBarAnimated
                                width={barWidth}
                                value={this.state.progress}
                                backgroundColorOnComplete="#6CC644"
                            />
                        </View>
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