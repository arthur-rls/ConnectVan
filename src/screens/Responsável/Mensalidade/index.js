import { Entypo } from '@expo/vector-icons';
import styles from './style'
import {useState, useEffect} from 'react'
import { onAuthStateChanged } from 'firebase/auth';
import {db, auth} from '../../../firebase/config';
import {View, Text,Image,  TouchableOpacity, TextInput, Modal, ScrollView, Keyboard} from 'react-native'
import { doc, getDoc, onSnapshot, getDocs, collection, collectionGroup, query, where, updateDoc} from 'firebase/firestore';

export default function Mensalidade({navigation}) {
    const [dado, setDado] = useState('')
    const [contrato, setContrato] = useState(false)
    const [dia, setDia] = useState('')
    const [mes, setMes] = useState('')
    const [pag, setPag] = useState(false)
    const [gatilho, setGatilho] = useState(false)
    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  useEffect(()=>{
    navigation.addListener('focus', () => {
    var date = new Date().getDate();
    var month = new Date().getMonth(); //Current Month
    setDia(date)
    setMes(monthNames[month+1])
    onAuthStateChanged(auth, async(user)=>{
        const docRef = doc(db, 'responsavel', user.uid)
        await getDoc(docRef).then((snapshot)=>{
          setDado(snapshot.data())
        setPag(snapshot.data().pago)
        if(dado.motorista != '' && dado.motorista != undefined && dado.motorista != null){
            setContrato(true)
        }
        })
        
        console.log('a')
        
    })
  })
  },[gatilho, pag])

  const pago=()=>{
      onAuthStateChanged(auth, async (user)=>{
        const docRef = doc(db, 'motorista', dado.motorista, 'responsaveis', dado.nome)
        updateDoc(docRef, {pago:true})
        const docRef2 = doc(db,'responsavel', user.uid)
        updateDoc(docRef2, {pago:true})
        await getDoc(docRef2).then((snapshot)=>{
          setPag(snapshot.data().pago)
        setGatilho(current=>!current)
        })
        
      })
  }

  const reset=()=>{
    if(dado.motorista != '' && dado.motorista != undefined && dado.motorista != null){
      setContrato(true)
    }
    console.log(contrato)
        console.log(dado.motorista)
  }

  if(!dado){
    return null
  }
  
  if(contrato==false){
    reset()
    return(
        <View style={styles.container}>
          <Image source={require('../../../../assets/gradient.png')} style={{width:'100%', height:'100%', position:'absolute'}}/>
          <View style={{ marginTop:'13%', justifyContent:'center'}}>
              <TouchableOpacity onPress={()=>navigation.openDrawer()} style={{flex:1,position:'absolute'}}>
                  <Entypo name="menu" size={29} color="black" style={{marginLeft:15}}/>
              </TouchableOpacity>
              <View style={{ justifyContent:'center', alignItems:'center'}}>
                  <Text style={{fontSize:18, fontFamily:'AileronH'}}>Mensalidades</Text>
              </View>
          </View>

      <View style={styles.fundoTab2}>
        <View style={{height:'10%', width:'50%'}}>
          <Image
            source={require('../../../../assets/avan.png')}
            style={{width:'100%', height:'100%'}}
          />
        </View>
        <View style={{marginTop:'3%'}}>
          <Text style={{fontSize:18, fontFamily:'AileronH', color:'gray', textAlign:'center'}}>Oops! Ainda não há</Text>
          <Text style={{fontSize:18, fontFamily:'AileronH', color:'gray', textAlign:'center'}}>nenhum motorista</Text>
          <Text style={{fontSize:18, fontFamily:'AileronH', color:'gray', textAlign:'center'}}>contratado.</Text>
        </View>
        <View style={styles.viewBotao}>
        <TouchableOpacity style={styles.botao} onPress={()=>navigation.navigate('Pesquisar')}>
            <Image source={require('../../../../assets/gradient.png')} style={styles.gradient}/>
            <Text style={{fontSize:16, fontFamily:'AileronH', position:'absolute'}}>Contratar</Text>
        </TouchableOpacity> 
        </View>
      </View>      
    </View>
    )
  }
  else{
  return (
    <View style={styles.container}>
      <Image source={require('../../../../assets/gradient.png')} style={{width:'100%', height:'100%', position:'absolute'}}/>
      <View style={{ marginTop:'13%', justifyContent:'center'}}>
          <TouchableOpacity onPress={()=>navigation.openDrawer()} style={{flex:1,position:'absolute'}}>
              <Entypo name="menu" size={29} color="black" style={{marginLeft:15}}/>
          </TouchableOpacity>
          <View style={{ justifyContent:'center', alignItems:'center'}}>
              <Text style={{fontSize:18, fontFamily:'AileronH'}}>Mensalidades</Text>
          </View>
      </View>
      <View style={styles.fundoTab}>

        {/* <View style={{flexDirection:'row', paddingLeft:-10, paddingTop:30, paddingBottom: dado.pago? '10%':0}}>
          <View style={[styles.viewMae, {height:45}]}/>
          <View style={{flexDirection:'column', marginLeft:'5%'}}>
              <Text style={styles.viewFilha}>R${dado.mensalidade}</Text>
              {dado.data>=dia?(
                  <Text style={styles.infos}>Vence dia {dado.data}</Text>
              ):(
                  <Text style={styles.infos}>Venceu dia {dado.data}</Text>
              )}
            </View>
        </View> */}

        <View style={{paddingVertical:'13%'}}>
          <View style={{flexDirection:'row', alignItems:'center', paddingBottom: pag? '10%':0}}>
            <View style={{height:78, width:2, backgroundColor:'black', borderRadius:50}}/>
              <View style={{flexDirection:'column', marginLeft:'5%'}}>
                <Text style={styles.viewFilha}>Valor da mensalidade</Text>
                <Text style={styles.infos}>R${dado.mensalidade}</Text>
                {dado.data>=dia?(
                    <Text style={styles.infos}>Vence dia {dado.data}</Text>
                ):(
                    <Text style={styles.infos}>Venceu dia {dado.data}</Text>
                )}
              </View>
          </View>
          
          {pag? null:(
            <View style={styles.viewBotao}>
            <TouchableOpacity style={styles.botaoDefPago} onPress={()=>pago()}>
              <Image source={require('../../../../assets/gradient.png')} style={styles.gradient}/>
              <Text style={{fontSize:16, fontFamily:'AileronH', position:'absolute'}}>Definir como pago</Text>
            </TouchableOpacity>
          </View>
          )}
          <View style={{flexDirection:'row', alignItems:'center'}}>
            <View style={{height:55, width:2, backgroundColor:'black', borderRadius:50}}/>
            <View style={{flexDirection:'column', marginLeft:'5%'}}>
              <Text style={styles.viewFilha}>Data do próximo pagamento</Text>
              <Text style={styles.infos}>{dado.data} de {mes}</Text>
            </View>
          </View>
        </View>

      </View>      
    </View>
  );
  }
}

