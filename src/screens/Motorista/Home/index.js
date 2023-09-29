import {requestForegroundPermissionsAsync, getCurrentPositionAsync} from 'expo-location'
import BottomSheet from 'react-native-simple-bottom-sheet';
import { useEffect, useState, useRef } from 'react'
import styles from './style'
import { onAuthStateChanged } from 'firebase/auth';
import {db, auth} from '../../../firebase/config';
import {View, Text,Image,  TouchableOpacity, TextInput, Modal, ScrollView} from 'react-native'
import MapView from 'react-native-maps';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';


export default function MHomeRota ({route, navigation}) {
    const a = [];
    const [currentDate, setCurrentDate] = useState('');
    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    const [lati, setLati] = useState(null)
    const [longi, setLongi] = useState(null)
    const panelRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [avisoA, setAvisoA] = useState('')
    const [quem, setQuem] = useState('')
    const [rec, setRec] = useState('')

    useEffect(()=>{
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth(); //Current Month
        setCurrentDate(
            'Hoje, '+date + ' de ' + monthNames[month]
        );
        local()
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const docRef = doc(db, 'motorista', user.uid)
                const snapshot = await getDoc(docRef)
                setRec(snapshot.data());
                setAvisoA(rec.aviso)
                setQuem(rec.escolaAvisa)
            }
        });
    },[])
    const local =async()=>{
        const{granted} = await requestForegroundPermissionsAsync();

        if(granted){
            const position = await getCurrentPositionAsync();
            setLati(position.coords.latitude)
            setLongi(position.coords.longitude)
        }
    }
    
    return(
        <View style={{flex:1, backgroundColor: 'white', alignItems:'center'}}>

            {longi ? <MapView style={styles.map}
                initialRegion={{
                    latitude: lati,
                    longitude: longi,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
              >
            </MapView> : null}
            
            {!open?(
                <TouchableOpacity onPress={() => navigation.navigate('HomeRotaMotorista')} style={{width:'90%', backgroundColor:'yellow', alignItems: 'center', height:60, justifyContent:'center', borderRadius:50, marginTop:'50%'}}>
                    <Image source={require('../../../../assets/gradient.png')} style={styles.gradient}/>
                    <Text style={{fontFamily:'AileronR', fontSize:25, position:'absolute'}}>Iniciar rota</Text>
                </TouchableOpacity>
            ):null}
            
            <BottomSheet isOpen={false} ref={ref => panelRef.current = ref} sliderMinHeight={600} sliderMaxHeight={2000} wrapperStyle={{height:700}} lineStyle={{width:0}} onOpen={()=>setOpen(true)} onClose={()=>setOpen(false)} >
                {(onScrollEndDrag) => (
                    <ScrollView onScrollEndDrag={onScrollEndDrag}>
                    <View style={{ alignItems:'center'}}>
                    </View>
                    {open?(
                        <View style={{alignItems:'center', padding:20, gap:50, height:550}}>
                            <Text style={{fontFamily:'AileronR', fontSize: 30}}>{currentDate}</Text>
                            <TouchableOpacity style={{width:'90%', backgroundColor:'yellow', alignItems: 'center', height:60, justifyContent:'center', borderRadius:50}}>
                                <Image source={require('../../../../assets/gradient.png')} style={styles.gradient}/>
                                <Text style={{fontFamily:'AileronR', fontSize:25, position:'absolute'}}>Pedidos de Contratação</Text>
                            </TouchableOpacity>
                            <View style={{borderWidth:0.5, width:'100%', height:'100%', borderRadius:50, alignItems:'center', padding:20, flex:3}}>
                                <Text style={{fontFamily:'AileronH', fontSize:40, marginBottom:20}}>Avisos</Text>
                                <Text style={{fontFamily:'AileronR', fontSize:25, textAlign:'justify', flex:2}}>{avisoA}</Text>
                                <Text style={{fontFamily:'AileronR', fontSize:20, alignSelf:'flex-end', color: '#6F6F6F',}}>Para: {quem}</Text>
                            </View>
                            <TouchableOpacity style={{width:'90%', backgroundColor:'yellow', alignItems: 'center', height:60, justifyContent:'center', borderRadius:50}}>
                                <Image source={require('../../../../assets/gradient.png')} style={styles.gradient}/>
                                <Text style={{fontFamily:'AileronR', fontSize:25, position:'absolute'}}>Adicionar</Text>
                            </TouchableOpacity>
                        </View>
                    ):(
                        <View style={{alignItems:'center', padding:20, gap:50, height:550}}>
                            <Text style={{fontFamily:'AileronR', fontSize: 30}}>{currentDate}</Text>
                            <TouchableOpacity style={{width:'90%', backgroundColor:'yellow', alignItems: 'center', height:60, justifyContent:'center', borderRadius:50}}>
                                <Image source={require('../../../../assets/gradient.png')} style={styles.gradient}/>
                                <Text style={{fontFamily:'AileronR', fontSize:25, position:'absolute'}}>Pedidos de Contratação</Text>
                            </TouchableOpacity>
                            <View style={{borderWidth:0.5, width:'100%', height:300, borderRadius:50, alignItems:'center', padding:20, flex:3}}>
                                <Text style={{fontFamily:'AileronH', fontSize:40, marginBottom:20}}>Avisos</Text>
                                <Text style={{fontFamily:'AileronR', fontSize:30, textAlign:'justify', flex:2}}>{avisoA}</Text>
                                <Text style={{fontFamily:'AileronR', fontSize:20, alignSelf:'flex-end', color: '#6F6F6F',}}>Para: {quem}</Text>
                            </View>
                        </View>
                    )}
                    
                    </ScrollView>
                )}
            </BottomSheet>
        </View>
    )
}
