import { View, Text,Share } from 'react-native'
import React from 'react'


    const OnShare = async ({story,image,lesson,problems}) => {
        console.log('share')
        try {
          const result = await Share.share( lesson ? {
            message: story   +'Lesson : ' + lesson +  'Problems: ' + problems+ 'Image: ' +image
             
          }:image ? { message: story + '  ' + 'image' + image }: { message: story });
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error) {
          alert(error.message);
        }
      };
 
export default OnShare