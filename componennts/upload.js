import { View, Text } from 'react-native'
import React from 'react'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
const upload = async (set_image_uri) => {
    const result = await launchImageLibrary()
    
    set_image_uri(result.assets[0].uri)
    
  return (
    <View>
      <Text>upload</Text>
    </View>
  )
}

export default upload