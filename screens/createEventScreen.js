import React from 'react';
import {
 Dimensions, AsyncStorage, Alert, FlatList, TextInput, ScrollView, KeyboardAvoidingView, TouchableOpacity, Text, View, Platform, Image 
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import axios from 'axios';
import FastImage from 'react-native-fast-image';
import DateTimePicker from 'react-native-modal-datetime-picker';
import ImagePicker from 'react-native-image-picker';
import { Navigation } from 'react-native-navigation';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import Constants from '../constants';
const artImage = require('../media/topics/art.webp');
// const hottestImage = require('../../media/topics/hot.webp');
const calImage = require('../media/topics/cal.webp');
const musicImage = require('../media/topics/music.webp');
const satImage = require('../media/topics/sat.webp');
const sagImage = require('../media/topics/sag.webp');
const dadImage = require('../media/topics/dad.webp');
const fashionImage = require('../media/topics/fashion.webp');
const photographyImage = require('../media/topics/photography.webp');
const halImage = require('../media/topics/hal.webp');
const communityImage = require('../media/topics/community.webp');

const categories = [
  {
    title: 'Art',
    value: 'art',
    image: artImage
  },
  {
    title: 'Career and Literature',
    value: 'cal',
    image: calImage
  },
  {
    title: 'Music',
    value: 'music',
    image: musicImage
  },
  {
    title: 'Science and Tech',
    value: 'sat',
    image: satImage
  },
  {
    title: 'Sports and Gaming',
    value: 'sag',
    image: sagImage
  },
  {
    title: 'Dance and Drama',
    value: 'dad',
    image: dadImage
  },
  {
    title: 'Fashion',
    value: 'fashion',
    image: fashionImage
  },
  {
    title: 'Photography',
    value: 'photography',
    image: photographyImage
  },
  {
    title: 'Health and Lifestyle',
    value: 'hal',
    image: halImage
  },
  {
    title: 'Community',
    value: 'community',
    image: communityImage
  }
];

const { TOKEN } = Constants;

const options = {
  title: 'Select Event Poster',
};
class createEventScreen extends React.Component {
  constructor(props) {
    super(props);
    this.valid = this.valid.bind(this);
    this.handleCreateEvent = this.handleCreateEvent.bind(this);
    this.openImagePicker = this.openImagePicker.bind(this);
    this.ValidURL = this.ValidURL.bind(this);
  }

    state = {
      title: '',
      description: '',
      location: '',
      category: '',
      tags: '',
      // categories: [],
      loading: false,
      isDateTimePickerVisible: false,
      reg_start: '',
      reg_end: '',
      reg_link: '',
      picker: '',
      date: '',
      time: '',
      contact_details: '',
      faq: '',
      // price: '',
      // available_seats: '',
      image: null,
      response: null,
      progress: 0
    }

    componentDidMount() {
      const formData = new FormData();
      formData.append('dummy', '');
    }


    openImagePicker = () => {
      ImagePicker.showImagePicker(options, (response) => {
        // console.log('Response = ', response);

        if (response.didCancel) {
          //   console.log('User cancelled image picker');
        } else if (response.error) {
          //   console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          //   console.log('User tapped custom button: ', response.customButton);
        } else {
          const source = { uri: response.uri };
          // You can also display the image using data:
          // const source = { uri: 'data:image/jpeg;base64,' + response.data };
          this.setState({
            image: source,
            response
          });
        }
      });
    }

    _showDateTimePicker = picker => this.setState({ isDateTimePickerVisible: true, picker });

    _hideDateTimePicker = () => {
      this.setState({ isDateTimePickerVisible: false });
    };

    _handleDatePicked = (val) => {
      this.setState({ [this.state.picker]: val });
      this._hideDateTimePicker();
    }

    handleCreateEvent = async () => {
      if (!this.valid()) return;
      this.setState({ loading: true });
      const context = this;
      const formData = new FormData();
      formData.append('title', this.state.title);
      formData.append('description', this.state.description);
      formData.append('location', this.state.location);
      formData.append('category', this.state.category);
      formData.append('tags', this.state.tags);
      formData.append('reg_start', `${this.state.reg_start  }`);
      formData.append('reg_end', `${this.state.reg_end  }`);
      formData.append('date', `${this.state.date  }`);
      formData.append('time', this.state.time.toString());
      formData.append('contact_details', this.state.contact_details);
      formData.append('faq', this.state.faq);
      formData.append('price', '10');
      formData.append('available_seats', '10');
      formData.append('reg_link', this.state.reg_link.trim());
      const response = this.state.response;
      formData.append('file', {
        uri: response.uri,
        type: response.type,
        name: response.fileName
      });

      axios.post('https://www.mycampusdock.com/events/manager/create', formData, {
        onUploadProgress(progressEvent) {
                let percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total )
                context.setState({ progress: percentCompleted });
            },
        headers: {
			  'Content-Type': 'multipart/form-data',
          //   'Accept': 'application/json',
			  'x-access-token': await AsyncStorage.getItem(TOKEN)
        }

		  })
		  .then((result) => {
          result = result.data;
          // console.log(result);
          if (!result.error) {
            Navigation.pop(this.props.componentId);
            Alert.alert('Event Created successfully');
          } else {
          }
          this.setState({ loading: false });
		  })
		  .catch((err) => {
			  	// console.log("DOPE ", err);
			  	Alert.alert(
            err.toString()
          );
          this.setState({ loading: false });
        });
    }

  ValidURL = (str) => {
    try {
      new URL(str);
      return true;
    } catch (_) {
      return false;  
    }
  }

  formatAMPM = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours %= 12;
    hours = hours || 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    const strTime = `${hours}:${minutes} ${ampm}`;
    return strTime;
  }
  
    
    valid = () => {
      if (this.state.title.length < 5) {
        Alert.alert('Invalid Title');
        return false;
      }
      if (this.state.description.length < 5) {
        Alert.alert('Invalid Description');
        return false;
      }
      if (this.state.location.length < 3) {
        Alert.alert('Invalid Location');
        return false;
      }
      if (this.state.category === '') {
        Alert.alert('Invalid Category');
        return false;
      }
      if (this.state.reg_start === '') {
        Alert.alert('Invalid Registration Start Date');
        return false;
      }
      if (this.state.reg_end === '') {
        Alert.alert('Invalid Registration End Date');
        return false;
      }
      if (this.state.date === '') {
        Alert.alert('Invalid Event Date');
        return false;
      }
      if (this.state.time === '') {
        Alert.alert('Invalid Event Time');
        return false;
      }
      if (this.state.contact_details === '') {
        Alert.alert('Invalid Contact Details');
        return false;
      }

      // if (this.state.reg_link.trim() !== '') {
      //   if (!this.ValidURL(this.state.reg_link)) {
      //     Alert.alert('Invalid Link');
      //     return false;
      //   }
      // }
      // if (!parseInt(this.state.price)) {
      //   if (this.state.price !== '0') {
      //     Alert.alert('Price must be a number');
      //     return false;
      //   }
      // }
      // if (!parseInt(this.state.available_seats)) {
      //   Alert.alert('Available Seats must be a number');
      //   return false;
      // }

      if (this.state.image === null) {
        Alert.alert('Please select a valid poster');
        return false;
      }

      return true;
    }

    render() {
      const barWidth = Dimensions.get('screen').width - 40;
      return (
          <View style={{ flex: 1, backgroundColor: '#fff' }}>
              <KeyboardAvoidingView behavior={Platform.OS === 'android' ? '' : 'padding'} style={{
 flex: 1, marginBottom: Platform.OS === 'android' ? 0 : 35, paddingBottom: 10, backgroundColor: '#fff', borderRadius: 10, marginLeft: 10, marginRight: 10, paddingTop: 0, paddingLeft: 10, paddingRight: 10 
}}>
                  <ScrollView
                      keyboardShouldPersistTaps="handled"
                    >
                      {
                    this.state.image === null 
                    && <Image
style={{
                      borderRadius: 10,
                      margin: 5,
                      alignSelf: 'center',
                      width: 200,
                      height: 150 
}}
                      source={require('../media/event.jpg')}
                    />
                }
                      {
                    this.state.image !== null 
                    && <Image
style={{
                      borderRadius: 10,
                      margin: 5,
                      alignSelf: 'center',
                      width: 200,
                      height: 150 
}}
                      source={{ uri: this.state.image.uri }}
                    />
                }
                      <TouchableOpacity
                  style={{
                      flexDirection: 'row',
                      justifyContent: 'center'
                    }}
                  onPress={this.openImagePicker}
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
                      <TextInput
                          style={{
 padding: 10, fontSize: 20, backgroundColor: '#f9f5ed', borderRadius: 10, marginTop: 10 
}}
                          onChangeText={title => this.setState({ title })}
                          value={this.state.title}
                          autoCapitalize="none"
                          placeholder="Event Title"
                        />
                      <TextInput
                          multiline
                          numberOfLines={5}
                          style={{
                              padding: 10,
                              fontSize: 20,
                              backgroundColor: '#f9f5ed',
                              borderRadius: 10,
                              marginTop: 10,
                              minHeight: 80
                            }}
                          onChangeText={description => this.setState({ description })}
                          value={this.state.description}
                          autoCapitalize="none"
                          placeholder="Event Description"
                        />
                      <TextInput
                          style={{
 padding: 10, fontSize: 20, backgroundColor: '#f9f5ed', borderRadius: 10, marginTop: 10 
}}
                          onChangeText={location => this.setState({ location })}
                          value={this.state.location}
                          autoCapitalize="none"
                          placeholder="Event Location"
                        />
                      <TextInput
                          style={{
 padding: 10, fontSize: 20, backgroundColor: '#f9f5ed', borderRadius: 10, marginTop: 10 
}}
                          onChangeText={tags => this.setState({ tags })}
                          value={this.state.tags}
                          autoCapitalize="none"
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
                          horizontal
                          style={{ marginBottom: 10 }}
                          showsHorizontalScrollIndicator={false}
                          keyExtractor={(value, index) => `${index  }`}
                          data={categories}
                          renderItem={({ item }) => (
                            <TouchableOpacity
                                    style={{
                                        // backgroundColor: '#c0c0c0',
                                        borderRadius: 10,
                                        width: 100,
                                        margin: 5
                                    }}
                                    onPress={
                                        () => this.setState({
                                            category: item.value
                                        })
                                    }
                                >
                                    <FastImage
                                        source={item.image}
                                        style={{
                                            width: 100,
                                            height: 75,
                                            borderRadius: 10,
                                            opacity: this.state.category === item.value ? 0.5 : 1,
                                            
                                        }}
                                        resizeMode={FastImage.resizeMode.contain}
                                    />
                                    <Text
                                      style={{
                                        textAlign: 'center'
                                      }}
                                    >
                                      {item.title}
                                    </Text>
                                </TouchableOpacity>
)}
                        />
                      <TouchableOpacity
                          style={{
                              backgroundColor: '#3f51b5',
                              margin: 10,
                              borderRadius: 10,
                              padding: 10
                            }}
                          onPress={() => this._showDateTimePicker('date')}
                        >
                          <Text
                              style={{
                                  textAlign: 'center',
                                  fontFamily: 'Roboto-Light',
                                  fontSize: 20,
                                  color: '#fff'
                                }}
                            >
{this.state.date === "" ? "Event Date" : this.state.date + ""}

                            </Text>
                        </TouchableOpacity>
                      <TouchableOpacity
                          style={{
                              backgroundColor: '#3f51b5',
                              margin: 10,
                              borderRadius: 10,
                              padding: 10
                            }}
                          onPress={() => this._showDateTimePicker('time')}
                        >
                          <Text
                              style={{
                                  textAlign: 'center',
                                  fontFamily: 'Roboto-Light',
                                  fontSize: 20,
                                  color: '#fff'
                                }}
                            >
{this.state.time === "" ? "Event Time" : this.formatAMPM(this.state.time) + ""}

                            </Text>
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
                                  backgroundColor: '#2e7d32',
                                  margin: 10,
                                  borderRadius: 10,
                                  padding: 10
                                }}
                              onPress={() => this._showDateTimePicker('reg_start')}
                            >
                              <Text
                                  style={{
                                      textAlign: 'center',
                                      fontFamily: 'Roboto-Light',
                                      fontSize: 20,
                                      color: '#fff'
                                    }}
                                >
{this.state.reg_start === "" ? "Start Date" : this.state.reg_start + ""}

                                </Text>
                            </TouchableOpacity>
                          <TouchableOpacity
                              style={{
                                  backgroundColor: '#dd2c00',
                                  margin: 10,
                                  borderRadius: 10,
                                  padding: 10
                                }}
                              onPress={() => this._showDateTimePicker('reg_end')}
                            >
                              <Text
                                  style={{
                                      textAlign: 'center',
                                      fontFamily: 'Roboto-Light',
                                      fontSize: 20,
                                      color: '#fff'
                                    }}
                                >
{this.state.reg_end === "" ? "End Date" : this.state.reg_end + ""}

                                </Text>
                            </TouchableOpacity>
                        </View>
                      <TextInput
                          multiline
                          numberOfLines={5}
                          style={{
                              padding: 10,
                              fontSize: 20,
                              backgroundColor: '#f9f5ed',
                              borderRadius: 10,
                              marginTop: 10,
                              minHeight: 80
                            }}
                          onChangeText={contact_details => this.setState({ contact_details })}
                          value={this.state.contact_details}
                          autoCapitalize="none"
                          placeholder="Contact Details"
                        />
                      <TextInput
                          multiline
                          numberOfLines={5}
                          style={{
                              padding: 10,
                              fontSize: 20,
                              backgroundColor: '#f9f5ed',
                              borderRadius: 10,
                              marginTop: 10,
                              minHeight: 80
                            }}
                          onChangeText={faq => this.setState({ faq })}
                          value={this.state.faq}
                          autoCapitalize="none"
                          placeholder="Frequently Asked Questions"
                        />
                      <TextInput
                          style={{
                              padding: 10,
                              fontSize: 20,
                              backgroundColor: '#f9f5ed',
                              borderRadius: 10,
                              marginTop: 10
                            }}
                          onChangeText={reg_link => this.setState({ reg_link })}
                          value={this.state.reg_link}
                          autoCapitalize="none"
                          placeholder="Google Form's Link"
                        />
                      {/* <TextInput
                          style={{
 padding: 10, fontSize: 20, backgroundColor: '#f9f5ed', borderRadius: 10, marginTop: 10 
}}
                          onChangeText={price => this.setState({ price })}
                          value={this.state.price}
                          autoCapitalize="none"
                          placeholder="Event Price"
                        /> */}
                      {/* <TextInput
                          style={{
 padding: 10, fontSize: 20, backgroundColor: '#f9f5ed', borderRadius: 10, marginTop: 10 
}}
                          onChangeText={available_seats => this.setState({ available_seats })}
                          value={this.state.available_seats}
                          autoCapitalize="none"
                          placeholder="Available Seats"
                        /> */}
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
                          disabled={this.state.loading}
                          style={{
                              backgroundColor: this.state.loading ? '#c0c0c0' : 'red',
                              // margin: 10,
                              borderRadius: 10,
                              marginTop: 15,
                              padding: 10
                            }}
                          onPress={() => Alert.alert(
                              'Create Event',
                              'Are you sure you want to create this event ?',
                              [
                                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                                { text: 'OK', onPress: () => this.handleCreateEvent() },
                              ],
                              { cancelable: false }
                            )}
                        >
                          <Text
                              style={{
                                  textAlign: 'center',
                                  fontFamily: 'Roboto',
                                  fontSize: 20,
                                  color: '#fff'
                                }}
                            >
                                CREATE EVENT
                            </Text>
                        </TouchableOpacity>
                      <View
                          style={{
                              height: 10
                            }}
                         />
                    </ScrollView>
                </KeyboardAvoidingView>
              <DateTimePicker
                  isVisible={this.state.isDateTimePickerVisible}
                  mode={this.state.picker === 'time' ? 'time' : 'date'}
                  onConfirm={this._handleDatePicked}
                  onCancel={this._hideDateTimePicker}
                />
            </View>
      );
    }
}

export default createEventScreen;
