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
    const [moto, setMoto] = useState('')
    const [esc, setEsc]= useState([])

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
                setMoto(snapshotM.data())
                setEsc(snapshotM.data().escola)
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
        navigation.navigate('Home')
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
                  setDoc(doc(db, 'motorista', user.uid, 'passageiros', recA.nome), {nome: recA.nome, endereco: recA.endereco, escola: recA.escola, responsavel:rec.nome, sala: recA.sala, serie: recA.serie, periodo: recA.periodo, telefone_responsavel: rec.telefone})
                  setDoc(doc(db, 'motorista', user.uid, 'responsaveis', rec.nome), {nome: rec.nome, mensalidade: mensalidade, data: vencimento, pago: true, filho: arrayUnion(recA.nome)})
                  updateDoc(doc(db, 'responsavel', idR), {motorista: user.uid, mensalidade: mensalidade, data: vencimento, pago:true})
                  if(esc.includes(recA.escola)){}
                  else{
                    updateDoc(docRef, {escola: arrayUnion(recA.escola)})
                  }
              }
          });
          navigation.navigate('Home')
        }
    }

    if(!rec || !recA){
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
      <View style={{ marginTop:'13%', justifyContent:'center', marginBottom:'2%'}}>
          <TouchableOpacity onPress={()=>navigation.navigate('Pedidos')} style={{flex:1,position:'absolute'}}>
            <Entypo name="chevron-left" size={29} color="black" style={styles.iconMenu}/>
          </TouchableOpacity>
          <View style={{ justifyContent:'center', alignItems:'center'}}>
          <Text style={{fontSize:18, fontFamily:'AileronH'}}>{recA.nome}</Text>
          {showElement==true ? (
            <View style={styles.senhaErrOuIncorr}>
                <TouchableOpacity onPress={()=>setShowElement(false)}>
                    <Feather name="x" size={20} color="white" />
                </TouchableOpacity>
                <Text style={{fontFamily:'AileronR', fontSize:16, color:'white', marginLeft:7}}>Insira uma mensalidade e data de vencimento.</Text>
            </View>
          ):null}
        </View>
      </View>

      <View style={styles.fundoTab}>
        <View style={styles.fundo}>
          <View style={{flexDirection:'row'}}>
            <View style={[styles.viewMae, {height:60}]}/>
            <View style={{flexDirection:'column', paddingHorizontal:30}}>
              <Text style={styles.titulo}>{rec.nome}</Text>
              <Text style={styles.infos}>Responsável</Text>
            </View>
            <TouchableOpacity style={{padding:11, paddingLeft:'23%'}} onPress={()=>Linking.openURL('whatsapp://send?text='+ mensagem +'&phone=' + '+55' +  rec.telefone)}>
              <FontAwesome name="whatsapp" size={28} color="black" />
            </TouchableOpacity>
          </View>

        <View style={{flexDirection:'row'}}>
          <View style={[styles.viewMae, {height:150}]}/> 
          <View style={{flexDirection:'column', paddingHorizontal:30}}>
            <Text style={styles.viewFilha}>Escola</Text>
            <Text style={[styles.infos,{marginBottom:-3}]}>{recA.escola}</Text>
            <Text style={[styles.infos,{marginBottom:-3}]}>Turma: {recA.sala}º ano</Text>
            <Text style={[styles.infos,{marginBottom:-3}]}>Sala: {recA.serie}</Text>
            <Text style={[styles.infos,{marginBottom:-3}]}>Período: {recA.periodo}</Text>
          </View>
        </View>

        <View style={{flexDirection:'row'}}>
          <View style={[styles.viewMae, {height:85}]}/>
          <View style={{flexDirection:'column', paddingHorizontal:30, paddingRight:90}}>
            <Text style={[styles.viewFilha,{marginBottom:-8}]}>Endereço</Text>
            <Text style={styles.infos}>{recA.endereco}</Text>
          </View>
        </View>

        <View style={{flexDirection:'row'}}>
          <View style={[styles.viewMae, {height:60, justifyContent:'space-between'}]}/>
          <View style={{flexDirection:'column', paddingHorizontal:30}}>
          <Text style={{marginTop:'4%', fontSize:18, fontFamily:'AileronH'}}>Mensalidade</Text>
            <Text style={{marginTop:'2%', fontSize:16, color:'#757575', fontFamily:'AileronR'}}>{mensalidade? 'R$'+mensalidade :'Nenhum valor foi inserido.'}</Text>
          </View>
          <TouchableOpacity style={{padding:11, paddingLeft:23}} onPress={()=>navigation.navigate('AddMensalidade', {idR})}>
            <Ionicons name="add-sharp" size={34} color="black" />
          </TouchableOpacity>
        </View>
        
      </View>

        <View style={styles.viewBotao}>
          <TouchableOpacity style={[styles.botaoAdd, {backgroundColor:'gray'}]} onPress={()=>rejeitar()}>
            <Image source={require('../../../../assets/gradient2.png')} style={styles.gradientBotao}/>
            <Text style={{ fontSize: 17, fontFamily:'AileronH', position:'absolute' }}>
              Rejeitar
            </Text>
          </TouchableOpacity> 
          <TouchableOpacity style={styles.botaoAdd} onPress={()=>adicionar()}>
            <Image source={require('../../../../assets/gradient.png')} style={styles.gradientBotao}/>
            <Text style={{ fontSize: 17, fontFamily:'AileronH', position:'absolute' }}>
              Aceitar
            </Text>
          </TouchableOpacity> 
        </View>

      </View>
      
    </View>
  );
}