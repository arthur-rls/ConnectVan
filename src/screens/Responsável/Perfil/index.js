import { Entypo, FontAwesome, AntDesign, FontAwesome5, Ionicons, EvilIcons, Feather } from '@expo/vector-icons';
import { useEffect, useState, useRef } from 'react'
import styles from './style'
import { onAuthStateChanged, signOut } from 'firebase/auth';
import {db, auth} from '../../../firebase/config';
import {View, Text,Image,  TouchableOpacity, TextInput, Modal, ScrollView, Keyboard} from 'react-native'
import { doc, getDoc, onSnapshot, getDocs, collection, collectionGroup, query, where, updateDoc} from 'firebase/firestore';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { TextInputMask } from 'react-native-masked-text';
import MaskInput from 'react-native-mask-input';

export default function EditarPerfilR({navigation}) {
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [telefone, setTelfone] = useState('')
    const [nomeM, setNomeM] = useState('')
    const [emailM, setEmailM] = useState('')
    const [telefoneM, setTelefoneM] = useState('')
    const [modalVisible, setModalVisible] = useState(false)

    useEffect(()=>{
        navigation.addListener('focus', () => {
        onAuthStateChanged(auth, async (user)=>{
            const docRef = doc(db, 'responsavel', user.uid)
            const snapshot = await getDoc(docRef)
            setNome(snapshot.data().nome)
            setEmail(snapshot.data().email)
            setTelfone(snapshot.data().telefone)
        })
      })
    },[])

    const logout=()=>{
      signOut(auth).then(()=>{
        navigation.navigate('login')
      })

    }

    const salvar=()=>{
        onAuthStateChanged(auth, async (user)=>{
            const docRef = doc(db, 'responsavel', user.uid)
            if(nomeM!=''){
                updateDoc(docRef, {nome:nomeM})
            }
            if(telefoneM!='' && telefoneM.length==15){
                updateDoc(docRef, {telefone:telefoneM})
            }
            if(emailM!=''){
                updateDoc(docRef, {email:emailM})
            }
        })
    }

      return (
    
        <View style={styles.container}>
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
                      <Text style={{ fontSize:25, textAlign:'justify', paddingBottom:5}}>Deseja realmente sair da conta?</Text>
                      <View style={{paddingVertical:10}}>
                          <TouchableOpacity style={styles.botaoAdd} onPress={() => logout()}>
                              <Image source={require('../../../../assets/gradient.png')} style={styles.gradient}/>
                              <Text style={{fontSize:25, position:'absolute', fontFamily:'AileronR'}}>Sair</Text>
                          </TouchableOpacity>
                      </View>
                  </View>
              </View>
          </Modal>
        <Image source={require('../../../../assets/gradient.png')} style={{width:'100%', height:'100%', position:'absolute'}}/>
        <View style={{ marginTop:'13%', justifyContent:'center'}}>
            <TouchableOpacity onPress={()=>navigation.openDrawer()} style={{flex:1,position:'absolute'}}>
              <Entypo name="menu" size={29} color="black" style={{marginLeft:15}}/>
            </TouchableOpacity>
            <View style={{ justifyContent:'center', alignItems:'center'}}>
            <Text style={{fontSize:20, fontFamily:'AileronH'}}>Editar perfil</Text>
          </View>
        </View>

    
          <View style={styles.fundoTab}>
    
            <View style={{flexDirection:'column', alignContent:'center', marginTop:17}}>
              <Text style={{fontSize:15, fontFamily:'AileronH', marginTop:'3%'}}>Nome</Text>
              <TextInput
                style={styles.input}
                onChangeText={(value)=>setNomeM(value)}
                value={nomeM}
                placeholder={nome}
              />
            </View>
    
            <View style={{flexDirection:'column', alignContent:'center', marginTop:17}}>
              <Text style={{fontSize:15, fontFamily:'AileronH'}}>E-mail</Text>
              <TextInput
                style={styles.input}
                onChangeText={(value)=>setEmailM(value)}
                value={emailM}
                placeholder={email}
                keyboardType="email"
              />
            </View>
    
            <View style={{flexDirection:'column', alignContent:'center', marginTop:17}}>
              <Text style={{fontSize:15, fontFamily:'AileronH'}}>Telefone</Text>
              <TextInputMask
                style={styles.input}
                onChangeText={(value)=>setTelefoneM(value)}
                value={telefoneM}
                placeholder={telefone}
                maxLength={15} type={'cel-phone'}options={{maskType: 'BRL', withDDD: true, dddMask: '(99) '}}
              />
            </View>
    
            
            <View style={styles.viewBotao}>
              <TouchableOpacity style={[styles.botaoAdd, {backgroundColor:'gray'}]} onPress={()=>navigation.navigate('Home')}>
                <Image source={require('../../../../assets/gradient2.png')} style={styles.gradient} />
                <Text style={{fontSize:16, position:'absolute', fontFamily:'AileronH'}}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.botaoAdd} onPress={()=>salvar()}>
                <Image source={require('../../../../assets/gradient.png')} style={styles.gradient} />
                <Text style={{fontSize:16, fontFamily:'AileronH', position:'absolute'}}>Salvar</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.botaoAdd} onPress={()=>setModalVisible(true)}>
              <Image source={require('../../../../assets/gradient.png')} style={styles.gradient} />
              <Text style={{fontSize:16, fontFamily:'AileronH', position:'absolute'}}>Sair</Text>
            </TouchableOpacity>
    
          </View>
        </View>
      );
    }