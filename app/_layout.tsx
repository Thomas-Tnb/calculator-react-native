import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  const [primeiroNum, setPrimeiroNum] = useState("0");
  const [segundoNum, setSegundoNum] = useState("");
  const [operador, setOperador] = useState("");
  const [opExiste, setOpExiste] = useState(false);

  const calculaExpressao = (n1, op, n2) => {
    const num1 = Number(n1);
    const num2 = Number(n2);

    switch (op) {
      case "+":
        return num1 + num2;

      case "-":
        return num1 - num2;

      case "X":
        return num1 * num2;

      case "/":
        if (num2 === 0) {
          return "Erro";
        }
        return num1 / num2;

      default:
        return "Operador inválido";
    }
  };

  return (
    <SafeAreaView>
      <View>
        <Text>
          {primeiroNum}
          {operador}
          {segundoNum}
        </Text>
      </View>

      {["+", "-", "X", "/"].map((op) => (
        <TouchableOpacity
          key={op}
          style={styles.teclaOperador}
          onPress={() => {
            setOperador(op);
            setOpExiste(true);
          }}
        >
          <Text>{op}</Text>
        </TouchableOpacity>
      ))}

      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((numero) => (
        <TouchableOpacity
          key={numero}
          style={styles.teclaNumerica}
          onPress={() => {
            if (!opExiste) {
              if (primeiroNum === "0") {
                setPrimeiroNum(String(numero));
              } else {
                setPrimeiroNum(primeiroNum + String(numero));
              }
            } else {
              setSegundoNum(segundoNum + String(numero));
            }
          }}
        >
          <Text>{numero}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity></TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  teclaNumerica: {
    width: 30,
    alignItems: "center",
    marginHorizontal: 15,
    padding: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#f8e800ff",
  },
  teclaOperador: {
    width: 50,
    alignItems: "center",
    marginHorizontal: 15,
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "rgb(0, 70, 248)",
  },
});
