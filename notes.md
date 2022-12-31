subscribe

async function subscribeToUser() {
const resp = await Purchases.purchaseProduct(
subscriptions.identifier,
null,
Purchases.PURCHASE_TYPE.INAPP
);

    const res = await supabase.from("subscriptions").insert([
      {
        userId: supabase.auth.currentUser.id,
        creatorId: item.user_id,
        creatorProfileImage: item.profileimage,
        userProfileImage: user.profileimage,
        creatorUsername: item.username,
        userUsername: user.username,
        creatorDisplayname: item.displayName,
        userDisplayname: user.displayName,
        subscriptionName: subscriptions.identifier,
      },
    ]);

    console.log("res", res);

    return res;

}
