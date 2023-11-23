import styles from './style'
import { Text, SafeAreaView, StyleSheet, View, TouchableOpacity, Image, Linking } from 'react-native';
import { Entypo, Ionicons, FontAwesome } from '@expo/vector-icons';
import {useRef, useState, useEffect} from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import {db, auth} from '../../../firebase/config';
import {  setDoc, doc, getDoc, updateDoc, arrayUnion , deleteField, arrayRemove } from 'firebase/firestore';

export default function MotoInfoAluno ({route, navigation}) {
    const { idA, resp } = route.params;
    const [rec, setRec] = useState('');
    const [rec2, setRec2] = useState('');
    const [mensagem, setmensagem] = useState('')
    const [gatilho, setGatilho] = useState(false)
    const [esc, setEsc] = useState('')

    useEffect(()=>{
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const docRef = doc(db, 'motorista', user.uid, 'passageiros', idA)
                const snapshot = await getDoc(docRef)
                setRec(snapshot.data())
                setmensagem(`Olá, sou o motorista ${snapshot.data().nome}.`)
                console.log(rec)

                const docRef2 = doc(db, 'motorista', user.uid, 'responsaveis', resp)
                const snapshot2 = await getDoc(docRef2)
                setRec2(snapshot2.data());
                console.log(idA)
                setEsc(snapshot.data().escola)
            }
        })
    }, [gatilho])

    if(!rec){
      return(
        <View style={styles.container}>
            <Image source={require('../../../../assets/gradient.png')} style={{width:'100%', height:'100%', position:'absolute'}}/>
            <View style={{ marginTop:'13%', justifyContent:'center'}}>
                <TouchableOpacity onPress={()=>navigation.openDrawer()} style={{flex:1,position:'absolute'}}>
                    <Entypo name="menu" size={29} color="black" style={{marginLeft:15}}/>
                </TouchableOpacity>
                <View style={{ justifyContent:'center', alignItems:'center'}}>
                    <Text style={{fontSize:18, fontFamily:'AileronH'}}>Carregando</Text>
                </View>
            </View>
            <View style={styles.fundoTab}>
            <Image source={require('../../../../assets/loading.gif')} style={{width:'100%', height:'100%', resizeMode: 'center',}}/>
            </View>
        </View>
    )
    }
  return (

    <View style={styles.container}>
      <Image source={require('../../../../assets/gradient.png')} style={{width:'100%', height:'100%', position:'absolute'}}/>
      <View style={{ marginTop:'13%', justifyContent:'center'}}>
          <TouchableOpacity onPress={()=>navigation.navigate('Passageiros')} style={{flex:1,position:'absolute'}}>
            <Entypo name="chevron-left" size={29} color="black" style={{marginLeft:13}}/>
          </TouchableOpacity>
          <View style={{ justifyContent:'center', alignItems:'center'}}>
          <Text style={{fontSize:18, fontFamily:'AileronH'}}>{rec.nome}</Text>
        </View>
      </View>

      <View style={styles.fundoTab}>
        <View style={styles.fundo}>
          <View style={{flexDirection:'row'}}>
            <View style={[styles.viewMae, {height:60}]}/>
              <View style={{flexDirection:'column', paddingHorizontal:25}}>
                <Text style={styles.titulo}>{rec.responsavel}</Text>
                <Text style={styles.infos}>Responsável</Text>
              </View>
              <TouchableOpacity style={{padding:11, paddingLeft:'23%'}} onPress={()=>Linking.openURL('whatsapp://send?text='+ mensagem +'&phone=' + '+55' + rec.telefone)}>
                <FontAwesome name="whatsapp" size={28} color="black" />
              </TouchableOpacity>
          </View>

          <View style={{flexDirection:'row'}}>
            <View style={[styles.viewMae, {height:125}]}/> 
            <View style={{flexDirection:'column', paddingHorizontal:25}}>
              <Text style={styles.viewFilha}>Escola</Text>
              <Text style={[styles.infos,{marginBottom:-3}]}>{rec.escola}</Text>
              <Text style={[styles.infos,{marginBottom:-3}]}>Série: {rec.sala}º ano</Text>
              <Text style={[styles.infos,{marginBottom:-3}]}>Sala: {rec.serie}</Text>
              <Text style={[styles.infos,{marginBottom:-3}]}>Período: {rec.periodo}</Text>
            </View>
          </View>

          <View style={{flexDirection:'row'}}>
            <View style={[styles.viewMae, {height:85}]}/>
            <View style={{flexDirection:'column', paddingHorizontal:25}}>
              <Text style={[styles.viewFilha,{marginBottom:-8}]}>Endereço</Text>
              <Text style={styles.infos}>{rec.endereco}</Text>
            </View>
          </View>

          <View style={{flexDirection:'row'}}>
            <View style={[styles.viewMae, {height:87}]}/>
            <View style={{flexDirection:'column', paddingHorizontal:25}}>
              <Text style={styles.titulo}>Mensalidade</Text>
              <Text style={{marginTop:'4%', fontStyle:'italic', color:'#757575'}}>R${rec2.mensalidade},00</Text>
              <Text style={{marginTop:'1%', fontStyle:'italic', color:'#757575'}}>Vencimento: todos os dias {rec2.data} de cada mês.</Text>
            </View>
          </View>
        </View>

      </View>
    </View>
  );
}