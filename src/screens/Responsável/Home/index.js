import { Entypo, FontAwesome, AntDesign, FontAwesome5, Feather, Ionicons } from '@expo/vector-icons';
import { useEffect, useState, useRef } from 'react'
import styles from './style'
import { onAuthStateChanged,  } from 'firebase/auth';
import {db, auth} from '../../../firebase/config';
import {View, Text,Image,  TouchableOpacity, TextInput, Modal, ScrollView, Keyboard, Linking} from 'react-native'
import { doc, getDoc, onSnapshot, getDocs, collection, collectionGroup, query, where, updateDoc, arrayUnion} from 'firebase/firestore';
import {Calendar, LocaleConfig} from 'react-native-calendars'

LocaleConfig.locales['pt-br'] = {
    monthNames : ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
    monthNamesShort: ['Jan.', 'Fev.', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul.', 'Ago', 'Set.', 'Out.', 'Nov.', 'Dec.'],
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    today: "Hoje"
  };
  
  LocaleConfig.defaultLocale = 'pt-br';
 
//colocar todo o{selected: true, disableTouchEvent: true, selectedDotColor: 'orange'} dentro de uma const com for each do selected
//fazer home pra nenhum motorista
export default function RHome ({route, navigation}) {
    const [currentDate, setCurrentDate] = useState('');
    const monthNames = ["JANEIRO", "FEVEREIRO", "MARÇO", "ABRIL", "MAIO", "JUNHO",
    "JULHO", "AGOSTO", "SETEMBRO", "OUTUBRO", "NOVEMBRO", "DEZEMBRO"];
    const [motorista, setMotorista] = useState('')
    const [rec, setRec] = useState('')
    const [modalVisible, setModalVisible] = useState(false);
    const selected = [];
    const [dia, setDia] = useState([])
    const [dado, setDado] = useState()
    const [marked, setMarked] = useState()
    let obj = {}

    const teste=async()=>{
        onAuthStateChanged(auth, async (user)=>{
        const docRef3 = doc(db, 'responsavel', user.uid)
        await getDoc(docRef3).then((snapshot3)=>{
            setDia(snapshot3.data().faltar)
            setDado(snapshot3.data().pago)
            
            if(dia != undefined && dia != null && dia != ''){
                dia.forEach((item)=>{
                    obj = {...obj, [item]: {selected: true, marked: true, selectedColor: 'red'}}
                })
                setMarked((prev)=>{
                    const newObj = {...prev, ...obj}
                    return newObj
                })
            }
            else{
            }
            setModalVisible(true)
            })
        })
    }
    const onDayPress = (day) => {
        selected.push(day.dateString)
        selected.forEach((item)=>{
             obj = {...obj, [item]: {selected: true, marked: true, selectedColor: 'red'}}
        })
        setMarked((prev)=>{
            const newObj = {...prev, ...obj}
            return newObj
        })
      };
    const confirmar = async ()=>{
        onAuthStateChanged(auth, (user)=>{
            if(marked){
                const a = Object.keys(marked)
                a.forEach((item)=>{
                    updateDoc(doc(db, 'motorista', rec.motorista, 'responsaveis', rec.nome), {faltar:arrayUnion(item)})
                    updateDoc(doc(db, 'responsavel', user.uid), {faltar:arrayUnion(item)})
                })
                setModalVisible(false) 
            }
            else{
                setModalVisible(false)
            }
        })
    }
    const clean=()=>{
        onAuthStateChanged(auth, (user)=>{
            setMarked()
        updateDoc(doc(db, 'motorista', rec.motorista, 'responsavel', rec.nome), {faltar:''})
        updateDoc(doc(db, 'responsavel', user.uid), {faltar:''})
        })
        
    }
    
    useEffect(()=>{
        navigation.addListener('focus', () => {
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth(); //Current Month
        setCurrentDate(
            date + ' DE ' + monthNames[month] + ' DE 2023'
        );
        
        pegarDado()
        })
    },[])

    function pegarDado(){
        onAuthStateChanged(auth, async(user)=>{
            const docRef = doc(db, 'responsavel', user.uid)
            await getDoc(docRef).then(async(snapshot)=>{
                const moto = snapshot.data().motorista
                setRec(snapshot.data())
                setDado(snapshot.data().pago)
                if(moto != undefined && moto != null && moto != ''){
                    const docRef2 = doc(db, 'motorista', moto)
                    const snapshot2 = await getDoc(docRef2)
                    const dado2 = snapshot2.data()
                    setMotorista(dado2)
                    console.log(motorista)
                    const docRef3 = doc(db, 'motorista', moto, 'responsavel', rec.nome)
                    await getDoc(docRef3).then((snapshot3)=>{
                        setDia(snapshot3.data().faltar)
                        console.log(dia)
                        if(dia != undefined && dia != null && dia != ''){
                            dia.forEach((item)=>{
                                obj = {...obj, [item]: {selected: true, marked: true, selectedColor: 'red'}}
                           })
                           setMarked((prev)=>{
                               const newObj = {...prev, ...obj}
                               return newObj
                           })
                        }
                        else{
                        }
                        })
                        
                }
            })
        })
    }

    const acompanhar=()=>{
        Linking.openURL(motorista.rota)
    }
    if(!rec || rec == undefined || rec == ''){
        return(
            <View style={styles.container}>
                <Image source={require('../../../../assets/gradient.png')} style={{width:'100%', height:'100%', position:'absolute'}}/>
                <View style={styles.viewInput}>
                <View style={{position:'absolute', width:'100%', zIndex:10, marginLeft:15}}>
                        <TouchableOpacity onPress={()=>navigation.openDrawer()}>
                            <Entypo name="menu" size={28} color="black"/>
                        </TouchableOpacity>
                    </View>
                        <View style={{ justifyContent:'center', alignItems:'center'}}>
                            <Text style={{fontSize:19, fontFamily:'AileronH'}}>Home</Text>
                        </View>
                </View>
                <View style={styles.fundoTab}>
                <Image source={require('../../../../assets/loading.gif')} style={{width:'100%', height:'100%', resizeMode: 'center',}}/>
                </View>
            </View>
        )
    }
    return(
        <View style={styles.container}>
            <Image source={require('../../../../assets/gradient.png')} style={{width:'100%', height:'100%', position:'absolute'}}/>
            <View style={styles.viewInput}>
                <View style={{position:'absolute', width:'100%', zIndex:10, marginLeft:15}}>
                    <TouchableOpacity onPress={()=>navigation.openDrawer()}>
                        <Entypo name="menu" size={28} color="black"/>
                    </TouchableOpacity>
                </View>
                    <View style={{ justifyContent:'center', alignItems:'center'}}>
                        <Text style={{fontSize:19, fontFamily:'AileronH'}}>Home</Text>
                    </View>
            </View>
            
            <View style={styles.fundoTab}>
                <Text style={{ fontSize: 21, fontWeight: 'bold', paddingBottom: '7%', paddingTop:'3%', fontFamily:'AileronR' }}>
                    {currentDate}
                </Text>
                <View style={styles.viewBotao}>
                    <TouchableOpacity onPress={() => teste()} style={[styles.botaoAdd2, {flexDirection:'row'}]}>
                        <Image source={require('../../../../assets/gradient.png')} style={[styles.gradientCalendario, {position:'absolute'}]}/>
                        <Feather name="calendar" size={24} color="black" />
                        <Text style={{fontSize:17, fontWeight:'bold', marginLeft:'5%'}}>Calendário</Text>
                    </TouchableOpacity>
                {motorista.viajando?(
                    <View>
                        <TouchableOpacity onPress={() => acompanhar()} style={[styles.botaoAdd2, {flexDirection:'row'}]}>
                            <Image source={require('../../../../assets/gradient.png')} style={[styles.gradientCalendario, {position:'absolute'}]}/>
                            <Ionicons name="ios-location-sharp" size={24} color="black" />
                            <Text style={{fontSize:17, fontWeight:'bold', marginLeft:'5%'}}>Acompanhar rota</Text>
                        </TouchableOpacity>
                    </View>
                ):null} 
                </View>
                
                {rec.motorista?(
                
                <View style={styles.viewSaldo}>
                    <View style={styles.fundoSaldo}>
                        <View style={styles.linhaAmarela}/>
                            <View style={{width:'100%', height:'100%', padding:21, paddingBottom:-10, paddingTop:13}}>
                                <View style={{flexDirection:'row', paddingRight:20, alignItems:'center'}}>
                                    <Image source={require('../../../../assets/logo.png')} style={styles.logo}/>
                                    <Text
                                        style={{ fontSize: 19, fontFamily:'AileronH', marginTop:5}}>
                                        {rec.nome}
                                    </Text>
                                </View>
                                <Text style={{ fontSize: 18, marginTop:'5%', fontFamily:'AileronR' }}>Mensalidade atual</Text>
                                <View style={{width:'100%', height:'29%', flexDirection:'row', marginTop:2}}>
                                    <Text
                                    style={{
                                        fontSize: 28,
                                        fontWeight: 'bold',
                                        marginRight: '27%',
                                        fontStyle:'AileronH'
                                    }}>
                                    R${rec.mensalidade}
                                    </Text>
                                    <View style={styles.botaoPagNPag}>
                                        <Image source={require('../../../../assets/gradient.png')} style={styles.gradientPagNPag}/> 
                                        {dado?(
                                            <Text style={{fontSize: 15, fontWeight: 'bold',textAlign: 'center',position:'absolute'}}>
                                                Pago
                                            </Text>
                                        ):(
                                            <Text style={{fontSize: 15, fontWeight: 'bold',textAlign: 'center',position:'absolute'}}>
                                                A pagar
                                            </Text>
                                        )}
                                    </View>
                                </View>
                            </View>
                        </View>
                    <View>
                </View>

                <View style={styles.fundoAvisos}>
                    <View style={styles.linhaAmarela}/>
                        <View style={{width:'100%', paddingTop:20, paddingLeft:7}}>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <Text
                                style={{ fontSize: 21, fontFamily:'AileronH', marginBottom:10}}>
                                AVISOS
                            </Text>
                        </View>
                        {motorista.avisando?(
                            <View style={{width:'100%', paddingRight:'5%'}}>
                                <Text style={{fontFamily:'AileronR', fontSize:17, marginBottom:'6%',}}>{motorista.aviso}</Text>
                                <View style={{width:'100%', flexDirection:'row', justifyContent:'flex-end', marginBottom:'6%'}}>
                                    <Text style={{fontFamily:'AileronR', fontSize:14}}>{motorista.data}</Text>
                                </View>
                            </View>
                            
                        ):(
                            <Text style={{fontFamily:'AileronR', marginBottom:'10%'}}>Nenhum aviso foi publicado até o momento.</Text>
                        )}
                    </View>
                </View>
            </View>

            ):(

            <View style={[styles.fundoTab, {paddingVertical:'55%'}]}>
                <View style={{height:'23%', width:'50%'}}>
                    <Image
                        source={require('../../../../assets/avan.png')}
                        style={{width:'100%', height:'100%'}}
                    />
                    </View>
                    <View style={{marginTop:'3%'}}>
                        <Text style={{fontSize:19, fontFamily:'AileronH', color:'gray', textAlign:'center'}}>Oops! Ainda não há</Text>
                        <Text style={{fontSize:19, fontFamily:'AileronH', color:'gray', textAlign:'center'}}>nenhum motorista</Text>
                        <Text style={{fontSize:19, fontFamily:'AileronH', color:'gray', textAlign:'center'}}>contratado.</Text>
                    </View>
                    <View style={styles.viewBotaoContratar}>
                        <TouchableOpacity style={styles.botaoContratar} onPress={()=>navigation.navigate('Pesquisar')}>
                            <Image source={require('../../../../assets/gradient.png')} style={styles.gradientContratar}/>
                            <Text style={{fontSize:16, fontFamily:'AileronH', position:'absolute'}}>Contratar</Text>
                        </TouchableOpacity> 
                </View>      
            </View>
            
            )} 
            </View>
            <Modal visible={modalVisible} transparent={true}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{position:'absolute', padding:10}}>
                            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                                <Feather name="x" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                        <Calendar hideArrows={false} enableSwipeMonths={true} 
                        onDayPress={day => onDayPress(day)}
                        markedDates={marked}
                        hideDayNames={true}
                        />
                        <View style={styles.viewBotaoCalendario}>
                            <TouchableOpacity style={[styles.botaoAdd, {backgroundColor:'gray'}]} onPress={()=>clean()}>
                                <Image source={require('../../../../assets/gradient2.png')} style={styles.gradient} />
                                <Text style={{fontSize:16, position:'absolute', fontFamily:'AileronH'}}>Limpar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.botaoAdd} onPress={()=>confirmar()}>
                                <Image source={require('../../../../assets/gradient.png')} style={styles.gradient} />
                                <Text style={{fontSize:16, fontFamily:'AileronH', position:'absolute'}}>Salvar</Text>
                            </TouchableOpacity>
                        </View>
                    </View> 
                </View> 
            </Modal>
            
        </View>
    ) 
}