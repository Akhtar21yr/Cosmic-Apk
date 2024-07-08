import React, { useState } from 'react';
import { View, Text, ScrollView, Image, Alert, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import FormField from './FormField';
import CustomButton from './CustomButton';

const baseURL = "https://www.cosmicrms.com/api";

function SignIn  () : React.JSX.Element {
  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const clearCookies = async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.log('Failed to clear cookies:', error);
    }
  };

  const handleLogin = async () => {
    if (form.username === '' || form.password === '') {
      Alert.alert('Validation Error', 'Username and password cannot be empty.');
      return;
    }

    setIsSubmitting(true);

    clearCookies();

    try {
      const response = await axios.post(`${baseURL}/account/login`, {
        event: 'login',
        source: 'web',
        data: {
          username: form.username,
          password: form.password,
        },
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      handleResponse(response.data);
    } catch (error) {
      setIsSubmitting(false);
      handleLoginError(error);
    }
  };

  const handleResponse = async (data: any) => {
    setIsSubmitting(false);
    if (data.httpstatus === 200) {
      const sessionData = {
        sessionid: data.sessionid,
        csrf: data.csrftoken,
        accesstoken: data.access_token,
        accessuserid: data.accessusers,
      };
      await AsyncStorage.setItem('sessionData', JSON.stringify(sessionData));
      // Navigate to home screen or desired route
      // Example: navigation.navigate('Home');
    } else {
      Alert.alert('Login Failed', 'Invalid credentials.');
    }
  };

  const handleLoginError = async (error: any) => {
    setIsSubmitting(false);
    if (error.response) {
      const headers = error.response.headers;
      const setCookieHeader = headers['set-cookie'];
      let csrfToken = null;
      if (setCookieHeader) {
        const match = setCookieHeader[0].match(/csrftoken=([^;]+)/);
        if (match) {
          csrfToken = match[1];
        }
      }
      console.log("========== csrftoken:>", csrfToken);
      Alert.alert('Login Failed', `Error: ${error.response.data.detail || 'Unauthorized'}`);
    } else if (error.request) {
      console.log(error.request);
      Alert.alert('Login Failed', 'No response received from server. Please try again.');
    } else {
      console.log('Error', error.message);
      Alert.alert('Login Failed', `Error: ${error.message}`);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#1E1E20' }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingHorizontal: 20 }}>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 20, color: 'white', marginTop: 20, fontFamily: 'Poppins-SemiBold' }}>
            Log in to Cosmic
          </Text>

          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(text: string) => setForm({ ...form, username: text })}
            otherStyles={{ marginTop: 20 }}
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(text: string) => setForm({ ...form, password: text })}
            otherStyles={{ marginTop: 20 }}
            secureTextEntry={true}
          />

          <CustomButton
            title="Sign In"
            handlePress={handleLogin}
            containerStyles={{ marginTop: 20 }}
            isLoading={isSubmitting}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default SignIn;
