import React,{useEffect,useState} from 'react'
import { View, Text,FlatList ,Dimensions,Image,Pressable,TouchableOpacity} from 'react-native'
import firestore from '@react-native-firebase/firestore';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Colors from '../../../colors/colors';
import OnShare from '../../../componennts/onshare';
import Fontisto from 'react-native-vector-icons/Fontisto'
import Funny_comment from '../../../componennts/funny_cmnt';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Modal , ModalContent,SlideAnimation }from 'react-native-modals'

const {height,width} = Dimensions.get('screen')
const Funny_post = ({route}) => {
const {user}= route.params
  console.log('funny page')
  const [data,setdata] = useState([])
  const [likeDisabled,setlikeDisabled] = useState(true)
  const [love,ssetlove] = useState([])
  const [docid_state,set_docid_state] = useState()
  const [comment_visibl,set_commentVisible] = useState(false)

  async function ref() {
    
    const res = await firestore()
   .collection('posts')
   .doc('type')
   .collection('funny')
  
   .onSnapshot(documentSnapshot => { 
      if (documentSnapshot.docs) {
        setdata(documentSnapshot.docs)
      }
   }) 
    } 


  useEffect(()=>{
 
  ref()
     },[]);

     const like = async(docid,like,like_users)=>{
      console.log('setting like disabled true')
            setlikeDisabled(false)
            if ( !like_users.includes(user.id)) {
            await  firestore()
              .collection('posts')
              .doc('type')
              .collection('funny')
              .doc(docid)
              .update({
                like: ++like,
              })
              .then(async() => {
              await  firestore()
                .collection('posts')
                .doc('type')
                .collection('funny')
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
           .collection('funny')
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
              .collection('funny')
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
                console.log(love_list)
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

            const dataa = item._data
            console.log(dataa)
            const docid = item._ref._documentPath._parts[3]
            return(
             
             <View style={{margin:10,backgroundColor:'white',flexGrow:1}}>
               <View style={{flexDirection:'row',alignItems:'center',margin:10}}>
              <Image source={ {uri:dataa.user_photo } } style={{height:40,width:40,borderRadius:100}} />
              <Text style={{color:'black',paddingLeft:10}}>
                {dataa.user_name} 
              </Text>
              </View>
           
              <Image source={{uri:dataa.photo}} resizeMode='contain' style={{flexGrow:2,height:height*.3}} />
                  <View style={{flexGrow:1,backgroundColor:dataa.bgColor}} >
                <Text style={{color:'white',fontFamily:dataa.font_family,padding:10}}>
                  {dataa.story}
                </Text>

                    </View>

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
     
         OnShare(dataa.photo ?{
         'story':dataa.story,
         'image':dataa.photo,
        
       }: {'story':dataa.story})}} style={{flexGrow:1,  flexDirection:'row', alignItems:'center',justifyContent:'center'}}>
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
    <Funny_comment user={user} set_commentVisible={set_commentVisible} id = {docid_state} />
     </ModalContent>
   </Modal>
   <View style={{height:height*.09}} />
    </View>
  )
}

export default Funny_post