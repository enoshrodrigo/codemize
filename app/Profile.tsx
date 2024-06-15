// /src/screens/Profile.tsx
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';

import { FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { menuItems } from '../data';
import { MenueData } from './componments/menueItems';


const Profile = () => { 
  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <Image
          source={{ uri: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' }}
          style={styles.profilePhoto}
        />
        <Text style={styles.profileName}>Kevin Peterson</Text>
        <TouchableOpacity style={styles.editButton}>
          <FontAwesome name="pencil" size={16} color="white" />
        </TouchableOpacity>
      </View>
     {
      <MenueData   items={menuItems}/>
     }
      <Text style={styles.footerText}>Proudly Made in 🇱🇰</Text>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  profileHeader: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  editButton: {
    position: 'absolute',
    top: 6,
    right: 140,
    backgroundColor: 'blue',
    borderRadius: 50,
    padding: 5,
  },
 
  footerText: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 14,
    color: 'gray',
  },
});
