import styles from './style' 
import React from 'react';
import { Text, SafeAreaView, StyleSheet, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { Entypo, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {db, auth} from '../../../firebase/config';
import {  doc, getDoc, collectionGroup, query, where, getDocs, updateDoc, arrayRemove, arrayUnion} from 'firebase/firestore';

export default function EditEscola({navigation}) {
    const [cidades, setCidades]=useState([]);
    const [cidade, setCidade] = useState('')
    useEffect(()=>{
        onAuthStateChanged(auth, async (user) => {
            if (user) {
              const docRef = doc(db, 'motorista', user.uid)
              const snapshot = await getDoc(docRef)
  
              setCidades(snapshot.data().cidade)
            }
          });
    },[cidades])

    const excluir=(item)=>{
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const docRef = doc(db, 'motorista', user.uid)
                updateDoc(docRef, {cidade: arrayRemove(item)})
                const snapshot = await getDoc(docRef)
                setCidades(snapshot.data().cidade)
            }
        });
    }
    const adicionar=()=>{
        setCidade('')
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const docRef = doc(db, 'motorista', user.uid)
                updateDoc(docRef, {cidade: arrayUnion(cidade)})
                const snapshot = await getDoc(docRef)
                setCidades(snapshot.data().cidade)
            }
        });
    }

  return (
    <View style={styles.container}>
      <Image source={require('../../../../assets/gradient.png')} style={{width:'100%', height:'100%', position:'absolute'}}/>
      <View style={{ marginTop:'13%', justifyContent:'center'}}>
        <TouchableOpacity onPress={()=>navigation.navigate('Cidades')} style={{flex:1,position:'absolute', marginLeft:'4%'}}>
          <Entypo name="chevron-left" size={29} color="black" style={styles.iconMenu}/>
        </TouchableOpacity>
        <View style={{ justifyContent:'center', alignItems:'center'}}>
          <Text style={{fontSize:18, fontFamily:'AileronH'}}>Cidades</Text>
        </View>
      </View>

      <View style={styles.fundoTab}>
        {cidades?(
            <View style={{width:'100%', alignItems:'center'}}>
            <Text style={{fontSize:18, fontFamily:'AileronH', marginTop:'5%'}}>
              TODAS ({cidades.length})
            </Text>
            {cidades.map((item) => {
                return (
                  <View style={styles.botaoEscola}>
                    <Text style={{fontSize:17, fontFamily:'AileronH',}}>{item}</Text>
                    <TouchableOpacity onPress={()=>excluir(item)}>
                      <Ionicons name="ios-trash-outline" size={20} color="black" />
                    </TouchableOpacity>
                  </View>
                );
            })}
            </View>
          ):(
            <Text style={{fontSize:18, fontFamily:'AileronH', marginTop:'5%'}}>
              TODAS (0)
            </Text>
          )}

        <View style={{width:'90%', alignContent:'center', marginTop:17}}>
          <TextInput
            style={styles.input}
            placeholder='Nome da cidade'
            value={cidade}
            onChangeText={value=>setCidade(value)}
          />
            <View style={{position:'absolute', width:'100%', height:'100%', justifyContent:'flex-end'}}>
              <View style={{flexDirection:'row', justifyContent:'flex-end', width:'100%', height:'100%'}}>
                <View style={{justifyContent:'center', marginRight:'6%'}}>
                  <TouchableOpacity onPress={()=>adicionar()}>
                    <MaterialIcons name="check" size={20} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
        </View>

        <View style={styles.viewBotao}>
          <View style={{flexDirection:'row', justifyContent:'center', padding: '7%'}}>
            <TouchableOpacity style={styles.botaoAdd} onPress={()=>navigation.navigate('Cidades')}>
              <Image source={require('../../../../assets/gradient.png')} style={styles.gradientBotao}/>
              <Text style={{ fontSize: 17, fontFamily:'AileronH', position:'absolute' }}>
                Salvar alterações
              </Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>
      
    </View>
  );
}