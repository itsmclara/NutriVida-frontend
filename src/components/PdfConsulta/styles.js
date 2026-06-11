import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 11,
    fontFamily: "Inter",
    color: "#1F2D3D",
    lineHeight: 1.4
  },

  watermark: {
    position: "absolute",
    top: "35%",
    left: "15%",
    width: 420,
    opacity: 0.16,
  },

  header: {
    alignItems: "center",
    marginBottom: 10
  },

  logo: {
    width: 120
  },

  linha: {
    borderBottomWidth: 1,
    borderBottomColor: "#DB6A92",
    marginTop: 6,
    marginBottom: 6
  },

  linhaAssinatura: {
    borderBottomWidth: 1,
    borderBottomColor: "#1F2D3D",
    width: "60%",
    alignSelf: "center",
    marginTop: 30,
    marginBottom: 6
  },

  assinatura: {
    marginTop: "100",
    alignItems: "center",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4
  },

  col: {
    width: "48%"
  },

  label: {
    fontWeight: 500
  },

  bold: {
    fontWeight: "bold",
    fontSize: 12,
    marginBottom: 3
  },

  value: {
    fontWeight: 400
  },

  bloco: {
    marginBottom: 4
  },

  assinaturaTexto: {
    textAlign: "center",
    fontSize: 10
  },

  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 35,
    backgroundColor: "#E97CA5",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 20,
  },

  footerText: {
    fontSize: 10,
    color: "#FFFFFF"
  }
});