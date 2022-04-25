import React, { useContext, useState } from 'react';
import { Button, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, SafeAreaView, Image, ScrollView, Platform } from 'react-native';
import AuthContext from '../contexts/AuthContext';
import axios from 'axios';
import PrimaryButton from '../components/PrimaryButton';
import Input from '../components/Input.js';
import styles from '../styles/global';
import { signup } from '../lib/functions';
import InputLabel from '../components/InputLabel';
import Error from '../components/Error';
import Title from '../components/Title';
import logo from '../assets/logo.png';
import PageContainer from '../components/PageContainer';

export default function Signup({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error , setError] = useState();

  async function fetchToken() {
    const res = await signup(name, email, password)
    console.log("hiiii", res)

    if (res.success === true) {
      auth.login(res.token);
    } else {
      setError(res.error);
    }
  }



  const auth = useContext(AuthContext);
  return (
    <PageContainer>
      <KeyboardAvoidingView style={{width: "100%"}} 
        behavior="position">
        <View style={{flex: 1, alignItems: "center"}}>
          <Image style={{width: 150, height: 150, resizeMode: "contain"}} source={logo}/>
          <Text style={styles.title}>ChallengErg</Text>
        </View>

        <Title text={"Sign Up"}/>
        {/* <InputLabel text={"Name"}/> */}
        <Input placeholder="Full Name" value={name} onChangeText={setName}/>
        {/* <InputLabel text={"Email"}/> */}
        <Input placeholder="Email" value={email} onChangeText={setEmail}/>
        {/* <InputLabel text={"Password"}/> */}
        <Input secureTextEntry={true} placeholder="Password" value={password} onChangeText={setPassword}/>
        <Error error={error}/>
        <Button title='Login' onPress={() => navigation.navigate("Login")}/>
        <PrimaryButton text="Create Account" onPress={()=> fetchToken() }/>
      </KeyboardAvoidingView>
    </PageContainer>

      // <Image source={logo} style={{width: 150, height: 150, resizeMode: "contain"}}/>
  );
}