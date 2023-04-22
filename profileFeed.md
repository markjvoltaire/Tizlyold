// <View style={{ bottom: height * 0.11, marginBottom: height * 0.6 }}>
{freePosts.map((item) => {
if (item.mediaType === "status") {
return (
<>
<View
key={item.id}
style={{
                  flexDirection: "column",
                  alignItems: "center",
                  padding: 10,
                  paddingBottom: 68,
                }} >
<View style={styles.userContainer}>
<Image
source={{ uri: profile.profileimage }}
style={styles.profileImage}
/>
<View style={styles.userTextContainer}>
<Text style={styles.name}>{item.displayName}</Text>
<Text style={styles.username}>@{item.username}</Text>
</View>
</View>
<View style={styles.textContainer}>
<Text style={styles.tweet}>{item.description}</Text>
</View>
</View>

              <View style={{ bottom: height * 0.072 }}>
                <UserButtons navigation={navigation} item={item} />
                <FullSeperator />
              </View>
            </>
          );
        }

        if (item.mediaType === "image") {
          return (
            <>
              <View
                key={item.id}
                style={{ alignSelf: "center", bottom: height * 0.01 }}
              >
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                  <Image
                    style={{
                      height: height * 0.45,
                      width: width * 0.995,
                      borderRadius: 18,
                    }}
                    source={{ uri: item.media }}
                  />
                  <Image
                    style={{
                      height: height * 0.45,
                      width: width * 0.995,
                      borderRadius: 18,
                      position: "absolute",
                    }}
                    source={require("../../assets/fader.png")}
                  />
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 10,
                    paddingBottom: 15,
                    position: "absolute",
                    top: height * 0.4,
                    left: width * 0.032,
                  }}
                >
                  <Image
                    source={{ uri: profile.profileimage }}
                    style={styles.profileImage}
                  />
                  <View style={styles.userTextContainer}>
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 12,
                        color: "white",
                      }}
                    >
                      {item.displayName}
                    </Text>
                    <Text style={styles.username}>@{item.username}</Text>
                  </View>
                </View>
                <Text
                  style={{
                    fontWeight: "600",
                    fontSize: 14,
                    lineHeight: 22,
                    paddingBottom: 10,
                    left: 10,
                    top: 5,
                  }}
                >
                  {item.description}
                </Text>
              </View>
              <View style={{ bottom: height * 0.012, paddingBottom: 30 }}>
                <UserButtons navigation={navigation} item={item} />
                <FullSeperator />
                <Modal
                  animationType="slide"
                  presentationStyle="fullScreen"
                  visible={modalVisible}
                  onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                  }}
                >
                  <TouchableOpacity
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={{ top: 100 }}>Close</Text>
                  </TouchableOpacity>
                  <Image
                    style={{
                      height: 300,
                      width: width,
                      alignSelf: "center",
                      top: height * 0.3,
                    }}
                    source={{ uri: item.media }}
                  />
                </Modal>
              </View>
            </>
          );
        }

        if (item.mediaType === "video") {
          return (
            <>
              <View
                key={item.id}
                style={{ alignSelf: "center", bottom: height * 0.01 }}
              >
                <TouchableOpacity
                  onPress={async () => {
                    await video?.current?.playAsync();
                    video?.current?.presentFullscreenPlayer();
                  }}
                >
                  <Video
                    ref={video}
                    resizeMode="cover"
                    isLooping
                    isMuted
                    style={{
                      height: height * 0.45,
                      width: width * 0.995,
                      borderRadius: 18,
                    }}
                    source={{ uri: item.media }}
                  />
                  <Image
                    style={{
                      height: height * 0.45,
                      width: width * 0.995,
                      borderRadius: 18,
                      position: "absolute",
                    }}
                    source={require("../../assets/fader.png")}
                  />
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 10,
                    paddingBottom: 15,
                    position: "absolute",
                    top: height * 0.4,
                    left: width * 0.032,
                  }}
                >
                  <Image
                    source={{ uri: profile.profileimage }}
                    style={styles.profileImage}
                  />
                  <View style={styles.userTextContainer}>
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 12,
                        color: "white",
                      }}
                    >
                      {item.displayName}
                    </Text>
                    <Text style={styles.username}>@{item.username}</Text>
                  </View>
                </View>
                <Text
                  style={{
                    fontWeight: "600",
                    fontSize: 14,
                    lineHeight: 22,
                    paddingBottom: 10,
                    left: 10,
                    top: 5,
                  }}
                >
                  {item.description}
                </Text>
              </View>
              <View style={{ bottom: height * 0.012, paddingBottom: 30 }}>
                <UserButtons navigation={navigation} item={item} />
                <FullSeperator />
              </View>
            </>
          );
        }
      })}
    </View>
