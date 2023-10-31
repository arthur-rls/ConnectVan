import { Entypo, FontAwesome, AntDesign, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useEffect, useState, useRef } from 'react'
import styles from './style'
import { onAuthStateChanged } from 'firebase/auth';
import {db, auth} from '../../../firebase/config';
import {View, Text,Image,  TouchableOpacity, TextInput, Modal, ScrollView, Keyboard, Linking} from 'react-native'
import { doc, getDoc, onSnapshot, getDocs, collection, collectionGroup, query, where, updateDoc} from 'firebase/firestore';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import * as  Notification from 'expo-notifications'

//fazer home pra nenhum motorista
export default function RHome ({route, navigation}) {
    const [currentDate, setCurrentDate] = useState('');
    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    const [motorista, setMotorista] = useState('')
    const [viagem, setViagem] = useState(false);
    const [rota, setRota] = useState('')
    const [rec, setRec] = useState('')
    const [pago, setPago] = useState('')
    const[token, setToken] = useState(null)
    useEffect(()=>{
        handleCallNotification()
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth(); //Current Month
        setCurrentDate(
            'Hoje, '+date + ' de ' + monthNames[month]
        );
        onAuthStateChanged(auth, async(user)=>{
            const docRef = doc(db, 'responsavel', user.uid)
            const snapshot = await getDoc(docRef)
            const dado = snapshot.data()

            const moto = dado.motorista
            setRec(dado)
            console.log(moto)

            if(moto != undefined){
                const docRef2 = doc(db, 'motorista', moto)
                const snapshot2 = await getDoc(docRef2)
                const dado2 = snapshot2.data()
                setMotorista(dado2)
                setViagem(motorista.viajando)
                if(viagem){
                    setRota(motorista.rota) 
                }
            }
        })
        setPago(rec.pago)
    },[])

    Notification.setNotificationHandler({
        handleNotification: async () => ({
          shouldPlaySound: true,
          shouldSetBadge: true,
          shouldShowAlert: true
        })
      })
  
      const handleCallNotification = async () =>{
        const {status} = await Notification.getPermissionsAsync()
  
        console.log(status)
    
        if(status != 'granted'){
          console.log('notificação não aceita')
          return
        }
  
        await Notification.getExpoPushTokenAsync().then((token)=>{
           setToken(token.data)
           onAuthStateChanged(auth, (user)=>{
            if(user){
              updateDoc(doc(db, 'motorista', user.uid), {token: token})
            }
           })
        })
      }
  
      const message = {
        to: {token},
        title: 'Original Title',
        body: 'And here is the body!',
      }
      
      async function send(){
        fetch('https://exp.host/--/api/v2/push/send', {
          method:'POST',
          headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(message)
        })
      }
      

    const acompanhar=()=>{
        Linking.openURL(rota)
    }
    return(
        <View style={styles.container}>
            <Image source={require('../../../../assets/gradient.png')} style={{width:'100%', height:'100%', position:'absolute'}}/>
            <View style={styles.viewInput}>
                <View style={{position:'absolute', width:'100%', zIndex:2, marginLeft:'10%'}}>
                    <TouchableOpacity style={{ width:'5%'}} onPress={()=>navigation.openDrawer()}>
                        <Entypo name="menu" size={24} color="black"/>
                    </TouchableOpacity>
                </View>
                <TextInput style={styles.input} onFocus={()=>navigation.navigate('Pesquisar')}/>
                <View style={{position:'absolute', width:'100%', alignItems:'flex-end', marginRight:'10%'}}>
                    <TouchableOpacity onPress={()=>navigation.navigate('Pesquisar')}>
                        <FontAwesome name="search" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.fundoTab}>
                <Text style={{ fontSize: 25,margin: '8%', fontFamily:'AileronH' }}>
                    {currentDate}
                </Text>
                {motorista?(
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
                                <Text style={{ fontSize: 18, marginBottom: 5 }}>Mensalidade</Text>
                                <View style={{width:'100%', height:'30%', flexDirection:'row',}}>
                                    <Text
                                    style={{
                                        fontSize: 29,
                                        fontWeight: 'bold',
                                        marginRight: '30%',
                                    }}>
                                    R${rec.mensalidade},00
                                    </Text>
                                    <View style={{width:'30%', justifyContent:'center', height:'100%', alignItems:'center'}}>
                                        <Image source={require('../../../../assets/gradient.png')} style={styles.gradient} /> 
                                        {pago?(
                                            <Text
                                            style={{
                                            fontSize: 16,
                                            fontWeight: 'bold',
                                            textAlign: 'center',
                                            position:'absolute'
                                            }}>
                                            Pago
                                        </Text>
                                        ):(
                                            <Text
                                            style={{
                                            fontSize: 16,
                                            fontWeight: 'bold',
                                            textAlign: 'center',
                                            position:'absolute'
                                            }}>
                                            Não pago
                                        </Text>
                                        )}
                                    </View>
                                    
                                </View>
                            </View>
                        </View>
                    <View>
                    <Text style={{fontFamily:'AileronH', fontSize:20, marginVertical: '5%'}}>Motorista {motorista.nome}</Text>
                    <View style={[styles.fundoSaldo, {flexDirection:'column', alignItems:'flex-start', paddingLeft:'5%',}]}>
                        <View style={styles.viewMae}/>
                        <Text style={{
                            fontSize: 26,
                            fontFamily:'AileronH',
                            marginBottom:'10%',
                            marginTop:'5%'
                        }}>Avisos</Text>
                        {motorista.avisando?(
                            <View style={{width:'100%', paddingBottom: '5%', paddingRight:'5%'}}>
                                <Text style={{fontFamily:'AileronR', fontSize:18, marginBottom:'10%'}}>{motorista.aviso}</Text>
                                <View style={{width:'100%', flexDirection:'row', justifyContent:'flex-end'}}>
                                    <Text style={{fontFamily:'AileronR', fontSize:14}}>{motorista.data}</Text>
                                </View>
                            </View>
                            
                        ):(
                            <Text style={{fontFamily:'AileronR', marginBottom:'10%'}}>Nenhum aviso.</Text>
                        )}
                    </View>
                </View>
                {viagem?(
                <View style={styles.viewBotao}>
                    <TouchableOpacity onPress={() => acompanhar()} style={styles.botaoMaps}>
                        <Image source={require('../../../../assets/gradient.png')} style={[styles.gradient, {position:'absolute'}]}/>
                        <Ionicons name="ios-location-sharp" size={24} color="black" />
                        <Text style={{fontSize:16, fontWeight:'bold', marginLeft:'5%'}}>Acompanhar rota</Text>
                    </TouchableOpacity>
                </View>
                ):null}
                </View>
            ):(
                <Text>
                    Nenhum motorista adicionado ainda, mande solicitação para algum motorista para desfrutar o máximo do aplicativo.
                </Text>
            )}
            </View>
            
        </View>
    ) 
}