import {requestForegroundPermissionsAsync, getCurrentPositionAsync} from 'expo-location'
import BottomSheet from 'react-native-simple-bottom-sheet'
import { useEffect, useState, useRef } from 'react'
import styles from './style'
import {View, Text,Image,  TouchableOpacity, TextInput, Modal, ScrollView, Linking, FlatList} from 'react-native'
import MapView from 'react-native-maps';
import { onAuthStateChanged } from 'firebase/auth';
import {db, auth} from '../../../firebase/config';
import {  doc, getDocs, collection, where, query, collectionGroup, updateDoc, getDoc} from 'firebase/firestore';
import DropDownPicker from 'react-native-dropdown-picker';
import { Entypo, FontAwesome, Ionicons, Feather} from '@expo/vector-icons';


export default function MHomeRota ({navigation}) {
    const [rec, setRec] = useState([])
    const [rota, setRota] = useState('')
    const [modalVisible, setModalVisible] = useState(false)
    const [rec2, setRec2] = useState([])
    const [array, setArray] =useState([])
    const [lati, setLati] = useState('')
    const [longi, setLongi] = useState('')
    const [escola, setEscola] = useState([])
    const [faltantes, setFaltantes] = useState([])
    const arr = []
    const arr2 = []
    const arr3 = []
    const arr4 =[]
    const [periodoAberto, setPeriodoAberto] = useState(false);
    const [periodoValue, setPeriodoValue] = useState('');
    const [data, setData] = useState('')
    const [periodoE, setPeriodoE] = useState([
      { label: "Manhã", value: "manhã" },
      { label: "Tarde", value: "tarde" },
      { label: "Integral", value: "integral" },
    ]);
    const q = query(collectionGroup(db, 'passageiros'), where('periodo','==', periodoValue))
    
    useEffect(()=>{
        local()
        peri()
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth()+1; //Current Month
        setData('2023-' + month + '-' + date)
        f()
    },[periodoValue])

    const f =async()=>{
      const qu = query(collectionGroup(db, 'responsavel'), where('faltar','array-contains', data))
      const queryy = await getDocs(qu)
      queryy.forEach((aluno) => {
        setFaltantes(aluno.data().filho)
      })
    }
    async function peri(){
        setArray()
        const queryy = await getDocs(q)
          queryy.forEach(async(aluno) => {
            if(aluno){
              const dado = aluno.data()
              onAuthStateChanged(auth, async(user)=>{
                await getDoc(doc(db, 'motorista', user.uid, 'responsavel', dado.responsavel)).then((item)=>{
                  const dado2 = item.data()
                  if(!dado2.faltar){
                    arr.push(dado)
                    setArray(arr)
                    arr2.push(`/${dado.endereco}`)
                    const esc = []
                    
                    if(arr3.includes(dado.escola)){
                    }
                    else{
                      arr3.push(`/${dado.escola}`)
                      esc.push(dado.escola)
                    }
                    setRec(arr2)
                    setRec2(arr3)
                    setEscola(esc)
                  }
                  else{
                    if(dado2.faltar.includes(data)){
                      
                    }
                    else{
                    arr.push(dado)
                    setArray(arr)
                    arr2.push(`/${dado.endereco}`)
                    const esc = []
                    
                    if(arr3.includes(dado.escola)){
                    }
                    else{
                      arr3.push(`/${dado.escola}`)
                      esc.push(dado.escola)
                    }
                    setRec(arr2)
                    setRec2(arr3)
                    setEscola(esc)
                    }
                  }
                })
              })
              }
              else{
                console.log('não tem')
              }
        })
    }
    if(!longi || !lati){
      local()
      return null
    }
    const iniciar = async() =>{
        await local()
        const dado1 = rec2.toString();
        const dadoe1 = dado1.replace(/,/g, '')
        const e1 = dadoe1.replace('/undefined', '')
        const end1 = e1.replace(/ /g, '%20')
        const dado = rec.toString();
        const dadoe = dado.replace(/,/g, '')
        const e = dadoe.replace('/undefined', '')
        const end = e.replace(/ /g, '%20')
        await Linking.openURL('https://www.google.com/maps/dir/'+ lati +',' + longi + end + end1)
    }

    const enviar=()=>{
      onAuthStateChanged(auth, async(user)=>{
        updateDoc(doc(db, 'motorista', user.uid), {rota: rota, viajando: true})
      })
      setModalVisible(false)
      navigation.navigate('Home')
    }
    async function local(){
        f()
        const{granted} = await requestForegroundPermissionsAsync();

        if(granted){
            const position = await getCurrentPositionAsync();
            setLati(position.coords.latitude)
            setLongi(position.coords.longitude)
        }

    }
      
      const Item = ({item}) => (
        <View style={{flexDirection:'row', marginTop: '8%', paddingHorizontal:30}}>
            <View style={styles.viewMae}/>
            <View style={{alignItems:'center'}}>
              <View style={{flexDirection:'column', marginLeft:'5%'}}>
                  <Text style={styles.viewFilha}>{item.nome}</Text>
                  <Text style={styles.infos}>{item.endereco}</Text>
              </View>
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

        const Item2 = ({item}) => (
          <View style={{flexDirection:'row', marginTop: '8%', paddingHorizontal:30}}>
              <View style={styles.viewMae}/>
              <View style={{alignItems:'center'}}>
                <View style={{flexDirection:'column', marginLeft:'5%'}}>
                    <Text style={styles.viewFilha}>{item}</Text>
                </View>
              </View>
          </View> 
        );
        
        
          const renderItem2 = ({item}) => {
        
            return (
              <Item2
                item={item}
              />
            );
          }



    return (
        <View style={styles.container}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            setModalVisible(!modalVisible);
            }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{position:'absolute', padding:10}}>
                            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                                <Feather name="x" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                        <Text style={{fontFamily:'AileronR', fontSize: 16, marginVertical:'5%'}}>Após iniciar a rota, copie e cole abaixo o compartilhamento de trajeto e envie ao responsável.</Text>
                        <TextInput value={rota} onChangeText={(value)=>setRota(value)} style={styles.input}/>
                        <View style={styles.viewBotao2}>
                          <TouchableOpacity style={[styles.botaoAdd, {backgroundColor:'gray'}]} onPress={()=>iniciar()}>
                            <Image source={require('../../../../assets/gradient2.png')} style={styles.gradient} />
                            <Text style={{fontSize:16, position:'absolute', fontFamily:'AileronH'}}>Abrir maps</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.botaoAdd} onPress={()=>enviar()}>
                            <Image source={require('../../../../assets/gradient.png')} style={styles.gradient} />
                            <Text style={{fontSize:16, fontFamily:'AileronH', position:'absolute'}}>Enviar rota</Text>
                          </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <Image source={require('../../../../assets/gradient.png')} style={{width:'100%', height:'100%', position:'absolute'}}/>
            <View style={{ marginTop:'13%', justifyContent:'center'}}>
                <TouchableOpacity onPress={()=>navigation.navigate('Home')} style={{flex:1,position:'absolute'}}>
                  <Entypo name="chevron-left" size={29} color="black" style={{marginLeft:13}}/>
                </TouchableOpacity>
                <View style={{ justifyContent:'center', alignItems:'center'}}>
                <Text style={{fontSize:18, fontFamily:'AileronH'}}>Iniciar Rota</Text>
              </View>
            </View>
    
          <View style={styles.fundoTab}>
            
            <View style={styles.accordion}>
                <DropDownPicker
                style={styles.dropdown}
                containerStyle={styles.containerStyle}
                textStyle={styles.text}
                open={periodoAberto}
                value={periodoValue}
                items={periodoE}
                setOpen={setPeriodoAberto}
                setValue={setPeriodoValue}
                setItems={setPeriodoValue}
                placeholder='Período'
                dropDownDirection="BOT"
                dropDownContainerStyle={styles.box}
                />
            </View>
            <ScrollView contentContainerStyle={{justifyContent:'center'}}>
            <FlatList
                data={array}
                renderItem={renderItem}
            />
            {faltantes.length!=0?(
              <View style={{borderWidth:0.5, borderRadius:20, padding:20}}>
                <Text style={{fontSize:20}}>Faltantes do dia</Text>
              <FlatList
                data={faltantes}
                renderItem={renderItem2}
              />
            </View>
            ):null}
            

            
              
            
              {/* {escola.map((item)=>{
                <View style={{flexDirection:'row'}}>
                  <View style={styles.viewMae}/>
                  <FontAwesome name="user-circle-o" size={24} color="black" />
                  <View style={{flexDirection:'column'}}>
                      <Text style={styles.viewFilha}>{item.escola}</Text>
                  </View>
                </View>
              })} */}

              
            </ScrollView>
            {array?(
              <View style={{justifyContent:'flex-end', alignItems:'center',}}>
              <View style={styles.viewBotao}>
                <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.botaoMaps}>
                  <Image source={require('../../../../assets/gradient.png')} style={styles.gradientBotao} />
                      <Ionicons name="ios-location-sharp" size={24} color="black" />
                      <Text style={{fontSize:17, fontWeight:'bold', marginLeft:'5%'}}>Abrir no Maps</Text>
                  </TouchableOpacity>
              </View>
            </View>
            ):null}
    
          </View>
        </View>
      );
}