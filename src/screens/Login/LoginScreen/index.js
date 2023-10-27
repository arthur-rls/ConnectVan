import React, { useState } from 'react'
import {View, Text, Image, TouchableOpacity, TextInput, Modal, Alert} from 'react-native'
import styles from './style'
import { MaterialIcons, Feather, Entypo, FontAwesome5  } from '@expo/vector-icons';
import { auth, db } from '../../../firebase/config';
import { signInWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged } from 'firebase/auth';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { doc, getDoc  } from 'firebase/firestore';



export default function Login ({navigation}) {
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showElement, setShowElement] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    async function onLoginPress () {
        
        await signInWithEmailAndPassword(auth, email, password)
        
        .then(value =>{
            onAuthStateChanged(auth, async (user)=>{
                if(user){
                    const userRef = doc(db, 'responsavel', user.uid)
                    const snap = await getDoc(userRef)
                    const verify = snap.data()
                        if(verify == undefined){
                            navigation.navigate('drawerM')
                        }
                        else{
                            navigation.navigate('drawerR')
                        }
                    
                }
            })
        })
        .catch(error => setShowElement(true))
    }

    async function forgotPassword () {
        console.log(email)
        await sendPasswordResetEmail(auth, email, null)
          .then(function (user) {
            alert('Please check your email...')
          }).catch(function (e) {
            console.log(e)
          })
      }
    
    return(
        <KeyboardAwareScrollView style={{backgroundColor:'white'}}>
                <View style={styles.inner}>
                    <View style={styles.tela}>
                        <Image source={require('../../../../assets/logo.png')} style={styles.logo}/>

                        <Text style={[styles.connect, {fontFamily: 'AileronH'}]}>Connect</Text>
                        <Text style={styles.van}>Van</Text>
                    </View>
                   
                    <View style={styles.viewInput}>
                        <FontAwesome5 name="user-alt" size={16} color="#4D4D4D" style={[showElement ? styles.iconErro : styles.icon, {marginLeft:12}]}/> 
                        <TextInput style={showElement ? styles.inputErro : styles.input} placeholder="Email"onChangeText={(text) => setEmail(text)} value={email} autoCapitalize='none' autoComplete='email' keyboardType='email-address'/>
                    </View>
                    <View style={styles.viewInput}>
                        <MaterialIcons name="lock" size={20} color="#4D4D4D" style={showElement ? styles.iconErro : styles.icon}/>
                        <TextInput style={showElement ? styles.inputErro : styles.input} placeholder="Senha" secureTextEntry onChangeText={(text) => setPassword(text)} value={password} autoCapitalize='none'/>
                    </View>

                    <View style={[styles.viewButton, {paddingTop:20}]}>
                        <TouchableOpacity style={styles.botaoEntrar} onPress={() => onLoginPress()}>
                            <Image source={require('../../../../assets/gradient.png')} style={styles.gradient}/>
                            <Text style={styles.textButton}>Entrar</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.tela}>
                        <Text style={{ fontSize:14, textDecorationLine: 'underline', fontFamily: 'AileronR', marginTop:-8}} onPress={()=>setModalVisible(true)}>Esqueceu a senha?</Text>
                    </View>
                    <View style={{paddingTop:150}}>
                        <Text style={{ fontSize:15, fontFamily: 'AileronR'}}>Não possui cadastro?</Text>
                    </View>
                    <View style={styles.viewButton}>
                        <TouchableOpacity style={styles.botaoCadastrar} onPress={() => navigation.navigate('preRegistro')}>
                            <Image source={require('../../../../assets/gradient.png')} style={styles.gradient} />
                            <Text style={styles.textButton}>Cadastrar</Text>
                        </TouchableOpacity>
                    </View>
                    {showElement==true ? (
                        <View style={{position:'absolute', backgroundColor:'#f02929', marginTop: 50, padding:10, flexDirection:'row'}}>
                            <TouchableOpacity onPress={()=>setShowElement(false)}>
                                <Feather name="x" size={20} color="white" />
                            </TouchableOpacity>
                            <Text style={{fontFamily:'AileronR', fontSize:21, color:'white'}}>Endereço de email ou senha incorretos.</Text>
                        </View>
                    ):null}
                    <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                    setModalVisible(!modalVisible);
                    }}>
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <View style={{position:'absolute', padding:10}}>
                                    <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                                        <Feather name="x" size={24} color="black" />
                                    </TouchableOpacity>
                                </View>
                                <Text style={{ fontSize:25, textAlign:'justify', paddingBottom:5}}>Preencha com o e-mail que você usou para se cadastrar. Você receberá um e-mail com instruções sobre como redefinir sua senha.</Text>
                                <TextInput style={styles.input} placeholder="Email"onChangeText={(text) => setEmail(text)} value={email}/>
                                <View style={{paddingVertical:10}}>
                                    <TouchableOpacity style={[styles.botao, {justifyContent:'center', alignItems:'center'}]} onPress={() => forgotPassword()}>
                                        <Image source={require('../../../../assets/gradient.png')} style={styles.gradient}/>
                                        <Text style={{fontSize:25, position:'absolute', fontFamily:'AileronR'}}>Enviar email</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
        </KeyboardAwareScrollView>
    )
}

