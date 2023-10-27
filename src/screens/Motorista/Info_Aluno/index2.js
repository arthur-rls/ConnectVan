import styles from './style'
import { Text, SafeAreaView, StyleSheet, View, TouchableOpacity, Image, Linking } from 'react-native';
import { Entypo, Ionicons, FontAwesome } from '@expo/vector-icons';
import {useRef, useState, useEffect} from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import {db, auth} from '../../../firebase/config';
import {  setDoc, doc, getDoc, updateDoc, arrayUnion , deleteField, arrayRemove } from 'firebase/firestore';


export default function AddAluno ({route, navigation}) {
    const { idA, resp } = route.params;
    const [rec, setRec] = useState('');
    const [rec2, setRec2] = useState('');
    const [mensagem, setmensagem] = useState('')
    const [gatilho, setGatilho] = useState(false)

    useEffect(()=>{
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const docRef = doc(db, 'motorista', user.uid, 'passageiros', idA)
                const snapshot = await getDoc(docRef)
                setRec(snapshot.data())
                setmensagem(`Olá, sou o motorista ${snapshot.data().nome}.`)
                console.log(rec)

                const docRef2 = doc(db, 'motorista', user.uid, 'responsavel', resp)
                const snapshot2 = await getDoc(docRef2)
                setRec2(snapshot2.data());
                console.log(idA)
            }
        })
    }, [gatilho])

    if(!rec){
      return(
        <View style={{padding:50}}>
          <TouchableOpacity onPress={()=>setGatilho(curent=>!curent)}>
            <Text>reload</Text>
          </TouchableOpacity>
        </View>
      )
    }
  return (

    <View style={styles.container}>
      <Image source={require('../../../../assets/gradient.png')} style={{width:'100%', height:'100%', position:'absolute'}}/>
      <View style={{ marginTop:'10%', justifyContent:'center', marginBottom:'2%'}}>
          <TouchableOpacity onPress={()=>navigation.navigate('Escolas')} style={{flex:1,position:'absolute'}}>
            <Entypo name="chevron-left" size={29} color="black" style={styles.iconMenu}/>
          </TouchableOpacity>
          <View style={{ justifyContent:'center', alignItems:'center'}}>
          <Text style={{fontSize:18, fontFamily:'AileronH'}}>{rec.nome}</Text>
        </View>
      </View>

      <View style={styles.fundoTab}>
        <View style={styles.fundo}>
          <View style={{flexDirection:'row'}}>
            <View style={[styles.viewMae, {height:60}]}/>
              <View style={{flexDirection:'column', marginLeft:'11%'}}>
                <Text style={styles.titulo}>{rec.responsavel}</Text>
                <Text style={styles.infos}>Responsavel</Text>
              </View>
              <TouchableOpacity style={{padding:17, paddingLeft:18}} onPress={()=>Linking.openURL('whatsapp://send?text='+ mensagem +'&phone=' + rec.telefone)}>
                <FontAwesome name="whatsapp" size={28} color="black" />
              </TouchableOpacity>
          </View>

          <View style={{flexDirection:'row'}}>
            <View style={[styles.viewMae, {height:135}]}/> 
              <View style={{flexDirection:'column', marginLeft:'11%'}}>
                <Text style={styles.viewFilha}>Escola</Text>
                <Text style={styles.infos}>{rec.escola}</Text>
                <Text style={styles.infos}>{rec.sala}</Text>
                <Text style={styles.infos}>{rec.serie}</Text>
                <Text style={styles.infos}>{rec.periodo}</Text>
              </View>
          </View>

          <View style={{flexDirection:'row'}}>
            <View style={[styles.viewMae, {height:106}]}/>
            <View style={{flexDirection:'column', marginLeft:'11%'}}>
              <Text style={styles.viewFilha}>Endereço</Text>
              <Text style={styles.infos}>{rec.endereco}</Text>
            </View>
          </View>

          <View style={{flexDirection:'row'}}>
            <View style={[styles.viewMae, {height:60}]}/>
            <View style={{flexDirection:'column', marginLeft:'11%'}}>
              <Text style={styles.titulo}>Mensalidade</Text>
              <Text style={{marginTop:'2%', fontStyle:'italic', color:'#757575'}}>R${rec2.mensalidade},00</Text>
              <Text style={{marginTop:'2%', fontStyle:'italic', color:'#757575'}}>Vencimento todos os dias {rec2.data}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}