import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Text,
  View,
  Button,
  TextInput,
  Modal,
  FlatList,
  KeyboardAvoidingView,
  Keyboard,
  Image,
  TouchableWithoutFeedback,
  Switch,
  StyleSheet,
  SafeAreaView,
  Alert,
  Linking,
  RefreshControl,
  ImageBackground,
} from "react-native";
import GetToday from "./src/Datum";

export default function App() {
  //Text Eingabe Definitionen

  const [name, setName] = useState("");
  const [adress, setAdress] = useState("");
  const [handy, setHandy] = useState("");
  const [tepich, setTepich] = useState("");
  const [notiz, setNotiz] = useState("");

  const setToggleCheckBox1 = (value, index) => {
    let newArr = [...data];
    newArr[index].active1 = !newArr[index].active1;
    setData(newArr);
  };
  const setToggleCheckBox2 = (value, index) => {
    let newArr = [...data];
    newArr[index].active2 = !newArr[index].active2;
    setData(newArr);
    Alert.alert("SMS Senden an", newArr[index].handy, [
      {
        text: "Ja",
        onPress: () => {
          Linking.openURL("sms:" + newArr[index].handy + "");
        },
      },
      { text: "Nein" },
    ]);
  };
  const setToggleCheckBox3 = (value, index) => {
    let Arr = [...data];
    Arr[index].active3 = !Arr[index].active3;
    setData(Arr);
  };

  // Auftrag Ausgabe Definition
  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.task}>
        <View style={styles.zeile1}>
          <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
          <Text>
            <GetToday />
          </Text>
        </View>
        <View style={styles.zeile2}>
          <Text style={{ fontWeight: "bold" }}>{item.adress}</Text>
        </View>
        <View style={styles.zeile3}>
          <Text style={{ fontWeight: "bold" }}>{item.handy}</Text>
          <Text style={{ color: "blue" }}>{item.tepich} Tepich/e</Text>
        </View>
        <View style={styles.zeile4}>
          <Text style={{ color: "blue" }}>{item.notiz}</Text>
        </View>
        <View style={styles.switch}>
          <View style={{ alignItems: "center" }}>
            <Switch
              disabled={item.active1}
              value={item.active1}
              onValueChange={(newValue) => setToggleCheckBox1(newValue, index)}
            />
            <Text>gewaschen</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Switch
              disabled={item.active2 || !item.active1}
              value={item.active2}
              onValueChange={(newValue) => setToggleCheckBox2(newValue, index)}
            />
            <Text>abholbereit</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Switch
              disabled={item.active3 || !item.active2}
              value={item.active3}
              onValueChange={(newValue) => setToggleCheckBox3(newValue, index)}
            />
            <Text>erledigt</Text>
          </View>
        </View>
      </View>
    );
  };

  const [data, setData] = useState([]);

  const [modalVis, setModalVis] = useState(false);

  const saveItem = () => {
    if (
      name.length < 3 ||
      adress.length < 5 ||
      handy.length < 8 ||
      tepich.length === 0
    ) {
      return;
    } else {
      let newArr = [...data];
      newArr.unshift({
        id: newArr.length + 1,
        name: name,
        adress: adress,
        handy: handy,
        tepich: tepich,
        notiz: notiz,
        active1: false,
        active2: false,
        active3: false,
        //key: Math.random(),
      });
      setData(newArr);
      setModalVis(false);
      setName("");
      setAdress("");
      setHandy("");
      setTepich("");
      setNotiz("");
    }
  };
  const [refresh, setRefresh] = useState(false);
  const onRefresh = () => {
    setRefresh(true);
    setRefresh(false);
  };
  const [schalter, setSchalter] = useState(1);

  let content;

  if (schalter === 1) {
    content = (
      <View
        style={styles.imgBack}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
           // backgroundColor: "#00000099",ä#öß0   
          }}
        >
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text style={styles.title}>Teppich-Reinigung</Text>
          </View>

          <View
            style={{
              paddingTop: 30,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <View
              style={{
                margin: 5,
                backgroundColor: "gold",
                borderRadius: 20,
              }}
            >
              <Button title="Neuer Auftrag" onPress={() => setModalVis(true)} />
            </View>

            <View
              style={{ margin: 5, backgroundColor: "gold", borderRadius: 20 }}
            >
              <Button title="Alle Aufträge" onPress={() => setSchalter(2)} />
            </View>
          </View>
        </View>
      </View>
    );
  } else if (schalter === 2) {
    content = (
      <SafeAreaView style={{ alignItems: "center" }}>
        <FlatList
          data={data}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
          }
        />
        <View
          style={{
            alignContent: "flex-end",
            margin: 10,
            bottom: "5%",
            backgroundColor: "gold",
            borderRadius: 20,
            width: "90%",
          }}
        >
          <Button
            style={styles.zButton}
            title="Zurück"
            onPress={() => setSchalter(1)}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <ImageBackground style={styles.imgBack}
    source={require("./assets/bricks_backgrund.png")}
    resizeMode="stretch">
    <View style={{ marginVertical: 40 }}>
      <Modal animationType="slide" transparent={true} visible={modalVis}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" || "android" ? "padding" : "height"}
            style={{ flex: 1 }}
          >
            <SafeAreaView style={styles.safeContainer}>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <View style={styles.modalView}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Name"
                    onChangeText={(text) => setName(text)}
                    value={name}
                  />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Adresse"
                    onChangeText={(text) => setAdress(text)}
                    value={adress}
                  />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Handy Nummer"
                    keyboardType="numeric"
                    onChangeText={(text) => setHandy(text)}
                    value={handy}
                  />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Anzahl der Tepiche"
                    keyboardType="number-pad"
                    onChangeText={(text) => setTepich(text)}
                    value={tepich}
                  />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Notiz"
                    onChangeText={(text) => setNotiz(text)}
                    value={notiz}
                  />

                  <View style={styles.buttonView}>
                    <View>
                      <Button title="Speichern" onPress={saveItem} />
                    </View>
                    <View>
                      <Button
                        title="Zurück"
                        onPress={() => setModalVis(false)}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </SafeAreaView>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </Modal>

      {content}

      <StatusBar style="auto" />
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  addIcon: {
    width: 50,
    height: 50,
  },
  buttonView: {
    flexDirection: "row",
  },
  container: {
    flex: 1,
    alignItems: "stretch",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  imgBack: {
    flex:1,
    alignItems: "center",
    justifyContent: "center"
  },
  modalView: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    backgroundColor: "#fff0c0",
    padding: 20,
    borderRadius: 30,
    borderColor: "#d0dcec",
    borderWidth: 1,
  },
  task: {
    flex: 1,
    backgroundColor: "silver",
    borderRadius: 20,
    padding: 15,
    maxWidth: 400,
    width: 350,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  textInput: {
    paddingStart: 10,
    marginVertical: 10,
    width: 290,
    height: 30,
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "silver",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 40,
    color: "orange",
  },
  safeContainer: {
    flex: 1,
  },
  switch: {
    paddingTop: 2,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  zeile1: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 2,
  },
  zeile2: {
    padding: 2,
  },
  zeile3: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 2,
  },
  zeile4: {
    alignItems: "flex-end",
    padding: 2,
  },
});
