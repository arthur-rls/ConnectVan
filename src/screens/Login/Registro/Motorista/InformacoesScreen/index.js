import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, TextInput, Alert} from 'react-native'
import styles from './style'
import { doc, updateDoc } from "firebase/firestore";
import {db, auth} from '../../../../../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { Feather  } from '@expo/vector-icons';
import MaskInput from 'react-native-mask-input';
import { TextInputMask } from 'react-native-masked-text';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function InformacoesMotorista ({navigation}) {
    const [placaU, setPlacaU] = useState('');
    const [nomeU, setNomeU] = useState('');
    const [cpfU, setCpfU] = useState('');
    const [showElementNome, setShowElementNome] = useState(false)
    const [showElementCPF, setShowElementCPF] = useState(false)
    const [showElementPlaca, setShowElementPlaca] = useState(false)

    async function salvar(){
        if(placaU.length==7 && cpfU.length==11 && !nomeU==''){
            onAuthStateChanged(auth, async (user) => {
            if (user) {
                const docRef = doc(db, 'motorista', user.uid)

                updateDoc(docRef,{nome: nomeU, placa: placaU, cnh:cpfU})
                navigation.navigate('drawerM');

                
                
            }
            });
        }
        else{
            if(nomeU==''){
                setShowElementNome(true)
            }
            if(cpfU.length!=11){
                setShowElementCPF(true)
            }
            if(placaU.length!=7){
                setShowElementPlaca(true)
            }
        }
    }
    return(
        <KeyboardAwareScrollView style={{backgroundColor:'white'}}>
            <View style={{flex:5, paddingHorizontal: 40, backgroundColor: 'white', alignItems: 'center'}}>

                <View style={styles.tela}>
                    <Text style={styles.h1}>Insira algumas informações!</Text>
                </View>
                
                <View style={{width:'100%', paddingTop:10}}>
                    <TextInput style={showElementNome?styles.inputErro:styles.input} placeholder="Nome e Sobrenome" value={nomeU} onChangeText={value => setNomeU(value)} autoCapitalize='words'/>
                    <TextInput style={showElementCPF?styles.inputErro:styles.input} placeholder="CNH" value={cpfU} onChangeText={value => setCpfU(value)} maxLength={11} keyboardType='numeric'/>
                    <MaskInput style={showElementPlaca?styles.inputErro:styles.input} placeholder="Placa do carro" value={placaU} onChangeText={value => setPlacaU(value)} autoCapitalize='characters' maxLength={7}/>
                </View>

                <View style={{ width:'100%', alignItems:'center', paddingVertical:35, paddingHorizontal:90}}>
                    <TouchableOpacity style={styles.botao} onPress={() => salvar()}>
                    <Image source={require('../../../../../../assets/gradient.png')} style={styles.gradient} />
                    <Text style={{fontFamily:'AileronR', fontSize:17, position:'absolute', fontWeight:'bold'}}>Salvar</Text>
                    </TouchableOpacity>
                </View>
                <View style={{position:'absolute', marginTop:40, width:'110%'}}>
                    {showElementNome==true ? (
                        <View style={{ backgroundColor:'#f02929', marginTop: 10, padding:10, flexDirection:'row', width:'100%'}}>
                            <TouchableOpacity onPress={()=>setShowElementNome(false)}>
                                <Feather name="x" size={20} color="white" />
                            </TouchableOpacity>
                            <Text style={{fontFamily:'AileronR', fontSize:16, color:'white'}}>Insira o nome completo.</Text>
                        </View>
                    ):null}
                    {showElementCPF==true ? (
                        <View style={{ backgroundColor:'#f02929', marginTop: 10, padding:10, flexDirection:'row', width:'100%'}}>
                            <TouchableOpacity onPress={()=>setShowElementCPF(false)}>
                                <Feather name="x" size={20} color="white" />
                            </TouchableOpacity>
                            <Text style={{fontFamily:'AileronR', fontSize:16, color:'white'}}>Insira uma CNH válida.</Text>
                        </View>
                    ):null}
                    {showElementPlaca==true ? (
                        <View style={styles.errOuIncorr}>
                            <TouchableOpacity onPress={()=>setShowElementPlaca(false)}>
                                <Feather name="x" size={20} color="white" />
                            </TouchableOpacity>
                            <Text style={{fontFamily:'AileronR', fontSize:16, color:'white'}}>Insira uma placa existente.</Text>
                        </View>
                    ):null}
                </View>
            
            </View>
        </KeyboardAwareScrollView>
    )
    }


