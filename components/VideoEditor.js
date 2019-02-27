import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import ImagePicker from 'react-native-image-picker';

class VideoEditor extends React.Component {
    state = {
        message : '',
        imageURI : '',
    }

    openVideoPicker = () =>{
        const options = {
            title: 'Pick a Video Clip',
            mediaType: 'video',
            durationLimit : 10,
            storageOptions:{
                skipBackup:true,
                path:'images'
              }
        }
        ImagePicker.launchImageLibrary(options, (response) => {
            console.log(response);
        });
    }

    render() {
        const {
            imageURI
        } = this.state;
        return(
            <View style={{flex : 1, justifyContent : 'center'}}>
                {
                    imageURI === '' &&
                    <View style={{padding : 15, margin : 10, borderRadius : 10, backgroundColor : '#ddd', alignSelf : 'center'}}>
                        <TouchableOpacity style={{justifyContent : 'center', alignItems : 'center'}} onPress = {this.openVideoPicker}> 
                            <Icon name = 'video' size = {50} color = '#fff' />
                            <Text style={{fontSize : 20, fontFamily : 'Roboto-Light', color : '#555'}}>Pick a Video</Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>
        );
    }
}

export default VideoEditor;