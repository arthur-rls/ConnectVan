
import { Entypo, FontAwesome, AntDesign, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useEffect, useState, useRef } from 'react'
import styles from './style'
import { onAuthStateChanged, signOut } from 'firebase/auth';
import {db, auth} from '../../../firebase/config';
import {View, Text,Image,  TouchableOpacity, TextInput, Modal, ScrollView, Keyboard}  from 'react-native'
import { doc, getDoc, onSnapshot, getDocs, collection, collectionGroup, query, where, updateDoc} from 'firebase/firestore';

export default function MHomeRota ({route, navigation}) {
    const [currentDate, setCurrentDate] = useState('');
    const [date, setDate] = useState('')
    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    const [avisoA, setAvisoA] = useState('')
    const [avisoM, setAvisoM] = useState('')
    const [rec, setRec] = useState('')
    var [saldoS, setSaldoS] = useState(0)
    const [saldo, setSaldo] = useState(0)
    const [aviso, setAviso] = useState(false)
    const [gatilho, setGatilho] = useState(true)
    const [avisoD, setAvisoD] = useState('')
    const [ver, setVer] = useState(false)
    const s = []
    
      const verSaldo=()=>{
      setVer(current=>!current)
    } 

    useEffect(()=>{
        navigation.addListener('focus', () => {
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth(); //Current Month
        setCurrentDate(
            'Hoje, '+date + ' de ' + monthNames[month]
        );
        setDate(
            date + ' de ' + monthNames[month]
        )
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const q = query(collection(db, 'motorista', user.uid, 'responsavel'), where('pago','==', true))
                const docRef = doc(db, 'motorista', user.uid)
                const snapshot = await getDoc(docRef)
                setRec(snapshot.data());
                setAviso(rec.avisando)
                setAvisoA(rec.aviso)
                setAvisoD(rec.data)
                updateDoc(docRef, {viajando: false, rota:''})             
                const snapshot2 = await getDocs(q)
                snapshot2.forEach((item)=>{
                    const dado = item.data()
                    const men = dado.mensalidade
                    s.push(men)
                })
                

                
                for(var i = 0; i < s.length; i++) {
                  saldoS += s[i];
                }
                setSaldo(saldoS)
            }
        });
      })
        
    },[aviso, gatilho])

    if (!rec){
        return null
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
            updateDoc(docRef, {aviso: avisoM, data: date, avisando: true})
        })
        setAviso(true)
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
    }

    const parar =()=>{
      onAuthStateChanged(auth, (user)=>{
        if(user){
          const docRef = doc(db, 'motorista', user.uid)
          updateDoc(docRef, {viajando:false})
        }
      })
    }
    return(
        <View style={styles.container}>
            <Image source={require('../../../../assets/gradient.png')} style={{position:'absolute', width:'100%', height:'100%'}}/>
            <View style={{width:'100%', alignItems:'center', paddingTop:'10%', flexDirection:'row'}}>
                        <TouchableOpacity onPress={()=>navigation.openDrawer()} style={{paddingHorizontal:'2%'}}>
                            <Entypo
                                name="menu"
                                size={34}
                                color="black"
                            />
                        </TouchableOpacity>
                        <View style={{ alignSelf:'center', paddingLeft:'30%'}}>
                            <Text
                            style={{
                                fontSize: 24,
                                fontWeight: 'bold',
                                alignSelf:'center'
                            }}>
                            Home
                            </Text>
                        </View>
                        
            </View>

        <View style={styles.fundoTab}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', margin: '8%', fontFamily:'AileronR' }}>
          {currentDate}
        </Text>

        <View style={styles.saldot}>
            
          <View style={styles.fundoSaldo}>
          <View style={styles.viewMae}/>
            <View style={{margin: 23}}>
                
                <View style={{flexDirection:'row'}}>
                    <Image source={require('../../../../assets/logo.png')} style={{width: 25, height: 25, resizeMode: 'stretch', borderRadius:100, marginRight:10}}/>
                    <Text
                        style={{ fontSize: 20, marginBottom: 5, fontWeight: 'bold' }}>
                        {rec.nome}
                    </Text>
                </View>
              <Text style={{ fontSize: 18, marginBottom: 5 }}>Saldo total</Text>
              <View
                style={{ alignContent: 'space-between', flexDirection: 'row' }}>
                {ver?(
                  <Text
                  style={{
                    fontSize: 29,
                    fontWeight: 'bold',
                    marginRight: '30%',
                  }}>
                  R${saldo}
                </Text>
                ):(
                  <Text
                  style={{
                    fontSize: 29,
                    fontWeight: 'bold',
                    marginRight: '30%',
                  }}>
                  R$ ****
                </Text>
                )}
                <TouchableOpacity style={styles.botaoAdd} onPress={()=>verSaldo()}>
                <Image source={require('../../../../assets/gradient.png')} style={styles.gradient} />
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      textAlign: 'center',
                      position:'absolute'
                    }}>
                    Ver
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View style={[styles.saldot, { paddingBottom: '10%' }]}>
          <View style={[styles.fundoSaldo, {flex:1}]}>
            <View style={styles.viewMae}/>
            <View style={{margin:23}}>
             <View style={{ flexDirection:'row'}}>
                <Text
                  style={{
                    fontSize: 26,
                    marginBottom: 3,
                    fontWeight: 'bold',
                    marginRight: '59%',
                  }}>
                  AVISOS
                </Text>
                {aviso?(
                <View>
                <TouchableOpacity style={styles.apaga} onPress={()=>apagar()}>
                    <FontAwesome5 name="trash" size={24} color="black" />
                </TouchableOpacity>
                </View>
                ):null}
              </View>
                {aviso?(
                   <Text>{avisoA}</Text>
                   
                ):(
                    <TextInput
                    placeholder="Escreva Aqui..."
                    placeholderTextColor="#8B8A8A"
                    editable
                    multiline
                    numberOfLines={5}
                    maxLength={600}
                    style={styles.inputi}
                    onChangeText={(value)=>setAvisoM(value)}
                    value={avisoM}
                  />
                )}
                {aviso?null:(
                <TouchableOpacity style={styles.apaga} onPress={()=>avisar()}>
                    <FontAwesome name="send" size={24} color="black" />
                </TouchableOpacity>
                )}
                
              
               {aviso?(
                <Text style={[styles.data, { fontSize: 17, marginBottom: 5, alignSelf:'flex-end' }]}>
                    Feito em {avisoD}
                </Text>
               ):(        
              <Text style={[styles.data, { fontSize: 17, marginBottom: 5, alignSelf:'flex-end' }]}>
                {date}
              </Text>
              )}
            </View>
          </View>
        </View>

        <View style={styles.viewBotao}>
          <TouchableOpacity style={styles.botaoAdd2} onPress={()=>navigation.navigate('Pedidos')}>
          <Image source={require('../../../../assets/gradient.png')} style={styles.gradient}/>
            <Text style={{ fontSize: 19, fontFamily:'AileronH', position:'absolute' }}>
              Pedidos de contratação
            </Text>
          </TouchableOpacity>
          {rec.viajando?(
              <TouchableOpacity
              style={styles.botaoAdd2} onPress={()=>parar()}>
              <Image source={require('../../../../assets/gradient2.png')} style={styles.gradient} />
              <View style={{ flexDirection: 'row', position:'absolute' }}>
              <Text style={{ fontSize: 19, marginLeft: 10, fontFamily:'AileronH'}}>
                Parar rota
              </Text>
              </View>
            </TouchableOpacity>
          ):(
            <TouchableOpacity
            style={styles.botaoAdd2} onPress={()=>navigation.navigate('HomeRotaMotorista')}>
            <Image source={require('../../../../assets/gradient.png')} style={styles.gradient} />
            <View style={{ flexDirection: 'row', position:'absolute' }}>
            <FontAwesome5 name="map-marker-alt" size={24} color="black" />
            <Text style={{ fontSize: 19, marginLeft: 10, fontFamily:'AileronH'}}>
              Iniciar Rota
            </Text>
            </View>
          </TouchableOpacity>
          )}
        </View>
        </View>
        </View>
    )
}