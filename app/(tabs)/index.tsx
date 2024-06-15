import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
 
import MultipleChoices from '../MainPages/MultipleChoices';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
    <MultipleChoices />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
