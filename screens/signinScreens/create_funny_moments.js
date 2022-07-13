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
  const [disabled,setdisabled] = useState(false)
  const [image_uri,set_image_uri] = useState()
  const [firebase_img_link ,setFirebaseLink] = useState(' ')
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
    setloading(true)
    setdisabled(true)
    if (image_uri){
      console.log('image')
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
        firestore()
        .collection('posts')
        .doc('type')
        .collection('funny')
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
          Alert.alert('Lifebookz','Successfully uploaded');
          navigation.goBack()
        })
      });
    }else{
      console.log('else photo not')
       firestore()
      .collection('posts')
      .doc('type')
      .collection('funny')
      .add({
        'user_name' : user.name,
      'user_photo' : user.photo,
        'story' : story,
         'id': user.id,
          'time' : time,
        // 'photo': ` ${image_uri ? url: null} `,
        'bgColor' : Post_colors[color_count].color,
        'font_family':Fonts[count].font,
        'id': user.id,
        like : 0,
        like_users : []
      })
      .then(() => {
        Alert.alert('Lifebookz','Successfully uploaded');
    console.log('fuuny updated')
    setloading(false)
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
       Funny Story
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
        <View style={{backgroundColor:'white',padding:5,height:height*.5}}>
      <Text style={{margin:5,color:'black',fontSize:20,fontWeight:'bold',}}>
          Write Your Story
      </Text>
      <View style={{backgroundColor:Post_colors[color_count].color ,height:height*.52,justifyContent:'space-between'}}>
        

        <View>
      {image_uri ?
       <View style={{flexDirection:'row',justifyContent:'space-between',width,alignItems:'center',paddingRight:width*.13}}>
      
      <Image source={ {uri:image_uri}}  style={{height:height*.06,width:height*.06,backgroundColor:'white',borderRadius:10,margin:5}} /> 
         <Ionicons name = 'close-circle-outline' size={25} color='white' onPress={()=> set_image_uri()} />
         </View>
      :null}
      
      
      <TextInput value={story}  onChangeText={(t)=>setstory(t)} multiline={true} placeholder='Write something...' placeholderTextColor={'white'} style={{height:height*.35, textAlignVertical:'top',fontFamily:Fonts[count].font,color:'white',paddingLeft:10}} />
      </View>

      <View style={{height:height*.05,width:width*.8,justifyContent:'flex-start'}}>
      
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

      
   
          <View style={{height:height*.07}} />
      </ScrollView>

    </View>
  )
}

export default Create_post