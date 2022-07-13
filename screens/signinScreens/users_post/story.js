import React,{useEffect,useState} from 'react'
import { View, Text,FlatList ,Dimensions,Image,TouchableOpacity,Pressable} from 'react-native'
import firestore from '@react-native-firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Modal , ModalContent,SlideAnimation }from 'react-native-modals'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Colors from '../../../colors/colors';
import OnShare from '../../../componennts/onshare';
import Fontisto from 'react-native-vector-icons/Fontisto'
import Comment from '../../../componennts/comments';
import moment from 'moment';

const {height,width} = Dimensions.get('screen')

const Story_post = ({route}) => {
const navigation = useNavigation()
  const {user }= route.params
  const [visible,setvisible] = useState(false)
  const [lesson_state,setlesson_stae] = useState([])
  const [comment_visibl,set_commentVisible] = useState(false)
  const [love,ssetlove] = useState([])
  const [likeDisabled,setlikeDisabled] = useState(true)
  const [docid_state,set_docid_state] = useState()
  
  const [problm_modl_vsbl,setProblm_modl_vsbl] = useState(false)
  const [problm_modl_list, setProblm_modl_list] = useState([])

  const [data,setdata] = useState([])
   
  async function ref() {
    
    const res = await firestore()
   .collection('posts')
   .doc('type')
   .collection('story')
  
   .onSnapshot(documentSnapshot => { 

    setdata(documentSnapshot.docs)}) 
    } 


  useEffect(()=>{
 
  ref()
     },[]);

     const like = async(docid,like,like_users)=>{

      setlikeDisabled(false)
      if ( !like_users.includes(user.id)) {
      await  firestore()
        .collection('posts')
        .doc('type')
        .collection('story')
        .doc(docid)
        .update({
          like: ++like,
        })
        .then(async() => {
        await  firestore()
          .collection('posts')
          .doc('type')
          .collection('story')
          .doc(docid)
          .update(
            {
              like_users : [...like_users,user.id]
            }
          )
        });
      } else {
 
    let    list = like_users
    let    index = list.indexOf(user.id)
     if (index !== -1){
        list.splice(index,1)

     }
     firestore()
     .collection('posts')
     .doc('type')
     .collection('story')
     .doc(docid)
     .update(
       {
         like_users : [...list]
       }
     )

       
        .then(() => {
          firestore()
        .collection('posts')
        .doc('type')
        .collection('story')
        .doc(docid)
        .update({
          like: --like,
        })
          let love_list = love
          let love_index = love.indexOf(docid)
          if (love_index !== -1){
            love_list.splice(love_index,1)

            ssetlove([...love_list])
          }
         
        });
      }
     
     
     setlikeDisabled(true)
    }
    
  return (
    <View style={{flex:1}}>
 
      <View style={{flex:1}}>
           <FlatList
           data={data}
           renderItem={({item})=>{
         
            const data = item._data
            
     const docid = item._ref._documentPath._parts[3]
     
            return(
             <View style={{padding:5, flex:1,backgroundColor:'white'}}>
               <View style={{
                 flexDirection:'row',
                 justifyContent:'space-between',
                 paddingRight:15,
              
                 }}>
                     <TouchableOpacity onPress={()=>{
                           if (data.id !== user.id){
                            navigation.navigate('message3',{
                            'user':user,
                            'other_user' : data
                 
                 })
                 }
              
               }} style={{flexDirection:'row',margin:10}}>
              <Image source={ data.user_photo ?   {uri:data.user_photo } : require('../../../Images/profile_demo.jpg')} style={{height:40,width:40,borderRadius:100}} />
              <Text style={{color:'black',paddingLeft:10,fontWeight:'600'}}>
                {data.user_name} 
              </Text>
              </TouchableOpacity>
              <View style={{flexDirection:'row',paddingTop:10}}>
              <Text style={{fontSize:13}}>
                {moment(data.time).startOf('hour').fromNow()}
              </Text>
              
              </View>
           </View>

          
              
               {/* <WebView
        originWhitelist={['*']}
        source={{ html: '<h1>Hello world  hvhvhvhvhv</h1>' }}
        style={{flex:1}}
   
      /> */}

            
           
           <View style={{  marginLeft:60,paddingRight:10,marginTop:-30}}>
              
                  <View style={{flexGrow:1,backgroundColor:data.bgColor,marginBottom:5}} >
                <Text style={{color:data.bgColor=='white'?'black':'white',fontFamily:data.font_family,padding:10,paddingLeft:1}}>
                  {data.story} 
                </Text>
             </View>
             
              



             {data.photo == ' '? null: <Image source={{uri:data.photo}} resizeMode='contain' style={{flexGrow:2,height:height*.3}} />  }
            
                   
                  

                    <View style={{flexDirection:'row',justifyContent:'space-between',flexGrow:1,marginTop:10}} >
                    
      
                    <Pressable      // like
                 
                    onPress={()=>{
                    if(likeDisabled){
                      like(docid,data.like, data.like_users)
         if (!love.includes(docid)){
          ssetlove((prev)=> [...prev,docid])
         }
                    }  
        
       }} style={{ alignItems:'center',flexDirection:'row'}}>
        
       <AntDesign name={data.like_users.includes(user.id) ? 'heart' : 'hearto'} size={20} color={data.like_users.includes(user.id)?Colors.lightgrey:'grey'} />
       <Text style={{fontSize:16,marginLeft:10,fontWeight:'300'}}>
      {data.like}
         </Text>
       </Pressable>
      
       

       <TouchableOpacity 
       onPress={()=>{
         set_docid_state(docid)
      set_commentVisible(true)
       }}     // comment
       
       style={{flexDirection:'row', alignItems:'center'}}>
       <Ionicons name='chatbox-outline' size={20} />
       
       </TouchableOpacity>
       <TouchableOpacity onPress={()=>{
                      setlesson_stae(data.lesson)
                      setvisible(true)
                  }} style={{ flexDirection:'row' ,paddingTop:3}}>
                  <Ionicons name='md-bookmark-outline' size={20} />
                    {/* <Text>
                      Lesson
                    </Text> */}
                  </TouchableOpacity>
 <TouchableOpacity 
       onPress={()=>{
         setProblm_modl_list(data.problems)
         setProblm_modl_vsbl(true)
       }}
       
       style={{flexDirection:'row',paddingTop:3}}>
       <Ionicons name='alert' size={20} />
         {/* <Text>
           Problmes
         </Text> */}
       </TouchableOpacity>
   
      

       <TouchableOpacity onPress={()=>{
         
         OnShare({
         'story':data.story,
         'image':data.photo,
         'lesson' : data.lesson,
         'problems' : data.problems
       })}} style={{ flexDirection:'row', alignItems:'center'}}>
       <Ionicons name='md-share-social' size={20} />
         {/* <Text>
          Share
         </Text> */}
       </TouchableOpacity>
       </View>


                      </View>
                      <View style={{height:1,marginTop:15,backgroundColor:Colors.lightgrey,width}} />
                    
    
                   

               </View>
               
               )

           }
            
          
          }
          />


      </View>
      <Modal
     
     visible={visible}
     rounded={true}
     modalTitle={
       <View style={{justifyContent:'center',paddingLeft:35}}>
         <Text style={{color:'black',fontSize:16,fontWeight:'500'}}>
         Lesson
         </Text>
       </View>
     }
     onHardwareBackPress ={()=>{
       setvisible(false)
     }}
     modalAnimation={new SlideAnimation({
       slideFrom: 'bottom',
       initialValue: 0,
       
       useNativeDriver: true,
     })}
     onTouchOutside={() => {
       setvisible(false)
     }}
   >
     <ModalContent>
     <View style={{width,height:height*.8}}>
   
        
    <FlatList
     data={lesson_state}
     renderItem = {({item,index})=>{
      
       return(
      <View style={{padding:15,width,borderBottomWidth:1,borderColor:'grey'}}>
        <Text style={{color:'black'}}>
     {index+1 +'.  '} {item} 
        </Text>
        </View>
            )}}
 keyExtractor={index=>index}
     />


    
     </View>
     </ModalContent>
   </Modal>


   <Modal
     
     visible={problm_modl_vsbl}
     rounded={true}
     modalTitle={
       <View style={{justifyContent:'center',paddingLeft:35}}>
         <Text style={{color:'black',fontSize:16,fontWeight:'500'}}>
       Problem
         </Text>
       </View>
     }
     onHardwareBackPress ={()=>{
      setProblm_modl_vsbl(false)
     }}
     modalAnimation={new SlideAnimation({
       slideFrom: 'bottom',
       initialValue: 0,
       
       useNativeDriver: true,
     })}
     onTouchOutside={() => {
      setProblm_modl_vsbl(false)
     }}
   >
     <ModalContent>
     <View style={{width,height:height*.8}}>
   
        
    <FlatList
     data={problm_modl_list}
     renderItem = {({item,index})=>{
     
       return(
      <View style={{padding:15,width,borderBottomWidth:1,borderColor:'grey'}}>
        <Text style={{color:'black'}}>
     {index+1 +'.  '} {item} 
        </Text>
        </View>
            )}}
 keyExtractor={index=>index}
     />


    
     </View>
     </ModalContent>
   </Modal>

   <Modal
     
     visible={comment_visibl}
     rounded={true}
     modalTitle={
       <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:30,paddingTop:40}}>
         <Text style={{color:'black',fontSize:16,fontWeight:'500'}}>
       Comments
         </Text>
         <Ionicons name='close' size={25} color={'black'} onPress={()=>{
           set_commentVisible(false)
         }} />
       </View>
     }
     onHardwareBackPress ={()=>{
      set_commentVisible(false)
     }}
     modalAnimation={new SlideAnimation({
       slideFrom: 'bottom',
       initialValue: 0,
       
       useNativeDriver: true,
     })}
     onTouchOutside={() => {
      set_commentVisible(false)
     }}
   >
     <ModalContent>
    <Comment user={user} set_commentVisible={set_commentVisible} id = {docid_state} />
     </ModalContent>
   </Modal>

   <View style={{height:height*.09}} />
    </View>
  )
}

export default Story_post