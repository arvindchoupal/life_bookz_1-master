import { View, Text ,Dimensions,Image,BackHandler,Alert, TextInput, FlatList,TouchableOpacity,Pressable, ScrollView} from 'react-native'
import React,{useState} from 'react'
import Home_banner from '../../componennts/home_banner'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Colors from '../../colors/colors'
import {Picker} from '@react-native-picker/picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import firestore from '@react-native-firebase/firestore';
import { useEffect } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Fontisto from 'react-native-vector-icons/Fontisto'
import { Modal , ModalContent,SlideAnimation }from 'react-native-modals'
const {height,width} = Dimensions.get('screen')





const No_post = ()=>{
  return (
<View style={{width,alignItems:'center',flexGrow:1,paddingTop:height*.1}}>
  <MaterialCommunityIcons name='post-outline' size={35} color={Colors.primary} />
  <View style={{width,paddingHorizontal:width*.1,alignItems:'center',justifyContent:'center'}}>
  <Text style={{color:'black',fontWeight:'600',marginBottom:10}}>
    No post yet !
  </Text>

  <Text style={{textAlign:'center'}}>
    It looks like there are no posts on your feed yet. All your posts will be displayed here.
  </Text>
  </View>

  </View>
  )
}

const Home2 = ({route,navigation}) => {
  const [type, setStoryType] = useState('story');
  const [dataa,setdata] = useState([])
  const [likeDisabled,setlikeDisabled] = useState(true)
  const [love,ssetlove] = useState([])
  const [docid_state,set_docid_state] = useState()
  const [comment_visibl,set_commentVisible] = useState(false)
const {user}= route.params
const id =user.id

const like = async(docid,like,like_users)=>{
  console.log('setting like disabled true')
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
            console.log(love_list)
          });
        }
       
       
       setlikeDisabled(true)
      }
      


  async function ref() {

     await firestore()
   .collection('posts')
   .doc('type')
   .collection(type.toString())
   .where(
    'id','==',id
   )
  
   .onSnapshot(documentSnapshot => { 
   
    setdata(documentSnapshot.docs)}) 
    } 

    useEffect( ()=>{
      ref()
    },[type]

    ) 
    useEffect(() => {
      const backAction = () => {
        Alert.alert("Hold on!", "Are you sure you want to go back?", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel"
          },
          { text: "YES", onPress: () => BackHandler.exitApp() }
        ]);
        return true;
      };
  
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
  
      return () => backHandler.remove();
    }, []);                                           

  return (
    <View style={{height,width}}>


<View style={{
   flexDirection:'row',
   width,
   alignItems:'center',
   justifyContent:'space-between',
   paddingHorizontal:15,
   borderBottomWidth:1,
   borderColor:'grey',
   elevation:1,
   shadowOffset:{
    height:1
   },
   shadowOpacity:1
   }}>


    <Text style={{
      fontWeight:'800',
      color:'black'
      }}>
      HOME
    </Text>

    <Image source={require('../../Images/logo.png')} style={{height:height*.07,width:height*.07}} />
    <Ionicons name='chatbox-outline' size={25} color= {Colors.primary} onPress={()=>{
      navigation.navigate('message')
    }}/>
  
    </View>




             


   

            
            
             
               

           
              
            
         <ScrollView>

          <View style={{paddingHorizontal:15,paddingTop:10}} >
      <View style={{
          borderColor:'grey',borderWidth:1,
          borderRadius:15,
          overflow:'hidden',
          
          
      }}>
  <Home_banner/>
     </View>

     <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:height*.03}} >
      <TouchableOpacity onPress={()=>{
        setStoryType('capsoul')
      }} >
       <View style={{height:height*.1,width:width*.4,shadowColor: "grey",borderRadius:2,
shadowOffset: {
  width: 0,
  height: 1,
},
shadowOpacity:  0.05,
shadowRadius: 1.05,
elevation: 2}}> 
<View style={{flexDirection:'row',justifyContent:'space-between'}} >
      <FontAwesome5 name='hourglass-start' size={25} style={{margin:10}}/>
      <FontAwesome5 name='hourglass-half' size={25} style={{margin:10}} />
      <FontAwesome5 name='hourglass-end' size={25} style={{margin:10}} />
      </View>
      <View style={{alignItems:'center'}}>
      <Text >
         Your Time Capsoul
       </Text>
       </View>
       </View>
       </TouchableOpacity>

       <View style={{height:height*.1,width:width*.4,shadowColor: "grey",borderRadius:2,
shadowOffset: {
  width: 0,
  height: 1,
},
shadowOpacity:  0.05,
shadowRadius: 1.05,
elevation: 2}}> 
<View style={{flexDirection:'row',justifyContent:'space-between'}} >
      <Ionicons name='person' size={25} style={{margin:10}}/>
      <Ionicons name='person' size={25} style={{margin:10}}/>
      <Ionicons name='person' size={25} style={{margin:10}}/>
      </View>
      <View style={{alignItems:'center'}}>
      <Text >
         Lifebookz legends
       </Text>
       </View>
       </View>
     </View>





</View>
<View style={{backgroundColor:Colors.lightgrey,height:10,width,marginTop:8}}/>
<Text style={{marginTop:5,marginLeft:10,color:'black',fontWeight:'500'}}>
  Your Story
</Text>
<Picker
  selectedValue={type}
 

  onValueChange={(itemValue, itemIndex) =>
    setStoryType(itemValue)
  }
  mode={'dropdown'}
  dropdownIconRippleColor={Colors.primary}
  dropdownIconColor={Colors.primary}
  
  
  
  
  >
  <Picker.Item label="Life Story" value="story"  />
  <Picker.Item label="Funny" value="funny" />
  <Picker.Item label="Time capsoul" value="capsoul" />
</Picker>


{dataa[0]?<View style={{flex:1,paddingHorizontal:10}}>
  <FlatList
  data={dataa}
  scrollEnabled={false}
  renderItem={({item})=>{
    const docid = item._ref._documentPath._parts[3]
    const data = item._data
    console.log(data.story)
    return(
      <View style={{marginTop:2,backgroundColor:'white',marginBottom:30}}>
      <View style={{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingRight:15
        }}>
            <TouchableOpacity onPress={()=>{
                  if (data.id !== user.id){
                   navigation.navigate('message3',{
                   'user':user,
                   'other_user' : data
        
        })
        }
     
      }} style={{flexDirection:'row',alignItems:'center',margin:10}}>
     <Image source={ data.user_photo ?   {uri:data.user_photo } : require('../../Images/profile_demo.jpg')} style={{height:40,width:40,borderRadius:100}} />
     <Text style={{color:'black',paddingLeft:10}}>
       {data.user_name} 
     </Text>
     </TouchableOpacity>
     <View style={{flexDirection:'row',padding:10,flexGrow:1}} >
           

           <Pressable      // like
     style={{flexGrow:1, 
     alignItems:'center',
     justifyContent:'flex-end',
     flexDirection:'row'
     }}>


<Text style={{fontSize:15,margin:5}}>
{data.like}
</Text>
<Ionicons name={data.like_users.includes(user.id) ? 'heart' : 'heart-outline'} size={25} color={data.like_users.includes(user.id)?Colors.lightgrey:'grey'} />

</Pressable>






             </View>
     
  </View>
  {data.photo == ' ' ?null: <Image source={{uri:data.photo}} resizeMode='contain' style={{flexGrow:2,height:height*.3}} />}
    
         <View style={{flexGrow:1,backgroundColor:data.bgColor}} >
       <Text style={{color:'white',fontFamily:data.font_family,padding:10}}>
         {data.story} 
       </Text>

           </View>
         

         
           

          

      </View>

      
   
    )
  }}

keyExtractor={item => item.story}
  />
  </View>
:<No_post/>}
  </ScrollView>


    </View>
  )
}

export default Home2