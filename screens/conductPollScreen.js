import React from 'react';
import { AsyncStorage, Alert, TextInput, ScrollView, KeyboardAvoidingView, TouchableOpacity, Text, View, Platform, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo'
import axios from 'axios';
import Constants from '../constants';
import { Navigation } from 'react-native-navigation'

const TOKEN = Constants.TOKEN;

class createPollScreen extends React.Component {
    constructor(props) {
        super(props);
        this.valid = this.valid.bind(this);
        this.handleCreatePoll = this.handleCreatePoll.bind(this);
    }
    state = {
        message: '',
        currentOption: '',
        options: ["Yes", "No"],
        loading: false
    }

    handleCreatePoll = async () => {
        if(!this.valid()) return;
        this.setState({ loading: true });
        const formData = new FormData();
        formData.append("message", this.state.title);
        formData.append("poll_type", "vote");
        formData.append("options", this.state.options.join(","));
        axios.post("https://www.mycampusdock.com/channels/manager/create-poll", formData, {
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
                    Alert.alert("Poll Created successfully");
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

    valid = () => {    
        if(this.state.message.length < 5) {
            Alert.alert("Invalid Message(atleast 5 characters)");
            return false;
        }

        if(this.state.options.length < 1 ) {
            Alert.alert("There must be atleast 2 options");
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
                        <Text
                            style={{
                                fontFamily: 'Roboto-Thin',
                                textAlign: 'center',
                                margin: 10
                            }}
                        >
                            OPTIONS WLL BE DISPLAYED BELOW
                        </Text>
                        <View
                            style={{
                                minHeight: 150,
                                padding: 10,
                                backgroundColor: '#d0d0d0',
                                borderRadius: 10,
                                marginBottom: 15
                            }}
                        >
                            {
                                this.state.options.map((value, index) => 
                                    <View
                                        key={index}
                                        style={{
                                            padding: 15,
                                            margin: 5,
                                            borderRadius: 10,
                                            backgroundColor: "#f0f0f0",
                                            flexDirection: 'row'
                                        }}
                                    >
                                <Text
                                    style={{
                                        // backgroundColor: 'red',
                                        justifyContent: 'center',
                                        flex: 1,
                                        textAlign: 'center',
                                        fontFamily: 'Roboto',
                                        fontSize: 15
                                    }}
                                >
                                    {value}
                                </Text>
                                <TouchableOpacity
                                    style={{
                                        justifyContent: 'center',
                                        // backgroundColor: 'red'
                                    }}
                                    onPress={
                                        () => {
                                            let options = [...this.state.options];
                                            // delete options[index];
                                            options.splice(index, 1);
                                            this.setState({ options });
                                        }
                                    }
                                >
                                    <Icon
                                        size={15}
                                        style={{
                                            color: 'red'
                                        }}
                                        name="circle-with-minus"
                                    />

                                </TouchableOpacity>

                            </View>
                                )
                            }

                        </View>
                        
                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'row'
                            }}
                        >
                            <TextInput 
                                style={{
                                    padding: 10, 
                                    fontSize: 20, 
                                    backgroundColor: '#f9f5ed', 
                                    borderRadius: 10, 
                                    marginRight: 10,
                                    flex: 1
                                }}
                                placeholder="Enter option here"
                                onChangeText={(currentOption) => this.setState({currentOption})}
                                value={this.state.currentOption}
                            />
                            <TouchableOpacity
                                style={{
                                    justifyContent: 'center',
                                    // backgroundColor: 'red'
                                }}
                                onPress={
                                    () => {
                                        let options = [...this.state.options];
                                        if(options.length === 4) return Alert.alert("can't have more than 4 options!");
                                        if(this.state.currentOption === '') return;
                                        options.push(this.state.currentOption.replace (/,/g, ""));
                                        this.setState({ options, currentOption: '' });
                                    }
                                }
                            >
                                <Icon
                                    size={25}
                                    name="add-to-list"
                                />

                            </TouchableOpacity>

                        </View>
                        
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
                                'Create Poll',
                                'Are you sure you want to create this poll ?',
                                [
                                  {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                  {text: 'OK', onPress: () => this.handleCreatePoll()},
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
                                CREATE POLL
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

export default createPollScreen;