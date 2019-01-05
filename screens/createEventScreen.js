import React from 'react';
import { Picker, FlatList, TextInput, ScrollView, KeyboardAvoidingView, TouchableOpacity, Text, View, Platform, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'
import axios from 'axios';
import FastImage from 'react-native-fast-image';

class createEventScreen extends React.Component {
    state = {
        title: '',
        description: '',
        location: '',
        category: '',
        categories: []
    }
    componentDidMount() {
        formData = new FormData();
		formData.append("dummy", "");
        axios.post("https://www.mycampusdock.com/users/get-category-list", formData, {
			headers: {
			  'Content-Type': 'multipart/form-data',
			//   'x-access-token': this.props.auth.user_token
			}
		  })
		  .then( (result) => {
			result = result.data;
			console.log(result);
			if(!result.error) {
                
				this.setState({ categories: result.data, category: result.data[0].value });
			}
		  })
		  .catch( (err) => console.log(err) )
		  .finally( () => {
			// if(this.mounted)
				this.setState({ refreshing: false });
		  } )
    }
    render() {
        return(
            <View style={{ flex: 1 }}>
                <View elevation={5} 
                    style = {{ 
                        backgroundColor : '#fff', 
                        minHeight : Platform.OS === 'android' ? 70 : 90, 
                        paddingTop : Platform.OS === 'android'? 8 : 30, 
                        // shadowColor: "#000000",
                        // shadowOpacity: 0.1,
                        // shadowRadius: 0.5,
                        // shadowOffset: {
                        //     height: 2,
                        //     width: 2
                        // }
                }}>
                    <Text
                        style={{ 
                            fontFamily: 'Roboto-Light',
                            textAlign: 'center',
                            flex: 1,
                            marginTop: 20,
                            fontSize: 35
                         }}
                    >
                        Create a new Event
                    </Text>
                </View>
                <Image style={{ 
                    borderRadius: 10,
                    margin: 5, 
                    alignSelf: 'center', 
                    width: 200, 
                    height: 150 }} 
                    source={require('../media/event.jpg')} 
                />
                <TouchableOpacity 
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center'
                    }}
                >
                    <Text
                        style={{
                            fontFamily: 'Roboto-Light',
                            fontSize: 15,
                            marginRight: 5
                        }}
                    >
                        CHANGE IMAGE 
                    </Text>
                    <Icon size={15} name="edit" />
                    
                </TouchableOpacity>
                <KeyboardAvoidingView behavior="padding" style={{ flex: 1, marginBottom: 35, paddingBottom: 10, backgroundColor: '#fff', borderRadius: 10, marginLeft: 10, marginRight: 10, paddingTop: 0, paddingLeft: 10, paddingRight: 10 }}> 
                    <ScrollView
                        keyboardShouldPersistTaps='handled'
                    >
                        <TextInput
                            style={{ padding: 10, fontSize: 20, backgroundColor: '#f9f5ed', borderRadius: 10, marginTop: 10 }}
                            onChangeText={(title) => this.setState({title})}
                            value={this.state.title}
                            autoCapitalize={"none"}
                            placeholder="Event Title"
                        />
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
                            onChangeText={(description) => this.setState({description})}
                            value={this.state.description}
                            autoCapitalize={"none"}
                            placeholder="Event Description"
                        />
                        <TextInput
                            style={{ padding: 10, fontSize: 20, backgroundColor: '#f9f5ed', borderRadius: 10, marginTop: 10 }}
                            onChangeText={(location) => this.setState({location})}
                            value={this.state.location}
                            autoCapitalize={"none"}
                            placeholder="Event Location"
                        />
                        <TextInput
                            style={{ padding: 10, fontSize: 20, backgroundColor: '#f9f5ed', borderRadius: 10, marginTop: 10 }}
                            onChangeText={(tags) => this.setState({tags})}
                            value={this.state.tags}
                            autoCapitalize={"none"}
                            placeholder="Event Tags: Technology, Machine Learning, AI"
                        />
                        {/* <Text
                            style={{
                                marginTop: 10,
                                fontFamily: 'Roboto',
                                textAlign: 'center'
                            }}
                        >
                            Select a category
                        </Text> */}
                        <FlatList 
                            horizontal={true}
                            style={{ marginBottom: 10 }}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={ (value, index) => index + "" }
                            data={this.state.categories} 
                            renderItem={({item}) =>
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: '#c0c0c0',
                                        borderRadius: 10,
                                        margin: 5
                                    }}
                                    onPress={
                                        () => this.setState({
                                            category: item.value
                                        })
                                    }
                                >
                                    <FastImage
                                        source={{ uri: "https://www.mycampusdock.com/" + item.media }}
                                        style={{
                                            width: 100,
                                            height: 75,
                                            opacity: this.state.category === item.value ? 0.5 : 1,
                                            
                                        }}
                                        resizeMode={FastImage.resizeMode.contain}
                                    />
                                </TouchableOpacity>
                            }
                        />

                        <View
                            style={{
                                height: 150
                            }}
                        >

                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

export default createEventScreen;