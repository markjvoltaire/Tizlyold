import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, {useState, useEffect} from "react";
import { supabase } from "../../services/supabase";
import { useUser } from "../../context/UserContext";
import { FlatList } from "react-native-gesture-handler";

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
        creatorId: creatorId,
        userId: userId,
        userProfileImage: user.profileimage,
        postId: postId,
        userUsername: user.username,
        creatorUsername: creatorUsername
      },
    ]);
    
    return resp;
  }


  async function deletePost() {
    const resp = await supabase.from("likes").delete().eq('postId', item.id)
    
    return resp;
  }
  
  
  
  async function getLikes() {
    const userId = supabase.auth.currentUser.id;
    const resp = await supabase
    .from("likes")
    .select("*")
    .eq("userId", userId)
   

  
    
    return resp.body
    
    
  }
  useEffect(() => {
    const seeLikes = async () => {
     const res =  await getLikes();
     
      setLikedPosts(res)
      
    };
    seeLikes()
  }, []);
  
  


  

console.log('isPressed', isPressed)

const handlePress = () => {
  setIsPressed(current => !current)

  isPressed === false ? likePost() : deletePost()
 
 
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
        <TouchableOpacity onPress={() => getLikes()}>
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
        <TouchableOpacity  onPress={() => console.log(item)} >
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
