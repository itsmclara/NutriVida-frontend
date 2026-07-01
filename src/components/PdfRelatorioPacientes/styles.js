import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({

    page: {
        paddingTop: 30,
        paddingHorizontal: 35,
        paddingBottom: 60,
        fontSize: 10,
        color: "#1F2D3D"
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },

    logo: {
        width: 180
    },

    infoEmissao: {
        alignItems: "flex-end",
        justifyContent: "center"
    },

    infoTitulo: {
        color: "#DB6A92",
        fontSize: 9,
        fontWeight: "bold"
    },

    infoTexto: {
        fontSize: 10,
        color: "#1F2D3D"
    },

    divisor: {
        borderBottomWidth: 1,
        borderBottomColor: "#DB6A92",
        marginTop: 15,
        marginBottom: 20
    },

    tituloContainer: {
        alignItems: "center",
        marginBottom: 25
    },

    sectionTitle: {
        color: "#DB6A92",
        fontSize: 16,
        fontWeight: "bold",
    },

    caixaFiltros: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#DB6A92",
        borderRadius: 12,
        backgroundColor: "#F8FFF0",
        minHeight: 72,
        paddingVertical: 12,
        marginBottom: 30
    },

    itemFiltro: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },

    divisorFiltro: {
        width: 1,
        height: 55,
        backgroundColor: "#DB6A92"
    },

    filtroTitulo: {
        fontSize: 11,
        fontWeight: "bold",
        color: "#1F2D3D"
    },

    filtroValor: {
        marginTop: 6,
        fontSize: 10,
        color: "#666",
        textAlign: "center"
    },

    titulo: {
        fontSize: 20,
        color: "#69B320",
        fontWeight: "bold"
    },

    subtitulo: {
        color: "#666",
        fontSize: 11,
        marginTop: 4
    },



    tabelaCabecalho: {
        flexDirection: "row",
        backgroundColor: "#F8FFF0",
        borderWidth: 1,
        borderColor: "#DB6A92",
        minHeight: 30,
        paddingVertical: 4,
    },

    tabelaLinha: {
        flexDirection: "row",
        alignItems: "center",
        minHeight: 24,
        borderBottomWidth: 1,
        borderColor: "#DB6A92",
        paddingVertical: 4
    },

    celulaHeader: {
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
    },

    colProntuario: {
        width: "14%",
        paddingHorizontal: 4,
        justifyContent: "center",
        borderRightWidth: 1,
        borderRightColor: "#DB6A92",
    },

    colNome: {
        width: "24%",
        paddingHorizontal: 4,
        justifyContent: "center",
        borderRightWidth: 1,
        borderRightColor: "#DB6A92",
    },

    colIdade: {
        width: "8%",
        justifyContent: "center",
        alignItems: "center",
        borderRightWidth: 1,
        borderRightColor: "#DB6A92",
    },

    colGenero: {
        width: "14%",
        justifyContent: "center",
        alignItems: "center",
        borderRightWidth: 1,
        borderRightColor: "#DB6A92",
    },

    colTelefone: {
        width: "17%",
        justifyContent: "center",
        alignItems: "center",
        borderRightWidth: 1,
        borderRightColor: "#DB6A92",
    },

    colCidade: {
        width: "13%",
        justifyContent: "center",
        alignItems: "center",
        borderRightWidth: 1,
        borderRightColor: "#DB6A92",
    },
    colCadastro: {
        width: "10%",
        justifyContent: "center",
        alignItems: "center",
    },

    headerText: {
        fontSize: 10,
        fontWeight: "bold",
    },

    textoTabela: {
        fontSize: 10,
    },

    footer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 34,
        backgroundColor: "#DB6A92",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 25,
    },

    footerText: {
        color: "#FFF",
        fontSize: 9,
    },

    iconeFiltro: {
        width: 18,
        height: 18,
        marginBottom: 6,
    },

    iconeTitulo: {
        width: 16,
        height: 16,
        marginRight: 8,
    },

    tituloSecao: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },

    totalContainer: {
        alignItems: "flex-end",
    },

    totalTexto: {
        fontSize: 10,
        fontWeight: "bold",
        color: "#1F2D3D",
    },

    cabecalhoLista: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

});