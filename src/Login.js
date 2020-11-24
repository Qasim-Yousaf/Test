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
  Platform
} from 'react-native';
import { AuthContext } from './Context';
import {useNavigation} from '@react-navigation/native';
export default function Login() {
  const [mobile, setMobile] = React.useState('');

  const [pass, setPass] = React.useState('');

  const [err1, setErr1] = React.useState(false);
  const [err2, setErr2] = React.useState(false);
  const navigation = useNavigation();
  const { signIn } = useContext(AuthContext);


  const handleLogin = () => {
    let pa = '';
    let ph = '';

    if (mobile.length != 11) {
      // setErr
      setErr1(true);
      ph = '';
    } else {
      setErr1(false);
      ph = 'ok';
    }
    
    if (pass.length <= 0 || pass == null) {
      // setErr
      setErr2(true);
      pa = '';
    } else {
      setErr2(false);
      pa = 'ok';
    }

    if (pa == 'ok' && ph == 'ok') {
      // call signIn fun
      console.log('-----------call signIn fun ---------------');
      signIn(mobile, pass);
    } else {
      console.log('-----------call signIn fun false ---------------');
    }
  };
  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <View style={styles.container}>
        <Text
          style={{
            marginTop: Platform.OS =="android"?50:150,
            fontSize: 30,
            fontWeight: 'bold',
            color: '#FF4F5A',
          }}>
          OVA
        </Text>
        <View style={{marginTop: 10, width: '90%'}}>
          <Image
            resizeMode="contain"
            source={require('./assets/car.jpg')}
            style={{width: '100%', height: 200}}
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.txt}>Mobile No.</Text>
          <TextInput
            placeholder="Enter Mobile No"
            style={styles.TxtInpt}
            onChangeText={(Text) => setMobile(Text)}
            keyboardType="numeric"
            maxLength={11}
          />
          {err1 != false ? (
            <Text
              style={{
                fontSize: 10,
                color: 'red',
                paddingTop: 5,
                paddingLeft: 5,
              }}>
              Field Require
            </Text>
          ) : null}
        </View>

        <View style={styles.section}>
          <Text style={styles.txt}>Password.</Text>
          <TextInput
            placeholder="Enter password"
            style={styles.TxtInpt}
            secureTextEntry={true}
            onChangeText={(Text) => setPass(Text)}
            maxLength={30}
          />

          {err2 != false ? (
            <Text
              style={{
                fontSize: 10,
                color: 'red',
                paddingTop: 5,
                paddingLeft: 5,
              }}>
              Field Require
            </Text>
          ) : null}
        </View>
        <View style={styles.section}>
          <TouchableOpacity
            style={{
              padding: 15,
              backgroundColor: '#FF4F5A',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
            }}
            onPress={() => handleLogin()}>
            {/* onPress={() => {
              navigation.navigate('Home');
            }}> */}
            <Text style={{fontWeight: 'bold'}}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
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
    padding:10
  },
});
