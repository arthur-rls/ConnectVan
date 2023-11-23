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
      navigation.addListener('focus', () => {
        onAuthStateChanged(auth, async (user) => {
                const docRef = doc(db, 'responsavel', user.uid)
                await getDoc(docRef).then((snapshot)=>{
                  setRec(snapshot.data())
                  setAluno(snapshot.data().nomeAluno)
                  console.log(rec.motorista)
                })
        });
      })
    }, [gatilho])

    if(!rec || !aluno){
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
    else{
      
    }
  return (
    <View style={styles.container}>
      <Image source={require('../../../../assets/gradient.png')} style={{width:'100%', height:'100%', position:'absolute'}}/>
      <View style={{ marginTop:'13%', justifyContent:'center'}}>
        <TouchableOpacity onPress={()=>navigation.openDrawer()} style={{flex:1,position:'absolute'}}>
          <Entypo name="menu" size={29} color="black" style={styles.iconMenu}/>
        </TouchableOpacity>
        <View style={{ justifyContent:'center', alignItems:'center'}}>
        <Text style={{fontSize:18, fontFamily:'AileronH'}}>Passageiros</Text>
      </View>
    </View>

      <View style={styles.fundoTab}>
        <View style={styles.viewBotao}>
          {!rec.motorista ? (
              <TouchableOpacity onPress={() => navigation.navigate('AddPassageiro')} style={styles.botaoAdd}>
                <Image source={require('../../../../assets/gradient.png')} style={[styles.gradient, {position:'absolute'}]}/>
                    <Text style={{fontSize:16, fontFamily:'AileronH'}}>Adicionar passageiro</Text>
                </TouchableOpacity> 
          ):null}
        </View>
        <Text style={{fontSize:18,fontFamily:'AileronH'}}>
          TODOS ({rec.nomeAluno.length})
        </Text>

        {aluno.map((item)=>{
            return(
            <TouchableOpacity style={styles.botaoEscola} onPress={()=>navigation.navigate('TelaAluno', {item})}>
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
      </View>
    
    </View>
  );
}

