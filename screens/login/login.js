import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { styles } from './styles';
import { ErrorModal } from '../../components/ErrorModal';

export const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);
  }

  const validatePassword = (password) => {
    // Password requirements:
    // - At least 8 characters long
    // - Contains at least one uppercase letter
    // - Contains at least one lowercase letter
    // - Contains at least one digit
    // - Contains at least one special character
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    return passwordPattern.test(password);
  }

  // Function to toggle the error modal
  const toggleErrorModal = () => {
    setErrorModalVisible(!errorModalVisible);
  };

  // Function to handle errors and display the error modal
  const handleError = (errorMessage) => {
    setErrorMessage(errorMessage);
    setErrorModalVisible(true);
  };

  const handleLogin = () => {
    if (!validateEmail(email)) {
      handleError('Please enter a valid email address.');
    } else if (!validatePassword(password)) {
      handleError('Please enter a valid password.');
    } else {
      alert('Login successful!');
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.image}
          resizeMode="contain"
          accessibilityLabel="The 3D icon for an old white haired man"
        />
        <Text style={styles.headerText}>Geppeto Assistant</Text>
      </View>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
      <ErrorModal errorMessage={errorMessage} toggleErrorModal={toggleErrorModal} errorModalVisible={errorModalVisible} />
    </View>
  );
}