import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import UserButtons from './UserButtons'
import { Video, AVPlaybackStatus } from "expo-av";

export default function HomeFeedList({item}) {
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});

 if (item.mediaType === 'image') {
   return (
    <View style={{paddingBottom: 20}}>
    <TouchableOpacity>
        <View style={{ alignSelf: 'center' , paddingBottom: 25, left: 25}}>
            <Image style={{height: 40, width: 40, borderRadius: 100, right: 55, top: 37}}
             source={{uri: item.profileimage}}
             />
             <Text style={{right: 6, fontWeight: '600', fontSize: 16}}>{item.displayName}</Text>
             <Text style={{fontWeight: "500",fontSize: 12, color: "#73738B", right: 5}} >@{item.username}</Text> 
        </View>
    </TouchableOpacity>
            <Image style={{ height: 398,  aspectRatio: 1, alignSelf: 'center', borderRadius: 10,}} 
            source={{uri: item.media}}/>
            <View style={{top: 10}}>
                <Text style={{left: 7, }}>{item.title}</Text>
                <Text  style={{left: 7, top: 10}}>{item.description}</Text>
                <Image
                          style={{
                            top: 3,
                            left: 4,
                            height: 54,
                            width: 64,
                            resizeMode: "contain",
                          }}
                          source={require("../../assets/bluePhotoButton.png")}
                        />
            </View>
            <View>
                <UserButtons item={item} />
            </View>
    </View>
   )
 }



 if (item.mediaType === 'video') {
    return (
        <View style={{paddingBottom: 20}}>
        <TouchableOpacity>
            <View style={{ alignSelf: 'center' , paddingBottom: 25, left: 25}}>
                <Image style={{height: 40, width: 40, borderRadius: 100, right: 55, top: 37}}
                 source={{uri: item.profileimage}}
                 />
                 <Text style={{right: 6, fontWeight: '600', fontSize: 16}}>{item.displayName}</Text>
                 <Text style={{fontWeight: "500",fontSize: 12, color: "#73738B", right: 5}} >@{item.username}</Text> 
            </View>
        </TouchableOpacity>
        <View>
        <Video 
              source={{ uri: item.media }}
              ref={video}
              style={{
              height: 220,
              width: 388,
              borderRadius: 12,
              alignSelf: "center",
              }}
              resizeMode="contain"
              onPlaybackStatusUpdate={(status) => setStatus(() => status)} />
        </View>
        <View>
        <View style={{top: 10}}>
                <Text style={{left: 7, }}>{item.title}</Text>
                <Text  style={{left: 7, top: 10}}>{item.description}</Text>
                <Image
                          style={{
                            top: 3,
                            left: 4,
                            height: 54,
                            width: 64,
                            resizeMode: "contain",
                          }}
                          source={require("../../assets/blueVideoButton.png")}
                        />
            </View>
        </View>
        <UserButtons item={item}/>
        </View>
    )
  }

  
   if (item.mediaType === 'text') {

       return (
         <View style={{paddingBottom: 20}}>
         <TouchableOpacity>
             <View style={{ alignSelf: 'center' , paddingBottom: 25, left: 25}}>
                 <Image style={{height: 40, width: 40, borderRadius: 100, right: 55, top: 37}}
                  source={{uri: item.profileimage}}
                  />
                  <Text style={{right: 6, fontWeight: '600', fontSize: 16}}>{item.displayName}</Text>
                  <Text style={{fontWeight: "500",fontSize: 12, color: "#73738B", right: 5}} >@{item.username}</Text> 
             </View>
         </TouchableOpacity>
             <View style={{alignSelf: 'center'}}>
                 <Text style={{textAlign: 'left',  fontSize: 16, lineHeight: 27, fontWeight: '700'}}>{item.description}</Text>
                 <Image
                          style={{
                            top: 3,
                            left: 4,
                            height: 54,
                            width: 64,
                            resizeMode: "contain",
                          }}
                          source={require("../../assets/textButton.png")}
                        />
              </View>
             <UserButtons item={item} />
         </View>
       )
   }
}

const styles = StyleSheet.create({})