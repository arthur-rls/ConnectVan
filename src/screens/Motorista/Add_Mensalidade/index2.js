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
      const mensalidade= dado.replace('R$', '');
        if(vencimento!=''&&mensalidade!=''){
            navigation.navigate('AddAlunos', {idR, mensalidade, vencimento})
        }
        else{
            setShowElement(true)
        }
    }

  return (

    <SafeAreaView style={styles.container}>
      <Image source={require('../../../../assets/gradient.png')} style={{width:'100%', height:'100%', position:'absolute'}}/>
        <View style={{ marginTop:'10%', justifyContent:'center', marginBottom:'2%'}}>
            <View style={{ justifyContent:'center', alignItems:'center'}}>
              <Text style={{fontSize:22, fontFamily:'AileronH'}}>Insira a mensalidade combinada</Text>
            </View>
        </View>

      <View style={styles.fundoTab}>
        <View style={{width:'100%', alignItems:'center'}}>
          <View style={{flexDirection:'column', alignContent:'center', marginTop:'5%', width:'60%'}}>
            <Text style={{fontSize:18, fontFamily:'AileronH', marginTop:'3%'}}>Valor</Text>
            <TextInputMask
              type={'money'}
              placeholder="R$180,00"
              style={styles.input}
              onChangeText={(value)=>setMensalidadeM(value)}
              value={mensalidadeM}
              />
          </View>

          <View style={{flexDirection:'column', alignContent:'center', marginTop:'5%'}}>
            <Text style={{fontSize:18, fontFamily:'AileronH'}}>Data do pagamento</Text>
            <Text style={{fontFamily:'AileronR', fontSize:14}} onPress={()=>setModalVisible(true)}>{data}</Text>
          </View>
        </View>

        <View style={styles.viewBotao}>
          <TouchableOpacity style={[styles.botaoAdd, {backgroundColor:'gray'}]} onPress={()=>navigation.navigate('AddAlunos', {idR})}>
            <Image source={require('../../../../assets/gradient2.png')} style={styles.gradient} />
            <Text style={{fontSize:16, position:'absolute', fontFamily:'AileronH'}}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botaoAdd} onPress={()=>mensa()}>
            <Image source={require('../../../../assets/gradient.png')} style={styles.gradient} />
            <Text style={{fontSize:16, fontFamily:'AileronH', position:'absolute'}}>Finalizar</Text>
          </TouchableOpacity>
        </View>
        <Modal visible={modalVisible}>
            <Calendar onDayPress={day => {console.log('selected day', day); setVencimento(day.day); setModalVisible(false); setData(day.day + ' de cada mês')}} hideArrows={true} enableSwipeMonths={true} hideExtraDays={true} monthFormat={''} hideDayNames={true}/>
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
    </SafeAreaView>
  );
}