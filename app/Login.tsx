import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import axiosInstance from './Authentication/axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignIn() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const handleLogin = () => {
    setLoading(true);
        setError('');
    // Replace the navigation state to avoid going back to the login screen
   axiosInstance.post('/login/user',{
    email:email,
    password:password
   }).then(async response=>{
    const authHeader = response.headers['authorization'];
            if (authHeader) {
                const token = authHeader.split(' ')[1]; // Get the token part of 'Bearer <token>'
                // Store the token in AsyncStorage
                await AsyncStorage.setItem('token', token);
                console.log('Login successful:', response.data);
                navigation.reset({
                  index: 0,
                  routes: [{ name: '(tabs)' }],
                });
            } else {
                setError('Authorization header is missing in the response');
            }
  
  }).catch(err=>{
    setError('Error logging in');
    console.error('Error logging in:', err);
}).finally( ()=> {
            setLoading(false);
        })
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back! <Text style={styles.heart}>❤️</Text></Text>
      <Text style={styles.subtitle}>Sign in to your account</Text>
      <TextInput
        style={styles.input}
        placeholder="Phone number or Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <FontAwesome name={showPassword ? "eye" : "eye-slash"} size={20} color="gray" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity>
        <Pressable onPress={() => navigation.navigate('forgotpassword')}>
        <Text style={styles.forgotPassword}>Forgot password?</Text>
        </Pressable>
      </TouchableOpacity>
      <TouchableOpacity style={styles.signInButton}>
        <Pressable onPress={handleLogin}>

        <Text style={styles.signInButtonText}>Sign in</Text>
        </Pressable>
      </TouchableOpacity>
      <Text style={styles.signupText}>Don't have an account?{error}
 
         <Pressable onPress={()=>{navigation.navigate('SignUp')}}><Text style={styles.signupLink}>Sign up</Text></Pressable>
         </Text>
      <Text style={styles.orText}>OR</Text>
      <TouchableOpacity style={styles.socialButton}>
        <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png' }} style={styles.socialIcon} />
        <Text style={styles.socialButtonText}>Sign in with Google</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.socialButton}>
        <Image source={{ uri: 'https://cdn-icons-png.freepik.com/256/5968/5968764.png?semt=ais_hybrid' }} style={styles.socialIcon} />
        <Text style={styles.socialButtonText}>Sign in with Facebook</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
   paddingTop: 0,
   marginTop: 0,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    
  },
  heart: {
    color: '#f00',
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
    width: '100%',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
  },
  forgotPassword: {
    textAlign: 'right',
    color: '#007BFF',
    marginBottom: 20,
  },
  signInButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  signInButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  signupText: {
    textAlign: 'center',
    marginBottom: 20,
  },
  signupLink: {
    color: '#007BFF',
  },
  orText: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#888',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  socialIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  socialButtonText: {
    fontSize: 16,
  },
});
