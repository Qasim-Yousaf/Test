import React from 'react';
import {View,Text } from 'react-native';
import { WebView } from 'react-native-webview';

const Web = (props) => {
    let {name} = props.route.params;
    return(
        
        <WebView
        source={{
          uri: 'https://github.com/'+name
        }}
        style={{ marginTop: 0 }}
      />
    );
}

export default Web;
