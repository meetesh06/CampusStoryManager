import React from 'react';
import { ActivityIndicator, AsyncStorage, TouchableOpacity, Dimensions, View, Text, ScrollView } from 'react-native';
import Realm from '../realm';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/Entypo';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import Constants from '../constants';
import { Navigation } from 'react-native-navigation';
import RNFetchBlob from 'react-native-fetch-blob';
import FileViewer from 'react-native-file-viewer';

const WIDTH = Dimensions.get('window').width;
const TOKEN = Constants.TOKEN;

class EventDetail extends React.Component {
    constructor(props) {
        super(props);

        this.getMonthName = this.getMonthName.bind(this);
        this.formatAMPM = this.formatAMPM.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    state = {
        item: this.props.item,
        going: false,
        loading: false,
        notify: false
    }

    async componentDidMount() {
        // const process_realm_obj = this.process_realm_obj;
        this.setState({ loading: true });
        axios.post('https://www.mycampusdock.com/events/manager/fetch-event-data', { _id: this.props.item._id }, {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': await AsyncStorage.getItem(TOKEN)
            }
        }).then( response => {
            console.log(response);
            response = response.data;
            if(!response.error) {
                Realm.getRealm((realm) => {
                    let el = response.data[0];
                    realm.write(() => {
                        try {
                            let current = realm.objects('Events').filtered(`_id="${this.props.item._id}"`);
                            realm.delete(current);
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
                            realm.create('Events', el, true);
                        } catch(e) {
                            console.log(e);
                        }
                        
                    });
                    console.log(el);
                    // this.setState({ item: el })
                });
            }
        }).catch( err => console.log(err) )
        .finally( () => this.setState({ loading: false }) );

        
        
    }

    getMonthName = (num) => {
        switch(num) {
            case 1:
                return "JAN"
            case 2:
                return "FEB"    
            case 3:
                return "MAR"
            case 4:
                return "APR"
            case 5:
                return "MAY"
            case 6:
                return "JUN"
            case 7:
                return "JUL"
            case 8:
                return "AUG"
            case 9:
                return "SEP"
            case 10:
                return "OCT"
            case 11:
                return "NOV"
            case 12:
                return "DEC"
            default: 
                return "FUCK"
            
        }
    }

    formatAMPM = (date) => {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }

    handleClick = async () => {
        if(this.state.loading) return;
        this.setState({ loading: true });
        // console.log('download the file now');
        const enrollees = JSON.parse(this.state.item.enrollees);
        
        const values = [];
        enrollees.forEach( (value) => {
            values.push([ value.email, value.phone, value.name ])
        });
        
        // const values = [
        //     ['build', '2017-11-05T05:40:35.515Z'],
        //     ['deploy', '2017-11-05T05:42:04.810Z']
        // ];
          
          // construct csvString
          const headerString = 'email,phone,name\n';
          const rowString = values.map(d => `${d[0]},${d[1]}\n`).join('');
          const csvString = `${headerString}${rowString}`;
          
          // write the current list of answers to a local csv file
          const pathToWrite = `${RNFetchBlob.fs.dirs.DocumentDir}/${this.props.item._id}.csv`;
          console.log('pathToWrite', pathToWrite);
          // pathToWrite /storage/emulated/0/Download/data.csv
          RNFetchBlob.fs
            .writeFile(pathToWrite, csvString, 'utf8')
            .then(() => {
              console.log(`wrote file ${pathToWrite}`);
              // wrote file /storage/emulated/0/Download/data.csv
                const path = pathToWrite;
                FileViewer.open(path)
                .then(() => {
                    // success
                })
                .catch(error => {
                    // error
                });
            })
            .catch(error => console.error(error));

        this.setState({ loading: false });
    }

    render() {
        const { item } = this.state;
        console.log(item);
        return(
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#fff'
                }}
            >

                <ScrollView 
                    style={{
                        flex: 1,
                        // backgroundColor: '#333'
                    }}
                >
                    <View
                        style={{
                            backgroundColor: '#fff',
                            // flex: 1,
                            // height: 350
                        }}
                    >
                    </View>
                    <View>
                    <FastImage
                        style={{ width: WIDTH - 20, marginLeft: 10, marginTop: 10, height: 200, borderRadius: 10 }}
                        source={{ uri: "https://www.mycampusdock.com/" + JSON.parse(item.media)[0] }}
                        resizeMode={FastImage.resizeMode.cover}
                    />
                    <View style={{backgroundColor : '#rgba(0, 0, 0, 0.5)', position : 'absolute', top : 15, right : 15, borderRadius : 5}}>
                        <Text style={{ fontSize : 15, color : '#efefef', marginLeft : 10, marginRight : 10, margin: 5 }}>{item.category.toUpperCase()}</Text>
                    </View>
                    </View>
                    <View
                        style={{
                            // margin: 5,
                            flex: 1,
                            marginTop: 5,
                            marginLeft: 5,
                            padding: 5,
                            flexDirection: 'row'
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: '#f1f1f1',
                                marginRight: 10,
                                paddingRight : 10,
                                paddingLeft : 10,
                                padding : 5,
                                borderRadius: 10
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: 'Roboto',
                                    fontSize: 15,
                                    color: '#fa3e3e',
                                    textAlign: 'center',
                                    fontWeight: '900'
                                }}
                            >
                            { this.getMonthName(item.date.getMonth() + 1) }
                            </Text>
                            <Text
                                style={{
                                    textAlign: 'center',
                                    fontSize: 22,
                                    color: '#333',
                                }}
                            >
                                {/* { JSON.stringify( item.date ) } */}
                                { JSON.stringify( item.date.getDate() ) }
                            </Text>
                        </View>

                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                            }}
                        >
                            <Text
                                style={{
                                    textAlign: 'left',
                                    fontSize: 20,
                                    color: '#222',
                                }}
                            >
                                { item.title }
                            </Text>
                            <TouchableOpacity
                                style={{
                                    marginTop: 5
                                }}
                            >
                                <Text
                                    style={{
                                        fontFamily: 'Roboto-Thin'
                                    }}
                                >
                                    
                                    {"Hosted by " }
                                    <Text
                                        style={{
                                            color: '#1111aa',
                                            fontFamily: 'Roboto'
                                        }}
                                    >
                                        { item.channel_name }
                                    </Text>
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View
                        style={{
                            marginLeft: 5,
                            flex: 1,
                            
                            padding: 5,
                            flexDirection: 'row'
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: '#f1f1f1',
                                padding: 10,
                                marginRight: 10,
                                borderRadius: 10
                            }}
                        >
                            <Icon1 style={{ color: '#fa3e3e', }} size={30} name="location-pin" />
                        </View>
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                            }}
                        >
                            <Text
                                style={{
                                    textAlign: 'left',
                                    fontSize: 15,
                                    // color: '#222',
                                }}
                            >
                                { item.location }
                            </Text>
                            <Text
                                style={{
                                    textAlign: 'left',
                                    fontSize: 15,
                                    color: '#222',
                                }}
                            >
                                { this.formatAMPM(item.date) }
                            </Text>
                        </View>
                    </View>
                    <View
                        style={{
                            flex: 1,
                            marginLeft: 5,
                            padding: 5,
                            flexDirection: 'row'
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: '#f1f1f1',
                                padding: 10,
                                marginRight: 10,
                                borderRadius: 10
                            }}
                        >
                            <Icon style={{ color: '#444', }} size={30} name="smileo" />
                        </View>
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                            }}
                        >
                            <Text
                                style={{
                                    textAlign: 'left',
                                    fontSize: 15,
                                }}
                            >
                                { JSON.parse(item.enrollees).length } People Going
                            </Text>
                            <Text
                                style={{
                                    textAlign: 'left',
                                    fontSize: 15,
                                    color: '#222',
                                }}
                            >
                                { item.views } Views
                            </Text>
                        </View>
                    </View>

                    <View
                        style={{
                            flex: 1,
                            marginLeft: 5,
                            padding: 5,
                            flexDirection: 'row'
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: '#f1f1f1',
                                padding: 10,
                                marginRight: 10,
                                borderRadius: 10
                            }}
                        >
                            <Icon1 style={{ color: '#444', }} size={30} name="text" />
                        </View>
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                            }}
                        >
                            <Text
                                style={{
                                    textAlign: 'left',
                                    fontSize: 15,
                                    // color: '#222',
                                }}
                            >
                                {item.description}
                            </Text>
                        </View>
                    </View>

                    <View
                        style={{
                            flex: 1,
                            marginLeft: 5,
                            padding: 5,
                            flexDirection: 'row'
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: '#f1f1f1',
                                padding: 10,
                                marginRight: 10,
                                borderRadius: 10
                            }}
                        >
                            <IconIonicons style={{ color: '#444', }} size={30} name="md-contact" />
                        </View>
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                            }}
                        >
                            <Text
                                style={{
                                    textAlign: 'left',
                                    fontSize: 15,
                                    // color: '#222',
                                }}
                            >
                                {item.contact_details}
                            </Text>
                        </View>
                    </View>
                    <View
                        style={{
                            flex: 1,
                            marginLeft: 5,
                            padding: 5,
                            flexDirection: 'row'
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: '#f1f1f1',
                                padding: 10,
                                marginRight: 10,
                                borderRadius: 10
                            }}
                        >
                            <Icon style={{ color: '#444', }} size={30} name="questioncircleo" />
                        </View>
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                            }}
                        >
                            <Text
                                style={{
                                    textAlign: 'left',
                                    fontSize: 15,
                                    // color: '#222',
                                }}
                            >
                                {item.faq}
                            </Text>
                        </View>
                    </View>
                    
                </ScrollView>
                <View
                    style={{
                        flexDirection: 'row'
                    }}
                >
                    <TouchableOpacity
                        onPress={this.handleClick}
                        style={{
                            padding: 20,
                            backgroundColor: 'blue',
                            flex: 1
                        }}
                    >
                        {
                            this.state.loading &&
                            <ActivityIndicator size="small" color="#fff" />
                        }
                        {
                            !this.state.loading &&
                            <Text
                                style={{
                                    color: '#fff',
                                    fontSize: 20,
                                    fontFamily: 'Roboto',
                                    textAlign: 'center'
                                }}
                            >    
                                GET ENROLLMENT LIST
                            </Text>
                        }
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default EventDetail;