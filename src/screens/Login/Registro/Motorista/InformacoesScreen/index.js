import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, TextInput, Alert} from 'react-native'
import styles from './style'
import { doc, updateDoc } from "firebase/firestore";
import {db, auth} from '../../../../../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { Feather  } from '@expo/vector-icons';
import MaskInput from 'react-native-mask-input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function InformacoesMotorista ({navigation}) {
    const [placaU, setPlacaU] = useState('');
    const [nomeU, setNomeU] = useState('');
    const [cnpjU, setCnpjU] = useState('');
    const [showElementNome, setShowElementNome] = useState(false)
    const [showElementCNPJ, setShowElementCNPJ] = useState(false)
    const [showElementPlaca, setShowElementPlaca] = useState(false)

    async function salvar(){
        if(placaU.length==7 && cnpjU.length==18 && !nomeU==''){
            onAuthStateChanged(auth, async (user) => {
            if (user) {
                const docRef = doc(db, 'motorista', user.uid)

                updateDoc(docRef,{nome: nomeU, placa: placaU, cnpj:cnpjU})
                // navigation.navigate('');
                console.log('Home')
                
            }
            });
        }
        else{
            if(nomeU==''){
                setShowElementNome(true)
            }
            if(cnpjU.length!=18){
                setShowElementCNPJ(true)
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
                
                <View style={{width:'100%',paddingTop:10}}>
                    <TextInput style={showElementNome?styles.inputErro:styles.input} placeholder="Nome e Sobrenome" value={nomeU} onChangeText={value => setNomeU(value)} autoCapitalize='words'/>
                    <MaskInput style={showElementCNPJ?styles.inputErro:styles.input} placeholder="CNPJ" value={cnpjU} onChangeText={value => setCnpjU(value)} maxLength={18} mask={[ /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-',  /\d/, /\d/]} inputMode='tel'/>
                    <MaskInput style={showElementPlaca?styles.inputErro:styles.input} placeholder="Placa do carro" value={placaU} onChangeText={value => setPlacaU(value)} autoCapitalize='characters' maxLength={7}/>
                </View>

                <View style={{ width:'100%', alignItems:'center', paddingVertical:35, paddingHorizontal:90}}>
                    <TouchableOpacity style={styles.botao} onPress={() => salvar()}>
                    <Image source={require('../../../../../../assets/gradient.png')} style={styles.gradient} />
                    <Text style={{fontFamily:'AileronR', fontSize:20, position:'absolute'}}>Salvar</Text>
                    </TouchableOpacity>
                </View>
                <View style={{position:'absolute', marginTop:40, width:'110%'}}>
                    {showElementNome==true ? (
                        <View style={{ backgroundColor:'#f02929', marginTop: 10, padding:10, flexDirection:'row', width:'100%'}}>
                            <TouchableOpacity onPress={()=>setShowElementNome(false)}>
                                <Feather name="x" size={20} color="white" />
                            </TouchableOpacity>
                            <Text style={{fontFamily:'AileronR', fontSize:21, color:'white'}}>Insira o nome completo.</Text>
                        </View>
                    ):null}
                    {showElementCNPJ==true ? (
                        <View style={{ backgroundColor:'#f02929', marginTop: 10, padding:10, flexDirection:'row', width:'100%'}}>
                            <TouchableOpacity onPress={()=>setShowElementCNPJ(false)}>
                                <Feather name="x" size={20} color="white" />
                            </TouchableOpacity>
                            <Text style={{fontFamily:'AileronR', fontSize:21, color:'white'}}>Insira o CNPJ.</Text>
                        </View>
                    ):null}
                    {showElementPlaca==true ? (
                        <View style={{ backgroundColor:'#f02929', marginTop: 10, padding:10, flexDirection:'row', width:'100%'}}>
                            <TouchableOpacity onPress={()=>setShowElementPlaca(false)}>
                                <Feather name="x" size={20} color="white" />
                            </TouchableOpacity>
                            <Text style={{fontFamily:'AileronR', fontSize:21, color:'white'}}>Insira uma placa existente.</Text>
                        </View>
                    ):null}
                </View>
            
            </View>
        </KeyboardAwareScrollView>
    )
    }


