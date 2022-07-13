import React,{useRef,useState} from 'react'
import {Text,View,ImageBackground,FlatList,Dimensions,Image,StatusBar} from  'react-native'


const {height,width} = Dimensions.get('screen') 
const Home_banner = ()=>{
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
<View style={{backgroundColor:'black'}}>

    <View >
  <FlatList
  data={data}
  ref={flat}
  showsHorizontalScrollIndicator={false}
  horizontal
  onScroll={(item)=>{

var posit = item.nativeEvent.contentOffset.x
setposition( parseInt(parseInt(posit)/parseInt(width*.85) ))


  }}
  pagingEnabled
  renderItem={({item})=>{
    

    return(
    <ImageBackground  source={  {uri:item.bgimage}} style={{ overflow:'hidden',width:width*.89, height:height*.25,justifyContent:'flex-end',}} >

<View style={{height:50,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
  {data.map((ite,i)=>{
  

 
    return(
      <View key={i} style={{backgroundColor:position==i?'white':'grey',height:8,width:8,borderRadius:15,margin:6}}/>
  )})}
  </View>
     
  

  </ImageBackground>)
  }}
  keyExtractor={item=>item.id}
  />
  </View>

  
  </View>


)
}

export default Home_banner