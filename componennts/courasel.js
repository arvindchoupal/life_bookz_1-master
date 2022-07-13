import React,{useRef,useState} from 'react'
import {Text,View,ImageBackground,FlatList,Dimensions,Image,StatusBar,Pressable} from  'react-native'
import LottieView from 'lottie-react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Signup from '../screens/signup';

const {height,width} = Dimensions.get('screen') 
const CoursellImage = ()=>{
  const flat = useRef()
  const [position,setposition] = useState(0)
  const data = [
    {
  'bgimage':'https://i.pinimg.com/736x/2b/eb/ba/2bebba92ec9c00c0d5bdbf0357b4f402.jpg',
'title':'Feel alone in your life',
'subtitle':'',
'id': 1
  },
  {
    'bgimage':'https://i.pinimg.com/originals/44/c1/b2/44c1b27adffcd3199765786372a99a5c.jpg',
  'title':'Try us to find your choice',
  'subtitle':'',
  'id': 2
    },
    {
      'bgimage':'https://wallpaperaccess.com/full/2806355.jpg',
    'title':'',
    'subtitle':'',
    'id': 3
      }
    ]

  
return (
<View style={{width:width,backgroundColor:'black'}}>
<StatusBar   backgroundColor={'#4334eb'}/>
    <View style={{width:width}}>
  <FlatList
  data={data}
  ref={flat}
  showsHorizontalScrollIndicator={false}
  horizontal
  onScroll={(item)=>{

var posit = item.nativeEvent.contentOffset.x
setposition( parseInt(parseInt(posit)/parseInt(width) ))

 
  }}
  pagingEnabled
  renderItem={({item,index})=>{
    
    return(
       <>
       { index === 0 ?
        <View style={{height,width,backgroundColor:'#4334eb'}}>


          <View style={{justifyContent:'flex-end',alignItems:"center",height:height*.1,width}}>
            <View style={{backgroundColor:'white',borderRadius:10,padding:10,alignItems:'center',justifyContent:'center'}}>
            <Text style={{fontSize:20,color:'#4334eb',fontWeight:'600'}}>
              LIFEBOOKZ
            </Text>
            </View>
         </View>

          <View style={{alignItems:'center'}}>
          <LottieView
          style={{height:height*.6,width:width,alignItems:'flex-start',justifyContent:'flex-start',backgroundColor:'#4334eb'}}
        source={require('../files/15157-couple-bear-valentine.json')}
        resizeMode={'cover'}
        autoPlay
        loop
      />
      <View style={{height:height*.05,width,alignItems:'center'}}>
      <Text style={{color:'white',fontSize:18}}>
        The Story Of LifeBookz
      </Text>
      </View>
      <Pressable onPress={()=>{
        flat.current.scrollToIndex({index:1})
      }} style={{marginTop:height*.05,width:width*.4,alignItems:'center'}}>
      
      <Ionicons name={'ios-arrow-forward-circle-sharp'} size={50} color={'white'}/>
      </Pressable>
      </View>
        



        </View> :  index == 1 ? 

<View style={{height,width,backgroundColor:'#4334eb'}}>


<View style={{justifyContent:'flex-end',alignItems:"center",height:height*.1,width}}>
            <View style={{backgroundColor:'white',borderRadius:10,padding:10,alignItems:'center',justifyContent:'center'}}>
            <Text style={{fontSize:20,color:'black'}}>
              LIFEBOOKZ
            </Text>
            </View>
         </View>
   
   
<View style={{height:height*.65,width}} >


    <View style={{flexDirection:'row',alignItems:'center',margin:15}}>
       <View style={{height:7, width: 7, backgroundColor: 'white', borderRadius: 20,marginRight:10}} />
  <Text style={{color:'white',fontSize:18}}>
  World's first library of human life
  </Text>
  </View>  

  <View style={{flexDirection:'row',marginLeft:15,paddingRight:width*.05}}>
       <View style={{height:7,marginTop:10, width: 7, backgroundColor: 'white', borderRadius: 20,marginRight:10}} />
  <Text style={{color:'white',fontSize:18}}>
  Everybody has their own unique amazing story of life
  </Text>
  </View>  

  <View style={{flexDirection:'row',alignItems:'center',marginLeft:15,paddingRight:width*.05,marginTop:15}}>
       <View style={{height:7, width: 7, backgroundColor: 'white', borderRadius: 20,marginRight:10}} />
  <Text style={{color:'white',fontSize:18}}>
  Share your own story of life
  </Text>
  </View>  

  <View style={{flexDirection:'row',marginLeft:15,paddingRight:width*.05,marginTop:15,paddingRight:width*.08}}>
       <View style={{height:7,marginTop:10, width: 7, backgroundColor: 'white', borderRadius: 20,marginRight:10}} />
  <Text style={{color:'white',fontSize:18}}>
  One day you will not be here but your work & story of life keep you alive forever
  </Text>
  </View>  

  <View style={{flexDirection:'row',marginLeft:15,paddingRight:width*.05,marginTop:15,paddingRight:width*.08}}>
       <View style={{height:7,marginTop:10, width: 7, backgroundColor: 'white', borderRadius: 20,marginRight:10}} />
  <Text style={{color:'white',fontSize:18}}>
  Share your experience of life and help other to know
  </Text>
  </View>  

  <View style={{flexDirection:'row',marginLeft:15,paddingRight:width*.05,marginTop:15,paddingRight:width*.08}}>
       <View style={{height:7,marginTop:10, width: 7, backgroundColor: 'white', borderRadius: 20,marginRight:10}} />
  <Text style={{color:'white',fontSize:18}}>
  Share your life lesson,difficulties and how you solved them
  </Text>
  </View>  

 

  <View style={{flexDirection:'row',marginLeft:15,paddingRight:width*.05,marginTop:15,paddingRight:width*.08}}>
       <View style={{height:7,marginTop:10, width: 7, backgroundColor: 'white', borderRadius: 20,marginRight:10}} />
  <Text style={{color:'white',fontSize:18}}>
 you can write your daily life happinings as a diary and preplan your upcoming days and track your progress
  </Text>
  </View> 

  <View style={{flexDirection:'row',marginLeft:15,paddingRight:width*.05,marginTop:15,paddingRight:width*.08}}>
       <View style={{height:7,marginTop:10, width: 7, backgroundColor: 'white', borderRadius: 20,marginRight:10}} />
  <Text style={{color:'white',fontSize:18}}>
 You can message, follow and build community of like minded people  
  </Text>
  </View>

  <View style={{flexDirection:'row',marginLeft:15,paddingRight:width*.05,marginTop:15,paddingRight:width*.08}}>
       <View style={{height:7,marginTop:10, width: 7, backgroundColor: 'white', borderRadius: 20,marginRight:10}} />
  <Text style={{color:'white',fontSize:18}}>
You can serve or hire a mentor of your choice for life
  </Text>
  </View> 


  </View>

  <Pressable onPress={()=>{
        flat.current.scrollToIndex({index:2})
      }} style={{marginTop:height*.05,width,alignItems:'center'}}>
      
      <Ionicons name={'ios-arrow-forward-circle-sharp'} size={50} color={'white'}/>
      </Pressable>

</View> 
:
<View style={{height,width,backgroundColor:'#c3b3f2'}}> 
   
<Signup/>




</View> 





       }
       
       
       </>

    )
  }}
  keyExtractor={item=>item.id}
  />
  </View>

  <View style={{height:50,width,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
  {data.map((ite,i)=>{
  
  
 
    return(
      <View key={i} style={{backgroundColor:position==i?'white':'grey',height:8,width:8,borderRadius:15,margin:6}}/>
  )})}
  </View>
  </View>


)
}

export default CoursellImage