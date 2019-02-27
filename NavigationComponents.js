import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';

const homeTopBar = () => (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding : 2
      }}
    >
      <Text style={{color : '#514A9D', fontSize : 18, margin : 4, textAlign : 'center', marginLeft : 10, marginRight : 10}}>Creator's Studio</Text>
    </View>
);

const archiveIcon = () => (
  <TouchableOpacity
    style={{
      padding : 5,
    }}
    onPress={
      () => {
        Navigation.showModal({
          component: {
            name: 'Archive Screen',
            options: {
              topBar: {
                visible: false
              }
            }
          }
        });
      }
    }
  >
    <Icon size={25} style={{ color: '#514A9D' }} name="archive"/>
  </TouchableOpacity>
);

const createEventIcon = () => (
  <TouchableOpacity
    style={{
      padding : 5,
    }}
    onPress={
      () => {
        Navigation.showModal({
          component: {
            name: 'Archive Screen',
            options: {
              topBar: {
                visible: false
              }
            }
          }
        });
      }
    }
  >
    <Icon2 size={25} style={{ color: '#514A9D' }} name="ios-create"/>
  </TouchableOpacity>
);

const helpStoryIcon = () => (
  <TouchableOpacity
    style={{
      padding : 5,
    }}
    onPress={
      () => {
        Navigation.showModal({
          component: {
            name: 'Archive Screen',
            options: {
              topBar: {
                visible: false
              }
            }
          }
        });
      }
    }
  >
    <Icon2 size={25} style={{ color: '#514A9D' }} name="md-help-circle"/>
  </TouchableOpacity>
);

const doneStoryIcon = () => (
  <TouchableOpacity
    style={{
      padding : 5,
    }}
    onPress={
      () => {
        Navigation.showModal({
          component: {
            name: 'Archive Screen',
            options: {
              topBar: {
                visible: false
              }
            }
          }
        });
      }
    }
  >
    <Icon2 size={25} style={{ color: '#514A9D' }} name="md-checkmark-circle"/>
  </TouchableOpacity>
);

const navigationComponents = {
    HOME_TOP_BAR : homeTopBar,
    ARCHIVE_ICON : archiveIcon,
    CREATE_EVENT_ICON : createEventIcon,
    HELP_STORY_ICON : helpStoryIcon,
    DONE_STORY_ICON : doneStoryIcon
}

export default navigationComponents;