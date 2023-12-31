import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  FlatList,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Button,
  TextInput,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import moment from "moment";
export default function App({ route, navigation }) {
  const [image, setImage] = useState(
    "https://github-production-user-asset-6210df.s3.amazonaws.com/96639642/285331479-5c79c492-618b-4157-81b4-d3b7a9c42478.png"
  );
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const danhmuc = [
    {
      name: "Tiên Hiệp",
    },
    {
      name: "Huyền Nhuyễn",
    },
    {
      name: "Khoa Huyễn",
    },
    {
      name: "Võng Du",
    },
    {
      name: "Đô Thị",
    },
    {
      name: "Đồng Nhân",
    },
    {
      name: "Dã Sử",
    },
    {
      name: "Cạnh Kỹ",
    },
    {
      name: "Huyền Nghi",
    },
    {
      name: "Kiếm Hiệp",
    },
    {
      name: "Kỳ Ảo",
    },
  ];
  const [tenTruyen, setTenTruyen] = useState("Chưa Đặt Tên");

  const [tenTacGia, setTenTacGia] = useState(route.params?.account.name);
  const [ngayDang, setNgayDang] = useState(
    moment().format("DD/MM/YYYY HH:mm:ss")
  );
  const [modalVisibleTheLoai, setModalVisibleTheLoai] = useState(false);
  const [theLoai, setTheLoai] = useState("Chưa chọn");
  const [modalVisibleMota, setModalVisibleMota] = useState(false);
  const [moTa, setMoTa] = useState("Chưa có mô tả");
  const [shortDescription, setShortDescription] = useState(true);
  const [moTaHeight, setMoTaHeight] = useState(70);

  const [modalVisibleNoiDung, setModalVisibleNoiDung] = useState(false);
  const [NoiDung, setNoiDung] = useState("Chưa có nội dung");
  const [shortDescriptionNoiDung, setShortDescriptionNoiDung] = useState(true);
  const [NoiDungHeight, setNoiDungHeight] = useState(70);
  function handleVietTruyen() {
    fetch("https://86373g-8080.csb.app/SangTacNhap", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image: image,
        ten: tenTruyen,
        tacGia: tenTacGia,
        soChuong: 0,
        ngayDang: ngayDang,
        ngayCapNhat: moment().format("YYYY-MM-DD"),
        luotDoc: 0,
        nguon: `${route.params?.account.name}`,
        theLoai: theLoai,
        loaiTruyen: "Sáng tác",
        trangThai: "Đang ra",
        noiDung: NoiDung,
        TomTat: moTa,
        xuatBan: "Chưa xuất bản",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        navigation.goBack();
      })
      .catch((error) => {
        console.error("Có lỗi xảy ra: ", error);
      });
  }
  function handleVietTruyen2() {
    fetch("https://86373g-8080.csb.app/SangTacNhap", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image: image,
        ten: tenTruyen,
        tacGia: tenTacGia,
        soChuong: 0,
        ngayDang: ngayDang,
        ngayCapNhat: moment().format("YYYY-MM-DD"),
        luotDoc: 0,
        nguon: `${route.params?.account.name}`,
        theLoai: theLoai,
        loaiTruyen: "Sáng tác",
        trangThai: "Đang ra",
        noiDung: NoiDung,
        TomTat: moTa,
        xuatBan: "Đã xuất bản",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        getIDTruyenNhpap();
        navigation.goBack();
      })
      .catch((error) => {
        console.error("Có lỗi xảy ra: ", error);
      });
  }
  function getIDTruyenNhpap() {
    const encodedNgayDang = encodeURIComponent(ngayDang);
    fetch(`https://86373g-8080.csb.app/SangTacNhap?ngayDang=${encodedNgayDang}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        handelPressXuatBan(data[0].id);
        // navigation.goBack();
      })
      .catch((error) => {
        console.error("Có lỗi xảy ra: ", error);
      });
  }
  function handelPressXuatBan(id) {
    fetch("https://86373g-8080.csb.app/DsTruyen", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image: image,
        ten: typeof tenTruyen === "string" ? tenTruyen : tenTruyen.join(", "),
        tacGia:
          typeof tenTacGia === "string" ? tenTacGia : tenTacGia.join(", "),
        soChuong: 0,
        ngayDang: typeof ngayDang === "string" ? ngayDang : ngayDang.join(", "),
        ngayCapNhat: moment().format("YYYY-MM-DD HH:mm:ss"),
        luotDoc: 0,
        nguon: `${route.params?.account.name}`,
        theLoai: typeof theLoai === "string" ? theLoai : theLoai.join(", "),
        loaiTruyen: "Sáng tác",
        trangThai: "Đang ra",
        noiDung: typeof NoiDung === "string" ? NoiDung : NoiDung.join(", "),
        TomTat: typeof moTa === "string" ? moTa : moTa.join(", "),
        idTruyenNhap: id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {})
      .catch((error) => {
        console.error("Có lỗi xảy ra khi thêm mới truyện: ", error);
      });
  }
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleTheLoai}
        onRequestClose={() => {
          setModalVisibleTheLoai(!modalVisibleTheLoai);
        }}
      >
        <View style={styles.modalContainerTheLoai}>
          <View style={styles.modalContentTheLoai}>
            <Text
              style={{ fontSize: 20, marginBottom: 20, textAlign: "center" }}
            >
              Chọn Thể Loại
            </Text>
            <FlatList
              data={danhmuc}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    setTheLoai(item.name);
                    setModalVisibleTheLoai(false);
                  }}
                >
                  <Text style={{ fontSize: 18, marginBottom: 10 }}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              onPress={() => setModalVisibleTheLoai(false)}
              style={{ marginTop: 20 }}
            >
              <Text
                style={{ fontSize: 18, color: "#FF4500", textAlign: "center" }}
              >
                Hủy
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.ViewTop}>
        <TouchableOpacity
          onPress={() => {
            handleVietTruyen();
          }}
        >
          <Ionicons name="chevron-back-outline" size={40} color="#FFCC33" />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 26,
            color: "#FFCC33",
            marginLeft: 15,
            marginRight: 140,
          }}
        >
          Viết truyện
        </Text>
      </View>
      <ScrollView
        style={{
          width: "100%",
          height: "900%",
          padding: 15,
        }}
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            width: "97%",
            height: 270,
            alignItems: "center",
            backgroundColor: "#222222",
            flexDirection: "row",
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginLeft: 60,
            }}
          >
            <Image
              source={{ uri: image }}
              style={{
                width: "170px",
                height: "170px",
                resizeMode: "contain",
              }}
            />
            <TextInput
              onChangeText={(text) => setTenTruyen(text)}
              value={tenTruyen}
              style={{
                color: "#FFCC33",
                fontSize: 18,
                marginTop: 15,
                fontWeight: "bold",
                textAlign: "center",
              }}
            />
          </View>

          <TouchableOpacity
            onPress={pickImage}
            style={{
              marginTop: 10,
              borderRadius: 10,
              width: 50,
              height: 30,
              backgroundColor: "#FFCC33",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 21, color: "white" }}>Sửa</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.ViewTen}>
          <View style={styles.ViewChu}>
            <Text style={styles.Text}>Tác giả:</Text>
            <TextInput
              onChangeText={(text) => setTenTacGia(text)}
              value={tenTacGia}
              style={{ color: "#FFCC33", fontSize: 18, fontWeight: "bold" }}
            />
          </View>
          <View style={styles.ViewChu}>
            <Text style={styles.Text}>Trạng thái:</Text>
            <Text style={styles.Text2}>Đang ra</Text>
          </View>
          <View style={styles.ViewChu}>
            <Text style={styles.Text}>Thể loại:</Text>
            <TouchableOpacity onPress={() => setModalVisibleTheLoai(true)}>
              <Text
                style={[styles.Text, { color: "#FFCC33", fontWeight: "bold" }]}
              >
                {theLoai}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.ViewChu}>
            <Text style={styles.Text}>Ngày đăng:</Text>
            <Text style={styles.Text2}>{ngayDang}</Text>
          </View>
          <View style={styles.ViewChu}>
            <Text style={styles.Text}>Lượt đọc:</Text>
            <Text style={styles.Text2}>0</Text>
          </View>
          <View style={styles.ViewChu}>
            <Text style={styles.Text}>Trạng thái truyện:</Text>
            <Text style={[styles.Text, { color: "#FF4500" }]}>
              Chưa xuất bản
            </Text>
          </View>
          <TouchableOpacity
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 10,
            }}
            onPress={() => {
              handleVietTruyen2();
            }}
          >
            <Text
              style={[
                styles.Text,
                { color: "#FFCC33", fontWeight: "bold", textAlign: "center" },
              ]}
            >
              Xuất Bản
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ ...styles.ViewMoTa, height: moTaHeight }}>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.Text}>
              {shortDescription ? `${moTa.slice(0, 20)}...` : moTa}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setShortDescription(!shortDescription);
                setMoTaHeight(shortDescription ? null : 70);
              }}
            >
              <Text
                style={[styles.Text, { color: "#FFCC33", fontWeight: "bold" }]}
              >
                {shortDescription ? "Xem thêm" : "Thu gọn"}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => {
              setModalVisibleMota(true);
            }}
            style={{
              marginTop: 10,
              borderRadius: 10,
              width: 50,
              height: 30,
              backgroundColor: "#FFCC33",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 21, color: "white" }}>Sửa</Text>
          </TouchableOpacity>
        </View>
        {/* Nội dung */}
        <View style={{ ...styles.ViewMoTa, height: NoiDungHeight }}>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.Text}>
              {shortDescriptionNoiDung ? `${NoiDung.slice(0, 20)}...` : NoiDung}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setShortDescriptionNoiDung(!shortDescriptionNoiDung);
                setNoiDungHeight(shortDescriptionNoiDung ? null : 70);
              }}
            >
              <Text
                style={[styles.Text, { color: "#FFCC33", fontWeight: "bold" }]}
              >
                {shortDescriptionNoiDung ? "Xem thêm" : "Thu gọn"}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => {
              setModalVisibleNoiDung(true);
            }}
            style={{
              marginTop: 10,
              borderRadius: 10,
              width: 50,
              height: 30,
              backgroundColor: "#FFCC33",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 21, color: "white" }}>Sửa</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleMota}
        onRequestClose={() => {
          setModalVisibleMota(!modalVisibleMota);
        }}
      >
        <View style={styles.modalContainerTheLoai}>
          <View style={styles.modalContentTheLoai}>
            <Text
              style={{ fontSize: 20, marginBottom: 20, textAlign: "center" }}
            >
              Nhập Mô Tả
            </Text>
            <TextInput
              value={moTa}
              multiline={true}
              numberOfLines={5}
              onChangeText={(text) => setMoTa(text)}
              style={{
                height: 90,
                borderColor: "gray",
                borderWidth: 1,
                marginBottom: 20,
                paddingHorizontal: 10,
              }}
              placeholder="Nhập thông tin mới"
            />
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <TouchableOpacity onPress={() => setModalVisibleMota(false)}>
                <Text style={{ fontSize: 18, color: "#FF4500" }}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setModalVisibleMota(false);
                }}
              >
                <Text style={{ fontSize: 18, color: "#FFCC33" }}>Cập nhật</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {/* Modal nội dung */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleNoiDung}
        onRequestClose={() => {
          setModalVisibleNoiDung(!modalVisibleNoiDung);
        }}
      >
        <View style={styles.modalContainerTheLoai}>
          <View style={styles.modalContentTheLoai}>
            <Text
              style={{ fontSize: 20, marginBottom: 20, textAlign: "center" }}
            >
              Nhập nội dung
            </Text>
            <TextInput
              value={NoiDung}
              multiline={true}
              numberOfLines={50}
              onChangeText={(text) => setNoiDung(text)}
              style={{
                height: 500,
                borderColor: "gray",
                borderWidth: 1,
                marginBottom: 20,
                paddingHorizontal: 10,
              }}
              placeholder="Nhập thông tin mới"
            />
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <TouchableOpacity onPress={() => setModalVisibleNoiDung(false)}>
                <Text style={{ fontSize: 18, color: "#FF4500" }}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setModalVisibleNoiDung(false);
                }}
              >
                <Text style={{ fontSize: 18, color: "#FFCC33" }}>Cập nhật</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    backgroundColor: "#111111",
  },
  ViewMoTa: {
    marginTop: 20,
    width: "97%",
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    padding: 17,
    backgroundColor: "#222222",
  },

  Text: {
    fontSize: 18,
    color: "gray",
  },
  Text2: {
    fontSize: 18,
    color: "gray",
    fontWeight: "bold",
  },
  ViewChu: {
    flexDirection: "row",
    gap: 15,
  },
  ViewTen: {
    marginTop: 20,
    width: "97%",
    height: 200,
    alignItems: "flex-start",
    padding: 17,
    backgroundColor: "#222222",
  },
  ViewTop: {
    width: "100%",
    backgroundColor: "#111111",
    flexDirection: "row",
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
    borderColor: "gray",
  },
  modalContainerTheLoai: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContentTheLoai: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    maxHeight: "80%",
  },
});
