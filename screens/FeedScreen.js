import React, { useState, useEffect } from "react";
import { FlatList, RefreshControl } from "react-native";

import Post from "../components/Post";
import { fetchPostsFromFirebase } from "../services/FirebaseService";

export default function FeedScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState([]);

  async function fetchNewPosts() {
    setRefreshing(true);

    const data = await fetchPostsFromFirebase();
    setData(data);

    setRefreshing(false);
  }

  useEffect(() => {
    fetchNewPosts();
  }, []);

  return (
    <FlatList
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={fetchNewPosts} />
      }
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Post
          id={item.id}
          name={item.name}
          text={item.text}
          image={item.image}
        />
      )}
      onEndReached={() => fetchNewPosts()}
      onEndReachedThreshold={0.2}
    />
  );
}
