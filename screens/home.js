import { View, Text ,Dimensions,Image,TextInput} from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Colors from '../colors/colors'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Signup from './signup'
const {height,width} = Dimensions.get('screen')
import Story from './signinScreens/story';
import Messages from './signinScreens/message';
import Notfication from './signinScreens/notification';
import Favourates from './signinScreens/favourates';
import Home2 from './signinScreens/home2';

const Tab = createMaterialTopTabNavigator();




function MyTabs() {
  return (
    <Tab.Navigator screenOptions={{tabBarInactiveTintColor:'grey', tabBarActiveTintColor:Colors.primary, tabBarItemStyle:{backgroundColor:'white'}}}>
     
     <Tab.Screen name="home" component={Home2} options={{tabBarShowLabel:false,tabBarIcon:({ color,focused }) => (
         focused ?  <Ionicons name="home" size={24} color ={color} />
         :  <Ionicons name="home-outline" size={24} color ={color} />
         
        
        )}}  />
    
    
    
     <Tab.Screen name="story" component={Story} options={{tabBarShowLabel:false,tabBarIcon:({ color,focused }) => (
         focused ?  <Ionicons name="clipboard" size={24} color ={color} />
         :  <Ionicons name="clipboard-outline" size={24} color ={color} />
         
        
        )}}  />
     
     <Tab.Screen name="message" component={Messages} options={{tabBarShowLabel:false,tabBarIcon:({ color,focused }) => (
         focused ?  <Ionicons name="chatbox" size={25} color ={color} />
         :  <Ionicons name="chatbox-outline" size={25} color ={color} />
         
        
        )}}  />


   <Tab.Screen name="notfication" component={Notfication} options={{tabBarShowLabel:false,tabBarIcon:({ color,focused }) => (
         focused ?  <Ionicons name="notifications" size={25} color ={color} />
         :  <Ionicons name="notifications-outline" size={25} color ={color} />
         
        
        )}}  />


<Tab.Screen name="fav" component={Favourates} options={{tabBarShowLabel:false,tabBarIcon:({ color,focused }) => (
         focused ?  <Ionicons name="heart" size={25} color ={color} />
         :  <Ionicons name="heart-outline" size={25} color ={color} />
         
        
        )}}  />
    </Tab.Navigator>
  );
}
const Home = ({route}) => {
  const {user} = route.params
  return (
    <View>


         <View style={{flexDirection:'row',width,paddingRight:25,alignItems:'center',justifyContent:'space-between',backgroundColor:'white'}}>
             
             <Image source={require('../Images/logo.png')} style={{height:height*.08,width:height*.08}} />
            
             
               <View style={{  width:width*.6,height:height*.05,borderWidth:2,borderColor:'grey',borderRadius:25,justifyContent:'space-between',flexDirection:'row'}} >
             <TextInput placeholder='Search anything' style={{paddingLeft:10}} />
             <Ionicons name='search-outline' size={30} color= {'grey'} style={{padding:5}} /> 
                </View>

           
              <Ionicons name='menu-outline' size={40} color= {'grey'} />
            
          </View>
<View style={{width,height}}>
<MyTabs/>
</View>
    </View>
  )
}

export default Home