import React, { useState } from 'react';
import {View , Text , StyleSheet , TouchableOpacity ,Image , FlatList} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
const Stack = createStackNavigator();
import Web from './Web';



const ScreenOne = (props) => {

    const [data , setData] = useState([]);

    const handleChange = async(value) => {
        console.log('value is ',value);

        FetchData(value);

   

    
    }
    const FetchData = async (value) => {

        console.log('value is ',value);

        try {

            let resp = await fetch('https://api.github.com/search/users?q='+value)
            .then((response) => response.json())
            .then((json) => {
                    console.log(JSON.stringify(json.items))
                    setData(json.items);

                });

        } catch (e) {
            Alert.alert(
                'Ooops!!',
                e.message,
                [
                    { text: 'Cancel', onPress: () => { }, style: 'cancel' },
                    { text: 'OK', onPress: () => { } },
                ],
                { cancelable: false }
            )

        }

    }

    const Header = () => (
        <View style={styles.header}>
            <View style={styles.headerRow}>


                <View style={{flexDirection:'row',height:30}}>
                    <TouchableOpacity style={{borderWidth:0,flex:2}} >
                            <Image style={{width:25,height:25,backgroundColor:'black'}} source={{uri:'https://as1.ftcdn.net/jpg/02/92/13/78/500_F_292137877_bLsKrmUMl9DiOzvmOap0s3bKYlWMbTX2.jpg'}}/>
                    </TouchableOpacity>
                    <View style={{flex:7,}}>
                        <Text style={{fontWeight:"bold",color:"white",fontSize:20}}>Odia Dictonary Pro</Text>
                    </View>
                </View>

                <View style={{height:50,backgroundColor:'white',marginVertical:20,elevation:5,borderRadius:5,flexDirection:'row'}}>
                     <TouchableOpacity style={{borderWidth:0,width:'20%',justifyContent:'center',alignItems:'flex-start',marginLeft:5}}>
                        <Image style={{width:20,height:20,}} source={{uri:'https://image.flaticon.com/icons/png/512/14/14968.png'}}/>

                        
                    </TouchableOpacity>

                    <TextInput   onChangeText={ value => {handleChange(value)}}  style={{flex:1}} placeholder="Enter name"/>

                    <TouchableOpacity style={{borderWidth:0,width:'20%',justifyContent:'center',alignItems:'flex-end',marginRight:5}}>
                        <Image style={{width:20,height:20,}} source={{uri:'https://image.flaticon.com/icons/png/512/51/51517.png'}}/>


                        
                    </TouchableOpacity>


                </View>



            </View>
        </View>
    );


    const renderItem = ({ item }) => (
        // console.log(item)
        <TouchableOpacity onPress={()=>{props.navigation.navigate('Web',{
            name:item.login,
        })} } style={{margin:5,borderBottomWidth:1,padding:20}}><Text>{item.login}</Text></TouchableOpacity   >
        // <Item title={item.title} />
      );


    return(

        
        <View style={styles.container}>
            <Header />
            <View style={{flex:1}}>

                        {data.length >0 ?
                        <FlatList
                            data={data}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                        />
                        :null}
            </View>

        </View>
    );
}


const App2 = () =>{
    return(
        
    <NavigationContainer>
        <Stack.Navigator  screenOptions={{
                headerShown: false
            }}>
          <Stack.Screen  name="Home" component={ScreenOne} />
          <Stack.Screen  name="Web" component={Web} />

        </Stack.Navigator>
      </NavigationContainer>
    )
}

const styles =  StyleSheet.create({
    container:{
        flex:1,
    },
    header:{
        height:150,
        backgroundColor:'pink',
        paddingHorizontal:10

    },
    headerRow:{
        // borderWidth:1,
        marginVertical:10,

    }
})


export default App2;

