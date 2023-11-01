import { Text, SafeAreaView, StyleSheet, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { Entypo, FontAwesome, AntDesign, FontAwesome5 } from '@expo/vector-icons';
import styles from './style'
import {useEffect, useState} from 'react'
import { onAuthStateChanged } from 'firebase/auth';
import {db, auth} from '../../../firebase/config';
import {  doc, getDoc, setDoc, updateDoc, arrayRemove, arrayUnion} from 'firebase/firestore';

export default function Passageiros({navigation}) {
    const [rec, setRec] = useState('')
    const [aluno, setAluno] = useState([])
    const [gatilho, setGatilho] = useState(true)
    useEffect(()=>{
        onAuthStateChanged(auth, async (user) => {
                const docRef = doc(db, 'responsavel', user.uid)
                const snapshot = await getDoc(docRef)
                setRec(snapshot.data())
        });
        setAluno(rec.nomeAluno)
        console.log(aluno)
    }, [gatilho])

    if(!rec || !aluno){
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
            <View style={{ marginTop:'15%', justifyContent:'center', marginBottom:'2%'}}>
                <TouchableOpacity onPress={()=>navigation.openDrawer()} style={{flex:1,position:'absolute'}}>
                  <Entypo name="menu" size={29} color="black" style={styles.iconMenu}/>
                </TouchableOpacity>
                <View style={{ justifyContent:'center', alignItems:'center'}}>
                <Text style={{fontSize:18, fontFamily:'AileronH'}}>Passageiros</Text>
              </View>
            </View>

      <View style={styles.fundoTab}>
        <Text style={{fontSize:18,fontFamily:'AileronH', marginTop:'5%'}}>
          TODOS ({rec.nomeAluno.length})
        </Text>

        {aluno.map((item, index)=>{
          const key = index
            return(
              <TouchableOpacity style={styles.botaoEscola} onPress={()=>navigation.navigate('TelaAluno', {key})}>
              <View style={styles.fundoEscola}>
                <View style={{padding:18, flexDirection:'row', alignItems:'center'}}>
                  <Image
                    source={{uri:'https://cdn-icons-png.flaticon.com/512/5987/5987462.png'}}      
                    style={{height:45,width:45}}
                  />
                  <Text style={styles.nome}>{item}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )
        })}
        <View style={styles.viewBotao}>
          <TouchableOpacity onPress={() => navigation.navigate('AddPassageiro')} style={styles.botaoAdd}>
              <Image source={require('../../../../assets/gradient.png')} style={[styles.gradient, {position:'absolute'}]}/>
              <Text style={{fontSize:16, fontFamily:'AileronH'}}>Adicionar passageiro</Text>
          </TouchableOpacity>
        </View>
      </View>
    
    </View>
  );
}

