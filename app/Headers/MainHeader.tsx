import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Button,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import {
  Ionicons,
  AntDesign,
  MaterialCommunityIcons,
  FontAwesome6,
} from "@expo/vector-icons";

export default function MainHeader() {
  return (
    <SafeAreaView style={{ backgroundColor: "purple", }}>
      <View
        style={{
          backgroundColor:  "purple",
          flexDirection: "row",
          marginTop: 4,
          justifyContent: "space-between",
          borderColor: "purple",
          
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
              width: "80%",
              gap: 3,
              marginLeft: 4,
            }}
          >
            <MaterialCommunityIcons
              name="lightbulb-on"
              size={48}
              color="orange"
            />
            <Text
              style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}
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
              gap: 3,
              marginRight: 4,
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
              width: "80%",
              gap: 3,
              marginRight: 4,
            }}
          >
            <FontAwesome6 name="ranking-star" size={40} color="lightblue" />
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
