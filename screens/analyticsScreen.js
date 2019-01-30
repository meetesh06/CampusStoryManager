import React from 'react';
import { RefreshControl, Dimensions, FlatList, AsyncStorage, Text, ScrollView, View, TouchableOpacity, Platform, Image } from 'react-native';
import FastImage from 'react-native-fast-image'
import { Navigation } from 'react-native-navigation'
import EventCardBig from '../components/EventCardBig';
import axios from 'axios';
import Constants from '../constants';
import Realm from '../realm';

const WIDTH = Dimensions.get('window').width;
const TOKEN = Constants.TOKEN;
class AnalyticsScreen extends React.Component {
    
    constructor(props) {
        super(props);
        this.handleUpdateData = this.handleUpdateData.bind(this);
        this._updateContent = this._updateContent.bind(this);
        this.handleEventPress = this.handleEventPress.bind(this);
        this.process_realm_obj = this.process_realm_obj.bind(this);
    }

    state = {
        events: [],
        refreshing: false
    }

    componentDidMount() {
        this._updateContent();
    }

    process_realm_obj = (RealmObject, callback) => {
        var result = Object.keys(RealmObject).map(function(key) {
          return {...RealmObject[key]};
        });
        callback(result);
    }

    handleUpdateData = async (last_updated) => {
        this.setState({ refreshing: true });
        axios.post('https://www.mycampusdock.com/events/manager/get-event-list', { last_updated }, {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': await AsyncStorage.getItem(TOKEN)
            }
        }).then( response => {
            console.log(response);
            if(!response.data.error) {
                response.data.data.forEach((el)=>{
                    el.reach = JSON.stringify(el.reach);
                    el.views = JSON.stringify(el.views);
                    el.enrollees = JSON.stringify(el.enrollees);
                    el.name = JSON.stringify(el.name);
                    el.audience = JSON.stringify(el.audience);
                    el.media = JSON.stringify(el.media);
                    el.timestamp = new Date(el.timestamp);
                    el.time = new Date(el.time);
                    let ts = Date.parse(''+el.date);
                    el.date = new Date(el.date);
                    el.ms = ts;
                    el.reg_end = new Date(el.reg_end);
                    el.reg_start = new Date(el.reg_start);
                });
                let data = response.data.data;
                if(data.length === 0) return;
                console.log(data);
                Realm.getRealm((realm) => {
                    realm.write(() => {
                        let i;
                        for(i=0;i<data.length;i++) {
                            try {
                                realm.create('Events', data[i], true);
                            } catch(e) {
                                console.log(e);
                            }
                        }
                    });
                    let current = realm.objects('Events').sorted('timestamp', true);
                    this.setState({ events: current });
                });
            }
        }).catch( err => console.log(err) )
        .finally( () => this.setState({ refreshing: false }) )
    }

    _updateContent = async () => {
        Realm.getRealm((realm) => {
            let current = realm.objects('Events').sorted('timestamp', true);
            this.process_realm_obj(current, (result)=>{
                console.log(result);
                if(result.length > 0) {
                    this.setState({ events: result });
                    this.handleUpdateData(result[0].timestamp);
                }
                else
                    this.handleUpdateData('NIL');

            })
                
        });
    }

    handleEventPress = (item) => {
        Realm.getRealm((realm) => {
            let current = realm.objects('Events').filtered(`_id="${item._id}"`);
            this.process_realm_obj(current, (result)=>{
                // console.log(result);
                Navigation.push(this.props.componentId, {
                    component: {
                      name: 'Event Detail Screen',
                      passProps: {
                        item: result[0],
                        id: result[0].title
                      },
                      options: {
                        topBar: {
                            visible: true,
                            drawBehind: false,
                            title: {
                                text: result[0].title,
                            },
                        },
                        bottomTabs: {
                            visible: false,
                            drawBehind: true,
                            animate: true
                        }
                      }
                    }
                  });
            })
        });
    }
    render() {
        return(
            <View style={{flex: 1}}>
                <View elevation={5} 
                    style = {{ 
                        backgroundColor : '#fff', 
                        minHeight : Platform.OS === 'android' ? 70 : 90, 
                        paddingTop : Platform.OS === 'android'? 8 : 30, 
                        shadowColor: "#000000",
                        shadowOpacity: 0.1,
                        shadowRadius: 0.5,
                        shadowOffset: {
                            height: 2,
                            width: 2
                        }
                }}>
                    <Image style={{ margin: 5, alignSelf: 'center', width: 50, height: 50 }} source={require('../media/app-bar/logo.png')}></Image>
                </View>
                <ScrollView 
                    refreshControl={
                        <RefreshControl
                          refreshing={this.state.refreshing}
                          onRefresh={this._updateContent}
                        />
                    }
                    style={{ flex: 1, backgroundColor: '#fff' }}
                >
                    <FlatList 
                        horizontal={false}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, index) => index+""}
                        data={this.state.events} 
                        renderItem={({item}) => 
                            <EventCardBig onPress={this.handleEventPress} width={WIDTH - 20} height={(WIDTH - 20) * 0.75} item={item} />
                        } 
                    />
                    
                </ScrollView>
            </View>
        );
    }
}

export default AnalyticsScreen;