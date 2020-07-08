import { FontAwesome } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function Post({ text, name, imageWidth, imageHeight, image }) {
  const [size, setSize] = useState({});

  useEffect(() => {
    if (!imageWidth)
      Image.getSize(image, (width, height) => setSize({ width, height }));
  });

  const imgW = imageWidth || size.width;
  const imgH = imageHeight || size.height;
  const aspect = imgW / imgH || 1;

  return (
    <View>
      <Header image={{ uri: image }} name={name} />
      <View style={styles.image}>
        <Image
          resizeMode="contain"
          style={{
            backgroundColor: "#D8D8D8",
            width: "100%",
            aspectRatio: aspect,
          }}
          source={{ uri: image }}
        />
      </View>
      <Metadata name={name} description={text} />
    </View>
  );
}

function Metadata({ name, description  }) {
  return (
    <View style={styles.padding}>
      <IconBar />
      <Text style={styles.text}>{name}</Text>
      <Text style={styles.subtitle}>{description}</Text>
    </View>
  );
}

function Header({ name, image }) {
  return (
    <View style={[styles.row, styles.padding]}>
      <View style={styles.row}>
        <Image style={styles.avatar} source={image} />
        <Text style={styles.text}>{name}</Text>
      </View>
      <FontAwesome
        style={{ marginRight: 8 }}
        name="ellipsis-v"
        size={26}
        color="black"
      />
    </View>
  );
}

function IconBar({ bookmarked }) {
  const bookmarkIcon = bookmarked ? "bookmark" : "bookmark-o";
  return (
    <View style={styles.row}>
      <View style={styles.row}>
        <FontAwesome
          style={{ marginRight: 8 }}
          name="heart-o"
          size={26}
          color="black"
        />
        <FontAwesome
          style={{ marginRight: 8 }}
          name="comment-o"
          size={26}
          color="black"
        />
        <FontAwesome
          style={{ marginRight: 8 }}
          name="send-o"
          size={26}
          color="black"
        />
      </View>
      <FontAwesome
        style={{ marginRight: 8 }}
        name={bookmarkIcon}
        size={26}
        color="black"
      />
    </View>
  );
}

const profileImageSize = 36;
const padding = 12;

const styles = StyleSheet.create({
  text: { fontWeight: "600" },
  subtitle: {
    opacity: 0.8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  padding: {
    padding,
  },
  avatar: {
    aspectRatio: 1,
    backgroundColor: "#D8D8D8",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#979797",
    borderRadius: profileImageSize / 2,
    width: profileImageSize,
    height: profileImageSize,
    resizeMode: "cover",
    marginRight: padding,
  },
  image: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#D8D8D8",
  },
});
