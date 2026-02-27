import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  const [expressao, setExpressao] = useState("0");
  const [operador, setOperador] = useState("");

  const operadores = ["+", "-", "X", "/"];
  // se há algum operador ele substitui, senão adiciona à expressão
  const adicionarOperador = (op) => {
    setOperador(op);
    setExpressao((valorAtual) => {
      const jaTemOperador = operadores.some((operador) =>
        valorAtual.includes(operador),
      );
      if (jaTemOperador) {
        return valorAtual.replace(/[+\-X/]/, op);
      }

      return valorAtual + op;
    });
  };

  const calculaExpressao = (expr, op) => {
    const indiceOp = expr.indexOf(op);
    const num1 = Number(expr.substring(0, indiceOp));
    const num2 = Number(expr.substring(indiceOp + 1));

    switch (op) {
      case "+":
        setExpressao(String(num1 + num2));
        return num1 + num2;

      case "-":
        setExpressao(String(num1 - num2));
        return num1 - num2;

      case "X":
        setExpressao(String(num1 * num2));
        return num1 * num2;

      case "/":
        if (num2 === 0) {
          return "Erro";
        }
        setExpressao(String(num1 / num2));
        return num1 / num2;

      default:
        return "Operador inválido";
    }
  };

  return (
    <SafeAreaView>
      <View>
        <Text>{expressao}</Text>
      </View>

      {/* OPERADORES */}
      {operadores.map((op) => (
        <TouchableOpacity
          key={op}
          style={styles.teclaOperador}
          onPress={() => {
            adicionarOperador(op);
          }}
        >
          <Text>{op}</Text>
        </TouchableOpacity>
      ))}

      {/* TECLADO NUMERICO */}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((numero) => (
        <TouchableOpacity
          key={numero}
          style={styles.teclaNumerica}
          onPress={() => {
            if (expressao === "0") {
              setExpressao(String(numero));
            } else {
              setExpressao(expressao + String(numero));
            }
          }}
        >
          <Text>{numero}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity onPress={() => setExpressao(expressao.slice(0, -1))}>
        <Text>{"<-"}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => calculaExpressao(expressao, operador)}>
        <Text>{"="}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setExpressao("0")}>
        <Text>{"Limpar"}</Text>
      </TouchableOpacity>
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
