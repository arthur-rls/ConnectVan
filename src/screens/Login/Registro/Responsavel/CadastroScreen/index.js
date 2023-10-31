import React, {useState} from 'react';
import {View, Text,Image,  TouchableOpacity, TextInput, Modal, ScrollView} from 'react-native'
import styles from './style'
import { FontAwesome, MaterialIcons, Entypo, Feather, Foundation } from '@expo/vector-icons';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { auth, db } from '../../../../../firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {  setDoc, doc,  } from 'firebase/firestore';
import { onAuthStateChanged } from "firebase/auth";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { TextInputMask } from 'react-native-masked-text';




export default function CadastroResponsavel ({navigation}) {
    const [emailU, setEmailU] = useState('')
    const [telefoneU, setTelefoneU] = useState('')
    const [nomeU, setNomeU] = useState('')
    const [password, setPassword] = useState('')
    const [showElement, setShowElement] = useState(false)
    const [showElementNome, setShowElementNome] = useState(false)
    const [showElementSenha, setShowElementSenha] = useState(false)
    const [showElementTelefone, setShowElementTelefone] = useState(false)
    const [showElement2, setShowElement2] = useState(false)
    const [selection, setSelection] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)

    async function createUser(){
        if (password.length>=8 && telefoneU.length==15 && emailU!=''&& nomeU!='' && selection ){
                await createUserWithEmailAndPassword(auth, emailU, password)
                .then(()=>{
                    onAuthStateChanged(auth, (user) => {
                        if (user) {
                            const uid = user.uid;
                            setDoc(doc(db, 'responsavel', uid), {nome:nomeU, email: emailU, telefone:telefoneU, mensalidade:0})
                            navigation.navigate('alunoCadastro');
                        }
                    });         
                })
                .catch(error => setShowElement(true))
        }
        else{
            if(!selection){
                setShowElement2(true)
            }
            if(password.length<8){
                setShowElementSenha(true)
            }
            if(telefoneU.length<15){
                setShowElementTelefone(true)
            }
            if(emailU==''){
                setShowElement(true)
            }
            if(nomeU==''){
                setShowElementNome(true)
            }
        }
    }

    const check = () => {
        selection ? setSelection(false) : setSelection(true);
        setShowElement2(false); 
    }
    async function google(){
        
    }
    return(
        <KeyboardAwareScrollView style={{backgroundColor:'white'}}>
            <View style={{flex:6, paddingHorizontal: 40, backgroundColor: 'white', alignItems: 'center'}}>
                <View style={styles.tela}>
                    <Text style={styles.h1}>Crie sua conta!</Text>
                </View>
                <View style={{ width:'100%', paddingVertical:5}}>
                    <View style={{flexDirection:'row', alignItems:'center', paddingVertical:5}}>
                        <FontAwesome name="user" size={20} color="#4D4D4D" style={showElementNome ? [styles.iconErro, {marginLeft:14}]:[styles.icon, {marginLeft:14}]}/>
                        <TextInput style={showElementNome ? styles.inputErro : styles.input} placeholder="Nome de usuário" value={nomeU} onChangeText={value => setNomeU(value)} inputMode='text'/>
                    </View>
                    <View style={{flexDirection:'row', alignItems:'center', paddingVertical:5}}>
                        <Entypo name="email" size={18} color="#4D4D4D" style={showElement ? [styles.iconErro, {marginLeft:11}]: [styles.icon, {marginLeft:10,}]}/>
                        <TextInput style={showElement ? styles.inputErro : styles.input} placeholder="Email" onChangeText={value => setEmailU(value)} value={emailU} autoCapitalize='none' autoComplete='email' keyboardType='email-address'/>
                    </View>
                    <View style={{flexDirection:'row', alignItems:'center', paddingVertical:5}}>
                        <Foundation name="telephone" size={20} color="#4D4D4D" style={showElementTelefone ? [styles.iconErro, {marginLeft:14}]: [styles.icon, {marginLeft:14}]}/>
                        <TextInputMask style={showElementTelefone ? styles.inputErro : styles.input} placeholder="Telefone" value={telefoneU} onChangeText={value => setTelefoneU(value)} maxLength={15} type={'cel-phone'}options={{maskType: 'BRL', withDDD: true, dddMask: '(99) '}}/>
                    </View>
                    <View style={{flexDirection:'row', alignItems:'center', paddingVertical:5}}>
                        <MaterialIcons name="lock" size={20} color="#4D4D4D" style={showElementSenha ? styles.iconErro : styles.icon}/>
                        <TextInput style={showElementSenha ? styles.inputErro : styles.input} placeholder="Senha" onChangeText={value => setPassword(value)} value={password} secureTextEntry autoCapitalize='none'/>
                    </View>
                </View>
                <View style={{ width: '100%', flexDirection:'row', paddingTop:5, paddingHorizontal:13}}>
                    <BouncyCheckbox
                    size={28}
                    fillColor= {showElement2? '#f02929' : "#FFBF00"} 
                    unfillColor="#FFFFFF"
                    iconStyle={{ borderColor: "back"}}
                    innerIconStyle={{ borderWidth: 2 }}
                    onPress={()=>check()}
                    />
                        <View style={{flexDirection:'row'}}>
                            <Text style={{fontFamily:'AileronR', fontSize:13, paddingTop:7}}>Aceito as </Text>
                            <Text style={{fontFamily:'AileronR', fontSize:13, textDecorationLine: "underline", color:'#1877F2', paddingTop:7}} onPress={()=>setModalVisible(true)}>Política de Privacidade</Text>
                        </View>
                </View>
                <View style={{ width:'100%', alignItems:'center', paddingVertical:10}}>
                    <TouchableOpacity style={styles.botao} onPress={() => createUser()}>
                        <Image source={require('../../../../../../assets/gradient.png')} style={styles.gradient}/>
                        <Text style={{fontFamily:'AileronR', fontSize:17, position:'absolute', fontWeight:'bold'}}>Cadastrar</Text>
                    </TouchableOpacity>
                </View>
                <View style={{position:'absolute', marginTop:40, width:'110%'}}>
                    {showElement==true ? (
                        <View style={styles.errOuIncorr}>
                            <TouchableOpacity onPress={()=>setShowElement(false)}>
                                <Feather name="x" size={20} color="white" />
                            </TouchableOpacity>
                            <Text style={{fontFamily:'AileronR', fontSize:16, color:'white'}}>Endereço de email inválido ou existente.</Text>
                        </View>
                    ):null}
                    {showElementSenha==true ? (
                        <View style={styles.errOuIncorr}>
                            <TouchableOpacity onPress={()=>setShowElementSenha(false)}>
                                <Feather name="x" size={20} color="white" />
                            </TouchableOpacity>
                            <Text style={{fontFamily:'AileronR', fontSize:16, color:'white'}}>Insira uma senha de no mínimo 8 dígitos.</Text>
                        </View>
                    ):null}
                    {showElementTelefone==true ? (
                        <View style={styles.errOuIncorr}>
                            <TouchableOpacity onPress={()=>setShowElementTelefone(false)}>
                                <Feather name="x" size={20} color="white" />
                            </TouchableOpacity>
                            <Text style={{fontFamily:'AileronR', fontSize:16, color:'white'}}>Insira um número exitente.</Text>
                        </View>
                    ):null}
                    {showElementNome==true ? (
                        <View style={styles.errOuIncorr}>
                            <TouchableOpacity onPress={()=>setShowElementNome(false)}>
                                <Feather name="x" size={20} color="white" />
                            </TouchableOpacity>
                            <Text style={{fontFamily:'AileronR', fontSize:16, color:'white'}}>Insira um nome.</Text>
                        </View>
                    ):null}
                </View>
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
                            <ScrollView>
                                <Text style={{fontFamily:'AileronH', fontSize:20, paddingVertical:10}}>
                                    Política de Privacidade
                                </Text>
                                <Text style={styles.politica}>
                                    A sua privacidade é importante para nós. É política do ConnectVan respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no aplicativo ConnectVan.
                                </Text>
                                <Text style={styles.politica}>
                                    Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado. 
                                </Text>
                                <Text style={styles.politica}>
                                    Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis ​para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.
                                </Text>
                                <Text style={styles.politica}>
                                    Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.
                                </Text>    
                                <Text style={styles.politica}>
                                    O nosso site pode ter links para sites externos que não são operados por nós. Esteja ciente de que não temos controle sobre o conteúdo e práticas desses sites e não podemos aceitar responsabilidade por suas respectivas políticas de privacidade.
                                </Text>
                                <Text style={styles.politica}>
                                    Você é livre para recusar a nossa solicitação de informações pessoais, entendendo que talvez não possamos fornecer alguns dos serviços desejados.
                                </Text>
                                <Text style={styles.politica}>
                                    O uso continuado de nosso site será considerado como aceitação de nossas práticas em torno de privacidade e informações pessoais. Se você tiver alguma dúvida sobre como lidamos com dados do usuário e informações pessoais, entre em contacto connosco.
                                </Text>
                                <Text style={[styles.politica, {fontFamily: 'AileronH'}]}>
                                    Compromisso do Usuário
                                </Text>
                                <Text style={styles.politica}>
                                    O usuário se compromete a fazer uso adequado dos conteúdos e da informação que o ConnectVan oferece no site e com caráter enunciativo, mas não limitativo:
                                </Text>
                                <Text style={styles.politica}>
                                    A) Não se envolver em atividades que sejam ilegais ou contrárias à boa fé a à ordem pública;
                                </Text>
                                <Text style={styles.politica}>
                                    B) Não difundir propaganda ou conteúdo de natureza racista, xenofóbica, jogos de sorte ou azar, qualquer tipo de pornografia ilegal, de apologia ao terrorismo ou contra os direitos humanos;
                                </Text>
                                <Text style={styles.politica}>
                                    C) Não causar danos aos sistemas físicos (hardwares) e lógicos (softwares) do ConnectVan, de seus fornecedores ou terceiros, para introduzir ou disseminar vírus informáticos ou quaisquer outros sistemas de hardware ou software que sejam capazes de causar danos anteriormente mencionados.
                                </Text>
                                <Text style={styles.politica}>
                                    Esperemos que esteja esclarecido e, como mencionado anteriormente, se houver algo que você não tem certeza se precisa ou não, geralmente é mais seguro deixar os cookies ativados, caso interaja com um dos recursos que você usa em nosso site.                               
                                </Text>
                            </ScrollView>
                        </View>
                    </View>
                </Modal>
            </View>
        </KeyboardAwareScrollView>
    )
}