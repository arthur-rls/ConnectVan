
import { Entypo, FontAwesome, AntDesign, FontAwesome5, Ionicons, Feather } from '@expo/vector-icons';
import { useEffect, useState, useRef } from 'react'
import styles from './style'
import { onAuthStateChanged, signOut } from 'firebase/auth';
import {db, auth} from '../../../firebase/config';
import {View, Text,Image,  TouchableOpacity, TextInput, Modal, ScrollView, Keyboard}  from 'react-native'
import { doc, getDoc, onSnapshot, getDocs, collection, collectionGroup, query, where, updateDoc} from 'firebase/firestore';
  
export default function MHome ({route, navigation}) {
    const [currentDate, setCurrentDate] = useState('');
    const [date, setDate] = useState('')
    const monthNames = ["JANEIRO", "FEVEREIRO", "MARÇO", "ABRIL", "MAIO", "JUNHO",
    "JULHO", "AGOSTO", "SETEMBRO", "OUTUBRO", "NOVEMBRO", "DEZEMBRO"];
    const monthMinNames = ["JANEIRO", "FEVEREIRO", "MARÇO", "ABRIL", "MAIO", "JUNHO",
    "JULHO", "AGOSTO", "SETEMBRO", "OUTUBRO", "Novembro", "Dezembro"];
    const [avisoA, setAvisoA] = useState('')
    const [avisoM, setAvisoM] = useState('')
    const [rec, setRec] = useState('')
    var [saldoS, setSaldoS] = useState(0)
    const [saldo, setSaldo] = useState(0)
    const [aviso, setAviso] = useState(false)
    const [gatilho, setGatilho] = useState(true)
    const [gatilho2, setGatilho2] = useState(true)
    const [avisoD, setAvisoD] = useState('')
    const [ver, setVer] = useState(false)
    const s = [] 
    const [edit, setEdit] = useState(true)
    const [via, setVia] = useState(true)
    const [showElement, setShowElement] = useState(false)
    
      const verSaldo=()=>{
      setVer(current=>!current)
      if(ver === false){
        calcSaldo()
      }
    } 

    useEffect(()=>{
        navigation.addListener('focus', () => {
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth(); //Current Month
        setCurrentDate(
            date + ' DE ' + monthNames[month] + ' DE 2023'
        );
        setDate(
            'Postado em: ' + date + ' de ' + monthMinNames[month] + ' de 2023'
        )
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const docRef = doc(db, 'motorista', user.uid)
                await getDoc(docRef).then(async(snapshot)=>{
                  setRec(snapshot.data())
                  const a = snapshot.data().avisando
                  setVia(snapshot.data().viajando)
                  console.log(snapshot.data().avisando)
                  if(rec.avisando === true || a === true||snapshot.data().avisando == true){
                    setAvisoA(snapshot.data().aviso)
                    setAvisoD(snapshot.data().data)
                    setAviso(snapshot.data().avisando)
                    setEdit(false)
                  }
                  console.log(rec)    
                  if(rec.viajando){
                    setShowElement(true)
                  }
                })
                
            }
        });
      })
    },[aviso, gatilho, gatilho2, via])

    if (!rec){
        return null
    }

    const calcSaldo =async()=>{
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const pago = query(collection(db, 'motorista', user.uid, 'responsavel'), where('pago','==', true))
          await getDocs(pago).then((docs)=>{
            docs.forEach((responsavel)=>{
                const dado = responsavel.data()
                const men = dado.mensalidade
                s.push(men)
            })
        })
        }
      for(var i = 0; i < s.length; i++) {
        saldoS += s[i];
      }
      setSaldo(saldoS)
      })
    }
    
    const avisar =()=>{
        if(gatilho==true){
            setGatilho(false)
            }
            else{
                setGatilho(true)
            }
        onAuthStateChanged(auth, async (user)=>{
            const docRef = doc(db, 'motorista', user.uid)
            updateDoc(docRef, {aviso: avisoA, data: date, avisando: true})
        })
        setAviso(true)
        setEdit(false)
        setAvisoD(date)
    }

    const apagar =()=>{
        if(gatilho==true){
            setGatilho(false)
            }
            else{
                setGatilho(true)
            }
        onAuthStateChanged(auth, async (user)=>{
            const docRef = doc(db, 'motorista', user.uid)
            updateDoc(docRef, {aviso: '', data: '', avisando: false})
        })
        setAviso(false)
        setAvisoA('')
        setEdit(true)
        setAvisoD('')
    }

    const parar =()=>{
      onAuthStateChanged(auth, (user)=>{
        if(user){
          const docRef = doc(db, 'motorista', user.uid)
          updateDoc(docRef, {viajando:false, rota:''})
        }
      })
      setVia(false)
      setGatilho(current=>!current)
      setGatilho2(current=>!current)
    }
    return(
        <View style={styles.container}>
            <Image source={require('../../../../assets/gradient.png')} style={{position:'absolute', width:'100%', height:'100%'}}/>
            <View style={{ marginTop:'13%', justifyContent:'center'}}>
                <TouchableOpacity onPress={()=>navigation.openDrawer()} style={{flex:1,position:'absolute'}}>
                  <Entypo name="menu" size={29} color="black" style={styles.iconMenu}/>
                </TouchableOpacity>
                <View style={{ justifyContent:'center', alignItems:'center'}}>
                <Text style={{fontSize:20, fontFamily:'AileronH'}}>Home</Text>
              </View>
            </View>

          <View style={styles.fundoTab}>
            <Text style={{ fontSize: 21, fontWeight: 'bold', paddingVertical: '7%', fontFamily:'AileronR' }}>
              {currentDate}
            </Text>

            <View style={styles.avisosSaldo}>
                <View style={styles.fundoSaldo}>
                  <View style={styles.linhaAmarela}/>
                  <View style={{width:'100%', padding:21}}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                      <Image source={require('../../../../assets/logo.png')} style={styles.logo}/>
                          <Text
                              style={{ fontSize: 19, fontFamily:'AileronH'}}>
                              {rec.nome}
                          </Text>
                      </View>
                      <Text style={{ fontSize: 18, marginBottom: 5, marginTop:'3%', fontFamily:'AileronR' }}>Saldo mensal</Text>
                      
                      <View style={{width:'147%', height:'32%', flexDirection:'row', justifyContent:'space-between'}}>
                        {ver?(
                          <Text
                        style={{
                            fontSize: 28,
                            fontWeight: 'bold',
                            marginRight: '27%',
                            fontStyle:'AileronH'
                        }}>
                        R${saldo}
                        </Text>
                        ):(
                          <Text
                        style={{
                            fontSize: 28,
                            fontWeight: 'bold',
                            marginRight: '27%',
                            fontStyle:'AileronH'
                        }}>
                        R$----
                        </Text>
                        )}
                        
                        <View style={{width:'22%', justifyContent:'center', height:'95%', marginRight:'50%'}}>
                            <Image source={require('../../../../assets/gradient.png')} style={[styles.gradient, {position:'absolute'}]} /> 
                            <View style={{justifyContent:'flex-end'}}>
                              <TouchableOpacity onPress={()=>{verSaldo()}} style={{}}> 
                              
                              {ver?(
                              <Text
                                  style={{
                                  fontSize: 16,
                                  fontWeight: 'bold',
                                  textAlign: 'center',
                                  }}>
                                  Ocultar
                              </Text>
                              ):(
                              <Text
                                  style={{
                                  fontSize: 16,
                                  fontWeight: 'bold',
                                  textAlign: 'center',
                                  
                                  }}>
                                  Ver
                              </Text>
                              )}
                              </TouchableOpacity>
                            </View>
                        </View>          
                      </View>
                  </View>
                </View>
            </View> 

        <View style={styles.avisos}> 
          <View style={styles.fundoSaldo}>
            <View style={styles.linhaAmarela}/>
            <View style={{width:'100%', padding:21}}>
              <View style={{flexDirection:'row', alignItems:'center'}}>
                  <Text
                      style={{ fontSize: 21, fontWeight: 'bold', fontFamily:'AileronH', marginBottom:-15}}>
                      AVISOS
                  </Text>
              </View>
              <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                <TextInput
                  placeholder="Escreva aqui..."
                  placeholderTextColor="#8B8A8A"
                  multiline
                  numberOfLines={5}
                  maxLength={300}
                  style={styles.inputi}
                  onChangeText={(value)=>setAvisoA(value)}
                  value={avisoA}
                  editable={edit}
                />
                {aviso?(
                  <TouchableOpacity style={styles.enviar} onPress={()=>apagar()}>
                    <FontAwesome name="trash" size={19} color="black" />
                  </TouchableOpacity>
                ):(
                  <TouchableOpacity style={styles.enviar} onPress={()=>avisar()}>
                      <FontAwesome name="send" size={19} color="black" />
                  </TouchableOpacity>
                )}
                
              </View>
              <Text>{avisoD}</Text>
            </View>
          </View>
        </View> 

        <View style={styles.viewBotao}>
            <TouchableOpacity style={styles.botaoAdd2} onPress={()=>navigation.navigate('Pedidos')}>
              <Image source={require('../../../../assets/gradient.png')} style={styles.gradientBotao}/>
              <Text style={{ fontSize: 18, fontFamily:'AileronH', position:'absolute' }}>
                Pedidos de contratação
              </Text>
            </TouchableOpacity>
            {via?(
                <TouchableOpacity
                  style={styles.botaoAdd2} onPress={()=>parar()}>
                  <Image source={require('../../../../assets/gradient2.png')} style={styles.gradientBotao} />
                  <View style={{ flexDirection: 'row', position:'absolute' }}>
                  <Text style={{ fontSize: 18, marginLeft: 10, fontFamily:'AileronH'}}>
                    Parar rota 
                  </Text>
                </View>
                </TouchableOpacity>
            ):(
                <TouchableOpacity
                  style={styles.botaoAdd2} onPress={()=>navigation.navigate('HomeRotaMotorista')}>
                  <Image source={require('../../../../assets/gradient.png')} style={styles.gradientBotao} />
                  <View style={{ flexDirection: 'row', position:'absolute' }}>
                  <FontAwesome5 name="map-marker-alt" size={23} color="black" />
                    <Text style={{ fontSize: 18, marginLeft:10, fontFamily:'AileronH'}}>
                      Iniciar Rota
                    </Text>
                  </View>
                </TouchableOpacity>
            )}
            
        </View>
        {showElement==true ? (
            <View style={{position:'absolute', backgroundColor:'green', marginTop: 50, padding:10, flexDirection:'row'}}>
                <TouchableOpacity onPress={()=>setShowElement(false)}>
                    <Feather name="x" size={20} color="white" />
                </TouchableOpacity>
                <Text style={{fontFamily:'AileronR', fontSize:21, color:'white'}}>Link de rota enviado com sucesso.</Text>
            </View>
        ):null}
        </View>
        </View>
    )
}