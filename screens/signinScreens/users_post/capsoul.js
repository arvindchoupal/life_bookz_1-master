import React,{useEffect,useState} from 'react'
import { View, Text,FlatList ,Dimensions,Image,Pressable, TouchableOpacity} from 'react-native'
import firestore from '@react-native-firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Modal , ModalContent,SlideAnimation }from 'react-native-modals'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Colors from '../../../colors/colors';
import Capsoul_comment from '../../../componennts/capsoul_commnt';
import OnShare from '../../../componennts/onshare';
import moment from 'moment';
const {height,width} = Dimensions.get('screen')
const Capsoul_post = ({route}) => {
  const {user}= route.params
  
  const [data,setdata] = useState([])
  const [filter_data,set_filter_data] = useState()
  const [likeDisabled,setlikeDisabled] = useState(true)
  const [love,ssetlove] = useState([])
  const [docid_state,set_docid_state] = useState()
  const [comment_visibl,set_commentVisible] = useState(false)
  
  async function ref() {
    
    const res = await firestore()
   .collection('posts')
   .doc('type')
   .collection('capsoul')
  
   .onSnapshot(documentSnapshot => { 

    setdata(documentSnapshot.docs)
   filters()
  
  }) 
    } 


   async function filters() {
      let filter = []
      await data.map((item)=>{
        if(new Date(item._data.time ) - new Date() < 0){
          filter.push(
            item
          )
        }
      
        set_filter_data(filter)
       }
     
        
       
        )
     
     
        
          
        
         
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
              .collection('capsoul')
              .doc(docid)
              .update({
                like: ++like,
              })
              .then(async() => {
              await  firestore()
                .collection('posts')
                .doc('type')
                .collection('capsoul')
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
           .collection('capsoul')
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
              .collection('capsoul')
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
             console.log(item)
            const dataa = item._data
       
            const docid = item._ref._documentPath._parts[3]
            return(

              
             <View style={{margin:10,backgroundColor:'white',flexGrow:1}}>
               <View style={{flexDirection:'row',alignItems:'center',margin:10}}>
              <Image source={ dataa.user_photo.includes('http') ?   {uri:dataa.user_photo } : require('../../../Images/profile_demo.jpg')} style={{height:40,width:40,borderRadius:100}} />
              <Text style={{color:'black',paddingLeft:10}}>
                {dataa.user_name} 
              </Text>
              </View>
           {new Date(item._data.time ) - new Date() < 0?
           <> 
           <Image source={{uri:dataa.photo}} resizeMode='contain' style={{flexGrow:2,height:height*.3}} />
                  <View style={{flexGrow:1,backgroundColor:dataa.bgColor}} >
                <Text style={{color:'white',fontFamily:dataa.font_family,padding:10}}>
                  {dataa.story}
                </Text>

                    </View>
                    </>
  :<Text> Opening Time: {moment(item._data.time).format('l')}</Text>  }
              
                    <View style={{flexDirection:'row',padding:10,justifyContent:'space-between',flexGrow:1}} >
                    
       
                    <Pressable 
                    
                    onPress={()=>{
                     
                    if(likeDisabled){
                      like(docid,dataa.like, dataa.like_users)
         if (!love.includes(docid)){
          ssetlove((prev)=> [...prev,docid])
         }
                    }  
        
       }} style={{flexGrow:1, alignItems:'center',justifyContent:'center'}}>
         <Text style={{fontSize:11}}>
      {dataa.like}
         </Text>
         <AntDesign name={dataa.like_users.includes(user.id) ? 'like1' : 'like2'} size={25} color={dataa.like_users.includes(user.id)?Colors.primary:'grey'} />
       
       </Pressable>
      
       

       <TouchableOpacity 
       onPress={()=>{
         set_docid_state(docid)
      set_commentVisible(true)
       }}     // comment
       
       style={{flexGrow:1,  flexDirection:'row', alignItems:'center',justifyContent:'center'}}>
       <Fontisto name='comment' size={25} style={{paddingRight:10}} />
       
       </TouchableOpacity>

      

       <TouchableOpacity onPress={()=>{
        if(new Date(item._data.time ) - new Date() < 0){
          OnShare({
            'story':dataa.story,
            'image':dataa.photo,
           
          })
        }
        
       }} style={{flexGrow:1,  flexDirection:'row', alignItems:'center',justifyContent:'center'}}>
       <Ionicons name='md-share-social' size={25} style={{paddingRight:10}} />
         {/* <Text>
          Share
         </Text> */}
       </TouchableOpacity>


                      </View>
               </View>
               
               )

           }
            
          
          }
        
          />


      </View>

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
    <Capsoul_comment user={user} set_commentVisible={set_commentVisible} id = {docid_state} />
     </ModalContent>
   </Modal>

   <View style={{height:height*.09}} />
    </View>
  )
}

export default Capsoul_post