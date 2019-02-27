import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import PostEditor from '../components/PostEditor';
import ImageEdior from '../components/ImageEditor';
import VideoEditor from '../components/VideoEditor';

class StoryScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        selected : 0,
    }

    render() {
        const {
            selected
        } = this.state;

        return(
            <View style={{flex: 1}}>
                <View style = {{flex : 1, backgroundColor : '#333'}}>
                    {
                        selected === 0 && <PostEditor />
                    }

                    {
                        selected === 1 && <ImageEdior />
                    }

                    {
                        selected === 2 && <VideoEditor />
                    }
                </View>
                
                <View style = {{flexDirection : 'row', justifyContent : 'center', alignItems : 'center'}}>
                    <TouchableOpacity style = {{margin : 10, padding : 10, backgroundColor : selected === 0 ? '#ddd' : '#efefef', borderRadius : 10}} onPress = {()=>this.setState({selected : 0})}>
                        <View style = {{marginLeft : 10, marginRight : 10, width : 45, height : 45, borderRadius : 45, backgroundColor : 'rgba(255, 0, 0, 0.4)', justifyContent : 'center', alignItems : 'center'}}>
                            <Icon name = 'text' size = {25} color = '#fff'/>
                        </View>
                        <Text style = {{fontSize : 15, textAlign : 'center', fontFamily : 'Roboto-Light', margin : 5}}>Post</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style = {{margin : 10, padding : 10, backgroundColor : selected === 1 ? '#ddd' : '#efefef', borderRadius : 10}} onPress = {()=>this.setState({selected : 1})}>
                        <View style = {{marginLeft : 10, marginRight : 10, width : 45, height : 45, borderRadius : 45, backgroundColor : 'rgba(0, 180, 0, 0.4)', justifyContent : 'center', alignItems : 'center'}}>
                            <Icon name = 'image' size = {22} color = '#fff'/>
                        </View>
                        <Text style = {{fontSize : 15, textAlign : 'center', fontFamily : 'Roboto-Light', margin : 5}}>Image</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style = {{margin : 10, padding : 10, backgroundColor : selected === 2 ? '#ddd' : '#efefef', borderRadius : 10}} onPress = {()=>this.setState({selected : 2})}>
                        <View style = {{marginLeft : 10, marginRight : 10, width : 45, height : 45, borderRadius : 45, backgroundColor : 'rgba(0, 0, 255, 0.4)', justifyContent : 'center', alignItems : 'center'}}>
                            <Icon name = 'video-camera' size = {22} color = '#fff'/>
                        </View>
                        <Text style = {{fontSize : 15, textAlign : 'center', fontFamily : 'Roboto-Light', margin : 5}}>Video</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default StoryScreen;