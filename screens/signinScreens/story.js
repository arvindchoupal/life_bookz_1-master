import { View,BackHandler, Text,Dimensions,Image,TextInput ,Pressable,TouchableOpacity} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import React,{useState,useEffect} from 'react'
import { Modal, ModalContent ,SlideAnimation} from 'react-native-modals';
import LottieView from 'lottie-react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Funny_post from './users_post/funny';
import Story_post from './users_post/story';
import Capsoul_post from './users_post/capsoul';
import Colors from '../../colors/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import firestore from '@react-native-firebase/firestore';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Chat from './chat';


const Story_chat_Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

const Story_Chat_Screen= ({route})=> {
  const {user} = route.params
  return (
    <Story_chat_Stack.Navigator screenOptions={{headerShown:false}}>
      <Story_chat_Stack.Screen initialParams={{user:user}}   name="story" component={Story_post} />
      <Story_chat_Stack.Screen  name="chat" component={Chat} />
    </Story_chat_Stack.Navigator>
  );
}


function MyTabs({user}) {

  return (
    <Tab.Navigator  screenOptions={   {  tabBarInactiveTintColor:'grey', tabBarActiveTintColor:Colors.primary, tabBarItemStyle:{backgroundColor:'white'}}}>
     
     <Tab.Screen initialParams={{user:user}} name="Lifestory"  component={Story_post} options={{tabBarShowLabel:true,  tabBarLabel:'LIFESTORY'}}  />
    
    
    
     <Tab.Screen initialParams={{user:user}} name="Funny" component={Funny_post} options={{tabBarShowLabel:true,  tabBarLabel:'FUNNY'
        }}  />
     
     <Tab.Screen initialParams={{user:user}} name="capsoul" component={Capsoul_post} options={{tabBarShowLabel:true,  tabBarLabel:'TIME CAPSOUL'}}  />


  
    </Tab.Navigator>
  );
}



const {height,width} = Dimensions.get('screen')
const Story = ({route,navigation}) => {
  const {user} = route.params
 
  const [model_visble,setmodel_visible] = useState(false)
console.log(user)
  useEffect(() => {
    const backAction = () => {
      
      if (setmodel_visible){
        setmodel_visible(false)
    
      }
      else {  navigation.goBack()}
    
      
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View style={{
           height,width
    }}>
      
<View style={{flexDirection:'row',alignItems:'center',paddingLeft:10,backgroundColor:'white'}}>
  <Image source={user.photo === null ? require('../../Images/profile_demo.jpg') :  {uri:user.photo}} style={{height:height*.05,width:height*.05,borderRadius:100}} />
 
  <Pressable onPress={()=>{
       setmodel_visible(true)
     }} >
   <View style={{width,height:height*.09,justifyContent:'center',paddingLeft:10}}>
     
 <Text>
   Write your story ...
 </Text>

 </View>
 </Pressable>
 
 
 
 <Modal
    visible={model_visble}
    
    modalAnimation={new SlideAnimation({
      initialValue: 0,
      animationDuration: 150,
      useNativeDriver: true,
    })}
    
    onTouchOutside={() => {
      setmodel_visible(false)
    }}
    
  >
    <ModalContent >
      <View style={{width:width*.7,marginBottom:5}}>
        <Text style={{fontSize:20,fontWeight:'bold',color:'black'}}>
          Choose Story Type
        </Text>
      </View>

      <TouchableOpacity  onPress={()=>{
        setmodel_visible(false)
        navigation.navigate('create_post')}}>
        <View style={{flexDirection:'row',alignItems:'center'}}>


        <LottieView
        style={{height:height*.03,width:height*.03,alignItems:'flex-start',justifyContent:'flex-start',marginRight:10}}
        source={require('../../files/pencil.json')}
        resizeMode={'cover'}
        autoPlay
        loop
      />
        <Text style={{fontSize:18,color:'black',marginVertical:8}}>
          Lifestory
        </Text>
        </View>
        </TouchableOpacity>


        <TouchableOpacity  onPress={()=>{
        setmodel_visible(false)
        navigation.navigate('create_funny_moments')}}>
      <View style={{flexDirection:'row',alignItems:'center'}}>


<LottieView
style={{height:height*.03,width:height*.03,alignItems:'flex-start',justifyContent:'flex-start',marginRight:10}}
source={require('../../files/funny.json')}
resizeMode={'cover'}
autoPlay
loop
/>
      <Text style={{fontSize:18,color:'black',marginVertical:8}}>
        Funny Moments
        </Text>
      </View>
      </TouchableOpacity>

      <TouchableOpacity  onPress={()=>{
        setmodel_visible(false)
        navigation.navigate('create_time_capsoule')}}>
         <View style={{flexDirection:'row',alignItems:'center'}}>


<LottieView
style={{height:height*.03,width:height*.03,alignItems:'flex-start',justifyContent:'flex-start',marginRight:10}}
source={require('../../files/hour.json')}
resizeMode={'cover'}
autoPlay
loop
/>
      <Text style={{fontSize:18,color:'black',marginTop:8}}>
          Time Capsoule
        </Text>
      </View>
      </TouchableOpacity>
    </ModalContent>
  </Modal>




</View>

<View style={{flex:1}}>
  <MyTabs user={user}/>
</View>

    </View>
  )
}

export default Story