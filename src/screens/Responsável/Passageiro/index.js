import { Text, SafeAreaView, StyleSheet, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { Entypo, FontAwesome, AntDesign, FontAwesome5 } from '@expo/vector-icons';
import styles from './style'
import {useEffect, useState} from 'react'
import { onAuthStateChanged } from 'firebase/auth';
import {db, auth} from '../../../firebase/config';
import {  doc, getDoc, setDoc, updateDoc, arrayRemove, arrayUnion} from 'firebase/firestore';

export default function Passageiro({route, navigation}) {
    const {item} = route.params
    const [rec, setRec] = useState('')
    useEffect(()=>{
        onAuthStateChanged(auth, async (user) => {
          const docRef = doc(db, 'responsavel', user.uid, 'alunos', item)
          const snapshot = await getDoc(docRef)
          setRec(snapshot.data())
        });
    }, [])
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
          <View style={{ marginTop:'15%', justifyContent:'center', marginBottom:'2%'}}>
              <TouchableOpacity onPress={()=>navigation.navigate('Passageiros')} style={{flex:1,position:'absolute'}}>
                <Entypo name="chevron-left" size={29} color="black" style={styles.iconMenu}/>
              </TouchableOpacity>
              <View style={{ justifyContent:'center', alignItems:'center'}}>
              <Text style={{fontSize:18, fontFamily:'AileronH'}}>{rec.nome}</Text>
            </View>
          </View>
    
          <View style={styles.fundoTab}>
            <View style={styles.fundo}>
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
            </View>
          </View>
        </View>
      );
}