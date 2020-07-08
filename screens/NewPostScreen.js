import React, { useState } from "react";
import { Image, TextInput, View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
export default function NewPostScreen({ navigation, route }) {
  const [description, setDescription] = useState("");
  const image = route.params.image;
  function uploadPhoto() {
    uploadPhotoToFirebase(image, description);
  }

  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={{ uri: null }}
        style={{
          resizeMode: "contain",
          backgroundColor: "gray",
          aspectRatio: 1,
          width: 72,
        }}
      />
      <TextInput
        style={{
          paddingHorizontal: 16,
          flex: 1,
        }}
        placeholder="Adicione uma descrição"
        onChangeText={(text) => {
          setDescription(text);
        }}
      />
      <TouchableOpacity style={{ marginRight: 16 }} onPress={uploadPhoto}>
        <Text>Compartilhar</Text>
      </TouchableOpacity>
    </View>
  );
}
