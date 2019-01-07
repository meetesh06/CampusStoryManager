import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Video from 'react-native-video';
import RNVideoHelper from 'react-native-video-helper';
import { Navigation } from 'react-native-navigation'

class videoModalScreen extends React.Component {
    constructor(props) {
        super(props);
        this.handleDone = this.handleDone.bind(this);
    }
    state = {
        uri: null,
        loading: false 
    }
    handleDone = () => {
        const { onCompletion, videoUri } = this.props;
        RNVideoHelper.compress(videoUri, {
            // startTime: 10, // optional, in seconds, defaults to 0
            // endTime: 100, //  optional, in seconds, defaults to video duration
            quality: 'low', // default low, can be medium or high
        }).progress(value => {
            console.warn('progress', value); // Int with progress value from 0 to 1
        }).then(compressedUri => {
            console.log('compressedUri', compressedUri); // String with path to temporary compressed video
            onCompletion(false, compressedUri);
            Navigation.dismissModal(this.props.componentId);
        }).catch(err => {
            onCompletion(true);
        })

    }
    render() {
        return(
            <View
                style={{
                    flex: 1,
                    paddingTop: 50,
                    paddingBottom: 50,
                    backgroundColor: '#000'
                }}
            >
                
                <Video 
                    source={{uri: this.props.videoUri }}
                    currentPosition={0}
                    duration={30}
                    controls={true}
                    style={{
                        flex: 1,
                        height: 300,
                        margin: 5,
                        borderRadius: 10
                    }} 
                />
                <View
                    style={{
                        height: 50,
                        // flex: 1,
                        // backgroundColor: 'red',
                        flexDirection: 'row'
                    }}
                >
                    <TouchableOpacity
                        disabled={this.state.loading}
                        style={{
                            flex: 1,
                            justifyContent: 'center'
                        }}
                    >
                        <Text
                            style={{
                                textAlign: 'center',
                                color: '#fff'
                            }}
                        >
                            Cancel
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        disabled={this.state.loading}
                        style={{
                            flex: 1,
                            justifyContent: 'center'
                        }}
                        onPress={this.handleDone}
                    >
                        <Text
                            style={{
                                textAlign: 'center',
                                color: '#fff'
                            }}
                        >
                            Done
                        </Text>
                    </TouchableOpacity>

                </View>

            </View>
        );
    }
}

export default videoModalScreen;