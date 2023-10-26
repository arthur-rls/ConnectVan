import { Entypo, FontAwesome, AntDesign, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useEffect, useState, useRef } from 'react'
import styles from './style'
import { onAuthStateChanged } from 'firebase/auth';
import {db, auth} from '../../../firebase/config';
import {View, Text,Image,  TouchableOpacity, TextInput, Modal, ScrollView, Keyboard} from 'react-native'
import { doc, getDoc, onSnapshot, getDocs, collection, collectionGroup, query, where, updateDoc} from 'firebase/firestore';

export default function Mensalidade({navigation}){
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

    const pago = query(collectionGroup(db, 'responsavel'), where('pago','==', true))
    const pagar = query(collectionGroup(db, 'responsavel'), where('pago','==', false), where('data', '>', dia))
    const atraso = query(collectionGroup(db, 'responsavel'), where('pago','==', false), where('data', '<=', dia))


    useEffect(()=>{
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth(); //Current Month
        setDia(date)
        setMes(monthNames[month])

        consultas()
        consultas2()
        consultas3()
    },[])

    const consultas = async ()=> {
        await getDocs(pago).then((docs)=>{
            const arr = []

            docs.forEach((responsavel)=>{
                const dado = responsavel.data()
                arr.push(dado)
            })
            setQntPagar(arr.length)
        })
    }

    const consultas2=async()=>{
        await getDocs(pagar).then((docs)=>{
            const arr = []

            docs.forEach((responsavel)=>{
                const dado = responsavel.data()
                arr.push(dado)
            })
            setQntPagando(arr.length)
        })
    }

    const consultas3=async()=>{
        await getDocs(atraso).then((docs)=>{
            const arr = []

            docs.forEach((responsavel)=>{
                const dado = responsavel.data()
                arr.push(dado)
            })
            setQntAtra(arr.length)
        })
    }

    if(qntPagando != null){

        consultas()
        consultas2()
        consultas3()
    }
    
    return(
        <View style={{flex:1, padding: 45}}>
            <Image source={require('../../../../assets/gradient.png')} style={{width:'100%', height:'100%', position:'absolute'}}/>
            <View style={{ marginTop:'10%', justifyContent:'center', marginBottom:'2%'}}>
                <TouchableOpacity onPress={()=>navigation.openDrawer()} style={{flex:1,position:'absolute'}}>
                  <Entypo name="menu" size={29} color="black" style={styles.iconMenu}/>
                </TouchableOpacity>
                <View style={{ justifyContent:'center', alignItems:'center'}}>
                <Text style={{fontSize:18, fontFamily:'AileronH'}}>Mensalidades</Text>
              </View>
            </View>
            <View style={styles.fundoTab1}>
            <View style={{flexDirection:'row', justifyContent:'center'}}> 
                <Text style={styles.mes}>{mes}</Text>
            </View>
            <View style={styles.linha}/>
            <View styles={{alignItems:'center', justifyContent:'center', }}>
                <Text style={styles.valor}>R$ 1.800</Text>
                <Text style={styles.valorAcum}>Valor acumulado</Text>
            </View>
            <View style={styles.viewBarra}>
                <View style={[styles.barraVerm, {flex: qntAtra}]}/>
                <View style={[styles.barraAmarelo, {flex: qntPagando}]}/>
                <View style={[styles.barraCinza, {flex: qntPagar}]}/>
            </View>
            <View style={styles.viewQuadrados}>
                <View style={{flexDirection:'column', alignItems:'center', marginLeft:'13%'}}>
                    <View style={styles.quadrVerm} />
                    <Text style={{marginTop:3}}>Atrasados</Text>
                </View>
                <View style={{flexDirection:'column', alignItems:'center'}}>
                    <View style={styles.quadrAmarelo} />
                    <Text style={{marginTop:3}}>Pagos</Text>
                </View>
                <View style={{flexDirection:'column', alignItems:'center', marginRight:'17%'}}>
                    <View style={styles.quadrCinza} />
                    <Text style={{marginTop:3}}>A pagar</Text>
                </View>
            </View>
        </View>
        <View style={styles.fundoTab1}>
             <View style={{flexDirection:'row', justifyContent:'space-between'}}> 
                 <TouchableOpacity style={{marginTop:'5%',marginLeft:'5%'}}>
                 <Entypo name="chevron-left" size={26} color="black" />
                 </TouchableOpacity>
                 <Text style={styles.mes}>Atrasados</Text>
                 <TouchableOpacity style={{marginTop:'5%',marginRight:'5%'}}>
                 <Entypo name="chevron-right" size={26} color="black" />
                 </TouchableOpacity>
             </View>   
        <View style={styles.linha}/>
        <ScrollView>
          <View style={styles.viewAtr1}> 
            <View style={{flexDirection:'column'}}>
              <Text style={styles.nome}>(Nome)</Text>
              <Text style={styles.dataVenc}>(Data vencimento)</Text>
            </View>
            <TouchableOpacity style={{marginTop:'4%'}}>
              <Ionicons name="notifications" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </ScrollView>

      </View>
        </View>
    )
}