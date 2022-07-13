import React, { useState, useCallback, useEffect ,useRef} from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import {View,Image,Text,Dimensions,TouchableOpacity,TextInput,BackHandler,ScrollView} from 'react-native'
import Colors from '../../colors/colors'
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/Ionicons'
import moment from 'moment'
import { FlatList } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

const {height,width} =Dimensions.get('screen')
const Chat = ({route,navigation})=> {
 const scroll = useRef()
  const {user,other_user} = route.params
  console.log(other_user)
  const docid = user.id >= other_user.id ? user.id + '-' + other_user.id : other_user.id + '-' + user.id
  const [Texts,Settext] = useState()
  const [messages, setMessages] = useState([]);
  const [all_messages, set_all_Messages] = useState([]);
  const [first_msg,set_firstmsg] = useState(false)
 
  const allmsg = ()=>{
    firestore()
    .collection('Chatrooms')
    .doc(docid)
    .collection('messages')
    .orderBy('time','asc')
    .onSnapshot(documentSnapshot => { 
   console.log(documentSnapshot.docs)
    set_all_Messages(documentSnapshot.docs)
    if(!documentSnapshot.docs[0]){
      console.log('empty')
      set_firstmsg(true)
    }
    }) 
     
      } 
   
  

    useEffect(()=>{
    allmsg()
    },[])
 
  
  const Other_chat = ({msg})=>{
    
    return(
      <View style={{flexDirection:'row',maxWidth:width*.7,alignItems:'center'}}>
          <Image source={other_user.user_photo ?{uri:other_user.user_photo}:require('../../Images/profile_demo.jpg')} style={{height:40,width:40,borderRadius:50,margin:10}}/>
              <View style={{backgroundColor:Colors.chatview,padding:5,borderTopRightRadius:10}}>
                <Text>
                  {msg}
                 </Text>
              </View>
      </View>
    )
  }

  const My_chat = ({msg})=>{
   
    return(
      <View style={{width:width,flexDirection:'row',justifyContent:'flex-end'}}>
         
              <View style={{margin:5, backgroundColor:Colors.primary,padding:5,borderTopLeftRadius:10,maxWidth:width*.78}}>
                <Text style={{color:'white'}}>
                  {msg}
                 </Text>
              </View>
      </View>
    )
  }
  

  const onSend = ()=>{
    if(Texts){
      console.log('start sending msg')
      firestore()
      .collection('Chatrooms')
      .doc(docid)
      .collection('messages')
      .add({
        time : new Date(),
        message : Texts,
        sent_to : other_user.id,
        send_by : user.id
      })
     
      if(first_msg){
        let myId = user.id + 'img'
        firestore()
        .collection('Chatrooms')
        .doc(docid)
        .set({
           sent : [user.id,other_user.id],
           image : [user.photo,other_user.user_photo],
           last_msg : Texts,
           name : [user.name,other_user.user_name],
           sentBy : user.id
        })
       
      }else{
        firestore()
        .collection('Chatrooms')
        .doc(docid)
        .update({
          last_msg : Texts,
          sentBy : user.id
        })
     
    }
    Settext()
   
  
 
  }}

  const backAction = () => {
     navigation.goBack()
   
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);
  return (
    <View style={{ flexGrow:2, width,backgroundColor:'white'}}>
       
        
      <View style={{  flexDirection:'row',justifyContent:'space-between', backgroundColor:Colors.primary, borderRadius:1, elevation:2,padding:15,alignItems:'center',shadowColor:'grey',shadowOffset:{
             height:1,width:2
              },
             shadowOpacity:0.5,width}}>
               <Icon color={'white'} name='md-arrow-back-sharp' size={25} onPress={()=>{  navigation.goBack()}}/>
        <Text style={{color:'white',fontWeight:'500',width:width*.55,alignContent:'flex-start'}}>
              {other_user.user_name}
       </Text>
    </View>



    <View  style={{ justifyContent:'space-between',paddingHorizontal:10, flexDirection:'row',alignItems:'center', borderRadius:50,marginHorizontal:10, backgroundColor:'#f2eeed',position:'absolute',bottom:0,right:0,left:0,zIndex:5}}>
    
      <TextInput value={Texts} onChangeText={
        (t)=> {Settext(t)}}  
         placeholder='Type a message'
         style={{flexGrow:1}}
        />
               
      <TouchableOpacity onPress={onSend} >
      <Text>
        <Icon name='md-arrow-forward' size={25}/>
        </Text>
      </TouchableOpacity>
    </View>
  


  <ScrollView  ref={scroll} 
   scrollEnabled 
   onContentSizeChange={() => scroll.current.scrollToEnd({ animated: false })}
   style={{height:height*.5}}>
    <FlatList
      data={all_messages}
      scrollEnabled={true}
      
      renderItem={({item,index}) => {
      
        const {_data} = item
     
        return (
          <>
          {
            _data.send_by === user.id ? <My_chat msg = {_data.message}/> : <Other_chat msg = {_data.message}/>
          }

   
          </>
        )
        
      }}
     />
 <View style={{height:50,backgroundColor:'transparent'}} />
  </ScrollView>
 
    </View>
  )
}

export default Chat