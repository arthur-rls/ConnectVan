import { Text, SafeAreaView, StyleSheet, View, TextInput, TouchableOpacity, Image, FlatList, Linking } from 'react-native';
import { Entypo, FontAwesome, AntDesign, FontAwesome5, Feather } from '@expo/vector-icons';
import styles from './style'
import {useEffect, useState} from 'react'
import { onAuthStateChanged } from 'firebase/auth';
import {db, auth} from '../../../firebase/config';
import {  doc, getDoc, setDoc, updateDoc, arrayRemove, arrayUnion} from 'firebase/firestore';
import { List } from 'react-native-paper';

export default function Motorista_Perfil ({route, navigation}) {
    const {idM} = route.params
    const [rec, setRec] = useState('');
    const [escolas, setEscolas] = useState([])
    const [cidades, setCidades] = useState([])
    const [showElement, setShowElement] = useState(false)

    const Item = ({item}) => (
        <View>
            <List.Item title={item} titleStyle={{fontFamily:'AileronR', fontSize:16, marginBottom:-10, marginLeft:-18}}/>
        </View>
      );

      const renderItem = ({item}) => {
      
        return (
          <Item
            item={item}
          />
        );
      }


    useEffect(()=>{
        dados()
    }, [])
    if(!rec){
        return(
            <View style={styles.container}>
                <Image source={require('../../../../assets/gradient.png')} style={{width:'100%', height:'100%', position:'absolute'}}/>
                <View style={{ marginTop:'13%', justifyContent:'center'}}>
                    <TouchableOpacity onPress={()=>navigation.openDrawer()} style={{flex:1,position:'absolute'}}>
                        <Entypo name="menu" size={29} color="black" style={{marginLeft:15}}/>
                    </TouchableOpacity>
                    <View style={{ justifyContent:'center', alignItems:'center'}}>
                        <Text style={{fontSize:18, fontFamily:'AileronH'}}>Carregando</Text>
                    </View>
                </View>
                <View style={styles.fundoTab}>
                <Image source={require('../../../../assets/loading.gif')} style={{width:'100%', height:'100%', resizeMode: 'center',}}/>
                </View>
            </View>
        )
    }

    async function dados(){
        const docRef = doc(db, 'motorista' , idM)
        await getDoc(docRef).then((snapshot)=>{
            setRec(snapshot.data())
            setEscolas(snapshot.data().escola)
            setCidades(snapshot.data().cidade)
        })
    }

    const contratar=async()=>{
        onAuthStateChanged(auth, async(user)=>{
            const docRef = doc(db, 'motorista' , idM)
            updateDoc(docRef,{solicitacao:arrayUnion(user.uid)})
            setShowElement(true)
        })
    }
    return(
        <View style={styles.container}>
            
            <Image source={require('../../../../assets/gradient.png')} style={{width:'100%', height:'100%', position:'absolute'}}/>
            <View style={{ marginTop:'13%', justifyContent:'center'}}>
                {showElement==true ? (
                    <View style={styles.senhaErrOuIncorr}>
                        <TouchableOpacity onPress={()=>setShowElement(false)}>
                            <Feather name="x" size={20} color="white" />
                        </TouchableOpacity>
                        <Text style={styles.textoSolici}>Solicitação enviada com sucesso!</Text>
                    </View>
                ):null} 
                
                <TouchableOpacity onPress={()=>navigation.navigate('Pesquisar')} style={{flex:1,position:'absolute'}}>
                    <Entypo name="chevron-left" size={28} color="black" style={{marginLeft:10}}/>
                </TouchableOpacity>
                <View style={{ justifyContent:'center', alignItems:'center'}}>
                    <Text style={{fontSize:18, fontFamily:'AileronH'}}>{rec.nome}</Text>
                </View>
            </View>
            
            <View style={styles.fundoTab}>
                <View style={styles.viewBotao}>
                    <TouchableOpacity onPress={() => contratar()} style={[styles.botaoAdd2, {flexDirection:'row'}]}>
                        <Image source={require('../../../../assets/gradient.png')} style={[styles.gradientCalendario, {position:'absolute'}]}/>
                        <Feather name="calendar" size={24} color="black" />
                        <Text style={{fontSize:17, fontWeight:'bold', marginLeft:'5%'}}>Enviar pedido de contratação</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.fundoTel}>
                    <View style={{paddingHorizontal:15, flex: 1}}>
                        <Text style={{fontSize:17, fontWeight:'bold'}}>{rec.telefone}</Text>
                    </View>
                    <View style={{flex: 1, justifyContent:'flex-end', flexDirection:'row'}}>
                        <View style={{justifyContent:'center', marginRight:'10%'}}>
                            <TouchableOpacity onPress={()=>Linking.openURL('whatsapp://send?phone=' +  '+55' + rec.telefone)}>
                                <FontAwesome name="whatsapp" size={26} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <List.Section style={{width:'100%', justifyContent:'center', paddingHorizontal:'5%', gap:15}}>
                    {escolas?(
                        <List.Accordion
                        theme={{colors: {background: 'white', primary:'black'}}}
                        style={styles.accordion}
                        title="Escolas"
                        titleStyle={styles.titulo}
                        left={(props) => <List.Icon {...props}/>}>
                            <FlatList
                                data={escolas}
                                renderItem={renderItem}
                            />
                        </List.Accordion>
                    ):null}
                    {cidades? (
                        <List.Accordion
                        theme={{colors: {background: 'white', primary:'black'}}}
                        style={styles.accordion}
                        title="Cidades"
                        titleStyle={styles.titulo}
                        left={(props) => <List.Icon {...props}/>}>
                            <FlatList
                                data={cidades}
                                renderItem={renderItem}
                            />
                        </List.Accordion>
                    ):null}
                </List.Section>
            </View>

        </View>
    )
}