import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Button,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import {
  Ionicons,
  AntDesign,
  MaterialCommunityIcons,
  FontAwesome6,
} from "@expo/vector-icons";

export default function MainHeader({ navigation, title}:{navigation:any,  title:any}) {
  console.log(navigation);
  return (
    <SafeAreaView style={{ backgroundColor: "purple", }}>
      <View
        style={{
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 8,
          backgroundColor:  "purple",
          flexDirection: "row",
          marginTop: 4,
          justifyContent: "space-between",
          borderColor: "purple",
           alignSelf: "center",
          
           shadowColor: "purple",
           
          shadowOffset: {
            width: 0,
            height: 1.2,
            
          },
          shadowOpacity: 0.58,
          shadowRadius: 16.0,
          elevation: 24,




          
        }}
      >
        <View
          style={{
            backgroundColor: "transparent",
            flexDirection: "row",
            marginTop: 0,
            marginLeft: 0,
            justifyContent: "flex-start",
            width: "30%",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "transparent",
              flexDirection: "row",
              borderRadius: 14,
              alignItems: "center",
              padding: 2,
               
              gap: 10,
              marginLeft: 0,
            }}
          >
            <MaterialCommunityIcons
              name="lightbulb-on"
              size={38}
              color="orange"
            />
            <Text
              style={{ fontSize: 22, fontWeight: "bold", textAlign: "center" }}
            >
              12
            </Text>
          </View>
        </View>

        <View
          style={{
            backgroundColor: "transparent",
            flexDirection: "row",
            marginTop: 0,
            marginLeft: 0,
            justifyContent: "center",
            width: "30%",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "lightblue",
              flexDirection: "row",
              borderRadius: 14,
              justifyContent: "center",
              padding: 2,
              width: "80%",
              gap: 6,
              marginRight: 0,
            }}
          >
            <Text
              style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}
            >
              12
            </Text>
            <Text
              style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}
            >
              /
            </Text>

            <Text
              style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}
            >
              25
            </Text>
          </View>
        </View>

        <View
          style={{
            backgroundColor: "transparent",
            flexDirection: "row",
            marginTop: 0,
            marginLeft: 0,
            justifyContent: "flex-end",
            width: "30%",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "transparent",
              flexDirection: "row",
              borderRadius: 14,
              justifyContent: "center",
              padding: 2,
              
              gap: 0,
              marginRight: 0,
            }}
          >
            <FontAwesome6 name="ranking-star" size={34} color="lightblue" />
            <Text
              style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}
            >
              12
            </Text>
            
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
