import {
    Document,
    Page,
    View,
    Text,
    Image
} from "@react-pdf/renderer";

import { styles } from "./styles";
import { formatarData, formatarTexto } from "../../utils/formatadores";

import logo from "../../assets/imagem-logo-horizontal.png";
import calendarioIcon from "../../assets/icones/calendar.png";
import nutriIcon from "../../assets/icones/nutri.png";
import statusIcon from "../../assets/icones/flag.png";
import filtroIcon from "../../assets/icones/filter.png";
import listaIcon from "../../assets/icones/lista.png";

function PdfRelatorioAgendas({
    agendas,
    total,
    filtros
}) {

    const agora = new Date();

    const data = agora.toLocaleDateString("pt-BR");

    const hora = agora.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
    });

    return (

        <Document>

            <Page
                size="A4"
                style={styles.page}
            >

                {/* Cabeçalho */}

                <View style={styles.header}>

                    <Image
                        src={logo}
                        style={styles.logo}
                    />

                    <View style={styles.infoEmissao}>

                        <Text style={styles.infoTitulo}>
                            Emitido em:
                        </Text>

                        <Text style={styles.infoTexto}>
                            {data}
                        </Text>

                        <Text style={styles.infoTexto}>
                            {hora}
                        </Text>

                    </View>

                </View>

                <View style={styles.divisor} />

                {/* Título */}

                <View style={styles.tituloContainer}>

                    <Text style={styles.titulo}>
                        RELATÓRIO DE AGENDAS
                    </Text>

                    <Text style={styles.subtitulo}>
                        Lista todas as agendas cadastradas no período.
                    </Text>

                </View>

                {/* Filtros */}
                <View style={styles.tituloSecao}>

                    <Image
                        src={filtroIcon}
                        style={styles.iconeTitulo}
                    />

                    <Text style={styles.sectionTitle}>
                        FILTROS APLICADOS
                    </Text>

                </View>

                <View style={styles.caixaFiltros}>

                    <View style={styles.itemFiltro}>

                        <Image
                            src={calendarioIcon}
                            style={styles.iconeFiltro}
                        />

                        <Text style={styles.filtroTitulo}>
                            Período
                        </Text>

                        <Text style={styles.filtroValor}>
                            {filtros.dataInicio
                                ? formatarData(filtros.dataInicio)
                                : "--/--/----"}
                        </Text>

                        <Text style={styles.filtroValor}>
                            {filtros.dataFim
                                ? formatarData(filtros.dataFim)
                                : "--/--/----"}
                        </Text>

                    </View>

                    <View style={styles.divisorFiltro} />

                    <View style={styles.itemFiltro}>

                        <Image
                            src={nutriIcon}
                            style={styles.iconeFiltro}
                        />

                        <Text style={styles.filtroTitulo}>
                            Nutricionista
                        </Text>

                        <Text style={styles.filtroValor}>
                            {filtros.nutricionista || "Todas"}
                        </Text>

                    </View>

                    <View style={styles.divisorFiltro} />

                    <View style={styles.itemFiltro}>

                        <Image
                            src={statusIcon}
                            style={styles.iconeFiltro}
                        />

                        <Text style={styles.filtroTitulo}>
                            Status
                        </Text>

                        <Text style={styles.filtroValor}>
                            {formatarTexto(filtros.status) || "Todos"}
                        </Text>

                    </View>

                </View>

                {/* Lista */}
                <View style={styles.cabecalhoLista}>

                    <View style={styles.tituloSecao}>

                        <Image
                            src={listaIcon}
                            style={styles.iconeTitulo}
                        />

                        <Text style={styles.sectionTitle}>
                            LISTA DE AGENDAS
                        </Text>

                    </View>

                    <Text style={styles.totalTexto}>
                        Total de agendas: {total}
                    </Text>

                </View>

                {/* Tabela */}

                <View style={styles.tabela}>

                    {/* Cabeçalho */}
                    <View style={styles.tabelaCabecalho}>

                        <View style={[styles.colData, styles.celulaHeader]}><Text style={styles.headerText}>Data</Text></View>
                        <View style={[styles.colNutricionista, styles.celulaHeader]}><Text style={styles.headerText}>Nutricionista</Text></View>
                        <View style={[styles.colStatus, styles.celulaHeader]}><Text style={styles.headerText}>Status</Text></View>
                        <View style={[styles.colHorariosOcupados, styles.celulaHeader]}><Text style={styles.headerText}>Horários ocupados</Text></View>
                        <View style={[styles.colHorariosLivres, styles.celulaHeader]}><Text style={styles.headerText}>Horários livres</Text></View>

                    </View>

                    {/* Linhas */}
                    {agendas.map((agenda) => (

                        <View
                            key={agenda.id}
                            style={styles.tabelaLinha}
                        >

                            <View style={styles.colData}>
                                <Text style={styles.textoTabela}>{formatarData(agenda.data)}</Text>
                            </View>

                            <View style={styles.colNutricionista}>
                                <Text style={styles.textoTabela}>{agenda.nutricionista}</Text>
                            </View>

                            <View style={styles.colStatus}>
                                <Text style={styles.textoTabela}>{formatarTexto(agenda.status) || "-"}</Text>
                            </View>

                            <View style={styles.colHorariosOcupados}>
                                <Text style={styles.textoTabela}>{agenda.horariosOcupados}</Text>
                            </View>

                            <View style={styles.colHorariosLivres}>
                                <Text style={styles.textoTabela}>{agenda.horariosLivres}</Text>
                            </View>

                        </View>

                    ))}

                </View>

                {/* Rodapé */}

                <View fixed style={styles.footer}>

                    <View>

                        <Text style={styles.footerText}>
                            (43) 91234-5678
                        </Text>

                        <Text style={styles.footerText}>
                            contato@nutrivida.com.br
                        </Text>

                    </View>

                    <Text style={styles.footerText}>
                        www.clinicanutrivida.com.br
                    </Text>

                    <Text
                        style={styles.footerText}
                        render={({ pageNumber, totalPages }) =>
                            `Página ${pageNumber} de ${totalPages}`
                        }
                    />

                </View>

            </Page>

        </Document>

    );

}

export default PdfRelatorioAgendas;