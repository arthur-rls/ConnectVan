import { Entypo, FontAwesome, AntDesign, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useEffect, useState, useRef } from 'react'
import styles from './style'
import { onAuthStateChanged } from 'firebase/auth';
import {db, auth} from '../../../firebase/config';
import {View, Text,Image,  TouchableOpacity, TextInput, Modal, ScrollView, Keyboard, Linking} from 'react-native'
import { doc, getDoc, onSnapshot, getDocs, collection, collectionGroup, query, where, updateDoc} from 'firebase/firestore';
import Calendar from 'react-native-calendars/src/calendar'
 

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
    const onDayPress = (day) => {
        selected.push(day.dateString)
        console.log(selected)
        setDia(selected)
      };
      const [selectedRedDates, setSelectedRedDates] = useState([]);

        const onSaveButtonClick = () => {
        
        };
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
            setRec(snapshot.data())
            if(rec.motorista != undefined && rec.motorista != null && rec.motorista != ''){
                const docRef2 = doc(db, 'motorista', rec.motorista)
                const snapshot2 = await getDoc(docRef2)
                const dado2 = snapshot2.data()
                setMotorista(dado2)
            }
        })
        
    })
    },[])

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
                {rec.motorista?(
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
                                    R${rec.mensalidade}
                                    </Text>
                                    <View style={{width:'30%', justifyContent:'center', height:'100%', alignItems:'center'}}>
                                        <Image source={require('../../../../assets/gradient.png')} style={styles.gradient} /> 
                                        {rec.pago?(
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
                <View style={styles.viewBotao}>
                    <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.botaoMaps}>
                        <Image source={require('../../../../assets/gradient.png')} style={[styles.gradient, {position:'absolute'}]}/>
                        <Ionicons name="calendar" size={24} color="black" />
                        <Text style={{fontSize:16, fontWeight:'bold', marginLeft:'5%'}}>Calendário</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={()=>console.log(dia)}><Text>aa</Text></TouchableOpacity>
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
            <Modal visible={modalVisible}>
                <Calendar hideArrows={false} enableSwipeMonths={true} 
                onDayPress={onDayPress}
                markedDates={{
                  ...selected,
                  // Marca os dias da semana em verde
                  '2023-11-01': { selected: true, selectedColor: 'green' },
                  '2023-11-02': { selected: true, selectedColor: 'green' },
                  '2023-11-03': { selected: true, selectedColor: 'green' },
                  '2023-11-04': { selected: true, selectedColor: 'green' },
                  '2023-11-05': { selected: true, selectedColor: 'green' },
                  // Marca os sábados e domingos em vermelho
                  '2023-11-06': { selected: true, selectedColor: 'red' },
                  '2023-11-12': { selected: true, selectedColor: 'red' },
                  '2023-11-13': { selected: true, selectedColor: 'red' },
                  '2023-11-19': { selected: true, selectedColor: 'red' },
                  '2023-11-20': { selected: true, selectedColor: 'red' },
                  '2023-11-26': { selected: true, selectedColor: 'red' },
                  '2023-11-27': { selected: true, selectedColor: 'red' },
                  
                }}
                />
                <TouchableOpacity onPress={()=>setModalVisible(false)}><Text>aa</Text></TouchableOpacity>      
            </Modal>
            
        </View>
    ) 
}