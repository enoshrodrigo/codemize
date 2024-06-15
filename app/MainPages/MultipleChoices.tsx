import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import { io } from "socket.io-client";
import axios from "axios";
import MainHeader from "../Headers/MainHeader";
import { useNavigation } from "@react-navigation/native";
 import QuestionScreen from "../componments/QuestionScreen";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const socket = io("http://192.168.1.4:5000/", {
  transports: ["websocket"],
  
});

export default function MultipleChoices() {
  const navigation = useNavigation();
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [timer, setTimer] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [Question, setQuestion] = useState([]);
  const [temp, setTemp] = useState([]);
  const [selectNumber, setSelectNumber] = useState(0);
  const [isGameOnline, setIsGameOnline] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tempTimer, setTempTimer] = useState(0);
  const [message, setMessage] = useState('System Offline')

  const onLoad = async() => {
  console.log('onload',Question.length)
 

    await axios.post('http://192.168.1.4:5000/api/question/refresh').then((res) => {
      setRefreshing(false);
      setIsGameOnline(res.data.isGameOnline) ,
      res.data.isGameOnline
          ? ( 
            console.log('refreshing game online'),
             Question?.length <= 0 ? (
           
            //console.log(Question),
              setSelectNumber(0),
              console.log('refreshing question'),
              setQuestion(Array(res.data.question[0])) ,
              setTemp(res.data.question),
              setTimer(res.data.time ? res.data.time : 0),
              setTempTimer(res.data.time ? res.data.time : 0)
      ) : ''
          )
          : (
      console.log('refreshing game offline'),
      setIsGameOnline(false)  ,
      setSelectNumber(0),
      setTimer(0),  
      setMessage(res.data.message ? res.data.message : 'System Offline'),
      setRefreshing(false),
      setQuestion([]) ,
      setTemp([])
       )
      }).catch((err) =>
         {

        console.log(err);
        setRefreshing(false);
      }
    )
   

  }
  const onRefresh = async() => {
    setSelectedChoice(null); 
    
    setRefreshing(true);
     await onLoad();
    setRefreshing(false);
    
  };

  const intilizeData = (data) => {
     data.isGameOnline
          ? (  
            setIsGameOnline(data.isGameOnline), 
            setTemp(data.question),
            setSelectNumber(0),
            setQuestion(Array(data.question[0])),
            setTimer(data.time ? data.time : 0),
            setTempTimer(data.time ? data.time : 0), 
            setDisabled(false))
          :( setIsGameOnline(false)  ,setTimer(0), setTempTimer(0),setMessage(data.message ? data.message : 'System Offline', ),setQuestion([]),setTemp([]), setSelectNumber(0));
  }

  const question = (e) => {
    intilizeData(e); 
  };
  useEffect(() => {
    socket.on("connect", ()=>
      {
        console.log('Onload socket')
       
        onLoad();
      }
    );
    socket.on("connect_error", (error) => console.log("Connection error:", error));
    socket.on("question", (e)=>
      {
        console.log('Question socket' )
        question(e);
      }
    ); 

    return () => {
      socket.off("connect", onLoad);
      socket.off("connect_error");
      socket.off("question", question);
    };
  }, []);
  useEffect(() => {
      console.log('timer',timer)  
      

    if (timer > 0) {
      console.log('timer 2nd ',timer) 
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else {
     
      setSelectedChoice(null);
      if (selectNumber <= temp.length - 2) {
        setDisabled(false);
        setQuestion(Array(temp[selectNumber + 1]));
        setSelectNumber(selectNumber + 1);
        setTimer(tempTimer);
      }
      console.log('selectNumber',selectNumber)

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
      <MainHeader />
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
              colors={['red', 'blue']}
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
            <View style={styles.noGameContainer}>
              <Image
                source={{ uri: 'https://cdn.dribbble.com/users/1186261/screenshots/3718681/_______.gif' }}
                style={styles.noGameImage}
              />
              <Text style={styles.noGameText} >{message}</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    width: screenWidth ,
    height: screenHeight,
  },
  noGameContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: screenWidth -2,
    height: screenWidth -2,
  },
  noGameImage: {
    width: screenWidth-2,
    height: screenHeight-2,
    resizeMode: 'cover',
  },
  noGameText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
    position: 'absolute',
    textAlign: 'center',
    alignSelf: 'center',
  },
});
