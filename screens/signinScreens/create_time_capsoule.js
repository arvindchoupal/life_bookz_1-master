import { View, Text ,Dimensions,TextInput,Button,Pressable,Alert,ScrollView,Image,BackHandler} from 'react-native'
import React,{useState,useEffect} from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import DatePicker from 'react-native-date-picker'
import moment from 'moment'
import Colors from '../../colors/colors'
import firestore from '@react-native-firebase/firestore';
import Fonts from '../../colors/font'
import Post_colors from '../../colors/post_color'
import upload from '../../componennts/upload'
import storage from '@react-native-firebase/storage';
import { utils } from '@react-native-firebase/app';
import LottieView from 'lottie-react-native';
import { Modal , ModalContent,SlideAnimation }from 'react-native-modals'
const {height,width} = Dimensions.get('screen')
const Create_post = ({route,navigation}) => {
 
  const lesson_list = []
  const {user} = route.params
  const [count,setcount] = useState(1)
  const [color_count,setCount_color] = useState(1)
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const [time,settime] = useState(moment(date).format('LLL'))
  const [story,setstory] = useState('')
  const [lesson,setlesson] = useState('')
  const [problms,setproblms] = useState('')
  const [lesson_state_list,setLesson_State_list] = useState([])
 const [problm_list,setProblm_list] = useState([])
 const [image_uri,set_image_uri] = useState()
 const [firebase_img_link ,setFirebaseLink] = useState()
const [disabled,setdisabled] = useState(false)
const [loading,setloading] = useState(false)
 useEffect(() => {
  const backAction = () => {
    navigation.goBack()
    
    return true;
  };

  const backHandler = BackHandler.addEventListener(
    "hardwareBackPress",
    backAction
  );

  return () => backHandler.remove();
}, []);
  const post = async()=>{

 setdisabled(true)
 setloading(true)
    if (image_uri){
      console.log('1')
      const imageName = image_uri.substring(image_uri.lastIndexOf('/'+1))
      const reference = storage().ref(imageName)
      const task = reference.putFile(image_uri);
        
      task.on('state_changed', taskSnapshot => {
     console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
});
    task.then(async() => {
    const url = await reference.getDownloadURL().catch(e =>{
      console.log(e)
    })
    setFirebaseLink(url)
     await firestore()
    .collection('posts')
        .doc('type')
    .collection('capsoul')
    .add({
      'user_name' : user.name,
      'user_photo' : user.photo,
      'story' : story,
   
       'time' : moment(date).format('LLL'),
      'photo': url,
      'bgColor' : Post_colors[color_count].color,
      'font_family':Fonts[count].font,
      'id': user.id,
      like : 0,
      like_users : []
    })
    .then(() => {
      setloading(false)
      Alert.alert('Lifebookz','Successfully uploaded');
      navigation.goBack()
    })
  });
  
  

    } else {
      console.log('2')
      firestore()
      .collection('posts')
      .doc('type')
      .collection('capsoul')
      .add({
        'user_name' : user.name,
        'user_photo' : user.photo,
        'story' : story,
     
         'time' : moment(date).format('L'),
        
        'bgColor' : Post_colors[color_count].color,
        'font_family':Fonts[count].font,
        'id': user.id,
        like : 0,
        like_users : []
      })
      .then(() => {
        Alert.alert('Lifebookz','Successfully uploaded');
        navigation.goBack()
      })
    }
   
   }
  
  return (
    <View style={{flexGrow:1,width}}>
<View style={{width, backgroundColor:'white',  shadowColor: "#080101",alignItems:'center',flexDirection:'row',marginTop:-5,justifyContent:'space-between'
,shadowOffset: {
  width: 0,
  height: 3,
},
shadowOpacity:  0.17,
shadowRadius: 3.05,
elevation: 5}}>
<View style={{flexDirection:'row',alignItems:'center',padding:10,height:height*.07}}>
  <Ionicons name='md-arrow-back-outline' size={32} color='black' style={{fontWeight:'bold'}}/>
        <Text style={{color:'black',fontSize:17,fontWeight:'600',marginLeft:10}} >
        Time Capsoul
        </Text>
     </View>
        <View style={{alignItems:'center'}}>

        {loading ?  <LottieView
          style={{height:height*.08,width:height*.08}}
        source={require('../../files/timeCapsoul.json')}
        resizeMode={'cover'}
        autoPlay
        loop
      />:  <Pressable disabled={disabled} onPress={()=>story != '' && lesson_state_list[0] != '' && problm_list[0] != '' ? post(): console.log('err   ' + lesson)
    } style={{backgroundColor:story != '' && lesson_state_list[0] != '' && problm_list[0] != '' ? Colors.primary : '#cbd1cc',borderRadius:10,padding:10,paddingHorizontal:25, justifyContent:'center',alignItems:'center',marginRight:10}}>
              <Text style={{color:'white'}}>
                Post
              </Text>
              </Pressable>}
    
                </View>
      </View>

<ScrollView showsVerticalScrollIndicator={false} style={{width,}} contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{paddingHorizontal:10,marginTop:5}}>
        <View style={{backgroundColor:'white',padding:5,height:height*.5,}}>
      <Text style={{margin:5,color:'black',fontSize:20,fontWeight:'bold',}}>
          Write Your Story
      </Text>
      <View style={{backgroundColor:Post_colors[color_count].color ,height:height*.52,justifyContent:'space-between',borderRightColor:'yellow'}}>
        

        <View>
      {image_uri ?
       <View style={{flexDirection:'row',justifyContent:'space-between',width,alignItems:'center',paddingRight:width*.13}}>
      
      <Image source={ {uri:image_uri}}  style={{height:height*.06,width:height*.06,backgroundColor:'white',borderRadius:10,margin:5}} /> 
         <Ionicons name = 'close-circle-outline' size={25} color='white' onPress={()=> set_image_uri()} />
         </View>
      :null}
      
      
      <TextInput value={story}  onChangeText={(t)=>setstory(t)} multiline={true} placeholder='Write something...' placeholderTextColor={'white'} style={{height:height*.35, textAlignVertical:'top',fontFamily:Fonts[count].font,color:'white',paddingLeft:10}} />
      </View>

      <View style={{height:height*.1,width:width*.8}}>
      
      <View style={{flexDirection:'row',alignItems:'center'}} >



 
       <Pressable onPress={()=> count >= 9 ? setcount(1) : setcount(count+1)  } style={{marginLeft:15}} >
       <Text style={{fontFamily:Fonts[count].font,fontSize:20,color:'white'}}>

         T
       </Text>
       </Pressable>
       
       <Pressable onPress={()=> color_count >= 8 ? setCount_color(1) : setCount_color(color_count+1)  } style={{marginLeft:25}} >
       <Ionicons name = 'color-palette-outline' size={20} color='white' />
       </Pressable>

       <Pressable onPress={()=> upload(set_image_uri)  } style={{marginLeft:25}} >
       <Ionicons name = 'image' size={20} color='white' />
       </Pressable>
       </View>
       </View>
     

        </View>
       
      </View>
      
      
      </View>

      
   
     

      

        <View style={{marginTop:10,backgroundColor:'white',marginHorizontal:10,paddingHorizontal:10,alignItems:'center'}} >
  
<View style={{width,paddingHorizontal:10,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
     <Text style={{color:'black',fontSize:18,fontWeight:'500',margin:20}}>
      Time To Open
     </Text>

     

</View>
      

       <DatePicker date={date} onDateChange={setDate} />

      
       
      </View>

    <View style={{height:height*.07}} />
      </ScrollView>
      {/* <Modal
     animationType='fade'
     transparent
     visible={loading}
     rounded={true}
    
     onHardwareBackPress ={()=>{
      loading(false)
     }}
     modalAnimation={new SlideAnimation({
       slideFrom: 'bottom',
       initialValue: 0,
       
       useNativeDriver: true,
     })}
    
   >
     <ModalContent>
     <View>
     <LottieView
          style={{height:height*.1,width:height*.1}}
        source={require('../../files/timeCapsoul.json')}
        resizeMode={'cover'}
        autoPlay
        loop
      />
     </View>
     </ModalContent>
   </Modal> */}

   

    </View>
  )
}

export default Create_post