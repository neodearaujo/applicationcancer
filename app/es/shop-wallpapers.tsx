import { useState } from "react";
import {
    Dimensions,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const { width } = Dimensions.get("window");
const itemWidth = (width - 60) / 2; // 2 columnas con márgenes

// Lista de fondos de pantalla disponibles
const wallpapers = [
  { id: 1, name: "Fondo de pantalla montaña", image: require("../../assets/images/boutique/Fond d'écran  montagne.png") },
  { id: 2, name: "Fondo de pantalla Gerona", image: require("../../assets/images/boutique/Fond d'écran gérone.png") },
  { id: 3, name: "Fondo de pantalla Islandia", image: require("../../assets/images/boutique/Fond d'écran islande.png") },
  { id: 4, name: "Fondo de pantalla Italia", image: require("../../assets/images/boutique/Fond d'écran Italie.png") },
  { id: 5, name: "Fondo de pantalla oasis", image: require("../../assets/images/boutique/Fond d'écran oasis.png") },
  { id: 6, name: "Fondo de pantalla París", image: require("../../assets/images/boutique/Fond d'écran paris.png") },
  { id: 7, name: "Fondo de pantalla piscina", image: require("../../assets/images/boutique/Fond d'écran pisicne.png") },
  { id: 8, name: "Fondo de pantalla playa", image: require("../../assets/images/boutique/Fond d'écran plage.png") },
];

export default function ShopWallpapersES() {
  const [purchased, setPurchased] = useState<number[]>([]);

  const handlePurchase = (id: number) => {
    // Lógica de compra a implementar
    setPurchased([...purchased, id]);
  };

  const renderItem = ({ item }: { item: typeof wallpapers[0] }) => (
    <View style={styles.itemContainer}>
      <Image source={item.image} style={styles.image} resizeMode="cover" />
      <Text style={styles.itemName} numberOfLines={2}>
        {item.name}
      </Text>
      <View style={styles.priceContainer}>
        <Text style={styles.priceText}>Precio 2</Text>
        <Image 
          source={require("../../assets/images/couronne de laurier zoomée.png")} 
          style={styles.laurelImage}
          resizeMode="contain"
        />
      </View>
      <TouchableOpacity
        style={[
          styles.buyButton,
          purchased.includes(item.id) && styles.purchasedButton,
        ]}
        onPress={() => handlePurchase(item.id)}
        disabled={purchased.includes(item.id)}
      >
        <Text style={styles.buyButtonText}>
          {purchased.includes(item.id) ? "Comprado" : "Comprar"}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fondos de pantalla</Text>
      
      <FlatList
        data={wallpapers}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E9F7F1",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2E8B57",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: "space-between",
  },
  itemContainer: {
    width: itemWidth,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: itemWidth * 0.75,
    borderRadius: 8,
    marginBottom: 8,
  },
  itemName: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
    marginBottom: 8,
    height: 35,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  priceText: {
    fontSize: 16,
    color: "#2E8B57",
    fontWeight: "700",
    marginRight: 5,
  },
  laurelImage: {
    width: 24,
    height: 24,
  },
  buyButton: {
    backgroundColor: "#2E8B57",
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
  },
  purchasedButton: {
    backgroundColor: "#95C8A8",
  },
  buyButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
});
