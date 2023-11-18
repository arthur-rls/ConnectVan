import styles from './style'
import { Text, SafeAreaView, StyleSheet, View, TouchableOpacity, Image, Linking } from 'react-native';
import { Entypo, Ionicons, FontAwesome, Feather } from '@expo/vector-icons';
import {useRef, useState, useEffect} from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import {db, auth} from '../../../firebase/config';
import {  setDoc, doc, getDoc, updateDoc, arrayUnion , deleteField, arrayRemove } from 'firebase/firestore';


export default function AddAluno ({route, navigation}) {
    const { idR, mensalidade, vencimento, name } = route.params;
    const [rec, setRec] = useState('');
    const [recA, setRecA] = useState('');
    const [mensagem, setmensagem] = useState('')
    const [showElement, setShowElement] = useState(false)

    useEffect(()=>{
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const docRef = doc(db, 'responsavel', idR)
                const snapshot = await getDoc(docRef)
                setRec(snapshot.data());
                const docRef2 = doc(db, 'responsavel', idR, 'alunos', name)
                const snapshot2 = await getDoc(docRef2)
                setRecA(snapshot2.data());
                const docRefM = doc(db, 'motorista' , user.uid)
                const snapshotM = await getDoc(docRefM)
                setmensagem(`Olá, sou o motorista ${snapshotM.data().nome} desejo conversar sobre os valores do transporte.`)
            }
        })
        console.log(rec)
    }, [mensagem])
    const rejeitar =()=>{
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const docRef = doc(db, 'motorista', user.uid)
                updateDoc(docRef, {solicitacao: arrayRemove(idR)})
            }
        })
        navigation.navigate('HomeMotorista')
    }
    const adicionar =()=>{
        if(!mensalidade || !vencimento || mensalidade == '' || vencimento == ''){
          setShowElement(true)
        }
        else{
          onAuthStateChanged(auth, async (user) => {
              if (user) {
                  const docRef = doc(db, 'motorista', user.uid)
                  updateDoc(docRef, {solicitacao: arrayRemove(idR), contratos: arrayUnion(idR)})
                  setDoc(doc(db, 'motorista', user.uid, 'passageiros', name), {nome: recA.nome, endereco: recA.endereco, escola: recA.escola, responsavel:rec.nome, sala: recA.sala, serie: recA.serie, periodo: recA.periodo, telefone_responsavel: rec.telefone})
                  setDoc(doc(db, 'motorista', user.uid, 'responsavel', rec.nome), {nome: rec.nome, mensalidade: mensalidade, data: vencimento, pago: true, filho: arrayUnion(name)})
                  updateDoc(doc(db, 'responsavel', idR), {motorista: user.uid, mensalidade: mensalidade, data: vencimento, pago:true})
              }
          });
          navigation.navigate('Home')
        }
    }

    if(!rec){
        return null
    }
  return (

    <View style={styles.container}>
      <Image source={require('../../../../assets/gradient.png')} style={{width:'100%', height:'100%', position:'absolute'}}/>
      <View style={{ marginTop:'10%', justifyContent:'center', marginBottom:'2%'}}>
          <TouchableOpacity onPress={()=>navigation.navigate('Home')} style={{flex:1,position:'absolute'}}>
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
              <Text style={styles.titulo}>{rec.nome}</Text>
              <Text style={styles.infos}>Responsável</Text>
              <Text style={styles.titulo}>{recA.nome}</Text>
              <Text style={styles.infos}>Aluno</Text>
            </View>
            <TouchableOpacity style={{padding:17, paddingLeft:18}} onPress={()=>Linking.openURL('whatsapp://send?text='+ mensagem +'&phone=' + rec.telefone)}>
            <FontAwesome name="whatsapp" size={28} color="black" />
          </TouchableOpacity>
          </View>
          
        

        <View style={{flexDirection:'row'}}>
            <View style={[styles.viewMae, {height:135}]}/> 
              <View style={{flexDirection:'column', marginLeft:'11%'}}>
            <Text style={styles.viewFilha}>Escola</Text>
            <Text style={styles.infos}>{recA.escola}</Text>
            <Text style={styles.infos}>{recA.sala}</Text>
            <Text style={styles.infos}>{recA.serie}</Text>
            <Text style={styles.infos}>{recA.periodo}</Text>
          </View>
        </View>

        <View style={{flexDirection:'row'}}>
            <View style={[styles.viewMae, {height:106}]}/>
            <View style={{flexDirection:'column', marginLeft:'11%'}}>
            <Text style={styles.viewFilha}>Endereço</Text>
            <Text style={styles.infos}>{recA.endereco}</Text>
          </View>
        </View>

        <View style={{flexDirection:'row'}}>
            <View style={[styles.viewMae, {height:60}]}/>
            <View style={{flexDirection:'column', marginLeft:'11%'}}>
            <Text style={styles.titulo}>Mensalidade</Text>
            <Text style={{marginTop:'2%', fontStyle:'italic', color:'#757575'}}>{mensalidade? 'R$'+mensalidade :'Nenhum valor foi inserido.'}</Text>
          </View>
          <TouchableOpacity style={{padding:11, paddingLeft:23}} onPress={()=>navigation.navigate('AddMensalidade', {idR})}>
            <Ionicons name="add-sharp" size={34} color="black" />
          </TouchableOpacity>
        </View>
        </View>
        
        <View style={styles.viewBotao}>
          <TouchableOpacity style={[styles.botaoAdd, {backgroundColor:'gray'}]} onPress={()=>rejeitar()}>
            <Image source={require('../../../../assets/gradient2.png')} style={styles.gradient} />
            <Text style={{fontSize:16, position:'absolute', fontFamily:'AileronH'}}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botaoAdd} onPress={()=>adicionar()}>
            <Image source={require('../../../../assets/gradient.png')} style={styles.gradient} />
            <Text style={{fontSize:16, fontFamily:'AileronH', position:'absolute'}}>Finalizar</Text>
          </TouchableOpacity>
        </View>
        {showElement==true ? (
          <View style={styles.senhaErrOuIncorr}>
              <TouchableOpacity onPress={()=>setShowElement(false)}>
                  <Feather name="x" size={20} color="white" />
              </TouchableOpacity>
              <Text style={{fontFamily:'AileronR', fontSize:16, color:'white'}}>Por favor insira uma mensalidade e data de vencimento.</Text>
          </View>
      ):null}
      </View>
      
    </View>
  );
}