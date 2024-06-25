import { Alert, ScrollView, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io("http://192.168.1.3:5000/", {
  transports: ["websocket"],
});

interface BuzzerData {
  buzzerID: string;
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
      <View style={styles.container}>
        {data.map((item, index) => (
          <View 
            key={index} 
            style={[styles.box, index % 2 === 0 ? styles.boxRed : styles.boxAlternate]}
          >
            <Text style={styles.boxText}>Buzzer ID: {item.buzzerID}</Text>
            <Text style={styles.boxText}>Clicked At: {item.clickedAt}</Text>
          </View>
        ))}
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
    padding: 10,
  },
  box: {
    borderRadius: 10,
    padding: 15,
    margin: 10,
    width: '40%',
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
