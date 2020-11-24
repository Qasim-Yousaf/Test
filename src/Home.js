import React ,{useContext} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';

import { AuthContext } from './Context';

import AsyncStorage from '@react-native-community/async-storage';

import GetLocation from 'react-native-get-location';

export default function Home() {
  const [mobile, setMobile] = React.useState('');

  const [pass, setPass] = React.useState('');

  const [err1, setErr1] = React.useState(false);
  const [err2, setErr2] = React.useState(false);

  const GIF = require('./assets/car2.gif');
  const IMAGE = require('./assets/car3.jpg');

  const [travelling, setTravelling] = React.useState(false);
  const [count, setCount] = React.useState(0);
  const { signOut } = useContext(AuthContext);

  const [myInterval, setMyInterval] = React.useState();
  let loc = [];

  let user_id =  AsyncStorage.getItem('id');

  const handleTravelling = () => {
    // useToggling
    setTravelling(!travelling);

    handleInterval();
  };

  const handleInterval = () => {
    if (travelling == true) {
      clearInterval(myInterval);
      console.log('Stop and clear the interval');
    } else {
      let st = count;

      setMyInterval(
        setInterval(async () => {
          st++;

          console.log('15 secs complete');
          GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 0,
          })
            .then( (location) => {
              console.log(location);
              // await 
              loc.push(location);
              // await 
              setCount(st);

              if (st == 4) {

                fetch('http://31cbc3b77250.ngrok.io/api/work-status', {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    user_id: user_id,
                    status:0,
                    location: loc,
                  }),
                });
                loc = [];
                st = 0;
                console.log('1 minute complete');
              }


            })
            .catch((error) => {
              const {code, message} = error;
              console.warn(code, message);
            });
          
        }, 15000),
      );

      console.log('Call SetInterval to 30 Seconds');
    }
  };

  return (
    <View style={styles.container}>
      <Text>{count}</Text>
      <TouchableOpacity
        onPress={() => {
          handleTravelling();
        }}
        style={{
          padding: 15,
          backgroundColor: '#FF4F5A',
          borderRadius: 25,
          marginTop: 50,
        }}>
        <Text
          style={{
            marginTop: 0,
            fontSize: 15,
            fontWeight: '500',
            color: 'black',
          }}>
          {travelling == true ? 'Stop Traveling ' : 'Start Traveling'}
        </Text>
      </TouchableOpacity>

      <View style={{marginTop: 10, width: '90%'}}>
        <Image
          resizeMode="contain"
          source={travelling == true ? GIF : IMAGE}
          style={{width: '100%', height: 300}}
        />
      </View>

      <View style={{position:'absolute',bottom:30}}>
        <TouchableOpacity

        onPress={ () => {signOut()}}
        
        style={{padding:10,backgroundColor:'#FF4F5A',borderRadius:10,}}>
          <Text>LOGOUT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'white',
  },
  txt: {
    marginBottom: 5,
    marginLeft: 2,
    fontSize: 15,
    fontWeight: 'bold',
  },
  section: {
    // borderWidth: 1,
    width: '90%',
    marginVertical: 5,
    padding: 10,
  },
  TxtInpt: {
    borderBottomWidth: 0.5,
    borderRadius: 5,
    borderBottomColor: '#FF4F5A',
  },
});
