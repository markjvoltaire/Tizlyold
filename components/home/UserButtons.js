import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, {useState, useEffect} from "react";
import { supabase } from "../../services/supabase";
import { useUser } from "../../context/UserContext";
import { FlatList } from "react-native-gesture-handler";
import { set } from "react-native-reanimated";

export default function UserButtons({item}) {
  const [likedPosts, setLikedPosts] = useState()
  const [loading, setLoading] = useState(true);
  const [isPressed, setIsPressed] = useState(false)
  
  const { user } = useUser();

  const creatorId = item.user_id
  const creatorUsername = item.username
  const userId = user.user_id
  const postId = item.id


  async function likePost() {
    const resp = await supabase.from("likes").insert([
      {
        creatorId: item.user_id,
        userId: user.user_id,
        userProfileImage: user.profileimage,
        postId: item.id,
        userUsername: user.username,
        creatorUsername: item.username,
        liked_Id: item.likeId
      },
    ]);
    
    return resp;
  }


  async function deletePost() {
    const resp = await supabase.from("likes").delete().eq('postId', postId)
    return resp;
  }
  
  
  
  async function getLikes() {
   
    const resp = await supabase
    .from("likes")
    .select("*")
    .eq("userId", userId)
    .eq('postId', item.id)
    .eq('liked_Id', item.likeId)
   
    return resp.body
  }

  useEffect(() => {
    const seeLikes = async () => {
     const res =  await getLikes();
     res.map((post) => setIsPressed(post.liked))
    };
    seeLikes()
  
  }, []);
  
  
  
 

  



const handlePress = () => {

  setIsPressed(current => !current)

  isPressed === true ? deletePost() : likePost() 

}

  return (
    <View style={styles.userButtonsContainer}>
      <View style={styles.likeButtonContainer}>
        <TouchableOpacity onPress={() => handlePress()}>
          <Image
            style={{
              top: 30,
              height: 32,
              aspectRatio: 1
            }}
            source={ isPressed === false ? require("../../assets/Heart.png") : require("../../assets/likedHeart.png")}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.commentButtonContainer}>
        <TouchableOpacity onPress={() => console.log(item)}>
          <Image
            style={{
              top: 30,
              height: 32,
              aspectRatio: 1,
              resizeMode: 'contain'
              
            }}
            source={require("../../assets/Chat.png")}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.saveButtonContainer}>
        <TouchableOpacity  onPress={() => console.log(isPressed)} >
          <Image
            style={{
              top: 30,
              height: 32,
              aspectRatio: 1,
              resizeMode: 'contain'
            }}
            source={require("../../assets/Bookmark.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  userButtonsContainer: {
   
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-evenly",
    paddingBottom: 20
  },
});
