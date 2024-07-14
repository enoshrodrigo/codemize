import React, { useState, useEffect } from "react";

import axiosInstance from "../Authentication/axiosInstance";
import {
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  Image,
  Dimensions,
  Alert,
} from "react-native";
import { io } from "socket.io-client";
import axios from "axios";
import MainHeader from "../Headers/MainHeader";
import { useNavigation } from "@react-navigation/native";
import QuestionScreen from "../componments/QuestionScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LottieView from "lottie-react-native";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const API_URL: string = process.env.EXPO_PUBLIC_API_URL || "";
const socket = io(API_URL, {
  transports: ["websocket"],
});

export default function MultipleChoices() {
  const navigation = useNavigation();
  const [selectedChoice, setSelectedChoice] = useState({
    idx: null,
    questionID: null,
    answerId: null,

  });
  const [timer, setTimer] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [Question, setQuestion] = useState([]);
  const [temp, setTemp] = useState([]);
  const [selectNumber, setSelectNumber] = useState(0);
  const [isGameOnline, setIsGameOnline] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tempTimer, setTempTimer] = useState(0);
  const [message, setMessage] = useState("Games is offline,\nplease wait...");
 
  const onLoad = async () => {
    console.log("onload", Question.length);

    await axiosInstance
      .post("/api/question/refresh")
      .then((res) => {
        setRefreshing(false);
        setIsGameOnline(res.data.isGameOnline),
          res.data.isGameOnline
            ? Question?.length <= 0
              ? //c.log(Question),
                (console.log("Question?.length"),
                setSelectNumber(0),
                setQuestion(Array(res.data.question[0])),
                setTemp(res.data.question),
                setTimer(res.data.time ? res.data.time : 0),
                setTempTimer(res.data.time ? res.data.time : 0))
              : ""
            : (setIsGameOnline(false),
              setSelectNumber(0),
              setTimer(0),
              setMessage(
                res.data.message
                  ? res.data.message
                  : "Games is offline,\nplease wait..."
              ),
              setRefreshing(false),
              setQuestion([]),
              setTemp([]));
      })
      .catch((err) => {
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
      })
      .finally(() => setRefreshing(false));
  };
  const onRefresh = async () => {
    setSelectedChoice(null);

    setRefreshing(true);
    await onLoad();
    setRefreshing(false);
  };

  // const intilizeData =async (data) => {await onLoad();}
  const intilizeData = (data) => {
    data.isGameOnline
      ? (setIsGameOnline(data.isGameOnline),
        setTemp(data.question),
        setSelectNumber(0),
        setQuestion(Array(data.question[0])),
        setTimer(data.time ? data.time : 0),
        setTempTimer(data.time ? data.time : 0),
        setDisabled(false))
      : (setIsGameOnline(false),
        setTimer(0),
        setTempTimer(0),
        setMessage(data.message ? data.message : "System Offline"),
        setQuestion([]),
        setTemp([]),
        setSelectNumber(0));
  };
  const question = (e) => {
    intilizeData(e);
  };
  useEffect(() => {
    console.log("re ren");
    onLoad();
    socket.on("connect", () => {
      console.log("Onload socket");

      onLoad();
    });
    socket.on("connect_error", (error) => Alert.alert("Error", "Socket Error"));
    socket.on("question", (e) => {
      console.log("Question socket");
      question(e);
    });
    return () => {
      console.log("re ren");
      socket.off("connect", onLoad);
      socket.off("connect_error");
      socket.off("question", question);
    };
  }, []);
  const saveQuestion = async () => {
    try {
      await axiosInstance.post("/api/question/save").then((res) => {
        console.log("saveQuestion", res.data);
      });
    } catch (error) {
      Alert.alert("Error", "Error while saving question");
    }
  };

  useEffect(() => {
    //  console.log('timer',timer)

    if (timer > 0) {
      //console.log('timer 2nd ',timer)
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else { 
     if(!(selectedChoice === null)  ){
      console.log('selectNumber question uploded',selectedChoice)
     }

      setSelectedChoice(null);
      if (selectNumber <= temp.length - 2) {
        setDisabled(false);
        setQuestion(Array(temp[selectNumber + 1]));
        setSelectNumber(selectNumber + 1);
        setTimer(tempTimer);
        console.log('selectNumber question uploded',selectedChoice)
      }
      // console.log('selectNumber',selectNumber)

      //selectNumber === temp.length ? setDisabled(true) : '';
    }
  }, [timer]);

  const handleSubmit = () => {
    if (selectedChoice !== null) {
      alert(`You selected: ${selectedChoice}`);
      setDisabled(true);
      setSelectedChoice(null);
      if (selectNumber <= temp.length - 2) {
        setDisabled(false);
        setQuestion(Array(temp[selectNumber + 1]));
        setSelectNumber(selectNumber + 1);
        setTimer(tempTimer);
      }
    }
  };

  return (
    <>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007BFF" />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              title="Reseting Selection..."
              titleColor="blue"
              tintColor="red"
              colors={["red", "blue"]}
            />
          }
        >
          {isGameOnline ? (
            <QuestionScreen
              Question={Question}
              timer={timer}
              disabled={disabled}
              setSelectedChoice={setSelectedChoice}
              handleSubmit={handleSubmit}
              selectedChoice={selectedChoice}
            />
          ) : (
            <View style={{}}>
              {
                // <Image source={{ uri: 'https://cdn.pixabay.com/animation/2022/07/29/03/42/03-42-02-615_512.gif' }}  style={styles.noGameImage} />
              }
              <LottieView
                source={require("./rocketroof.json")}
                autoPlay
                loop
                speed={1}
                style={styles.animation}
              />
              <Text style={styles.noGameText}>{message}</Text>
            </View>
          )}
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  animation: {
    alignSelf: "center",
    width: screenWidth - 0,
    height: screenWidth - 1,
  },
  noGameContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: screenWidth - 2,
    height: screenWidth - 12,
  },
  noGameImage: {
    width: screenWidth - 2,
    height: screenHeight - 2,
    resizeMode: "cover",
  },
  noGameText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "red",
    textAlign: "center",
    flexWrap: "wrap",
    alignSelf: "center",
  },
});
