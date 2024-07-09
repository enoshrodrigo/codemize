import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Button,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function BuzzerScreen() {
  

  return (
    <View style={styles.container}> 


      <View style={styles.questionContainer}>
        
       
        
        <Text style={styles.question}  >
          {'item.question'}
        </Text>
   
       </View>

      <Text style={[styles.timer,
        {color: 2 <= 5 ? "red" : "black"}
        ,
        {fontWeight: 2 <= 5 ? "bold" : "bold",
        fontSize: 2 <= 5 ? 20 : 19,
         }
        ]}>
        
        Time remaining: {2}s
        </Text>
       
      <View
        style={{
          backgroundColor: "transparent",
          width: screenWidth - 22,
          borderColor: "#ccc",
          borderWidth: 1,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84, 

   elevation: 5,
          borderRadius: 8,
          padding: 0,
          marginBottom: 20,
          alignItems: "center",overflow: "hidden"
        }}
      >
       
          <React.Fragment  >
          <LottieView
        source={require('../MainPages/rocket.json')}
        autoPlay
        loop
        speed={1} 
        
        
         style={{
                width: "100%",
                height: 230,
                margin: 0,
                borderRadius: 8,
                alignSelf: "center",
                
              }} 
      />
            
          </React.Fragment>
       
      </View>

      <View style={styles.choicesContainer}>
 

      </View>
      <View style={styles.footer}>
        
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
  },
  questionContainer: 
  {
    flexDirection: 'row',
    justifyContent: 'center' ,
    borderColor: "#ccc",
    borderWidth:0.3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0.5,
      
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 8,
    padding: 0,
    width: screenWidth-14 ,
    marginBottom: 20, 
    backgroundColor:'#f0f8ff',
  },
  question: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
    marginTop: 20,
    borderRadius: 12,
    
    textTransform: "uppercase",
  },
  choicesContainer: {
    width: "100%",
    marginBottom: 0,
  },
  choice: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 0,
    marginBottom: 0,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  choiceText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
    flexWrap: "wrap", // Ensures text wraps within the box
    flexShrink: 1, // Ensures text shrinks to fit
  },
  footer: {
    alignItems: "center",
  },
  timer: {
    fontSize: 18,
    marginBottom: 14,
    alignSelf: "center",
    fontWeight: "bold",
  },
});
