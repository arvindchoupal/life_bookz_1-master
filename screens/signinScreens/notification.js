import { View, Text,Dimensions } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';
import Colors from '../../colors/colors';
import Ionicons from 'react-native-vector-icons/Ionicons'


const {height,width} = Dimensions.get('window')
const Notfication = () => {
  return (
    <View style={{height,width,backgroundColor:Colors.primary}}>
      <Text style={{color:'white',fontSize:35,paddingTop:height*.08,paddingLeft:width*.05,paddingBottom:15}}>
        Notfication
      </Text>
       <View style={{
        backgroundColor:'white',
        flex:1,
        borderTopStartRadius:50,
        borderTopRightRadius:50,
        overflow:'hidden'}} >
          
          <View style={{alignItems:'center',paddingTop:height*.2,flexGrow:1}}>
          <Ionicons name="notifications" size={100} color={Colors.lightgrey}  />
          <Text style={{fontWeight:'bold',fontSize:15}}>
            Your notifications live here
          </Text>

          <Text style={{marginTop:5,width:width*.65,textAlign:'center'}}>
         you will get latest updates of lifebookz here
          </Text>
          
          </View>
      
        </View>
    </View>
  )
}

export default Notfication