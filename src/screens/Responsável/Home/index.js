import { Entypo, FontAwesome, AntDesign, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useEffect, useState, useRef } from 'react'
import styles from './style'
import { onAuthStateChanged } from 'firebase/auth';
import {db, auth} from '../../../firebase/config';
import {View, Text,Image,  TouchableOpacity, TextInput, Modal, ScrollView, Keyboard, Linking} from 'react-native'
import { doc, getDoc, onSnapshot, getDocs, collection, collectionGroup, query, where, updateDoc} from 'firebase/firestore';

//fazer home pra nenhum motorista
export default function RHome ({route, navigation}) {
    const [currentDate, setCurrentDate] = useState('');
    const monthNames = ["JANEIRO", "FEVEREIRO", "MARÇO", "ABRIL", "MAIO", "JUNHO",
    "JULHO", "AGOSTO", "SETEMBRO", "OUTUBRO", "NOVEMBRO", "DEZEMBRO"];
    const [motorista, setMotorista] = useState('')
    const [viagem, setViagem] = useState(false);
    const [rota, setRota] = useState('')
    const [rec, setRec] = useState('')
    const [pago, setPago] = useState('')
    useEffect(()=>{
        navigation.addListener('focus', () => {
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth(); //Current Month
        setCurrentDate(
            'HOJE, '+date + ' DE ' + monthNames[month]
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
    })
    },[])

    const acompanhar=()=>{
        Linking.openURL(rota)
    }
    return( 
        <View style={styles.container}>
            <Image source={require('../../../../assets/gradient.png')} style={{width:'100%', height:'100%', position:'absolute'}}/>
            <View style={styles.viewInput}>
                <View style={{position:'absolute', width:'100%', zIndex:2, marginLeft:'18%'}}>
                    <TouchableOpacity style={{ width:'5%'}} onPress={()=>navigation.openDrawer()}>
                        <Entypo name="menu" size={28} color="black"/>
                    </TouchableOpacity>
                </View>
                <TextInput style={styles.input} onFocus={()=>navigation.navigate('Pesquisar')}/>
                <View style={{position:'absolute', width:'100%', alignItems:'flex-end', marginRight:'20%'}}>
                    <TouchableOpacity onPress={()=>navigation.navigate('Pesquisar')}>
                        <FontAwesome name="search" size={21} color="black" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.fundoTab}>
                <Text style={{ fontSize: 20, margin:'6%', fontFamily:'AileronH' }}>
                    {currentDate}
                </Text>
                {motorista?(
                <View style={styles.saldot}>
                    <View style={styles.fundoSaldo}>
                        <View style={styles.viewMae}/>
                            <View style={{padding: 23}}>
                                <View style={{flexDirection:'row'}}>
                                    <Image source={require('../../../../assets/logo.png')} style={styles.logo}/>
                                    <Text
                                        style={{ fontSize: 20, fontFamily:'AileronH', marginTop:8}}>
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