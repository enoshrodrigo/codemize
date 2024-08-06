import React, { useState, useEffect } from "react";
import axiosInstance from "../Authentication/axiosInstance";
import {
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import { io } from "socket.io-client";
import MainHeader from "../Headers/MainHeader";
import { useNavigation } from "@react-navigation/native";
import QuestionScreen from "../componments/QuestionScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LottieView from "lottie-react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const API_URL = process.env.EXPO_PUBLIC_API_URL || "";
const socket = io(API_URL, {
  transports: ["websocket"],
});

const saveLocally = async (question: { answerId?: any; idx?: number; questionID: any; }) => {
  try {
    let savedQuestions = await AsyncStorage.getItem("unsavedQuestions");
    savedQuestions = savedQuestions ? JSON.parse(savedQuestions) : [];

    const isDuplicate = Array.isArray(savedQuestions) && savedQuestions.some(
      (q) => q.questionID === question.questionID
    );
    if (!isDuplicate) {
      if (savedQuestions) {
        Array.isArray(savedQuestions) &&  savedQuestions.push(question);
      }
      await AsyncStorage.setItem(
        "unsavedQuestions",
        JSON.stringify(savedQuestions)
      );
    }
  } catch (error) {
    console.error("Error saving question locally", error);
  }
};

const retryUpload = async () => {
  try {
    let savedQuestions = await AsyncStorage.getItem("unsavedQuestions");
    savedQuestions = savedQuestions ? JSON.parse(savedQuestions) : [];

    const newSavedQuestions = [];
    if (Array.isArray(savedQuestions)) {
    for (const question of savedQuestions) {
      try {
        const res = await axiosInstance.post("/api/question/save", question);
        if (res.status !== 200) {
          newSavedQuestions.push(question);
        }
      } catch (error) {
        newSavedQuestions.push(question);
      }
    }
  }
    if (newSavedQuestions.length > 0) {
      await AsyncStorage.setItem(
        "unsavedQuestions",
        JSON.stringify(newSavedQuestions)
      );
    } else {
      await AsyncStorage.removeItem("unsavedQuestions");
    }
  } catch (error) {
    console.error("Error retrying question upload", error);
  }
};

const saveQuestion = async (questionID: number, answerId: null, setChoiceNull: { (choice: any): void; (arg0: null): void; }) => {
  try {
    await axiosInstance.post("/api/question/save", {
      questionID,
      answerId,
      idx: 0,
    });
  } catch (error) {
    console.log("Error while saving question", error);
    saveLocally({ answerId, idx: 0, questionID });
  } finally {
    setChoiceNull(null);
  }
};

export default function MultipleChoices() {
  const navigation = useNavigation();
  const [state, setState] = useState({
    selectedChoice: { idx: null, questionID: null, answerId: null },
    timer: 0,
    disabled: false,
    Question: [],
    temp: [],
    selectNumber: 0,
    isGameOnline: false,
    refreshing: false,
    loading: false,
    tempTimer: 0,
    message: "please wait...",
  });

  const setStateValues = (newValues: object) =>
    setState((prevState) => ({ ...prevState, ...newValues }));

  const onLoad = async () => {
    try {
      const res = await axiosInstance.post("/api/question/refresh");
      setStateValues({ refreshing: false });
      if (res.data.isGameOnline) {
        if (state.Question.length <= 0) {
          setStateValues({
            selectNumber: 0,
            Question: [res.data.question[0]],
            temp: res.data.question,
            timer: res.data.time || 0,
            tempTimer: res.data.time || 0,
            isGameOnline: true,
          });
        }
      } else {
        await AsyncStorage.removeItem("unsavedQuestions");
        setStateValues({
          isGameOnline: false,
          selectNumber: 0,
          timer: 0,
          message: res.data.message || "Games is offline,\nplease wait...",
          Question: [],
          temp: [],
        });
      }
    } catch (err) {
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" } as never],
      });
    } finally {
      setStateValues({ refreshing: false });
    }
  };

  const onRefresh = async () => {
    setStateValues({ selectedChoice: null, refreshing: true });
    await onLoad();
    setStateValues({ refreshing: false });
  };

  const intilizeData = (data: any) => {
    if (data.isGameOnline) {
      setStateValues({
        isGameOnline: data.isGameOnline,
        temp: data.question,
        selectNumber: 0,
        Question: [data.question[0]],
        timer: data.time || 0,
        tempTimer: data.time || 0,
        disabled: false,
      });
    } else {
      setStateValues({
        isGameOnline: false,
        timer: 0,
        tempTimer: 0,
        message: data.message || "System Offline",
        Question: [],
        temp: [],
        selectNumber: 0,
      });
    }
  };

  const question = (e: any) => {
    intilizeData(e);
  };

  useEffect(() => {
    onLoad();
    socket.on("connect", onLoad);
    socket.on("connect_error", () => Alert.alert("Error", "Socket Error"));
    socket.on("question", question);

    return () => {
      socket.off("connect", onLoad);
      socket.off("connect_error");
      socket.off("question", question);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(retryUpload, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (state.timer > 0) {
      const countdown = setTimeout(() => setStateValues({ timer: state.timer - 1 }), 1000);
      return () => clearTimeout(countdown);
    } else {
      saveQuestion(
        Number(state.Question.map((item : {id:Number}) => item.id ).toString()),
        state.selectedChoice?.answerId || null,
        (choice: any) => setStateValues({ selectedChoice: choice })
      );

      if (state.selectNumber <= state.temp.length - 2) {
        setStateValues({
          disabled: false,
          Question: [state.temp[state.selectNumber + 1]],
          selectNumber: state.selectNumber + 1,
          timer: state.tempTimer,
        });
      }

      if (state.selectNumber === state.temp.length - 1) {
        setStateValues({
          isGameOnline: false,
          message: "Game Ended",
          timer: 0,
          Question: [],
          temp: [],
          selectNumber: 0,
        });
      }
    }
  }, [state.timer]);

  return (
    <>
      {state.loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007BFF" />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={state.refreshing}
              onRefresh={onRefresh}
              title="Reseting Selection..."
              titleColor="blue"
              tintColor="red"
              colors={["red", "blue"]}
            />
          }
        >
          {state.isGameOnline ? (
            <QuestionScreen
              Question={state.Question}
              timer={state.timer}
              disabled={state.disabled}
              setSelectedChoice={(choice: any) => setStateValues({ selectedChoice: choice })}
              selectedChoice={state.selectedChoice}
            />
          ) : (
            <View>
              <LottieView
                source={require("./rocketroof.json")}
                autoPlay
                loop
                speed={1}
                style={styles.animation}
              />
              <Text style={styles.noGameText}>{state.message}</Text>
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
    width: screenWidth,
    height: screenWidth,
  },
  noGameText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "red",
    textAlign: "center",
    alignSelf: "center",
  },
});
