import React, { useState, useEffect } from 'react'
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
    const [moto, setMoto] = useState(true)
    const [ver, setVer] = useState(false)

    async function onLoginPress () {
        
        await signInWithEmailAndPassword(auth, email, password)
        
        .then(value =>{
            onAuthStateChanged(auth, async (user)=>{
                if(user){
                    const userRef = doc(db, 'responsavel', user.uid)
                    const snap = await getDoc(userRef)
                    const verify = snap.data()
                        if(verify == undefined){
                            navigation.navigate('drawerM', {moto})
                        }
                        else{
                            navigation.navigate('drawerR', {moto})
                            setMoto(false)
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
    

    useEffect(()=>{
        setPassword('')
        setEmail('')
    },[])
    return(
        <KeyboardAwareScrollView style={{backgroundColor:'white'}}>
                <View style={styles.inner}>
                    <View style={styles.tela}>
                        <Image source={require('../../../../assets/logo.png')} style={styles.logo}/>

                        <Text style={[styles.connect, {fontFamily: 'AileronH'}]}>Connect</Text>
                        <Text style={[styles.van, {fontFamily:'AileronH'}]}>Van</Text>
                    </View>
                   
                    <View style={styles.viewInput}>
                        <FontAwesome5 name="user-alt" size={16} color="#4D4D4D" style={[showElement ? styles.iconErro : styles.icon, {marginLeft:12}]}/> 
                        <TextInput style={showElement ? styles.inputErro : styles.input} placeholder="Email"onChangeText={(text) => setEmail(text)} value={email} autoCapitalize='none' autoComplete='email' keyboardType='email-address'/>
                    </View>
                    <View style={styles.viewInput}> 
                        <MaterialIcons name="lock" size={20} color="#4D4D4D" style={showElement ? styles.iconErro : styles.icon}/>
                        <TextInput style={showElement ? styles.inputErro : styles.input} placeholder="Senha" onChangeText={(text) => setPassword(text)} value={password} autoCapitalize='none' secureTextEntry={ver? false : true}/>
                        <Entypo onPress={()=>setVer(current=>!current)} name={ver? "eye-with-line":"eye"} size={20} color="#4D4D4D" style={showElement ? styles.iconErro : styles.iconEye}/> 
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
                            <Text style={styles.textButton}>Cadastre-se</Text>
                        </TouchableOpacity>
                    </View>
                    {showElement==true ? (
                        <View style={styles.senhaErrOuIncorr}>
                            <TouchableOpacity onPress={()=>setShowElement(false)}>
                                <Feather name="x" size={20} color="white" />
                            </TouchableOpacity>
                            <Text style={{fontFamily:'AileronR', fontSize:16, color:'white'}}>Endereço de email ou senha incorretos.</Text>
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
                                <Text style={{ fontSize:19, textAlign:'justify', paddingBottom:15}}>Preencha com o e-mail que você usou para se cadastrar. Você receberá um e-mail com instruções sobre como redefinir sua senha.</Text>
                                <TextInput style={styles.input2} placeholder="Email"onChangeText={(text) => setEmail(text)} value={email}/>
                                <View style={[styles.viewButton, {marginTop:'6%', flexDirection:'row'}]}>
                                    <TouchableOpacity style={styles.botaoCadastrar} onPress={() => setModalVisible(!modalVisible)}>
                                        <Image source={require('../../../../assets/gradient2.png')} style={styles.gradient} />
                                        <Text style={styles.textButton}>Cancelar</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.botaoCadastrar} onPress={() => navigation.navigate('preRegistro')}>
                                        <Image source={require('../../../../assets/gradient.png')} style={styles.gradient} />
                                        <Text style={styles.textButton}>Enviar email</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
        </KeyboardAwareScrollView>
    )
}

