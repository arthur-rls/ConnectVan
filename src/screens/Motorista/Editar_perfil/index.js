import { Entypo, FontAwesome, AntDesign, FontAwesome5, Ionicons, EvilIcons, Feather, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useEffect, useState, useRef } from 'react'
import styles from './style'
import { onAuthStateChanged, signOut, deleteUser, updateEmail } from 'firebase/auth';
import {db, auth, } from '../../../firebase/config';
import {View, Text,Image,  TouchableOpacity, TextInput, Modal, ScrollView, Keyboard, Linking} from 'react-native'
import { doc, getDoc, onSnapshot, getDocs, collection, collectionGroup, query, where, updateDoc, deleteDoc} from 'firebase/firestore';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { TextInputMask } from 'react-native-masked-text';
import MaskInput from 'react-native-mask-input';

export default function EditarPerfil({navigation}) {
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [telefone, setTelfone] = useState('')
    const [placa, setPlaca] = useState('')
    const [nomeM, setNomeM] = useState('')
    const [emailM, setEmailM] = useState('')
    const [telefoneM, setTelefoneM] = useState('')
    const [placaM, setPlacaM] = useState('')
    const [modalVisible, setModalVisible] = useState(false)
    const [showElement, setShowElement] = useState(false)
    const [modalVisible2, setModalVisible2] = useState(false)
    const logout=()=>{
      onAuthStateChanged(auth, (user)=>{
        console.log(user.uid)
      })
      
      signOut(auth).then(()=>{
        navigation.navigate('login')
      })

    }
    useEffect(()=>{
        onAuthStateChanged(auth, async (user)=>{
            const docRef = doc(db, 'motorista', user.uid)
            const snapshot = await getDoc(docRef)
            setNome(snapshot.data().nome)
            setEmail(snapshot.data().email)
            setTelfone(snapshot.data().telefone)
            setPlaca(snapshot.data().placa)
        })
    },[])

    const excluir=()=>{
      onAuthStateChanged(auth, async(user)=>{
      deleteUser(user).then(async()=>{
        const data = await getDocs(collection(db, 'motorista', user.uid, 'responsaveis'))
        data.forEach(async (item)=>{
          await deleteDoc(doc(db, "motorista", user.uid, 'responsaveis', item.id));
        })
        const data2 = await getDocs(collection(db, 'motorista', user.uid, 'passageiros'))
        data2.forEach(async (item)=>{
          await deleteDoc(doc(db, "motorista", user.uid, 'responsaveis', item.id));
        })
        
        await deleteDoc(doc(db, "motorista", user.uid));
        navigation.navigate('login')
      })
      
      })
    }
    const upEmail=()=>{
      onAuthStateChanged(auth, (user)=>{
      user.updateEmail(emailM)
      })
    }
    const clear = () =>{
      setNomeM('')
      setEmailM('')
      setTelefoneM('')
      setPlacaM('')
    }
    const salvar=()=>{
        onAuthStateChanged(auth, async (user)=>{
            const docRef = doc(db, 'motorista', user.uid)
            if(nomeM!=''){
                updateDoc(docRef, {nome:nomeM})
            }
            if(telefoneM!='' && telefoneM.length==15){
                updateDoc(docRef, {telefone:telefoneM})
            }
            if(emailM!=''){
                updateDoc(docRef, {email:emailM})
                upEmail();
            }
            if(placaM!=''){
                updateDoc(docRef, {placa:placaM})
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
                      <Text style={{ fontSize:19, textAlign:'justify', paddingBottom:5, fontFamily:'AileronR'}}>Tem certeza que deseja sair da conta? Esta ação não poderá ser desfeita.</Text>
                      
                      <View style={styles.viewBotaoModal}>
                        <TouchableOpacity style={[styles.botaoModal, {backgroundColor:'gray'}]} onPress={() => setModalVisible(!modalVisible)}>
                          <Image source={require('../../../../assets/gradient2.png')} style={styles.gradient} />
                          <Text style={{fontSize:16, position:'absolute', fontFamily:'AileronH'}}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.botaoModal} onPress={() => logout()}>
                          <Image source={require('../../../../assets/gradient.png')} style={styles.gradient} />
                          <Text style={{fontSize:16, fontFamily:'AileronH', position:'absolute'}}>Sim, sair</Text>
                        </TouchableOpacity>
                      </View>
                      
                  </View>
              </View> 
          </Modal>
          <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible2}
          onRequestClose={() => {
          setModalVisible(!modalVisible2);
          }}>
              <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                      <Text style={{ fontSize:19, textAlign:'justify', paddingBottom:5, fontFamily:'AileronR'}}>Tem certeza que deseja excluir sua conta? Esta ação não poderá ser desfeita.</Text>
                      
                      <View style={styles.viewBotaoModal}>
                        <TouchableOpacity style={[styles.botaoModal, {backgroundColor:'gray'}]} onPress={() => setModalVisible2(!modalVisible2)}>
                          <Image source={require('../../../../assets/gradient2.png')} style={styles.gradient} />
                          <Text style={{fontSize:16, position:'absolute', fontFamily:'AileronH'}}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.botaoModal} onPress={() => excluir()}>
                          <Image source={require('../../../../assets/gradient.png')} style={styles.gradient} />
                          <Text style={{fontSize:16, fontFamily:'AileronH', position:'absolute'}}>Sim, excluir</Text>
                        </TouchableOpacity>
                      </View>
                      
                  </View>
              </View> 
          </Modal>

          <Image source={require('../../../../assets/gradient.png')} style={{width:'100%', height:'100%', position:'absolute'}}/>
          <View style={{ marginTop:'13%', justifyContent:'center', marginLeft:'4%'}}>
          {showElement==true ? (
              <View style={styles.senhaErrOuIncorr}>
                  <TouchableOpacity onPress={()=>setShowElement(false)}>
                      <Feather name="x" size={20} color="white" />
                  </TouchableOpacity>
                  <Text style={styles.textoSolici}>Alterações salvas com sucesso!</Text>
              </View>
            ):null} 
            <TouchableOpacity onPress={()=>navigation.openDrawer()} style={{flex:1,position:'absolute'}}>
              <Entypo name="menu" size={29} color="black" style={styles.iconMenu}/>
            </TouchableOpacity>
            <View style={{ justifyContent:'center', alignItems:'center'}}>
              <Text style={{fontSize:18, fontFamily:'AileronH'}}>Editar perfil</Text>
            </View>
          </View>
    
          <View style={styles.fundoTab}>
    
            <View style={{flexDirection:'column', alignContent:'center', marginTop:'12%', marginBottom:'5%'}}>
              <Text style={{fontSize:15, fontFamily:'AileronH', marginBottom:-5}}>Nome</Text>
              <TextInput
                style={styles.input}
                onChangeText={(value)=>setNomeM(value)}
                value={nomeM}
                placeholder={nome}
              />
            </View>
    
            <View style={{flexDirection:'column', alignContent:'center', marginBottom:'5%'}}>
              <Text style={{fontSize:15, fontFamily:'AileronH', marginBottom:-5}}>E-mail</Text>
              <TextInput
                style={styles.input}
                onChangeText={(value)=>setEmailM(value)}
                value={emailM}
                placeholder={email}
                keyboardType="email"
              />
            </View>
    
            <View style={{flexDirection:'column', alignContent:'center', marginBottom:'5%'}}>
              <Text style={{fontSize:15, fontFamily:'AileronH', marginBottom:-5}}>Telefone</Text>
              <TextInputMask
                style={styles.input}
                onChangeText={(value)=>setTelefoneM(value)}
                value={telefoneM}
                placeholder={telefone}
                maxLength={15} type={'cel-phone'}options={{maskType: 'BRL', withDDD: true, dddMask: '(99) '}}
              />
            </View>
    
            <View style={{flexDirection:'column', alignContent:'center', marginBottom:'5%'}}>
              <Text style={{fontSize:15, fontFamily:'AileronH', marginBottom:-5}}>Placa</Text>
              <MaskInput
                style={styles.input}
                onChangeText={(value)=>setPlacaM(value)}
                value={placaM}
                placeholder={placa}
                autoCapitalize='characters' maxLength={7}
              />
            </View>
            
            <View style={styles.viewBotao}>
              <TouchableOpacity style={[styles.botaoAdd, {backgroundColor:'gray'}]} onPress={()=>clear()}>
                <Image source={require('../../../../assets/gradient2.png')} style={styles.gradient} />
                <Text style={{fontSize:16, position:'absolute', fontFamily:'AileronH'}}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.botaoAdd} onPress={()=>{salvar(); setShowElement(true)}}>
                <Image source={require('../../../../assets/gradient.png')} style={styles.gradient} />
                <Text style={{fontSize:16, fontFamily:'AileronH', position:'absolute'}}>Finalizar</Text>
              </TouchableOpacity>
            </View>

            <View style={{height:1.5, width:'100%', backgroundColor:'#D3D3D3', marginBottom:'5%'}}/>

            <View style={{height:'15%', width:'100%', marginLeft:'28%'}}>
              <Text style={{fontSize:17, fontStyle:'AileronH', fontWeight:'bold', marginBottom:'5%'}}>Outras opções:</Text>

              <View style={{gap:15}}>
                <View style={{flexDirection:'row', gap:7}}>
                  <TouchableOpacity style={styles.botaoSair} onPress={()=>setModalVisible(true)}>
                    <Image source={require('../../../../assets/gradient2.png')} style={styles.gradient}/>
                    <View style={{width:'100%', position:'absolute', alignItems:'flex-end', paddingRight:'55%'}}>
                      <MaterialIcons name="logout" size={24} color="black" />
                    </View>
                    <View style={{paddingRight:'5%', justifyContent:'center'}}>
                      <Text style={{fontSize:16, fontFamily:'AileronH', position:'absolute'}}>Sair</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.botaoSair} onPress={()=>setModalVisible2(true)}>
                    <Image source={require('../../../../assets/gradient2.png')} style={styles.gradient}/>
                    <View style={{width:'100%', position:'absolute', alignItems:'flex-end', paddingRight:'62%'}}>
                      <AntDesign name="deleteuser" size={22} color="black" />
                    </View>
                    <View style={{paddingLeft:'15%', justifyContent:'center'}}>
                      <Text style={{fontSize:16, fontFamily:'AileronH', position:'absolute'}}>Excluir</Text>
                    </View>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.botaoContato} onPress={()=>Linking.openURL('mailto:connectvan4@gmail.com')}>
                  <Image source={require('../../../../assets/gradient.png')} style={styles.gradient}/>
                  <View style={{width:'100%', position:'absolute', alignItems:'flex-end', paddingRight:'72%'}}>
                    <MaterialIcons name="support-agent" size={22} color="black" />
                  </View>
                  <View style={{paddingLeft:'38%', justifyContent:'center'}}>
                    <Text style={{fontSize:16, fontFamily:'AileronH', position:'absolute'}}>Entrar em contato</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

          </View>
        </View>
      );
    }