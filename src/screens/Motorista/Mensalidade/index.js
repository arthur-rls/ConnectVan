import { Entypo, FontAwesome, AntDesign, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useEffect, useState, useRef } from 'react'
import styles from './style'
import { onAuthStateChanged } from 'firebase/auth';
import {db, auth} from '../../../firebase/config';
import {View, Text,Image,  TouchableOpacity, TextInput, Modal, ScrollView, Keyboard, FlatList} from 'react-native'
import { doc, getDoc, onSnapshot, getDocs, collection, collectionGroup, query, where, updateDoc} from 'firebase/firestore';

export default function Mensalidade({navigation}){
    const [p, setP] = useState(false)
    const [a, setA] = useState(true)
    const [ap, setAP] = useState(false)
    const [dia, setDia] = useState('')
    const [mes, setMes] = useState('')
    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

    const [pag, setPag] = useState([])
    const [apag, setApag] = useState([])
    const [atra, setAtra] = useState([])

    const [qntPagar, setQntPagar] = useState(null)
    const [qntPagando, setQntPagando] = useState(null)
    const [qntAtra, setQntAtra] = useState(null)

    var [saldoS, setSaldoS] = useState(0)
    const s = []
    const [saldo, setSaldo] = useState(0)

    const [ver, setVer] = useState(false)

    useEffect(()=>{
        navigation.addListener('focus', () => {
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth(); //Current Month
        setSaldoS(0)
        setSaldo(0)
        s.length=0
        setDia(date)
        setMes(monthNames[month])
        consultas()
        consultas2()
        consultas3()
        })
    },[])


    const Item = ({item}) => (
        <View style={styles.viewAtr1}> 
            <View style={{flexDirection:'column'}}>
                <Text style={styles.nome}>{item.nome}</Text>
                <Text style={styles.dataVenc}>Vencimento dia {item.data} de {mes}</Text>
            </View>
            <TouchableOpacity style={{marginTop:'4%'}}>
                <Ionicons name="notifications" size={24} color="black" />
            </TouchableOpacity>
        </View>
    );

    const ItemP = ({item}) => (
        <View style={styles.viewAtr1}> 
            <View style={{flexDirection:'column'}}>
                <Text style={styles.nome}>{item.nome}</Text>
                <Text style={styles.dataVenc}>Vencimento dia {item.data} de {mes}</Text>
            </View>
        </View>
    );

    const renderItem = ({item}) => {
      
        return (
          <Item
            item={item}
          />
        );
    }

    const renderItemP = ({item}) => {
      
        return (
          <ItemP
            item={item}
          />
        );
    }

    const consultas = async ()=> {
        s.length=0
        setSaldoS(0)
        setSaldo(0)
        onAuthStateChanged(auth, async (user)=>{
        const pago = query(collection(db, 'motorista', user.uid, 'responsavel'), where('pago','==', true))

        await getDocs(pago).then((docs)=>{
            
            const arr = []

            docs.forEach((responsavel)=>{
                const dado = responsavel.data()
                arr.push(dado)
            })
            setQntPagando(arr.length)
            setPag(arr)
    })
    })
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
        
    

    const consultas2=async()=>{

        onAuthStateChanged(auth, async (user)=>{
        const pagar = query(collection(db, 'motorista', user.uid, 'responsavel'), where('data', '>', dia), where('pago','==', false))
        await getDocs(pagar).then((docs)=>{
            const arr = []

            docs.forEach((responsavel)=>{
                const dado = responsavel.data()
                arr.push(dado)
            })
            setQntPagar(arr.length)
            setApag(arr)
        })
    })
    }

    const consultas3=async()=>{
        onAuthStateChanged(auth, async(user)=>{
            const atraso = query(collection(db, 'motorista', user.uid, 'responsavel'), where('pago','==', false), where('data', '<', dia))
        
        await getDocs(atraso).then((docs)=>{
            const arr = []

            docs.forEach((responsavel)=>{
                const dado = responsavel.data()
                arr.push(dado)
            })
            setQntAtra(arr.length)
            setAtra(arr)
        })
        })
    }

    if(qntPagando == null){

        // consultas()
        // consultas2()
        // consultas3()
    }
    return(
        <View style={styles.container}>
            <Image source={require('../../../../assets/gradient.png')} style={{width:'100%', height:'100%', position:'absolute'}}/>
            <View style={{ marginTop:'13%', justifyContent:'center'}}>
                <TouchableOpacity onPress={()=>navigation.openDrawer()} style={{flex:1,position:'absolute'}}>
                  <Entypo name="menu" size={29} color="black" style={styles.iconMenu}/>
                </TouchableOpacity>
                <View style={{ justifyContent:'center', alignItems:'center'}}>
                <Text style={{fontSize:18, fontFamily:'AileronH'}}>Mensalidades</Text>
              </View>
            </View>

            <View style={{flex:1.2, alignItems:'center'}}>
            <View style={styles.fundoTab1}>
                <View style={{flexDirection:'row', justifyContent:'center'}}> 
                    <Text style={styles.mes}>{mes}</Text>
                </View>
                <View style={styles.linha}/>
                <View styles={{alignItems:'center', justifyContent:'center'}}>
                    <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                        {ver? (
                            <Text style={styles.valor}>R${saldo}</Text>
                        ):(
                            <Text style={styles.valor}>R$----</Text>
                        )}
                        <View style={{marginTop:27, marginLeft:10}}>
                            <TouchableOpacity onPress={()=>{calcSaldo();setVer(current=>!current)}}>
                            {ver?(
                                <Entypo name="eye-with-line" size={24} color="black" />
                            ):(
                                <Entypo name="eye" size={24} color="black" />
                            )}
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text style={styles.valorAcum}>Valor acumulado</Text>
                </View>
                <View style={{marginHorizontal:'10%'}}>
                    <View style={styles.viewBarra}>
                        <View style={[styles.barraVerm, {flex: qntAtra}]}/>
                        <View style={[styles.barraAmarelo, {flex: qntPagando}]}/>
                        <View style={[styles.barraCinza, {flex: qntPagar}]}/>
                    </View>
                    <View style={styles.viewQuadrados}>
                        <View style={{flexDirection:'column', alignItems:'center'}}>
                            <View style={styles.quadrVerm}>
                                <Text style={styles.numero}>{qntAtra}</Text>
                            </View>
                            <Text style={{marginTop:3}}>Atrasados</Text>
                        </View>
                        <View style={{flexDirection:'column', alignItems:'center'}}>
                            <View style={styles.quadrAmarelo}>
                                <Text style={styles.numero}>{qntPagando}</Text>
                            </View>
                            <Text style={{marginTop:3}}>Pagos</Text>
                        </View>
                        <View style={{flexDirection:'column', alignItems:'center'}}>
                            <View style={styles.quadrCinza}>
                                <Text style={styles.numero}>{qntPagar}</Text>
                            </View>
                            <Text style={{marginTop:3}}>A pagar</Text>
                        </View>
                    </View>
                </View>
            </View>
            
            <View style={[styles.fundoTab2, {flex:2}]}>
                {a?(
                    <View>
                        <View style={styles.viewAPA}> 
                            <TouchableOpacity onPress={()=>{setA(true); setP(false); setAP(false)}}><Text style={[styles.apa, styles.apaSelect]}>Atrasados</Text></TouchableOpacity>
                            <TouchableOpacity onPress={()=>{setP(true); setA(false); setAP(false)}}><Text style={styles.apa}>Pagos</Text></TouchableOpacity>
                            <TouchableOpacity onPress={()=>{setAP(true); setA(false); setP(false)}}><Text style={styles.apa}>A pagar</Text></TouchableOpacity>
                        </View>
                        <View style={styles.linha}/>
                        <ScrollView>
                        <FlatList
                            data={atra}
                            renderItem={renderItem}
                        />
                        </ScrollView>  
                    </View>
                ):null}
                {p?(
                    <View>
                        <View style={styles.viewAPA}> 
                            <TouchableOpacity onPress={()=>{setA(true); setP(false); setAP(false)}}><Text style={styles.apa}>Atrasados</Text></TouchableOpacity>
                            <TouchableOpacity onPress={()=>{setP(true); setA(false); setAP(false)}}><Text style={[styles.apa, styles.apaSelect]}>Pagos</Text></TouchableOpacity>
                            <TouchableOpacity onPress={()=>{setAP(true); setA(false); setP(false)}}><Text style={styles.apa}>A pagar</Text></TouchableOpacity>
                        </View>   
                        <View style={styles.linha}/>
                        <ScrollView>
                        <FlatList
                            data={pag}
                            renderItem={renderItemP}
                        />
                        </ScrollView>  
                    </View>
                ):null}
                {ap?(
                    <View>
                        <View style={styles.viewAPA}> 
                            <TouchableOpacity onPress={()=>{setA(true); setP(false); setAP(false)}}><Text style={styles.apa}>Atrasados</Text></TouchableOpacity>
                            <TouchableOpacity onPress={()=>{setP(true); setA(false); setAP(false)}}><Text style={styles.apa}>Pagos</Text></TouchableOpacity>
                            <TouchableOpacity onPress={()=>{setAP(true); setA(false); setP(false)}}><Text style={[styles.apa, styles.apaSelect]}>A pagar</Text></TouchableOpacity>
                        </View> 
                        <View style={styles.linha}/>
                        <ScrollView>
                        <FlatList
                            data={apag}
                            renderItem={renderItem}
                        />
                        </ScrollView>
                    </View>
                ):null}

            </View>
        </View>
    </View>
    )
}