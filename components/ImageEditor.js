import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-picker';
import FastImage from 'react-native-fast-image';

class ImageEditor extends React.Component {
    state = {
        message : '',
        imageURI : '',
    }

    openImagePicker = () =>{
        const options = {
            title: 'Pick an Image',
            noData : true,
            storageOptions:{
                skipBackup:true,
                path:'images'
            }
        };

        ImagePicker.launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('CANCELED');
            } else if (response.error) {
                console.log('ERROR OCCURED');
            } else if (response.customButton) {
                console.log('CUSTOM ACTION');
            } else {
                this.setState({imageURI : response.uri});
            }
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
                        <TouchableOpacity style={{justifyContent : 'center', alignItems : 'center'}} onPress = {this.openImagePicker}> 
                            <Icon name = 'images' size = {50} color = '#fff' />
                            <Text style={{fontSize : 20, fontFamily : 'Roboto-Light', color : '#555'}}>Pick an Image</Text>
                        </TouchableOpacity>
                    </View>
                }

                {
                    imageURI !== '' &&
                    <View>
                        <FastImage 
                            source={{
                                uri: encodeURI(imageURI)
                            }}
                            style={{
                                height : '100%',
                                width : '100%'
                            }}
                            resizeMode={FastImage.resizeMode.contain}
                        >
                            <View style={{position : 'absolute', top : 10, left : 0, padding : 5, margin : 5, flexDirection : 'row'}}>
                            <TouchableOpacity style = {{flexDirection : 'row', justifyContent : 'center', alignItems : 'center',}} onPress = {()=>this.setState({imageURI : ''})}>
                                <Text style={{color : '#fff', fontSize : 14}}>{'Remove  '}</Text>
                                <View style={{width : 25, height : 25, borderRadius : 30, padding : 3, backgroundColor : 'rgba(255, 255, 255, 0.4)', justifyContent : 'center', alignItems : 'center'}}>
                                    <Icon2 name = 'md-close-circle' size = {20} color = '#fff' />
                                </View>
                            </TouchableOpacity>
                            
                            <View style={{flex : 1}} />

                            <TouchableOpacity style = {{flexDirection : 'row', justifyContent : 'center', alignItems : 'center'}} onPress = {this.openImagePicker}>
                                <Text style={{color : '#fff', fontSize : 14}}>{'Change  '}</Text>
                                <View style={{width : 25, height : 25, borderRadius : 30, padding : 3, backgroundColor : 'rgba(255, 255, 255, 0.4)', justifyContent : 'center', alignItems : 'center'}}>
                                    <Icon2 name = 'md-refresh-circle' size = {20} color = '#fff' />
                                </View>
                            </TouchableOpacity>
                        </View>
                        </FastImage>
                    </View>
                }
            </View>
        );
    }
}

export default ImageEditor;