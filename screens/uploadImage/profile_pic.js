import { View, Text,Dimensions,Image,Pressable ,ActivityIndicator} from 'react-native'
import React,{useEffect, useState} from 'react'
import Colors from '../../colors/colors'
import Icon from 'react-native-vector-icons/Ionicons'
import upload from '../../componennts/upload'
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';


const {height,width} = Dimensions.get('screen')

const Profile_pic = ({route,navigation}) => {
    const [image_uri,set_image_uri] = useState()
    const [imgfirebaselink,setImgFirebaselink] = useState()
    const [runEffect,setruneffect] = useState()
    const [loading,setLoading] = useState(false)
    const {user} = route.params

    const storeData = async (value) => {
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem('@storage_Key', jsonValue)

        } catch (e) {
          // saving error
        } finally {
            navigation.navigate('signinScreens',{ 
                user :{"email": user.email, "familyName": user.familyName, "givenName": user.givenName, "id": user.id, "name": user.name, "photo":imgfirebaselink}} )
        }
      }
 
   const update_img = ()=>{
    if (image_uri){
       setLoading(true)
        const imageName = image_uri.substring(image_uri.lastIndexOf('/'+1))
        const reference = storage().ref(imageName)
    
        const task = reference.putFile(image_uri);
          
            task.on('state_changed', taskSnapshot => {
           console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
    });
        task.then(async() => {
          const url = await reference.getDownloadURL()
          .then((e)=>{
              console.log(e)
            setImgFirebaselink(e) 
          storeData({ 
            user :{"email": user.email, "familyName": user.familyName, "givenName": user.givenName, "id": user.id, "name": user.name, "photo": e}
          })
          })
          
          .catch(e =>{
            console.log(e) 
          })

         
          setLoading(false)
         
        
        });
    
   }}

   useEffect(()=>{
       update_img()
   },[runEffect])
    
  return (
    <View 
    style={{
        flex:1,
        width,
        backgroundColor:Colors.primary
         }}>
             <View style={{height:height*.25,width,alignItems:'center',paddingTop:height*.05}}>
<Text style={{color:'white',fontSize:25,fontWeight:'500'}}>
    Profile Pic
</Text>
             </View>
            <View style={{backgroundColor:'white',flexGrow:1,borderTopLeftRadius:70}}>

            </View>
                   
            <View style={{height:height*.4,width,alignItems:"center",backgroundColor:'transparent',position:'absolute',top:height*.1}} >
                <Pressable onPress={()=>{
                    upload(set_image_uri)
                }} style={{backgroundColor:'white',justifyContent:'flex-start',alignItems:'center', borderColor:Colors.primary,borderWidth:5,height:height*.25,width:width*.5,borderRadius:width*.12,overflow:'hidden'}}>
               { image_uri ? <Image source={{uri:image_uri}} resizeMode={'cover'} style={{flex:1,width:width*.5}} />: <Icon name='md-camera-sharp' size={110} color={Colors.primary} style={{marginTop:25}}/>}
               
                  {image_uri ? null : <Text style={{color:Colors.primary,fontWeight:'400'}}>Take a picture {image_uri}</Text>}  
               
                
                </Pressable >
            
            <View style={{alignItems:'center',width,marginTop:height*.05}}>
                <Text style={{color:Colors.primary,fontWeight:'400',width:width*.45,alignContent:'center',textAlign:'center'}}>
                    Click above to change or choose photo
                </Text>
                </View>

 <View style={{marginTop:height*.1,height:height*.2}}>
 {loading?
 <>
    <ActivityIndicator size="large" color={Colors.primary} animating={loading}/>
    <Text>
        Please Wait 
    </Text>
    </> : null }
    </View> 
    
    
   
                

                <View style={{alignItems:'center',marginTop:height*.05}}>
            <Pressable disabled={loading} onPress={()=>{
              imgfirebaselink ?navigation.navigate('signinScreens',{
                user :{"email": user.email, "familyName": user.familyName, "givenName": user.givenName, "id": user.id, "name": user.name, "photo": imgfirebaselink}} ) : image_uri? setruneffect(true) : upload(set_image_uri)  
              
            }
            } style={{ justifyContent:'center',alignItems:'center', backgroundColor:Colors.primary,height:height*.072,width:width*.8,borderRadius:25}} >
                <Text style={{color:'white',fontSize:16,fontWeight:'400'}}>
                  {imgfirebaselink ? 'Next' : image_uri ? 'Save' : 'Upload'}
                </Text>
            </Pressable>
            </View>
            </View>

              
            </View>
  )
}

export default Profile_pic