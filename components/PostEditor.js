import React from 'react';
import { View, TouchableOpacity, TextInput, Text } from 'react-native';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';

class PostEditor extends React.Component {
    state = {
        type_color : 1,
        type_font : 'Regular',
        message : ''
    }

    getColors = (type) =>{
        let arr = [];
        switch(type){
            case 1 : arr =  ['#0056e5', '#85f5ff']; break;
            case 2 : arr = ['#232526', '#414345'];break;
            case 3 : arr = ['#f12711', '#f5af19'];break;
            default : arr = ['#0056e5', '#85f5ff'];break;
        }
        return arr;
    }

    getColorName = (type) =>{
        switch(type){
            case 1 : return 'Cyanity';
            case 2 : return 'Ghost';
            case 3 : return 'Flare';
            default : return 'Cyanity';
        }
    }

    changeColors = (type) =>{
        if(type > 0 && type < 3){
            this.setState({type_color : this.state.type_color + 1});
        } else {
            this.setState({type_color : 1});
        }
    }

    changeFont = (type) =>{
        if(type === 'Regular'){
            this.setState({type_font : 'Light'});
        } else if(type === 'Light'){
            this.setState({type_font : 'Thin'});
        } else {
            this.setState({type_font : 'Regular'});
        }
    }

    render() {
        const {
            type_color, type_font, message
        } = this.state;
        return(
        <View style={{flex : 1, backgroundColor : '#eee'}}>
            <LinearGradient style={{ 
                flex: 1,
                borderRadius: 10,
                margin: 5,
                justifyContent : 'center',
                alignItems : 'center'
            }}
            colors={this.getColors(type_color)} 
            >
            <View style={{position : 'absolute', top : 0, left : 0, padding : 5, margin : 5, flexDirection : 'row'}}>
                <TouchableOpacity style = {{flexDirection : 'row', justifyContent : 'center', alignItems : 'center'}} onPress = {()=>this.changeColors(type_color)}>
                    <View style={{width : 30, height : 30, borderRadius : 30, padding : 2, backgroundColor : 'rgba(255, 255, 255, 0.4)'}}>
                        <LinearGradient style = {{flex : 1, borderRadius : 30}} colors={this.getColors(type_color)} />
                    </View>
                    <Text style={{color : '#fff', fontSize : 14}}>{' ' + this.getColorName(type_color)}</Text>
                </TouchableOpacity>
                
                <View style={{flex : 1}} />

                <TouchableOpacity style = {{flexDirection : 'row', justifyContent : 'center', alignItems : 'center'}} onPress = {()=>this.changeFont(type_font)}>
                    <Text style={{color : '#fff', fontSize : 14}}>{type_font + '  '}</Text>
                    <View style={{width : 25, height : 25, borderRadius : 30, padding : 3, backgroundColor : 'rgba(255, 255, 255, 0.4)', justifyContent : 'center', alignItems : 'center'}}>
                        <Icon2 name = 'font' size = {18} color = '#fff' />
                    </View>
                </TouchableOpacity>

            </View>
                <TextInput
                    multiline = {true}
                    maxLength = {250}
                    style = {{color : '#fff', fontSize : 20, textAlign : 'center', margin : 10, padding : 5, fontFamily : 'Roboto-' + type_font}}
                    autoCapitalize = 'sentences'
                    keyboardType = 'twitter'
                    keyboardAppearance = 'light'
                    placeholder = "What's on your mind?"
                    placeholderTextColor = '#efefef'
                    value = {message}
                    onChangeText = {(val) => this.setState({message : val})}
                />
            </LinearGradient>
        </View>
        );
    }
}

export default PostEditor;