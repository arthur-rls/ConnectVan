import { Text, View, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
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
        console.log(cidades)
    },[])

  return ( 
    <View style={styles.container}>
      
      <Image source={require('../../../../assets/gradient.png')} style={{width:'100%', height:'100%', position:'absolute'}}/>
      <View style={{ marginTop:'13%', justifyContent:'center'}}>
          <TouchableOpacity onPress={()=>navigation.openDrawer()} style={{flex:1,position:'absolute', marginLeft:'4%'}}>
            <Entypo name="menu" size={29} color="black" style={styles.iconMenu}/>
          </TouchableOpacity>
          <View style={{ justifyContent:'center', alignItems:'center'}}>
          <Text style={{fontSize:18, fontFamily:'AileronH'}}>Cidades</Text>
        </View>
      </View>

      <View style={styles.fundoTab}> 
        {cidades.length != 0 && cidades ?(
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
          <View style={{alignItems:'center'}}>
            <Text style={[styles.mensagem, {marginVertical:'80%'}]}>Nenhuma cidade foi</Text>
              <Text style={styles.mensagem}>adicionada até o momento.</Text>
              <Text style={styles.mensagem}>Adicione agora!</Text>
          </View>
        )}
        
        <View style={styles.viewBotao}>
          <View style={{flexDirection:'row', justifyContent:'flex-end', padding: '5%'}}>
            <TouchableOpacity style={styles.botaoAdd} onPress={()=>navigation.navigate('EditarC')}>
              <FontAwesome5 name="pencil-alt" size={17} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}