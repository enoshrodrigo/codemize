import { Alert, ScrollView, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import BuzzerScreen from '../componments/displayBuzzer';
import React from 'react';
const API_URL: string = process.env.EXPO_PUBLIC_API_URL || "";
const socket = io(API_URL, {
  transports: ["websocket"],
});

interface BuzzerData {
  buzzerID: number;
  team_name: string;
  clickedAt: string;
}

export default function TabTwoScreen() {
  const [data, setData] = useState<BuzzerData[]>([]); 

  useEffect(() => {
    const handleConnect = () => {
      console.log('Onload socket');
    };

    const handleConnectError = (error: any) => {
      Alert.alert('Error', 'Socket Error');
    };

    const handleBuzzerNumber = (e: { buzzerOrder: BuzzerData[] }) => {
      console.log('Buzzer socket');
      setData(e.buzzerOrder);
    };

    socket.on("connect", handleConnect);
    socket.on("connect_error", handleConnectError);
    socket.on("buzzerNUmber", handleBuzzerNumber);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("connect_error", handleConnectError);
      socket.off("buzzerNUmber", handleBuzzerNumber);
    };
  }, []);

  return (

    <ScrollView>
      <BuzzerScreen />
      <View style={styles.container}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', margin: 10 , color :'blue'}}>
          Buzzer Click
        </Text> 
        { data.length > 0 ? data.map((item, index) => (
          <View 
            key={index} 
            style={[styles.box, index % 2 === 0 ? styles.boxRed : styles.boxAlternate]}
          >
            <Text style={styles.boxText}>{item.buzzerID?`${item.team_name}`:'Game ended thanks for participant'}</Text>
          {/*   <Text style={styles.boxText}>{item.buzzerID?`Clicked At : ${item.clickedAt}`:''}</Text> */}
          </View>
          
        ))
        :   <View 
        key={0} 
        style={[styles.box,   styles.boxAlternate]}
      >
        <Text style={styles.boxText}>Game Will Start Soon</Text> 
      </View>}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 0,
  },
  box: {
    borderRadius: 10,
    padding: 15,
    margin: 10,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  boxRed: {
    backgroundColor: '#ff4d4d', // Nice red color
  },
  boxAlternate: {
    backgroundColor: '#4da6ff', // Suitable alternate color
  },
  boxText: {
    fontSize: 18, // Increased font size for better readability
    fontWeight: 'bold',
    textAlign: 'center', // Center align text for better readability
  },
});
