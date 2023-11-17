import { Entypo, FontAwesome, AntDesign, FontAwesome5, Feather } from '@expo/vector-icons';
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
        const docRef3 = doc(db, 'motorista', rec.motorista, 'responsavel', rec.nome)
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
    const confirmar = ()=>{
        if(marked){
            const a = Object.keys(marked)
            a.forEach((item)=>{
                updateDoc(doc(db, 'motorista', rec.motorista, 'responsavel', rec.nome), {faltar:arrayUnion(item)})
            })
            setModalVisible(false) 
        }
        else{
            setModalVisible(false)
        }
    }
    const clean=()=>{
        setMarked()
        updateDoc(doc(db, 'motorista', rec.motorista, 'responsavel', rec.nome), {faltar:''})
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
                if(moto != undefined && moto != null && moto != ''){
                    const docRef2 = doc(db, 'motorista', moto)
                    const snapshot2 = await getDoc(docRef2)
                    const dado2 = snapshot2.data()
                    setMotorista(dado2)
                    const docRef3 = doc(db, 'motorista', moto, 'responsavel', rec.nome)
                    await getDoc(docRef3).then((snapshot3)=>{
                        setDia(snapshot3.data().faltar)
                        setDado(snapshot3.data().pago)
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
        return null
    }
    return(
        <View style={styles.container}>
            <Image source={require('../../../../assets/gradient.png')} style={{width:'100%', height:'100%', position:'absolute'}}/>
            <View style={styles.viewInput}>
                <View style={{position:'absolute', width:'100%', zIndex:10, marginLeft:'17%'}}>
                    <TouchableOpacity onPress={()=>navigation.openDrawer()}>
                        <Entypo name="menu" size={28} color="black"/>
                    </TouchableOpacity>
                </View>
                <TextInput style={styles.input} onFocus={()=>navigation.navigate('Pesquisar')}/>
                <TouchableOpacity onPress={()=>navigation.navigate('Pesquisar')} style={{position:'absolute', width:'100%', alignItems:'flex-end', marginRight:'18%'}}>
                    <FontAwesome name="search" size={21} color="black" />
                </TouchableOpacity>
            </View>

            <View style={styles.fundoTab}>
                <Text style={{ fontSize: 20, margin:'6%', fontFamily:'AileronH' }}>
                    {currentDate}
                </Text>
                {rec.motorista?(
                
                <View style={styles.viewSaldo}>
                    <View style={styles.fundoSaldo}>
                        <View style={styles.linhaAmarela}/>
                            <View style={{width:'100%', padding:21}}>
                                <View style={{flexDirection:'row'}}>
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
                                        <Image source={require('../../../../assets/gradient.png')} style={styles.gradient}/> 
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
                                style={{ fontSize: 21, fontWeight: 'bold', fontFamily:'AileronH', marginBottom:-15}}>
                                AVISOS
                            </Text>
                        </View>
                        {motorista.avisando?(
                            <View style={{width:'100%', paddingRight:'5%', paddingTop:'3%'}}>
                                <Text style={{fontFamily:'AileronR', fontSize:17, marginBottom:'6%'}}>{motorista.aviso}</Text>
                                <View style={{width:'100%', flexDirection:'row', justifyContent:'flex-end', marginBottom:'6%'}}>
                                    <Text style={{fontFamily:'AileronR', fontSize:14}}>{motorista.data}</Text>
                                </View>
                            </View>
                            
                        ):(
                            <Text style={{fontFamily:'AileronR', marginBottom:'10%'}}>Nenhum aviso.</Text>
                        )}
                    </View>
                </View>
                
                <View style={styles.viewBotao}>
                    <TouchableOpacity onPress={() => teste()} style={styles.botaoMaps}>
                        <Image source={require('../../../../assets/gradient.png')} style={[styles.gradientCalendario, {position:'absolute'}]}/>
                        <Feather name="calendar" size={24} color="black" />
                        <Text style={{fontSize:17, fontWeight:'bold', marginLeft:'5%'}}>Calendário</Text>
                    </TouchableOpacity>
                </View> 


                {motorista.viajando?(
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

            <View style={styles.fundoTab}>
                <View style={styles.fundoTab}>
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
                        <View style={styles.viewBotao}>
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