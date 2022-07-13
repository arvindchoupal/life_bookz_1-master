import { View, Text,FlatList, Dimensions,TextInput,Pressable,Image,ScrollView,KeyboardAvoidingView} from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '../colors/colors'
import Ionicons from 'react-native-vector-icons/Ionicons'
import firestore from '@react-native-firebase/firestore';

const Comment = ({set_commentVisible,user,id}) => {
   
   const {height,width} = Dimensions.get('window')
   const [cmnt_txt,se_cmnt_txt] = useState()
   const [dataa,setdata] = useState()
   const [cmnt_list , set_cmnt_list] = useState([])
 
   async function read_cmnts() {
    
    const res = await firestore()
   .collection('posts')
   .doc('type')
   .collection('story')
  .doc(id)
   .onSnapshot(documentSnapshot => { 
    if(documentSnapshot._data.comment){
        set_cmnt_list(documentSnapshot._data.comment)
  
    }
   
    
}) 
    }

    useEffect( ()=>{
        read_cmnts()
    },[] ) 

const submit = async ()=>{
if (cmnt_list[0]){
  await firestore()
  .collection('posts')
  .doc('type')
  .collection('story')
  .doc(id)
  .update(
    {
      comment : [...cmnt_list,{
          user_name:user.name,
          user_photo:user.photo,
          text:cmnt_txt
      }]
    }
  )
  se_cmnt_txt()
} else {
  console.log('first comment')
  await firestore()
  .collection('posts')
  .doc('type')
  .collection('story')
  .doc(id)
  .update(
    {
      comment : [{
          user_name:user.name,
          user_photo:user.photo,
          text:cmnt_txt
      }]
    }
  )
  se_cmnt_txt()
}
  
}

  return (
    <KeyboardAvoidingView behavior='position' style={{width,height:height*.8}}>
       

<View style={{width,height:height*.8}}>
<FlatList
data={cmnt_list}

contentContainerStyle={{
backgroundColor: 'white',
borderWidth: 0,}}
horizontal={false}
renderItem={({item,index})=>{
  // console.log(index)
  return (
    <View>
    <View style={{ paddingHorizontal:20,paddingVertical:25,flexDirection:'row'}}>
      
      <Image source={{uri:item.user_photo}}style={{ height:height*.06,width:height*.06, borderRadius:100,marginRight:15}} />
      <View >
      <Text style={{color:'black',fontWeight:'600'}}>
        {item.user_name}
      </Text>

      <Text style={{marginTop:5}} >
        {item.text}
      </Text>
     </View>
     
      </View>
      </View>
  )
}

}
keyExtractor={index => {console.log(index.text)}}

/>

<View style={{paddingLeft:30, flexDirection:'row', justifyContent:'space-between',width,zIndex:5,backgroundColor:'white',elevation:3,shadowColor:'grey',shadowOffset:{height:2,width:3}}}>
             <TextInput style={{width:width*.6}}  keyboardAppearance={'light'} placeholder='Type a comment' value={cmnt_txt} onChangeText={(e)=>se_cmnt_txt(e)} />
             <Pressable onPress={cmnt_txt ? submit : null} style={{backgroundColor:Colors.primary,height:height*.05,justifyContent:'center',paddingHorizontal:15}} >
                <Ionicons name='arrow-forward' size={25} color='white' />
               
              </Pressable>
         </View>
</View>
    </KeyboardAvoidingView>
  )
}

export default Comment