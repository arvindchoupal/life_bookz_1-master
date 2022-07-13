
import React,{useState,createContext,useEffect} from 'react'
import {Text,View,StyleSheet,Dimensions,Image,ImageBackground,Pressable} from 'react-native'
import logo from '../Images/logo.png'
import welcome from '../Images/welcome.jpg'
import { GoogleSignin ,statusCodes} from '@react-native-google-signin/google-signin';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';


GoogleSignin.configure({
  webClientId: '986764909617-uodmk6b6l03rkhaaq1rfnvuvfau60p98.apps.googleusercontent.com',
});


const {height,width} = Dimensions.get('screen')






const Signup = ()=>{
const navigation = useNavigation()

function onAuthStateChanged(us) {
  console.log('auth_change')
 console.log(us)
 console.log('auth_change1')
}

useEffect(() => {
  const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

  return subscriber; // unsubscribe on unmount
}, []);

const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem('@storage_Key', jsonValue)
   await  navigation.navigate('signinScreens',{
      'user' :value
    }
    
    )
  }catch (e) {
    // saving error
  }
}
  const signIn = async () => {
        try {
         console.log('auth option')
          await GoogleSignin.hasPlayServices();
          const {idToken,user}= await GoogleSignin.signIn();
          const googleCredential = auth.GoogleAuthProvider.credential(idToken);
          await auth().signInWithCredential(googleCredential);
          if (user.photo){
            firestore()
            .collection('Users')
            .doc(user.id)
            .set(user)
            .then(() => {
            console.log(user);
          
      });
    
      storeData(user)
               
           } else {
             navigation.navigate('upload_image',{
               'user' :user
             })
           }
       
          } catch (error) {
            console.log('google err')
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
            console.log('user cncld')
            console.log(error)
          } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (e.g. sign in) is in progress already
            console.log('google processing')
            console.log(error)
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
            console.log('google play service err')
            console.log(error)
          } else {
            // some other error happened
            console.log(error)
          }
        }
      };
    

    
    return(
     
    <View style={{height,backgroundColor:'#4334eb',width,paddingHorizontal:20}}>
       
        <LottieView
          style={{height:height*.4,justifyContent:'center',backgroundColor:'#4334eb',alignItems:'center'}}
        source={require('../files/104287-community-manager.json')}
        resizeMode={'cover'}
        autoPlay
        loop
        />

       <View style={{paddingHorizontal:20,marginTop:25}}>

           <Text style={{color:"white",fontSize:35,fontWeight:'600'}} >
                  Welcome

           </Text>

           <Text style={{color:"white",fontSize:18,fontWeight:'400',marginTop:10}} >
                  Go ahead and join our community

           </Text>

           <Text style={{color:"white",fontSize:20,fontWeight:'900',marginTop:10}} >
                  To Create your own story

           </Text>


           <Pressable onPress={signIn} style={{backgroundColor:'white',borderRadius:15,padding:13,alignItems:'center',marginTop:height*.06}}>
             <Text style={{color:'#4334eb',fontSize:16,fontWeight:'600'}}>
               Signup With Google
             </Text>
           </Pressable>

           <Pressable  style={{backgroundColor:'#4334eb',borderRadius:15,padding:13,alignItems:'center',marginTop:height*.02,borderWidth:2,borderColor:'white'}}>
             <Text style={{color:'white',fontSize:16,fontWeight:'600',}}>
               Signup With Mobile
             </Text>
           </Pressable>


           <View style={{marginTop:height*.1,alignItems:'center'}}>
             <Text style={{color:'white',fontWeight:'400'}}>
               By signup you are agree to our 
             </Text>

             <Text style={{color:'white'}}>
               Term & Condition, Privacy & Policy
             </Text>
           </View>
        </View>



    </View>

   
    )}
export default Signup
