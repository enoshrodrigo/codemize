import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import LottieView from 'lottie-react-native';

const screenWidth = Dimensions.get("window").width;

export default function BuzzerScreen(question: any) {
  console.log('hhhh',question);
  return (
   <React.Fragment  >
    {
      //check is array or not
    
        <View style={styles.container}>
          <View style={styles.questionContainer}>
         {   
         question.question && question.question.length > 0
       && question.question.map((item: any, index: number) => ( 
        <>
        <Text key={index} style={styles.question}>{item.question}</Text>
            <Text style={styles.timer}>Time: {item.time} seconds</Text> 
            </>
             ))
             }
             </View>
            <View style={styles.animationContainer}>
              <LottieView
                style={styles.animation}
                source={require('../MainPages/world.json')}
                autoPlay
                loop
              />
            </View>
          </View>
     
    



    }
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  questionContainer: {
    width: screenWidth - 14,
    marginBottom: 20,
    backgroundColor: '#f0f8ff',
    borderRadius: 8,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 0.3,
    borderColor: '#ccc',
  },
  question: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  timer: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 14,
  },
  animationContainer: {
    width: screenWidth - 22,
    borderColor: '#ccc',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 20,
    alignItems: 'center',
  },
  animation: {
    width: '100%',
    height: 230,
  },
});
