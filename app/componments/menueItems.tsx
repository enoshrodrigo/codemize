
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
interface MenuItem {
    items:
     { icon: string;
      label: string;
      screen: string;
     
    }[]
  }
  
    export const MenueData =( menuItem:MenuItem)=>{
      const navigate = useNavigation();
      const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
      const handleLogout = () => {
        setLogoutModalVisible(true);

      };
    
      const confirmLogout = () => {
        // Handle logout logic here
        console.log('User logged out');
        setLogoutModalVisible(false);
        navigation.reset({
          index:0,
          routes:[{name:'Login'}]
        })

      };
    
      const cancelLogout = () => {
        setLogoutModalVisible(false);
      };
        const navigation = useNavigation();
      return (
        <>

        {menuItem.items?.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() =>  navigation.navigate(item.screen, { userid: '123' }) }
          >
            <View style={styles.menuItemIcon}>
              <FontAwesome name={item.icon} size={24} color="black" />
            </View>
            <Text style={styles.menuItemText}>{item.label}</Text>
            <Ionicons name="chevron-forward" size={24} color="gray" />
          </TouchableOpacity>
        ))}
   <TouchableOpacity
            
            style={styles.menuItem}
            onPress={handleLogout}
          >
            <View style={styles.menuItemIcon}>
              <FontAwesome name={'sign-out'} size={24} color="black" />
            </View>
            <Text style={styles.menuItemText}>{'Log out'}</Text>
            <Ionicons name="chevron-forward" size={24} color="gray" />
          </TouchableOpacity>

      <Modal isVisible={isLogoutModalVisible} onBackdropPress={cancelLogout}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Confirm Logout</Text>
          <Text style={styles.modalMessage}>Are you sure you want to log out?</Text>
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity style={styles.modalButton} onPress={confirmLogout}>
              <Text style={styles.modalButtonText}>Logout</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={cancelLogout}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      </>);
    }

    
const styles = StyleSheet.create({
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
      },
      menuItemIcon: {
        marginRight: 10,
      },
      menuItemText: {
        flex: 1,
        fontSize: 16,
      },logoutButton: {
        backgroundColor: '#dc3545',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
      },
      logoutButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
      },
      modalContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
      },
      modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      modalMessage: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20,
        textAlign: 'center',
      },
      modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
      },
      modalButton: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        flex: 1,
        marginHorizontal: 5,
      },
      modalButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
      },
      cancelButton: {
        backgroundColor: '#6c757d',
      },
  });