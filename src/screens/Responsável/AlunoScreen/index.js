import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, TextInput, Modal, Alert, ScrollView} from 'react-native'
import styles from './style'
import { onAuthStateChanged } from 'firebase/auth';
import {db, auth} from '../../../firebase/config';
import {  doc, updateDoc, arrayUnion, setDoc  } from 'firebase/firestore';
import MaskInput from 'react-native-mask-input';
import DropDownPicker from 'react-native-dropdown-picker';
import { Feather  } from '@expo/vector-icons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';


export default function RegistroAluno ({route, navigation}) {
    const [nomeA, setNomeA] = useState('');
    const [escolaA, setEscolaA] = useState('');
    const [serieA, setSerieA] = useState('');
    const [salaA, setSalaA] = useState('');
    const [enderecoA, setEnderecoA] = useState('Endereço');
    const [periodoAberto, setPeriodoAberto] = useState(false);
    const [periodoValue, setPeriodoValue] = useState('');
    const [periodoE, setPeriodoE] = useState([
      { label: "Manhã", value: "manhã" },
      { label: "Tarde", value: "tarde" },
      { label: "Integral", value: "integral" },
    ]);
    const [showElementNome, setShowElementNome] = useState(false)
    const [showElementEscola, setShowElementEscola] = useState(false)
    const [showElementSerie, setShowElementSerie] = useState(false)
    const [showElementSala, setShowElementSala] = useState(false)
    const [showElementPeriodo, setShowElementPeriodo] = useState(false)
    const [showElementEndereco, setShowElementEndereco] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [cep, setCep] = useState('')
    const [rua, setRua] = useState('')
    const [bairro, setBairro] = useState('')
    const [municipio, setMunicipio] = useState('')
    const [numero, setNumero] = useState('')
    const [complemento, setComplemento] = useState('')
    const [salve, setSalve] = useState(false)

    async function salvar(){
      if(nomeA!='' && escolaA!='' && serieA!='' && periodoValue!='' && enderecoA!=''){
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            const uid = user.uid;
            setDoc(doc(db, 'responsavel', uid, 'alunos', nomeA), {nome:nomeA, escola:escolaA, serie:serieA, sala:salaA, periodo:periodoValue, endereco:enderecoA});
            updateDoc(doc(db, 'responsavel', uid), {nomeAluno:arrayUnion(nomeA)})
            navigation.navigate('Passageiros');
            
          }
        });
      }
      else{
        if(nomeA==''){
          setShowElementNome(true)
        }
        if(escolaA==''){
          setShowElementEscola(true)
        }
        if(serieA==''){
          setShowElementSerie(true)
        }
        if(salaA==''){
          setShowElementSala(true)
        }
        if(periodoValue==''){
          setShowElementPeriodo(true)
        }
        if(enderecoA==''){
          setShowElementEndereco(true)
        }
        console.log(periodoValue)
      }
    }

    const salveEndereco=()=>{
      
      if(rua!='' && bairro!='' && numero!='' && cep.length==9){
        if (complemento!=''){
          setEnderecoA(rua + ', ' + bairro + ', ' + numero + ', ' + municipio + ', ' + cep + ', ' + complemento)
        }
        else{
          setEnderecoA(rua + ', ' + bairro + ', ' + numero + ', ' + municipio + ', ' + cep)
        }
      setModalVisible(false)
      }
      else{
        setSalve(true)
      }
    }
    
    const limpar=()=>{
      setCep('')
      setRua('')
      setNumero('')
      setBairro('')
      setComplemento('')
      setEnderecoA('')
    }

    return(
      <KeyboardAwareScrollView style={{backgroundColor:'white'}}>
        <View style={styles.fundo}>
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
                      <ScrollView>
                        <MaskInput style={cep==''&&salve?styles.inputErro:styles.input} placeholder="CEP" value={cep} onChangeText={value=>setCep(value)} inputMode='numeric' mask={[ /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]}/>
                        <TextInput style={municipio==''&&salve?styles.inputErro:styles.input} placeholder="Cidade" value={municipio} onChangeText={value=>setMunicipio(value)}/>
                        <View style={{flexDirection:'row', gap:9}}>
                          <TextInput style={rua==''&&salve?[styles.input2Erro, {flex:5}]:[styles.input2, {flex:5}]} placeholder="Rua" value={rua} onChangeText={value=>setRua(value)}/>
                          <TextInput style={numero==''&&salve?styles.input2Erro:styles.input2} placeholder="Nº" value={numero} onChangeText={value=>setNumero(value)} inputMode='numeric'/>
                        </View>
                        <View style={{flexDirection:'row', gap:9, marginTop:8}}>
                          <TextInput style={bairro==''&&salve?styles.input2Erroflex:styles.input2} placeholder="Bairro" value={bairro} onChangeText={value=>setBairro(value)}/>
                          <TextInput style={[styles.input2, {flex:2.5}]} placeholder="Complemento" value={complemento} onChangeText={value=>setComplemento(value)}/>                        
                        </View>
                        <View style={{flexDirection:'row', gap:9, marginTop:10}}>
                          <TouchableOpacity style={styles.botao} onPress={() => limpar()}>
                            <Image source={require('../../../../assets/gradient2.png')} style={styles.gradient}/>
                            <Text style={{fontFamily:'AileronR', fontSize:17, position:'absolute', fontWeight:'bold'}}>Limpar</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.botao} onPress={() => salveEndereco()}>
                            <Image source={require('../../../../assets/gradient.png')} style={styles.gradient}/>
                            <Text style={{fontFamily:'AileronR', fontSize:17, position:'absolute', fontWeight:'bold'}}>Salvar</Text>
                          </TouchableOpacity>
                        </View>
                      </ScrollView>
                  </View>
              </View>
          </Modal>
          
            <View style={styles.tela}>
              <Text style={styles.h1}>Insira as informações do aluno!</Text>
            </View>
            
              <View style={{width:'100%',paddingTop:10}}>
                <TextInput style={showElementNome?styles.inputErro:styles.input} placeholder="Nome e Sobrenome" value={nomeA} onChangeText={value=>setNomeA(value)} autoCapitalize='words'/>
                <MaskInput style={showElementEscola?styles.inputErro:styles.input} placeholder="Escola" value={escolaA} onChangeText={value=>setEscolaA(value)}/>
              </View>
            

            <View style={{flexDirection:'row', paddingVertical:5, gap:10}}>
              <TextInput style={showElementSerie?styles.input2Erro:styles.input2} placeholder="Série" value={serieA} onChangeText={value=>setSerieA(value)} maxLength={1}/>
              <TextInput style={showElementSala?styles.input2Erro:styles.input2} placeholder="Sala" value={salaA} onChangeText={value=>setSalaA(value)}/>
              {/* <TextInput style={[styles.input2, { flex: 1}]} placeholder="Período" value={periodoA} onChangeText={value=>setPeriodoA(value)}/> */}
              <DropDownPicker
                style={showElementPeriodo?styles.dropdownErro:styles.dropdown}
                containerStyle={styles.containerStyle}
                textStyle={styles.text}
                open={periodoAberto}
                value={periodoValue}
                items={periodoE}
                setOpen={setPeriodoAberto}
                setValue={setPeriodoValue}
                setItems={setPeriodoValue}
                placeholder='Período'
                dropDownDirection="TOP"
                dropDownContainerStyle={styles.box}
                />
            </View>
            <View style={{width:'100%',}}>
              <TouchableOpacity style={showElementEndereco?[styles.inputErro]:[styles.input, { padding:18}]} onPress={()=> setModalVisible(true)}>
                <Text style={{fontFamily:'AileronR', fontSize:13, color: '#6F6F6F'}}>{enderecoA}</Text>
              </TouchableOpacity>
            </View>

            <View style={{flexDirection:'row', paddingVertical:10, width:'100%', gap:10}}>
              <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Passageiros')}>
                <Image source={require('../../../../assets/gradient2.png')} style={styles.gradient}/>
                <Text style={{fontFamily:'AileronR', fontSize:17, position:'absolute', fontWeight:'bold'}}>Voltar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.botao} onPress={() => salvar()}>
                <Image source={require('../../../../assets/gradient.png')} style={styles.gradient}/>
                <Text style={{fontFamily:'AileronR', fontSize:17, position:'absolute', fontWeight:'bold'}}>Salvar</Text>
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
                  {showElementSala==true ? (
                      <View style={{ backgroundColor:'#f02929', marginTop: 10, padding:10, flexDirection:'row', width:'100%'}}>
                          <TouchableOpacity onPress={()=>setShowElementSala(false)}>
                              <Feather name="x" size={20} color="white" />
                          </TouchableOpacity>
                          <Text style={{fontFamily:'AileronR', fontSize:21, color:'white'}}>Insira a sala do aluno.</Text>
                      </View>
                  ):null}
                  {showElementSerie==true ? (
                      <View style={{ backgroundColor:'#f02929', marginTop: 10, padding:10, flexDirection:'row', width:'100%'}}>
                          <TouchableOpacity onPress={()=>setShowElementSerie(false)}>
                              <Feather name="x" size={20} color="white" />
                          </TouchableOpacity>
                          <Text style={{fontFamily:'AileronR', fontSize:21, color:'white'}}>Insira a serie do aluno.</Text>
                      </View>
                  ):null}
                  {showElementEscola==true ? (
                      <View style={{ backgroundColor:'#f02929', marginTop: 10, padding:10, flexDirection:'row', width:'100%'}}>
                          <TouchableOpacity onPress={()=>setShowElementEscola(false)}>
                              <Feather name="x" size={20} color="white" />
                          </TouchableOpacity>
                          <Text style={{fontFamily:'AileronR', fontSize:21, color:'white'}}>Insira a escola do aluno.</Text>
                      </View>
                  ):null}
                  {showElementEndereco==true ? (
                      <View style={{ backgroundColor:'#f02929', marginTop: 10, padding:10, flexDirection:'row', width:'100%'}}>
                          <TouchableOpacity onPress={()=>setShowElementEndereco(false)}>
                              <Feather name="x" size={20} color="white" />
                          </TouchableOpacity>
                          <Text style={{fontFamily:'AileronR', fontSize:21, color:'white'}}>Insira o endereço do aluno.</Text>
                      </View>
                  ):null}
                  {showElementPeriodo==true ? (
                      <View style={{ backgroundColor:'#f02929', marginTop: 10, padding:10, flexDirection:'row', width:'100%'}}>
                          <TouchableOpacity onPress={()=>setShowElementPeriodo(false)}>
                              <Feather name="x" size={20} color="white" />
                          </TouchableOpacity>
                          <Text style={{fontFamily:'AileronR', fontSize:21, color:'white'}}>Escolha um período.</Text>
                      </View>
                  ):null}
              </View>
          </View>
        </KeyboardAwareScrollView>
    )
}