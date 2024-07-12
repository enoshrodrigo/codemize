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

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function QuestionScreen({
  Question,
  selectedChoice,
  setSelectedChoice,
  disabled,
  handleSubmit,
  timer,
}) {
  

  return (
    <View style={styles.container}> 


      <View style={styles.questionContainer}>
        
      {Question?.map((item, index) => (
        
        <Text style={styles.question} key={index}>
          {item.question}
        </Text>
      ))}
       </View>

      <Text style={[styles.timer,
        {color: timer <= 5 ? "red" : "black"}
        ,
        {fontWeight: timer <= 5 ? "bold" : "bold",
        fontSize: timer <= 5 ? 20 : 19,
         }
        ]}>
        
        Time remaining: {timer}s
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
        {Question && Question?.map((item, index) => (
          <React.Fragment key={index}>
            <Image
              source={{ uri: item.image }}

              style={{
                width: "100%",
                height: 230,
                margin: 0,
                borderRadius: 8,
                alignSelf: "center",
                
              }} 
              onLoadStart={() =>  <ActivityIndicator size="large" color="#0000ff" />}
              onLoadEnd={() => <ActivityIndicator size="large" color="#0000ff" />}
            />
          </React.Fragment>
        ))}
      </View>

      <View style={styles.choicesContainer}>

        {Question && Question.map((choice, index) =>
          choice.answer.map((answer, idx) => (
            <TouchableOpacity
            key={idx}
            style={[
              styles.choice,
                {
                  backgroundColor:
                   selectedChoice?.answerId === answer.answerId ? "#add8e6" : "#fff",
                },
                disabled && { backgroundColor: "#d3d3d3" },
              ]}
              onPress={() => setSelectedChoice({
                idx:idx,
                questionID: choice.id,
                answerId: answer.answerId,
              })}
              disabled={disabled}
            >
              <Ionicons name="book" size={24} color="purple" />
              <Text style={styles.choiceText}>{answer.option}</Text>
            </TouchableOpacity>
          ))
        )}

      </View>
      <View style={styles.footer}>
        
        <Pressable
          style={{
            marginBottom: 12, 
            borderRadius: 12,
            padding: 8,  
            backgroundColor: "#4682b4",   
          }}
          disabled={disabled}
           onPress={handleSubmit}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "white",
              backgroundColor: "#4682b4",
              padding: 10,
              borderRadius: 12,
              width: 80,
              textAlign: "center",
            }}
          >
            Submit
          </Text>
          
        </Pressable>
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
    marginBottom: 20,
  },
  choice: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 10,
    marginBottom: 18,
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
