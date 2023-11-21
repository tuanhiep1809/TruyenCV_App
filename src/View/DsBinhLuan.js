import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  FlatList,
  View,
  Image,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";

import moment from "moment";

export default function App({ route, navigation }) {
  const [accountInfo, setAccountInfo] = useState([]);
  const [dsBinhLuan, setdsBinhLuan] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [modalAccount, setModalAccount] = useState(false);
  const [binhLuan, setBinhLuan] = useState("");
  const [loadBinhLuan, setloadBinhLuan] = useState("");
  useEffect(() => {
    fetch(
      `https://f56tg4-8080.csb.app/BinhLuan?id_Truyen=${route.params?.idTruyenBL}`
    )
      .then((response) => response.json())
      .then((data) => {
        setdsBinhLuan(data);
        const accountPromises = data.map((item) =>
          fetch(
            `https://f56tg4-8080.csb.app/accounts?id=${item.id_account}`
          ).then((response) => response.json())
        );

        Promise.all(accountPromises)
          .then((accountData) => {
            console.log(accountData);
            setAccountInfo(accountData);
          })
          .catch((error) => {
            console.error("Có lỗi xảy ra khi lấy thông tin tài khoản: ", error);
          });
      })
      .catch((error) => {
        console.error("Có lỗi xảy ra: ", error);
      });
  }, [route.params?.idTruyenBL,loadBinhLuan]);
  function HandelbinhLuan() {
    if(binhLuan){
    fetch("https://f56tg4-8080.csb.app/BinhLuan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ noiDung: binhLuan, ngayBinhLuan: moment().format("YYYY-MM-DD"), id_account: route.params?.account.id, id_Truyen: route.params?.idTruyenBL }),
    })
      .then((response) => response.json())
      .then((data) => {
        setloadBinhLuan(binhLuan);
        setBinhLuan("");
      })
      .catch((error) => {
        console.error("Có lỗi xảy ra: ", error);
      });
    }
  }
  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: "95%", height: "100%" }}
        data={dsBinhLuan}
        renderItem={({ item, index }) => {
          const currentAccounts = accountInfo[index] || [];
          return (
            <View key={index} style={styles.scrollView}>
              {currentAccounts.map((currentAccount, idx) => (
                <View
                  style={{
                    width: "100%",
                    height: null,
                    flexDirection: "row",
                  }}
                  key={idx}
                >
                  <TouchableOpacity
                    style={{
                      width: 55,
                      height: 55,
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: 20,
                    }}
                    onPress={() => {
                      setSelectedAccount(currentAccount);
                      setModalAccount(true);
                      // setTimeout(() => {
                      //   setModalAccount(false);
                      //   setSelectedAccount(null);
                      // }, 3000); // 3 giây
                    }}
                  >
                    <Image
                      style={{ width: 55, height: 55, borderRadius: 50 }}
                      source={{
                        uri: currentAccount.image,
                      }}
                    />
                  </TouchableOpacity>

                  {/* Modal */}
                  {selectedAccount && modalAccount && (
                    <Modal
                      animationType="slide"
                      transparent={true}
                      visible={modalAccount}
                      onRequestClose={() => {
                        setModalAccount(!modalAccount);
                      }}
                    >
                      <TouchableWithoutFeedback
                        onPress={() => setModalAccount(false)}
                      >
                        <View style={styles.modalContainer}>
                          <View style={styles.modalContent}>
                            <Text style={{ color: "white", fontSize: 22 }}>
                              {selectedAccount.name}
                            </Text>
                            <Image
                              style={{
                                width: 100,
                                height: 100,
                                borderRadius: 50,
                              }}
                              source={{ uri: selectedAccount.image }}
                            />
                            {/* Hiển thị thông tin khác của tài khoản ở đây */}
                          </View>
                        </View>
                      </TouchableWithoutFeedback>
                    </Modal>
                  )}
                  <View
                    style={{
                      width: "100%",
                      height: null,
                      flexDirection: "column",
                    }}
                  >
                    <Text style={{ color: "white", fontSize: 22 }}>
                      {currentAccount.name}
                    </Text>
                    <View
                      style={{
                        marginTop: 20,
                        width: "87%",
                        height: null,
                        flexDirection: "row",
                        gap: 10,
                      }}
                    >
                      <View
                        style={{
                          width: "78%",
                          height: null,
                          backgroundColor: "rgba(17, 33, 39, 0.92)",
                          borderRadius: 10,
                        }}
                      >
                        <Text
                          style={{
                            color: "white",
                            fontSize: 16,
                            padding: 10,
                            paddingBottom: 0,
                          }}
                        >
                          {item.noiDung}
                        </Text>
                        <View>
                          <Text
                            style={{
                              color: "white",
                              fontSize: 16,
                              padding: 10,
                              textAlign: "right",
                            }}
                          >
                            {item.ngayBinhLuan}
                          </Text>
                        </View>
                      </View>
                      <TouchableOpacity
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text style={{ color: "white", fontSize: 44 }}>
                          ...
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          );
        }}
        keyExtractor={(item) => item.id.toString()}
      />
      <View style={styles.ViewBottom}>
        <TextInput
          style={{
            borderWidth: 1,
            borderRadius: 10,
            width: "77%",
            height: "80%",
            backgroundColor: "rgba(17, 33, 39, 0.92)",
            color: "white",
            justifyContent: "center",
            paddingLeft: 10,
            fontSize: 16,
            alignItems: "center",
          }}
          placeholder="Enter comment"
          onChangeText={(text) => setBinhLuan(text)}
          value={binhLuan}
        />
        <TouchableOpacity
          onPress={() => {
            HandelbinhLuan();
          }}
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: "22%",
            height: "80%",
            backgroundColor: "#FFCC33",
            borderRadius: 15,
          }}
        >
          <Text style={{ color: "white", fontSize: 16 }}>Gửi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    backgroundColor: "#111111",
    justifyContent: "flex-end",
  },
  scrollView: {
    width: "100%",
    height: "100%",
    gap: 10,
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#111111",
    padding: 20,
    alignItems: "center",
    borderRadius: 10,
  },
  ViewBottom: {
    width: "95%",
    height: "10%",
    backgroundColor: "#111111",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
});