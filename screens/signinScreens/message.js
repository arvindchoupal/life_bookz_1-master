import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import {View,Text,Dimensions,FlatList,Image,TouchableOpacity} from 'react-native'
import colors from '../../colors/colors'

import firestore from '@react-native-firebase/firestore'

const {height,width} =Dimensions.get('screen')

const docid = '105589096226399471403-105589096226399471403'
const Msg = ({route,navigation})=> {
     const{user} = route.params
     const [chatList,setChatList] = useState([])


     const my_chat = async()=>{
     await firestore()
     .collection('Chatrooms')
     .where('sent','array-contains',user.id)
     .onSnapshot(documentSnapshot => { 
        
         setChatList(documentSnapshot.docs)

     })  
     }

     useEffect(()=>{
       my_chat()
     },[])
   

  return (
    <View style={{height,width,backgroundColor:colors.primary}}>
      <Text style={{color:'white',fontSize:35,paddingTop:height*.08,paddingLeft:width*.05,paddingBottom:15}}>
        Messages 
      </Text>
      <View style={{
        backgroundColor:'white',
        flex:1,
        borderTopStartRadius:50,
        borderTopRightRadius:50,
        overflow:'hidden',
        }}>
      
      
       {chatList[0] ? 
        <FlatList
        data={chatList}
        renderItem={({item,index})=>{
         
          const data = item._data
          console.log(data)
          return (
            <TouchableOpacity onPress={()=>{
              navigation.navigate('message3',{
                'user':user,
                'other_user' :{
                   'id' : data.sent[0] == user.id ? data.sent[1]:data.sent[0],
                  'name' : data.name[0]==user.name ? data.name[1]:data.name[0],
                  'user_photo' :  data.image[0]=== user.photo ? data.image[1]:data.image[0] }
              })
            }} style={{ paddingVertical:20,paddingHorizontal:25,flexDirection:'row'}}>
            <Image
             source={
              data.image[0]=== user.photo? {uri:data.image[1] }: {uri:data.image[0]}
              }
              style={{height:height*.07,width:height*.07,borderRadius:100}} 
              />
            
            <View style={{justifyContent:'center'}}>
              <Text style={{color:'black',paddingLeft:15,fontWeight:'600',fontSize:16,padding:1}}>
                {data.name[0]==user.name ? data.name[1]:data.name[0]}
              </Text>
             
              <Text style={{paddingLeft:15,fontSize:15,padding:1}}>
                {data.sentBy == user.id ? 'You: ' + data.last_msg: data.last_msg}
              </Text>
              

            </View>
                 
            </TouchableOpacity>
            
            
            
          )
        }} 

       keyExtractor={item=>item._data.sent[0]==user.id ? item._data.sent[1]:item._data.sent[0]}
        />
       
       
       :null
         
       
       } 
        
        
 


      </View>
     

      </View>
  )
}

export default Msg