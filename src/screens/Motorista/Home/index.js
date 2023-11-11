
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
    const monthNames = ["JANEIRO", "FEVEREIRO", "MARÇO", "ABRIL", "MAIO", "JUNHO",
    "JULHO", "AGOSTO", "SETEMBRO", "OUTUBRO", "NOVEMBRO", "DEZEMBRO"];
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
            date + ' DE ' + monthNames[month] + ' DE 2023'
        );
        setDate(
          '0'+ date + ' de ' + monthNames[month] + ' DE 2023'
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

        

        {/* <View style={styles.avisos}>
            
          <View style={styles.fundoSaldo}>
            <View style={styles.linhaAmarela}/>
            <View style={{width:'100%', padding:21}}>
              <View style={{flexDirection:'row', alignItems:'center'}}>
                  <Text
                      style={{ fontSize: 20, fontWeight: 'bold', fontFamily:'AileronH'}}>
                      AVISOS
                  </Text>
              </View>
              <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                <TextInput
                  placeholder="Escreva aqui..."
                  placeholderTextColor="#8B8A8A"
                  editable
                  multiline
                  numberOfLines={5}
                  maxLength={300}
                  style={styles.inputi}
                  onChangeText={(value)=>setAvisoM(value)}
                  value={avisoM}
                />
                {aviso?null:(
                  <TouchableOpacity style={styles.enviar} onPress={()=>avisar()}>
                      <FontAwesome name="send" size={19} color="black" />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </View> */}

        <View style={styles.viewBotao}>
            <TouchableOpacity style={styles.botaoAdd2} onPress={()=>navigation.navigate('Pedidos')}>
              <Image source={require('../../../../assets/gradient.png')} style={styles.gradientBotao}/>
              <Text style={{ fontSize: 18, fontFamily:'AileronH', position:'absolute' }}>
                Pedidos de contratação
              </Text>
            </TouchableOpacity>
            {rec.viajando?(
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
        </View>
        </View>
    )
}