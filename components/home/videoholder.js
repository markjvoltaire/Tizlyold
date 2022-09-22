if (item.mediaType === "video") {
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      async function getAllLikes() {
        const userId = supabase.auth.currentUser.id;
        const res = await supabase
          .from("likes")
          .select("*")
          .eq("userId", userId)
          .eq("postId", item.id)
          .eq("liked_Id", item.likeId);

        res.body.map((like) => setIsPressed(like.liked));

        return res.body;
      }
      getAllLikes();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={{ paddingBottom: 40 }}>
      <View
        style={{
          alignSelf: "center",
          paddingBottom: 25,
          left: 25,
          bottom: 10,
        }}
      >
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ProfileDetail2", {
              user_id: item.user_id,
              bannerImage: item.bannerImage,
              username: item.username,
              displayName: item.displayName,
              profileimage: item.profileimage,
              bio: item.bio,
            })
          }
        >
          <Image
            style={{
              height: 40,
              width: 40,
              borderRadius: 100,
              right: 55,
              top: 37,
            }}
            source={{ uri: item.profileimage }}
          />
          <Text
            style={{
              right: 6,
              fontWeight: "600",
              fontSize: 16,
            }}
          >
            {item.displayName}
          </Text>
          <Text
            style={{
              fontWeight: "500",
              fontSize: 12,
              color: "#73738B",
              right: 5,
            }}
          >
            @{item.username}
          </Text>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Player", {
              id: item.id,
              username: item.username,
              profileimage: item.profileimage,
              displayName: item.displayName,
              user_id: item.user_id,
            })
          }
        >
          <Video
            source={{ uri: item.media }}
            ref={video}
            style={{
              height: 220,
              width: 388,
              borderRadius: 12,
              alignSelf: "center",
            }}
            resizeMode="cover"
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          />

          <Image
            style={{
              alignSelf: "center",
              resizeMode: "stretch",
              height: 100,
              width: 388,
              top: 120,
              borderRadius: 12,
              position: "absolute",
            }}
            source={require("../../assets/fader.png")}
          />

          <Text style={{ position: "absolute", top: 260 }}>
            {item.description}
          </Text>
          <Image
            style={{
              position: "absolute",
              width: 50,
              top: 75,
              alignSelf: "center",
              resizeMode: "contain",
            }}
            source={require("../../assets/playButton.png")}
          />
        </TouchableOpacity>
      </View>

      <View>
        <View style={{ top: 10 }}>
          <Text
            style={{
              left: 7,
              fontWeight: "500",
              fontSize: 16,
              textAlign: "left",
              color: "white",
              bottom: 45,
              left: 20,
            }}
          >
            {item.title}
          </Text>
        </View>
      </View>
      <View style={{ top: 20, paddingBottom: 20 }}>
        <UserButtons
          isPressed={isPressed}
          setIsPressed={setIsPressed}
          item={item}
          saveIsPressed={saveIsPressed}
          setSaveIsPressed={setSaveIsPressed}
        />
      </View>
      <FullSeperator />
    </View>
  );
}
