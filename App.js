import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import CoursellImage from './componennts/courasel'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/home';
import { createStackNavigator } from '@react-navigation/stack';
import Signup from './screens/signup';
import { NavigationContainer ,} from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Colors from './colors/colors'
import Home2 from './screens/signinScreens/home2'
import Story from './screens/signinScreens/story';
import Message from './screens/signinScreens/message'
import Notfication from './screens/signinScreens/notification';
import Favourates from './screens/signinScreens/favourates';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Create_post from './screens/signinScreens/create_post';
import { ModalPortal } from 'react-native-modals';
import Create_funny_moments from './screens/signinScreens/create_funny_moments';
import Create_time_capsoule from './screens/signinScreens/create_time_capsoule';
import Chat from './screens/signinScreens/chat'
import Msg from './screens/signinScreens/message';
import Profile_pic from './screens/uploadImage/profile_pic';
import Loading from './screens/loading';
const Bottom = createMaterialBottomTabNavigator();
const Signin = createNativeStackNavigator();
const Story_stack = createStackNavigator();
const Message_stack = createStackNavigator();

const Signin_stack = createStackNavigator();
const MessageScreen= ({route,navigation})=> {
  const {user,other_user} = route.params
  
 console.log('remove tab')
  return (
    <Message_stack.Navigator screenOptions={{headerShown:false}}>
      <Message_stack.Screen  initialParams={{user:user,other_user:other_user}} name="chat2" component={Chat} />
      <Message_stack.Screen  initialParams={{user:user}} name="message2" component={Message} />
      
    </Message_stack.Navigator>
  );
}

const StoryScreen= ({route})=> {
  const {user} = route.params
 
  return (
    <Story_stack.Navigator screenOptions={{headerShown:false}}>
      <Story_stack.Screen  initialParams={{user:user}} name="story" component={Story} />
      <Story_stack.Screen option={{animationEnabled:false}} initialParams={{user:user}} name="chat" component={MessageScreen} />
      <Story_stack.Screen  initialParams={{user:user}} name="create_post" component={Create_post} />
      <Story_stack.Screen  initialParams={{user:user}} name="create_funny_moments" component={Create_funny_moments} />
      <Story_stack.Screen  initialParams={{user:user}} name="create_time_capsoule" component={Create_time_capsoule} />
    </Story_stack.Navigator>
  );
}


function BottomTabs({route}) {
 const {user} = route.params

  return (
    <Bottom.Navigator barStyle={{backgroundColor:Colors.primary}}  screenOptions={{ 
      
      tabBarInactiveTintColor:'grey', tabBarActiveTintColor:Colors.primary, tabBarItemStyle:{backgroundColor:'white',}}}>
     
     <Bottom.Screen initialParams={{'user':user}} name="home" component={Home2} options={{  tabBarLabel:'HOME',  tabBarShowLabel:'false' , tabBarIcon:({ color,focused }) => (
         focused ?  <Ionicons name="home" size={24} color ={color} />
         :  <Ionicons name="home-outline" size={24} color ={color} />
         
        
        )}}  />
    
    
    
     <Bottom.Screen initialParams={{'user':user}} name="storyScreen" component={StoryScreen}  options={{ tabBarLabel:'STORY', tabBarShowLabel:false,  tabBarIcon:({ color,focused }) => (
         focused ?  <Ionicons name="clipboard" size={24} color ={color} />
         :  <Ionicons name="clipboard-outline" size={24} color ={color} />
         
        
        )}}  />
     
     <Bottom.Screen initialParams={{'user':user}}  name="message" component={Msg} options={{tabBarLabel:'MESSAGE',  tabBarShowLabel:false,tabBarIcon:({ color,focused }) => (
         focused ?  <Ionicons name="chatbox" size={25} color ={color} />
         :  <Ionicons name="chatbox-outline" size={25} color ={color} />
         
        
        )}}  />


   <Bottom.Screen initialParams={{'user':user}} name="notfication" component={Notfication} options={{tabBarLabel:'ALERT', tabBarShowLabel:false,tabBarIcon:({ color,focused }) => (
         focused ?  <Ionicons name="notifications" size={25} color ={color} />
         :  <Ionicons name="notifications-outline" size={25} color ={color} />
         
        
        )}}  />


{/* <Bottom.Screen initialParams={{'user':user}}  name="fav" component={Favourates} options={{tabBarShowLabel:false,tabBarIcon:({ color,focused }) => (
         focused ?  <Ionicons name="heart" size={25} color ={color} />
         :  <Ionicons name="heart-outline" size={25} color ={color} />
         
        
        )}}  /> */}
    </Bottom.Navigator>
  );
}



function SigninScreens({route}) {
   const {user} = route.params
  
   
  return (
   
    <Signin_stack.Navigator screenOptions={{headerShown:false}}>
    <Signin_stack.Screen name="bottom" initialParams={{user:user}} component={BottomTabs} />
    <Signin_stack.Screen name="message3" component={MessageScreen} />
    
  </Signin_stack.Navigator>
   

  );
}

const Signupstack = createNativeStackNavigator();

const SignupScreens= ()=> {
  return (
    <Signupstack.Navigator screenOptions={{headerShown:false}}>
      <Signupstack.Screen name="loading" component={Loading} />
      <Signupstack.Screen name="story" component={CoursellImage} />
      <Signupstack.Screen name="singnup" component={Signup} />
      <Signupstack.Screen name="upload_image" component={Profile_pic}  />
      <Signupstack.Screen name="signinScreens" component={SigninScreens}  />
    </Signupstack.Navigator>
  );
}



const Stack = createNativeStackNavigator();


const App = ()=> {
 
 

  
  return (
    
  <NavigationContainer>
    
     <SignupScreens/>
     <ModalPortal />
  </NavigationContainer>
   
      
  
  )
}



export default App