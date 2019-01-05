import React from 'react';
import { Alert, FlatList, TextInput, ScrollView, KeyboardAvoidingView, TouchableOpacity, Text, View, Platform, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'
import axios from 'axios';
import FastImage from 'react-native-fast-image';
import DateTimePicker from 'react-native-modal-datetime-picker';

class createEventScreen extends React.Component {
    constructor(props) {
        super(props);
        this.valid = this.valid.bind(this);
        this.handleCreateEvent = this.handleCreateEvent.bind(this);
    }
    state = {
        title: '',
        description: '',
        location: '',
        category: '',
        categories: [],
        isDateTimePickerVisible: false,
        reg_start: '',
        reg_end: '',
        picker: '',
        date: '',
        time: '',
        contact_details: '',
        faq: '',
        price: '',
        available_seats: ''
    }
    _showDateTimePicker = (picker) => this.setState({ isDateTimePickerVisible: true, picker });
 
    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });
    
    _handleDatePicked = (val) => {
        this.setState({ [this.state.picker]: val });
        this._hideDateTimePicker();
    }

    handleCreateEvent = () => {
        if(!this.valid()) return;
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

    valid = () => {
        if(this.state.title.length < 5) {
            Alert.alert("Invalid Title");
            return false;
        }
        if(this.state.description.length < 5) {
            Alert.alert("Invalid Description");
            return false;
        }
        if(this.state.location.length < 3) {
            Alert.alert("Invalid Location");
            return false;
        }
        if(this.state.category === "") {
            Alert.alert("Invalid Category");
            return false;
        }
        if(this.state.reg_start === "") {
            Alert.alert("Invalid Registration Start Date");
            return false;
        }
        if(this.state.reg_end === "") {
            Alert.alert("Invalid Registration End Date");
            return false;
        }
        if(this.state.date === "") {
            Alert.alert("Invalid Event Date");
            return false;
        }
        if(this.state.time === "") {
            Alert.alert("Invalid Event Time");
            return false;
        }
        if(this.state.contact_details === "") {
            Alert.alert("Invalid Contact Details");
            return false;
        }
        if(!parseInt(this.state.price)) {
            Alert.alert("Price must be a number");
            return false;
        }
        if(!parseInt(this.state.available_seats)) {
            Alert.alert("Available Seats must be a number");
            return false;
        }
        
        return true;
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
                        <TouchableOpacity 
                            style={{
                                backgroundColor: "#3f51b5",
                                margin: 10,
                                borderRadius: 10,
                                padding: 10
                            }}
                            onPress={() => this._showDateTimePicker("date")}
                        >
                            <Text
                                style={{
                                    textAlign: 'center',
                                    fontFamily: 'Roboto-Light',
                                    fontSize: 20,
                                    color: "#fff"
                                }}
                            >{this.state.date === "" ? "Event Date" : this.state.date + ""}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={{
                                backgroundColor: "#3f51b5",
                                margin: 10,
                                borderRadius: 10,
                                padding: 10
                            }}
                            onPress={() => this._showDateTimePicker("time")}
                        >
                            <Text
                                style={{
                                    textAlign: 'center',
                                    fontFamily: 'Roboto-Light',
                                    fontSize: 20,
                                    color: "#fff"
                                }}
                            >{this.state.time === "" ? "Event Time" : this.state.time + ""}</Text>
                        </TouchableOpacity>
                        <View
                            style={{
                                margin: 5,
                                flex: 1,
                                // height: 150,
                                borderRadius: 10,
                                backgroundColor: '#f0f0f0'
                            }}
                        >
                            <Text
                                style={{
                                    textAlign: 'center',
                                    margin: 15,
                                    fontFamily: 'Roboto'
                                }}
                            >
                                Registration Dates
                            </Text>
                            <TouchableOpacity 
                                style={{
                                    backgroundColor: "#2e7d32",
                                    margin: 10,
                                    borderRadius: 10,
                                    padding: 10
                                }}
                                onPress={() => this._showDateTimePicker("reg_start")}
                            >
                                <Text
                                    style={{
                                        textAlign: 'center',
                                        fontFamily: 'Roboto-Light',
                                        fontSize: 20,
                                        color: "#fff"
                                    }}
                                >{this.state.reg_start === "" ? "Start Date" : this.state.reg_start + ""}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={{
                                    backgroundColor: "#dd2c00",
                                    margin: 10,
                                    borderRadius: 10,
                                    padding: 10
                                }}
                                onPress={() => this._showDateTimePicker("reg_end")}
                            >
                                <Text
                                    style={{
                                        textAlign: 'center',
                                        fontFamily: 'Roboto-Light',
                                        fontSize: 20,
                                        color: "#fff"
                                    }}
                                >{this.state.reg_end === "" ? "End Date" : this.state.reg_end + ""}</Text>
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
                            onChangeText={(contact_details) => this.setState({contact_details})}
                            value={this.state.contact_details}
                            autoCapitalize={"none"}
                            placeholder="Contact Details"
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
                            onChangeText={(faq) => this.setState({faq})}
                            value={this.state.faq}
                            autoCapitalize={"none"}
                            placeholder="Frequently Asked Questions"
                        />
                        <TextInput
                            style={{ padding: 10, fontSize: 20, backgroundColor: '#f9f5ed', borderRadius: 10, marginTop: 10 }}
                            onChangeText={(price) => this.setState({price})}
                            value={this.state.price}
                            autoCapitalize={"none"}
                            placeholder="Event Price"
                        />
                        <TextInput
                            style={{ padding: 10, fontSize: 20, backgroundColor: '#f9f5ed', borderRadius: 10, marginTop: 10 }}
                            onChangeText={(available_seats) => this.setState({available_seats})}
                            value={this.state.available_seats}
                            autoCapitalize={"none"}
                            placeholder="Available Seats"
                        />
                        <TouchableOpacity 
                            // disabled={!this.valid()}
                            style={{
                                backgroundColor: "red",
                                // margin: 10,
                                borderRadius: 10,
                                padding: 10
                            }}
                            onPress={() => Alert.alert(
                                'Create Event',
                                'Are you sure you want to create this event ?',
                                [
                                  {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                  {text: 'OK', onPress: () => this.handleCreateEvent()},
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
                                CREATE EVENT
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
                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    mode={ this.state.picker === "time" ? "time" : "date" }
                    onConfirm={this._handleDatePicked}
                    onCancel={this._hideDateTimePicker}
                />
            </View>
        );
    }
}

export default createEventScreen;