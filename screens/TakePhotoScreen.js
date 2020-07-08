import React, { useEffect, useState, useRef } from "react";
import { View, Text } from "react-native";
import { Camera } from "expo-camera";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function TakePhotoScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(false);
  const camera = useRef();

  useEffect(() => {
    async function requestPermission() {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    }
    requestPermission();
  }, []);

  if (hasPermission === null || hasPermission === false)
    return <Text>Sem acesso à câmera</Text>;

  async function takePhoto() {
    if (camera.current) {
      const photo = await camera.current.takePictureAsync();
      camera.current.flip;
      navigation.navigate("NewPost", { image: photo.uri });
    }
  }

  const [type, setType] = useState(Camera.Constants.Type.front);

  function flipCamera() {
    if (type == Camera.Constants.Type.front)
      setType(Camera.Constants.Type.back);
    else setType(Camera.Constants.Type.front);
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera type={type} ref={camera} style={{ flex: 1 }}></Camera>
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={takePhoto}>
          <View
            style={{
              height: 100,
              width: 100,
              borderRadius: 50,
              borderWidth: 10,
              borderColor: "grey",
            }}
          ></View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
