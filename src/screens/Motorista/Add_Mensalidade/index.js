import styles from './style'
import { Text, SafeAreaView, StyleSheet, View, TextInput, TouchableOpacity, Image, Modal } from 'react-native';
import { Entypo, FontAwesome, AntDesign, FontAwesome5, Feather } from '@expo/vector-icons';
import {useRef, useState, useEffect} from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import {db, auth} from '../../../firebase/config';
import Calendar from 'react-native-calendars/src/calendar'
import { TextInputMask } from 'react-native-masked-text';
import {  setDoc, doc, getDoc, updateDoc, arrayUnion , deleteField, arrayRemove, Timestamp } from 'firebase/firestore';

export default function AddMensalidade({route, navigation}) {


    const { idR } = route.params;
    const [mensalidadeM, setMensalidadeM] = useState('');
    const [vencimento, setVencimento] = useState('')
    const [modalVisible, setModalVisible] = useState(false);
    const [data, setData] = useState('12 de cada mês')
    const [showElement, setShowElement] = useState(false)

    const mensa = () => {
      const dado = mensalidadeM.replace(/,00/, '');
      const mensalidadee= dado.replace('R$', '');
      const mensalidade = parseInt(mensalidadee)
        if(vencimento!=''&&mensalidade!=''){
            navigation.navigate('AddAluno', {idR, mensalidade, vencimento})
        }
        else{
            setShowElement(true)
        }
    }

  return (

    <View style={styles.container}>
      <Image source={require('../../../../assets/gradient.png')} style={{width:'100%', height:'100%', position:'absolute'}}/>
      <View style={{ marginTop:'18%', marginBottom:'15%', justifyContent:'center', paddingHorizontal:30, marginRight:'10%'}}>
          <View style={{ justifyContent:'center', alignItems:'center'}}>
            <Text style={{fontSize:38, fontFamily:'AileronH'}}>Insira a mensalidade combinada</Text>
          </View>
      </View>

      <View style={styles.fundoTab}>
        <View style={{width:'100%', alignItems:'center'}}>
          <View style={{flexDirection:'column', alignContent:'center', marginBottom:'5%', marginTop:'10%'}}>
            <Text style={{fontSize:15, fontFamily:'AileronH', marginBottom:-5}}>Valor</Text>
            <TextInputMask
              type={'money'}
              placeholder="R$180,00"
              style={styles.input}
              onChangeText={(value)=>setMensalidadeM(value)}
              value={mensalidadeM}
            />
          </View>

          <View style={{flexDirection:'column', alignContent:'center', marginBottom:'5%'}}>
            <Text style={{fontSize:15, fontFamily:'AileronH', marginBottom:-5}}>Data do pagamento</Text>
            <TextInput
              placeholder={data}
              style={styles.input}
              onFocus={()=>setModalVisible(true)}
            />
          </View>
        </View>

        <View style={styles.viewBotao}>
          <TouchableOpacity style={[styles.botaoAdd, {backgroundColor:'gray'}]} onPress={()=>navigation.navigate('AddAluno', {idR})}>
            <Image source={require('../../../../assets/gradient2.png')} style={styles.gradient} />
            <Text style={{fontSize:16, position:'absolute', fontFamily:'AileronH'}}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botaoAdd} onPress={()=>mensa()}>
            <Image source={require('../../../../assets/gradient.png')} style={styles.gradient} />
            <Text style={{fontSize:16, fontFamily:'AileronH', position:'absolute'}}>Finalizar</Text>
          </TouchableOpacity>
        </View>
        <Modal visible={modalVisible} transparent={true}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{position:'absolute', padding:10}}>
                            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                                <Feather name="x" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                        <Calendar onDayPress={day => {console.log('selected day', day); setVencimento(day.day); setModalVisible(false); setData(day.day + ' de cada mês')}} hideArrows={true} enableSwipeMonths={true} hideExtraDays={true} monthFormat={''} hideDayNames={true}/>
                        </View> 
                </View> 
            </Modal>
        
      </View>
      {showElement==true ? (
            <View style={{position:'absolute', backgroundColor:'#f02929', marginTop: 50, padding:10, flexDirection:'row'}}>
                <TouchableOpacity onPress={()=>setShowElement(false)}>
                    <Feather name="x" size={20} color="white" />
                </TouchableOpacity>
                <Text style={{fontFamily:'AileronR', fontSize:21, color:'white'}}>Por favor selecione uma data e um valor.</Text>
            </View>
        ):null}
    </View>
  );
}