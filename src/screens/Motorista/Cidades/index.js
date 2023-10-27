import { Text, SafeAreaView, StyleSheet, View, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Entypo, FontAwesome, AntDesign, FontAwesome5 } from '@expo/vector-icons';
import styles from './style'
import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth';
import {db, auth} from '../../../firebase/config';
import {  doc, getDoc, collectionGroup, query, where, getDocs} from 'firebase/firestore';
import {useFocusEffect} from '@react-navigation/native';

export default function CidadesMotorista ({route, navigation}) {
    const [cidades, setCidades]=useState([]);
    
    useEffect(()=>{
        navigation.addListener('focus', () => {
          onAuthStateChanged(auth, async (user) => {
            if (user) {
              const docRef = doc(db, 'motorista', user.uid)
              const snapshot = await getDoc(docRef)
  
              setCidades(snapshot.data().cidade)
            }
          });
        });
        console.log('s')
        
    },[])

  return (
    <View style={styles.container}>
      
      <Image source={require('../../../../assets/gradient.png')} style={{width:'100%', height:'100%', position:'absolute'}}/>
      <View style={{ marginTop:'10%', justifyContent:'center', marginBottom:'2%'}}>
          <TouchableOpacity onPress={()=>navigation.openDrawer()} style={{flex:1,position:'absolute'}}>
            <Entypo name="menu" size={29} color="black" style={styles.iconMenu}/>
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
                <Text style={{fontSize:17,fontFamily:'AileronH'}}>{item}</Text>
              </View>
              );
          })}
          </View>
        ):(
          <Text style={{fontSize:18, fontFamily:'AileronH', marginTop:'5%'}}>
            TODAS (0)
          </Text>
        )}
        
        <View style={styles.viewBotao}>
          <View style={{flexDirection:'row', justifyContent:'flex-end', padding: '10%'}}>
            <TouchableOpacity style={styles.botaoAdd} onPress={()=>navigation.navigate('EditarC')}>
                <FontAwesome5 name="pencil-alt" size={17} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}