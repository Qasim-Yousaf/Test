
// import * as React from 'react';
// import {View, Text} from 'react-native';
// import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';
// import login from './src/Login';
// import Register from './src/Register';
// import Home from './src/Home';

// const Stack = createStackNavigator();

// function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="login" headerMode="none">
//         <Stack.Screen name="Home" component={Home} />
//         <Stack.Screen name="login" component={login} />
//         <Stack.Screen name="register" component={Register} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// export default App;


import 'react-native-gesture-handler';

import React , {  useState,useEffect, useMemo, useReducer } from 'react'
import { StyleSheet, Dimensions, Alert , ActivityIndicator , View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from './src/Context';
import login from './src/Login';
import Register from './src/Register';
import Home from './src/Home';



const Stack = createStackNavigator();



export default function App() {

  const [LOAD , setLOAD] = useState(false);

  /**
   * The isLoading is check wheather the user is Authenticated or Not 
   * When the user is Authenticated , the ActivityIndicator is Display on Screen 
   *
   *  &&
   *  
   * By userToken we will validate the user 
   * 
   * */

  // const [isLoading, setIsLoading] = useState(true);
  // const [userToken, setUserToken] = useState(null);

  const initialLoginState = {
    isLoading: true,
    userToken: null,
    userName: null,
    userRole: null,
  };

  /**
   * the reducer function is take previous state and also take an action 
   * and return the new state to the app 
   * 
   * */
  const loginReducer = (prevState, action) => {
    /**
     * here we perform different actions 
     * 
     * */

    switch (action.type) {

      case 'RETRIEVE_TOKEN':
        return {
          /**
           * this  will run when the user open the app for the first time 
           * */
          ...prevState,
          userToken: action.token,
          isLoading: false,
          userRole: action.role,
        };

      case 'LOGIN':
        return {
          ...prevState,
          isLoading: false,
          userToken: action.token,
          userName: action.id,
          userRole: action.role,


        };

      case 'LOGOUT':
        return {
          ...prevState,
          isLoading: false,
          userToken: null,
          userName: null,
          userRole: null,
        };

  
    }


  };


  /**
   * Now make a reducer  that call their reducer function to update the state of the app
   * 
   * this reducer will recive the reducer function and initalloginState of the app
   * 
   * here loginReducer is a reducer function and initalLoginState is state of the app 
   * 
   * */

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState)

  /**
   * 
   * the useMemo is memorization technique use to speedup the App
   * 
   *  */

  const authContext = useMemo(() => ({

    signIn: async (mobile, pass ) => {
      setLOAD(true);
      /**
         * 
         * Here now we pass the userName and password to rest api and
         * it will send response back as token & userName which would we set to our async storage
         * 
         * */

      try {


        let resp = await fetch('https://technova.technovier.com/public/api/login', {
          method: 'post',
          mode: 'no-cors',
          headers: { 
            'Accept': 'application/json, text/plain, */*', 
            // 'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            phone_number: mobile,
            password: pass,
           
          })
        }).then((response) => response.json())
          .then((json) => {


            if (json.status_code >= 200 && json.status_code < 300) {
              console.log('Response after login is -------------- > '+JSON.stringify(json))

             
              console.log('Response after login is -------------- > '+JSON.stringify(json.data.api_token))
              SaveUserDetailsInLocalStorageAfterLoginResponde(json.data.api_token , json.data.id);

            }
            else {
              console.log('Response error Occure!!!');
              console.log(json.error);
              Alert.alert(
                'Ooops!!',
                json.error.phone_number.toString(),
                [
                  { text: 'Cancel', onPress: () => { }, style: 'cancel' },
                  { text: 'OK', onPress: () => { } },
                ],
                { cancelable: false }
              )

            }

          });

      } catch (e) {
        Alert.alert(
          'Ooops!!',
          e.message,
          [
            { text: 'Cancel', onPress: () => console.log(), style: 'cancel' },
            { text: 'OK', onPress: () => console.log() },
          ],
          { cancelable: false }
        )

      }

      setLOAD(false);


    },
    signOut: async () => {

      try {
        // await AsyncStorage.removeItem('userToken');
        // await AsyncStorage.removeItem('USER_OBJECT');
        // AsyncStorage.clear();
        AsyncStorage.clear().then(() => console.log(''));
        // console.log('userToken is => ' + await AsyncStorage.getItem('userToken'));
        // console.log('user object is  is => ' + await AsyncStorage.getItem('USER_OBJECT'));


      } catch (err) {
        console.log(err.message);
      }


      dispatch({ type: 'LOGOUT' });
    },

    


  }), []);




  const SaveUserDetailsInLocalStorageAfterLoginResponde = async (user_api_token , id) => {

    // console.log('User role ' + (u_role));
    try {
      await AsyncStorage.setItem('userToken', user_api_token, () => { });
      await AsyncStorage.setItem('id', id.toString(), () => { });
      
      let re = await AsyncStorage.getItem('userToken');

    } catch (error) {
      console.log('error occure during store login response in LocalStorage');
      console.log(error);
    }
    dispatch({ type: 'LOGIN', id: 'u_name', token: user_api_token, role: 'u_role' })

  }






  useEffect(() => {
    // console.log('UserDevice Token is ===================> ');

    setTimeout(async () => {

      let userToken;
      userToken = null;
      let UserRole;
      userRole = null;

      try {
        // here is object si not destructure
        userToken = await AsyncStorage.getItem('userToken');
        // console.log('user role is = >' + role);
        // console.log('useRole is = >' + UserRole);

        // console.log('type of useRole is = >' + typeof (UserRole));


      } catch (err) {
        console.log(err.message);
      }

      /**
       * This function run and check the userToken , if it already store in the storge 
       * function will retrive it and user redirect to main screen of the App
       * */
      // setIsLoading(false);

      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken, role: 'UserRole' });

      /**
       * This function run and check the userToken , if it already store in the storge 
       * function will retrive it and user redirect to main screen of the App
       * */
      // setIsLoading(false);

      // dispatch({ type: 'RETRIEVE_TOKEN', token: userToken, role: role.toString() })
    }, 1000);


  }, []);





  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FF4F5A' }}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }


  if (LOAD) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FF4F5A' }}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }





  return (

    /**
     * the AuthContext is used to pass the signIn , signUp , signOut function in the tree  
     * in which every screen can recive these function
     * 
     * */
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>

        {/* it's check wheather user is a valid user with their userToken 
        if user is valid the system redirect to it on the main file of App Screen */}

        {/*  here instead of Drawer we make a stack navigator 
        and the first screen is Main Tab and the remaing is BookMark...etc   */}

        {/* {console.log('Token is ' + loginState.userToken)} */}


        {loginState.userToken != null ?

          // check wheather Auth User Role is Simple_User_Role or Landloard_Role

        <Stack.Navigator initialRouteName="Home" headerMode="none" >
     
          <Stack.Screen name="Home" component={Home} />
    
        </Stack.Navigator>

          // check end here

          :

          /**
           * if user is not valid means it is not signIn ,
           *  system redirect to it on splash , signIn, signUp Screen
           * 
          */
         <Stack.Navigator initialRouteName="login" headerMode="none" >
     
         <Stack.Screen name="login" component={login} />
   
       </Stack.Navigator>
          // <AmentitiesAndDetails />


        }


      </NavigationContainer>
    </AuthContext.Provider>

  );
}





const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  homeScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {

    width:400,
    height:400
  },
});
