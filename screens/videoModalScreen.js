import React from 'react';
import { Alert, ActivityIndicator, NativeModules, Dimensions, View, Text, TouchableOpacity } from 'react-native';
import Video from 'react-native-video';
import { Navigation } from 'react-native-navigation'
import Icon from 'react-native-vector-icons/AntDesign';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

const WIDTH = Dimensions.get('window').width;

class videoModalScreen extends React.Component {
    constructor(props) {
        super(props);
        this.handleDone = this.handleDone.bind(this);
    }
    state = {
        uri: null,
        loading: false,
        position: 0,
        paused: true,
        duration: 0,
        sliderOneChanging: false,
        sliderOneValue: [5],
        multiSliderValue: [3, 7],
        error: false,
        mssg: ""
    }
    
    multiSliderValuesChange = values => {
        let error = false;
        if((values[1] - values[0]) > 10) {
            error = true;
        }
        
        this.setState({
            multiSliderValue: values,
            error,
            paused: true
        }, () => this.videoPlayer.seek(values[0]));
    };
    handleDone = () => {
        // do the compression here
        this.setState({ loading: true });
        NativeModules.MkaerVideoPicker.compress(this.state.multiSliderValue[0] * 1000, this.state.multiSliderValue[1] * 1000, (data) => {
            data = JSON.parse(data);
            console.log(data);
            if(!data.err) {
                this.props.completedEditing(false, data.data);
                Navigation.dismissModal(this.props.componentId)
            } else {
                this.setState({ loading: false });
                Alert.alert("Error compressing the video");
                // this.props.completedEditing(true);
                // Navigation.dismissModal(this.props.componentId)
            }
        });
    }
    render() {
        console.log(this.state.position);
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
                    ref={videoPlayer => this.videoPlayer = videoPlayer}
                    onLoad={ (data) => this.setState({ duration: data.duration })}
                    source={{uri: this.props.uri }}
                    paused={this.state.paused}
                    onProgress={ (data) => {
                        data.currentTime > this.state.multiSliderValue[1] ? this.setState({ paused: true }) : console.log("") ;
                        let c = {
                            position: data.currentTime
                        }
                        if(data.currentTime > this.state.multiSliderValue[1]) {
                            c.paused = true;
                        }
                        
                        this.setState(c, () => {
                            if(c.paused) {
                                this.videoPlayer.seek(this.state.multiSliderValue[0])
                            }
                        });
                    }}
                    style={{
                        flex: 1,
                        height: 300,
                        margin: 5,
                        borderRadius: 10
                    }} 
                />
                
                <View
                    style={{
                        flexDirection: 'row'
                    }}
                >
                    <MultiSlider
                        initialValues={(vals) => setTimeout(() => this.videoPlayer.seek(vals[0]), 500)}
                        // initialValues={(vals) => this.setState({  })}
                        values={[
                            this.state.multiSliderValue[0],
                            this.state.multiSliderValue[1],
                        ]}
                        selectedStyle={{
                            backgroundColor: this.state.error ? 'red' : 'green',
                        }}
                        unselectedStyle={{
                            backgroundColor: 'silver',
                        }}
                        // containerStyle={{
                        //     height: 40,
                        // }}
                        trackStyle={{
                            // height: 10,
                            // backgroundColor: 'red',
                        }}
                
                        sliderLength={WIDTH - 40}
                        onValuesChange={this.multiSliderValuesChange}
                        min={0}
                        max={this.state.duration}
                    />
                </View>

                <View
                    style={{
                        width: '100%',
                        justifyContent: 'center'
                    }}
                >
                    <TouchableOpacity
                        disabled={this.state.error || this.state.loading}
                        onPress={
                            () => this.setState({ paused: !this.state.paused })
                        }
                    >
                        {
                            !this.state.loading && this.state.paused &&
                            <Icon size={30} style={{ textAlign: 'center', color: this.state.error ? '#c0c0c0' : '#fff' }} name="playcircleo"/>
                        }
                        {
                            !this.state.loading && !this.state.paused &&
                            <Icon size={30} style={{ textAlign: 'center', color: '#fff' }} name="pausecircleo"/>
                        }
                        {
                            this.state.loading &&
                            <ActivityIndicator size="small" color="#fff" />
                        }
                    </TouchableOpacity>

                </View>
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
                        onPress={
                            () => Navigation.dismissModal(this.props.componentId)
                        }
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
                        disabled={this.state.loading || this.state.error}
                        style={{
                            flex: 1,
                            justifyContent: 'center'
                        }}
                        onPress={this.handleDone}
                    >
                        <Text
                            style={{
                                textAlign: 'center',
                                color: this.state.error ? '#c0c0c0' : '#fff'
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