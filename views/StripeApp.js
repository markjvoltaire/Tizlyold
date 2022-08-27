useEffect(() => {
  const unsubscribe = navigation.addListener("focus", () => {
    async function updateFeed() {
      const resp = await getFollowing();
      const list = resp.map((i) => i.followingId);
      setFollow(list);
    }
    updateFeed();
  });

  return unsubscribe;
}, [navigation]);

async function getUserById() {
  const userId = supabase.auth.currentUser.id;

  const resp = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", userId)
    .single();
  setUser(resp.body);
}

useEffect(() => {
  const getUserProfile = async () => {
    await getUserById();
    setLoading(false);
  };
  getUserProfile();
}, []);

async function getFollowing() {
  const userId = supabase.auth.currentUser.id;
  const resp = await supabase
    .from("following")
    .select(" creatorId, followingId,creatorUsername")
    .eq("following", true)
    .eq("userId", userId);

  return resp.body;
}

useEffect(() => {
  const getFollowingList = async () => {
    const resp = await getFollowing();
    console.log("resp FROM USEEFFECT ", resp);
    const list = resp.map((i) => i.followingId);
    setFollow(list);
  };
  getFollowingList();
}, []);

useEffect(() => {
  const getUserPost = async () => {
    const resp = await getPosts();
    setPostList(resp);
  };
  getUserPost();
}, []);

const refreshFeed = async () => {
  getPosts();
};

if (loading) {
  return <Text> Please Wait</Text>;
}

console.log("follow at the end", follow);

async function getPosts() {
  const userId = supabase.auth.currentUser.id;
  const resp = await supabase
    .from("post")
    .select("*")
    .in("followingId", [follow, userId]);

  console.log("Follow FROM FUNCTION", follow);
  console.log("userId FROM FUNCTION", userId);

  return resp.body;
}
