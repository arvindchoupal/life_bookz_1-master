import { View, Text,StatusBar,Dimensions,Image } from 'react-native'
import React,{useState,useEffect} from 'react'
import Colors from '../colors/colors'
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const{height,width} = Dimensions.get('screen')
const Loading = ({navigation}) => {
    const [user,setuser] = useState()
    useEffect(()=>{
    
        const getData = async () => {
          try {
           
            const jsonValue = await AsyncStorage.getItem('@storage_Key')
          setuser(JSON.parse(jsonValue))
          if(jsonValue != null) {
            navigation.navigate('signinScreens',{
               user : JSON.parse(jsonValue)
           }) 
          }else {navigation.navigate('story')}
            return jsonValue != null ? JSON.parse(jsonValue) : null;
          } catch(e) {
            // error reading value
          }
        }
    
        getData()
        
        
      },[])
  return (
    <View style={{flex:1,backgroundColor:Colors.secondary,justifyContent:'center',alignItems:'center'}}>
        <StatusBar backgroundColor={Colors.primary} />

     <Image source={require('../Images/logo.png')} style={{height:height*.3,width:height*.3}} />
      
    </View>
  )
}

export default Loading