import { Text, SafeAreaView, StyleSheet, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { Entypo, FontAwesome, AntDesign, FontAwesome5 } from '@expo/vector-icons';
import styles from './style'
import {useEffect, useState} from 'react'
import { onAuthStateChanged } from 'firebase/auth';
import {db, auth} from '../../../firebase/config';
import {  doc, getDoc, setDoc, updateDoc, arrayRemove, arrayUnion} from 'firebase/firestore';

export default function Passageiro({route, navigation}) {
    const {key} = route.params
    const [rec, setRec] = useState('')
    const [nome, setNome] = useState('')
    const [escola, setEscola] = useState('')
    const [sala, setSala] = useState('')
    const [serie, setSerie] = useState('')
    const [periodo, setPeriodo] = useState('')
    const [endereco, setEndereco] = useState('')
    useEffect(()=>{
        onAuthStateChanged(auth, async (user) => {
          const docRef = doc(db, 'responsavel', user.uid)
          const snapshot = await getDoc(docRef)
          setRec(snapshot.data())
        });
    }, [])
    if(!rec){
      return null
    }
    return (

        <View style={styles.container}>
          <Image source={require('../../../../assets/gradient.png')} style={{width:'100%', height:'100%', position:'absolute'}}/>
          <View style={{ marginTop:'10%', justifyContent:'center', marginBottom:'2%'}}>
              <TouchableOpacity onPress={()=>navigation.navigate('Passageiros')} style={{flex:1,position:'absolute'}}>
                <Entypo name="chevron-left" size={29} color="black" style={styles.iconMenu}/>
              </TouchableOpacity>
              <View style={{ justifyContent:'center', alignItems:'center'}}>
              <Text style={{fontSize:18, fontFamily:'AileronH'}}>{rec.nomeAluno[key]}</Text>
            </View>
          </View>
    
          <View style={styles.fundoTab}>
            <View style={styles.fundo}>
            <View style={{flexDirection:'row'}}>
            <View style={[styles.viewMae, {height:135}]}/> 
              <View style={{flexDirection:'column', marginLeft:'11%'}}>
                <Text style={styles.viewFilha}>Escola</Text>
                <Text style={styles.infos}>{rec.escola[key]}</Text>
                <Text style={styles.infos}>{rec.sala[key]}</Text>
                <Text style={styles.infos}>{rec.serie[key]}</Text>
                <Text style={styles.infos}>{rec.periodo[key]}</Text>
              </View>
          </View>

          <View style={{flexDirection:'row'}}>
            <View style={[styles.viewMae, {height:106}]}/>
            <View style={{flexDirection:'column', marginLeft:'11%'}}>
              <Text style={styles.viewFilha}>Endereço</Text>
              <Text style={styles.infos}>{rec.endereco[key]}</Text>
            </View>
          </View>
            </View>
          </View>
        </View>
      );
}