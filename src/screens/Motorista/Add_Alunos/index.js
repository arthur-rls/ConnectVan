import { Text, SafeAreaView, View, TouchableOpacity, Linking, Image } from 'react-native';
import { Entypo, FontAwesome, Ionicons, Feather} from '@expo/vector-icons';
import styles from './style'
import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth';
import {db, auth} from '../../../firebase/config';
import {  doc, getDoc, setDoc, updateDoc, arrayRemove, arrayUnion, getDocs, collection} from 'firebase/firestore';


export default function AddAlunos ({route, navigation}) {
    const {idR, mensalidade, vencimento}= route.params
    const [soli, setSoli]=useState([]);
    const [mensagem, setmensagem] = useState('')
    const [nomeM, setNomeM] = useState('')
    const [rec, setRec] = useState('')
    const [showElement, setShowElement] = useState(false)
    const alunos = [] //push
    const [passageiros, setPassageiros] = useState([])
    const [respo, setRespo] = useState('')
    const [esc, setEsc] = useState([])

    useEffect(()=>{
        pegarDados()
    }, [])

    const pegarDados=()=>{
      onAuthStateChanged(auth, async (user) => {
        const docRef = doc(db, 'responsavel', idR)
        const snapshot = await getDoc(docRef)
        const docRefM = doc(db, 'motorista', user.uid)
        const snapshotM = await getDoc(docRefM)
        setRec(snapshot.data())
        setRespo(rec.nome)
        setPassageiros(rec.nomeAluno)
        setNomeM(snapshotM.data().nome)
        setEsc(snapshotM.data().escola)
        setmensagem(`Olá, sou o motorista ${nomeM} desejo conversar sobre os valores do transporte.`)
        const docRefA = collection(db, 'responsavel', idR, 'alunos')
        const snapshotA = await getDocs(docRefA)
        snapshotA.forEach((item)=>{
          alunos.push(item.data())
        })
        setSoli(alunos)
});
    }
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
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const docRef = doc(db, 'motorista', user.uid)
                updateDoc(docRef, {solicitacao: arrayRemove(idR), contratos: arrayUnion(idR)})
                setDoc(doc(db, 'motorista', user.uid, 'responsaveis', rec.nome), {nome: rec.nome, mensalidade: mensalidade, data: vencimento, pago: true})
                soli.forEach((item) => {
                  updateDoc(doc(db, 'motorista', user.uid, 'responsaveis', rec.nome), {filho: arrayUnion(item.nome)})
                  setDoc(doc(db, 'motorista', user.uid, 'passageiros', item.nome), {nome: item.nome, endereco: item.endereco, escola: item.escola, responsavel:rec.nome, sala: item.sala, serie: item.serie, periodo: item.periodo, telefone_responsavel: rec.telefone})
                  if(esc.includes(item.escola)){}
                  else{
                    updateDoc(docRef, {escola: arrayUnion(item.escola)})
                  }
                });
                
                updateDoc(doc(db,'responsavel', idR), {motorista: user.uid, mensalidade: mensalidade, data: vencimento,  pago:true})
            }
        });
        navigation.navigate('Home')
      }

  }

    if(!passageiros || !soli){
      pegarDados()
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
      <View style={{justifyContent:'space-between', flexDirection:'row', marginTop:'13%'}}>
        <TouchableOpacity onPress={()=>navigation.navigate('Pedidos')}>
          <Entypo name="chevron-left" size={26} color="black" style={styles.iconMenu}/>
        </TouchableOpacity>
        <Text style={{fontSize:18, fontFamily:'AileronH'}}>{rec.nome}</Text>
        <TouchableOpacity style={{padding:11, paddingLeft:'23%'}} onPress={()=>Linking.openURL('whatsapp://send?text='+ mensagem +'&phone=' + '+55' + rec.telefone)}>
          <FontAwesome name="whatsapp" size={28} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.fundoTab}>
        <Text style={{fontSize:18, fontFamily:'AileronH', marginVertical:'5%'}}>
          TODOS ({soli.length})
        </Text>
        {passageiros.map((item) => {
            return(
              <TouchableOpacity style={styles.botaoEscola} onPress={()=> navigation.navigate('AddAluno2', {item, respo, idR})}>
                <View style={styles.fundoEscola}>
                  <View style={{padding:18, flexDirection:'row', alignItems:'center'}}>
                    <FontAwesome name="user-circle-o" size={24} color="black" />
                    <Text style={{fontSize:17, fontFamily:'AileronH', marginLeft:'5%'}}>{item}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )
          })}

        <View style={{flexDirection:'row', marginTop:'4%', paddingHorizontal:15, marginLeft:5}}>
          <View style={styles.viewMae}/>
          <View style={{flexDirection:'column', marginLeft:'5%'}}>
            <Text style={{marginTop:'4%', fontSize:17, fontFamily:'AileronH'}}>Mensalidade</Text>
            <Text style={{marginTop:'2%', fontSize:16, color:'#757575', fontFamily:'AileronR'}}>{mensalidade? 'R$'+mensalidade :'Nenhum valor foi inserido.'}</Text>
          </View>
          <TouchableOpacity style={{padding:11, paddingLeft:'22%'}} onPress={()=>navigation.navigate('AddMensalidades', {idR})}>
            <Ionicons name="add-sharp" size={34} color="black" />
          </TouchableOpacity>
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
              Adicionar
            </Text>
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

