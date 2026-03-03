import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  const [expressao, setExpressao] = useState("0");
  const [operador, setOperador] = useState("");
  const [validos, setValidos] = useState([
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "sqrt",
  ]);
  const operadores = ["+", "-", "X", "/", "sqrt"];
  const numeros = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  // se há algum operador ele substitui, senão adiciona à expressão
  const adicionarOperador = (op) => {
    setOperador(op);
    setValidos([
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "+",
      "-",
      "X",
      "/",
      "sqrt",
    ]);
    setExpressao((valorAtual) => {
      const jaTemOperador = operadores.some((operador) =>
        valorAtual.includes(operador),
      );
      if (jaTemOperador) {
        return valorAtual.replace(/[+\-X/]/, op);
      }
      if (op === "sqrt") {
        setValidos(["=", "limpar"]);
      }
      return valorAtual + op;
    });
  };

  const calculaExpressao = (expr, op) => {
    const indiceOp = expr.indexOf(op);
    const num1 = Number(expr.substring(0, indiceOp));
    const num2 = Number(expr.substring(indiceOp + 1));
    setOperador("");
    setValidos(["+", "-", "X", "/", "sqrt"]);
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
      case "sqrt":
        setExpressao(String(Math.sqrt(num1)));
        return Math.sqrt(num1);
      default:
        return "Operador inválido";
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* DISPLAY */}
      <View style={styles.displayContainer}>
        <Text style={styles.displayText} numberOfLines={1} adjustsFontSizeToFit>
          {expressao}
        </Text>
      </View>

      <View style={styles.keyboard}>
        {/* OPERADORES */}
        {operadores.map((op) => (
          <TouchableOpacity
            key={op}
            style={styles.operatorButton}
            onPress={() => adicionarOperador(op)}
          >
            <Text style={styles.operatorText}>{op}</Text>
          </TouchableOpacity>
        ))}

        {/* TECLADO NUMERICO */}
        {numeros.map((numero) => (
          <TouchableOpacity
            key={numero}
            style={styles.numberButton}
            onPress={() => {
              if (validos.includes(String(numero))) {
                if (expressao === "0") {
                  setExpressao(String(numero));
                } else {
                  setExpressao(expressao + String(numero));
                }
              } else {
                console.log("Tecla invalida");
              }
            }}
          >
            <Text style={styles.numberText}>{numero}</Text>
          </TouchableOpacity>
        ))}

        {/* OUTROS BOTOES */}
        <TouchableOpacity
          style={styles.specialButton}
          onPress={() => {
            if (
              numeros.includes(Number(expressao.at(-1))) &&
              expressao !== "0"
            ) {
              setExpressao(expressao.slice(0, -1));
            }
          }}
        >
          <Text style={styles.specialText}>⌫</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.equalButton}
          onPress={() => calculaExpressao(expressao, operador)}
        >
          <Text style={styles.equalText}>=</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.clearButton}
          onPress={() => {
            setValidos([
              "0",
              "1",
              "2",
              "3",
              "4",
              "5",
              "6",
              "7",
              "8",
              "9",
              "+",
              "-",
              "X",
              "/",
              "sqrt",
            ]);
            setExpressao("0");
          }}
        >
          <Text style={styles.clearText}>C</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.subtitulo}>Calculadora da pátria</Text>
      <Text style={styles.subtitulo}>sqrt = Square Root (Raiz Quadrada)</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#009C3B",
    justifyContent: "flex-end",
  },

  displayContainer: {
    flex: 2,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    padding: 20,
    backgroundColor: "#002776",
    borderRadius: 20,
    overflow: "hidden",
  },

  displayText: {
    fontSize: 48,
    color: "white",
    fontWeight: "bold",
    textAlign: "right",
    width: "100%",
  },

  keyboard: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingBottom: 0,
    backgroundColor: "#009C3B",
  },

  numberButton: {
    width: "22%",
    aspectRatio: 1,
    margin: 8,
    borderRadius: 50,
    backgroundColor: "#FFDF00",
    justifyContent: "center",
    alignItems: "center",
  },

  numberText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#002776",
  },

  operatorButton: {
    width: "22%",
    aspectRatio: 1,
    margin: 8,
    borderRadius: 50,
    backgroundColor: "#002776",
    justifyContent: "center",
    alignItems: "center",
  },

  operatorText: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: "bold",
  },

  equalButton: {
    width: "46%",
    aspectRatio: 2,
    margin: 8,
    borderRadius: 40,
    backgroundColor: "#FFDF00",
    justifyContent: "center",
    alignItems: "center",
  },

  equalText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#002776",
  },

  clearButton: {
    width: "22%",
    aspectRatio: 1,
    margin: 8,
    borderRadius: 50,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },

  clearText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#002776",
  },

  specialButton: {
    width: "22%",
    aspectRatio: 1,
    margin: 8,
    borderRadius: 50,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },

  specialText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#002776",
  },

  subtitulo: {
    textAlign: "center",
    color: "#FFDF00", // amarelo da bandeira
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 2,
    marginVertical: 1,
    letterSpacing: 1,
  },
});
