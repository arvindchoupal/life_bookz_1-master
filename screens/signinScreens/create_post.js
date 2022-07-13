import { View,KeyboardAvoidingView, Text ,Dimensions,TextInput,Button,Pressable,Alert,ScrollView,Image,BackHandler} from 'react-native'
import React,{useState,useEffect,useRef} from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import DatePicker from 'react-native-date-picker'
import moment from 'moment'
import Colors from '../../colors/colors'
import firestore from '@react-native-firebase/firestore';
import Fonts from '../../colors/font'
import Post_colors from '../../colors/post_color'
import upload from '../../componennts/upload'
import LottieView from 'lottie-react-native';
import storage from '@react-native-firebase/storage';
import { utils } from '@react-native-firebase/app';


const {height,width} = Dimensions.get('screen')
const Create_post = ({route,navigation}) => {
  
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

  const lesson_list = []
  const {user} = route.params
  const [count,setcount] = useState(1)
  const [color_count,setCount_color] = useState(0)
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const [time,settime] = useState(moment(date).format('LLL'))
  const [story,setstory] = useState('')
  const [lesson,setlesson] = useState('')
  const [problms,setproblms] = useState('')
  const [lesson_state_list,setLesson_State_list] = useState([])
 const [problm_list,setProblm_list] = useState([])
 const [image_uri,set_image_uri] = useState()
 const [firebase_img_link ,setFirebaseLink] = useState(' ')
 const [disabled,setdisabled] = useState(false)
 const [loading,setloading] = useState(false)
 const [HTML,sethtml] = useState()

 const update_lesson = ()=>{
 
if (lesson){
  if (lesson_state_list.length <= 9) {
    setLesson_State_list(old => [...old, lesson])
  } else {
    Alert.alert('Lifebookz','Only 10 lesson can be added')
  }
 
setlesson('')
   
}else{
  Alert.alert('Lifebookz',' Please write some data to add')
}

    

  }

  const update_problm = ()=>{
  
if( problms){
  if (problm_list.length <= 9) {
    setProblm_list(old => [...old, problms])
  } else {
    Alert.alert('Lifebookz','Only 10 problems can be added')
  }
 
setproblms('')
} else{
  Alert.alert('Lifebookz',' Please write some data to add')
}

   
     

  }
 

  
  const post = async()=>{
    setloading(true)
    setdisabled(true)
    if (image_uri){
      const imageName = image_uri.substring(image_uri.lastIndexOf('/'+1))
      const reference = storage().ref(imageName)
  
      const task = reference.putFile(image_uri);
        
          task.on('state_changed', taskSnapshot => {
         console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
  });
  
  task.then(async() => {
    console.log('Image uploaded to the bucket!');
    const url = await reference.getDownloadURL().catch(e =>{
      console.log(e)
    })
  
    setFirebaseLink(url)
    firestore()
      .collection('posts')
      .doc('type')
    .collection('story')
    .add({
      'user_name' : user.name,
      'user_photo' : user.photo,
      'story' : story,
       'lesson': lesson_state_list,
       'problems' : problm_list,
       'time' : time,
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
      
    } else{
     
    firestore()
    .collection('posts')
    .doc('type')
  .collection('story')
  .add({
    'user_name' : user.name,
      'user_photo' : user.photo,
    'story' : story,
     'lesson': lesson_state_list,
     'problems' : problm_list,
     'time' : time,
    'photo': firebase_img_link,
    'bgColor' : Post_colors[color_count].color,
    'font_family':Fonts[count].font,
    'id': user.id,
    like : 0,
    like_users : []
  })
  .then(() => {
    Alert.alert('Lifebookz','Successfully uploaded');
  
    setloading(false)
    navigation.goBack()
  })
    }
    }
  
  return (
 
    
    <View style={{flexGrow:1,width}}>
      {console.log('render')}
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
          Create Story
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
        <View style={{backgroundColor:'white',padding:5}}>
      <Text style={{margin:5,color:'black',fontSize:20,fontWeight:'bold',}}>
          Write Your Story
      </Text>
      <View style={{backgroundColor:Post_colors[color_count].color ,flex:1,justifyContent:'space-between',borderRightColor:'yellow'}}>
        

        <View style={{flexGrow:1}}>
      {image_uri ?
       <View style={{flexDirection:'row',justifyContent:'space-between',width,alignItems:'center',paddingRight:width*.13}}>
      
      <Image source={ {uri:image_uri}}  style={{height:height*.06,width:height*.06,backgroundColor:'white',borderRadius:10,margin:5}} /> 
         <Ionicons name = 'close-circle-outline' size={25} color='white' onPress={()=> set_image_uri()} />
         </View>
      :null}
      
      {/* <ScrollView style={{flex:1}}>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}	style={{ flex: 1 }}>
                  
                    <RichEditor
                   
                     style={{  textAlignVertical:'top',fontFamily:Fonts[count].font,color:Post_colors[color_count].color == 'white'?'black':'white',paddingLeft:10}}
                        ref={richText}
                        onChange={ descriptionText => {
                           setstory(descriptionText)
                        }}
                    />
                </KeyboardAvoidingView>
                </ScrollView> */}
      <TextInput value={story}  onChangeText={(t)=>setstory(t)} multiline={true} placeholder='Write something...' placeholderTextColor={Post_colors[color_count].color == 'white'?'black':'white'} style={{height:height*.35, textAlignVertical:'top',fontFamily:Fonts[count].font,color:Post_colors[color_count].color == 'white'?'black':'white',paddingLeft:10}} />
     
      
      </View>

      <View >
      {/* <RichToolbar
                editor={richText}
                actions={[ actions.setBold, actions.setItalic, actions.setUnderline, actions.heading1, ]}
                iconMap={{ [actions.heading1]: ({tintColor}) => (<Text style={[{color: tintColor}]}>H1</Text>), }}
            /> */}
      
      
      <View style={{flexDirection:'row',alignItems:'center'}} >



 
       <Pressable onPress={()=> count >= 9 ? setcount(1) : setcount(count+1)  } style={{marginLeft:15}} >
       <Text style={{fontFamily:Fonts[count].font,fontSize:20,color:Post_colors[color_count].color == 'white'?'black':'white'}}>

         T
       </Text>
       </Pressable>
       
       <Pressable onPress={()=> color_count >= 8 ? setCount_color(1) : setCount_color(color_count+1)  } style={{marginLeft:25}} >
       <Ionicons name = 'color-palette-outline' size={20} color={Post_colors[color_count].color == 'white'?'black':'white'} />
       </Pressable>

       <Pressable onPress={()=> upload(set_image_uri)  } style={{marginLeft:25}} >
       <Ionicons name = 'image' size={20} color={Post_colors[color_count].color == 'white'?'black':'white'} />
       
       </Pressable>
       </View>
       </View>
     

        </View>
       
      </View>
      
      
      </View>

      
   
      <View style={{backgroundColor:'white',margin:10,flexGrow:0.1,paddingHorizontal:10}}>
          {lesson_state_list.map((item,index)=> 
           <View key={index} style={{flexDirection:'row',justifyContent:'space-between',paddingRight:20,paddingTop:10}}>
             <Text style={{fontSize:15,width:width*.75}}>
             {  item === null ? null : index+1  + '. '  } {item}
            </Text>
             <Ionicons name = 'close-circle-outline' size={25}  onPress={()=>{
               let array = lesson_state_list
               
               if (array.length === 1){
                 setLesson_State_list([])
              
               } else {
                setLesson_State_list(  [array.filter((ite)=> ite != item)])
               }
              
          
            
             }} />
            </View>
          
          
          
          )}
          <View style={{flexDirection:'row',flexGrow:1,justifyContent:'space-between',alignItems:'center',paddingRight:25}}>
          <TextInput style={{width:width*.75}}  value={lesson} onChangeText={(t)=>setlesson(t)} multiline={true} placeholder='Got lesson from this story..' />
     
     <Ionicons name='md-add-circle-sharp' size={25} color={Colors.primary} onPress={()=>{update_lesson()
       
       
       }}/>
     </View>
      </View>

      <View style={{backgroundColor:'white',margin:10,flexGrow:0.1}}>
          {problm_list.map((item,index)=> 
           <View key={index} style={{flexDirection:'row',justifyContent:'space-between',paddingRight:20,paddingTop:10}}>
             <Text  style={{fontSize:15,marginHorizontal:10}}>
             {  item === null ? null : index+1  + '. '  } {item}
             </Text>
             <Ionicons name = 'close-circle-outline' size={25} onPress={()=>{
               let array = problm_list
               
               if (array.length === 1){
                 setProblm_list([])
              
               } else {
                setProblm_list(  [array.filter((ite)=> ite != item)])
               }
              
          
              //  setProblm_list([array])
             }} />
            </View>
          
          
          
          )}
          <View style={{flexDirection:'row',flexGrow:1,justifyContent:'space-between',alignItems:'center',paddingRight:25}}>
          <TextInput  value={problms} onChangeText={(t)=>setproblms(t)} multiline={true} placeholder='Problems you faced in this...' />
     
     <Ionicons name='md-add-circle-sharp' size={25} color={Colors.primary} onPress={()=>{update_problm()
       
       
       }}/>
     </View>
      </View>
    <View style={{height:height*.07}} />
      </ScrollView>

   
      
      
    </View>
  )
}

export default Create_post