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
import perfilIcon from "../../assets/icones/paciente.png";
import statusIcon from "../../assets/icones/flag.png";
import filtroIcon from "../../assets/icones/filter.png";
import listaIcon from "../../assets/icones/lista.png";

function PdfRelatorioUsuarios({
    usuarios,
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
                        RELATÓRIO DE USUÁRIOS
                    </Text>

                    <Text style={styles.subtitulo}>
                        Lista todos os usuários cadastrados no sistema.
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
                            src={perfilIcon}
                            style={styles.iconeFiltro}
                        />

                        <Text style={styles.filtroTitulo}>
                            Perfil
                        </Text>

                        <Text style={styles.filtroValor}>
                            {filtros.perfil || "Todos"}
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
                            {filtros.status || "Todos"}
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
                            LISTA DE USUÁRIOS
                        </Text>

                    </View>

                    <Text style={styles.totalTexto}>
                        Total de usuários: {total}
                    </Text>

                </View>

                {/* Tabela */}

                <View style={styles.tabela}>

                    {/* Cabeçalho */}
                    <View style={styles.tabelaCabecalho}>

                        <View style={[styles.colNome, styles.celulaHeader]}><Text style={styles.headerText}>Nome</Text></View>
                        <View style={[styles.colPerfil, styles.celulaHeader]}><Text style={styles.headerText}>Perfil</Text></View>
                        <View style={[styles.colStatus, styles.celulaHeader]}><Text style={styles.headerText}>Status</Text></View>
                        <View style={[styles.colEmail, styles.celulaHeader]}><Text style={styles.headerText}>E-mail</Text></View>
                        <View style={[styles.colCrn, styles.celulaHeader]}><Text style={styles.headerText}>CRN</Text></View>
                        <View style={[styles.colEspecialidade, styles.celulaHeader]}><Text style={styles.headerText}>Especialidade</Text></View>

                    </View>

                    {/* Linhas */}
                    {usuarios.map((usuario) => (

                        <View
                            key={`${usuario.email}-${usuario.nome}`}
                            style={styles.tabelaLinha}
                        >

                            <View style={styles.colNome}>
                                <Text style={styles.textoTabela}>{usuario.nome}</Text>
                            </View>

                            <View style={styles.colPerfil}>
                                <Text style={styles.textoTabela}>{formatarTexto(usuario.perfil)}</Text>
                            </View>

                            <View style={styles.colStatus}>
                                <Text style={styles.textoTabela}>{formatarTexto(usuario.status)}</Text>
                            </View>

                            <View style={styles.colEmail}>
                                <Text style={styles.textoTabela}>{usuario.email}</Text>
                            </View>

                            <View style={styles.colCrn}>
                                <Text style={styles.textoTabela}>{usuario.crn || "-"}</Text>
                            </View>

                            <View style={styles.colEspecialidade}>
                                <Text style={styles.textoTabela}>{usuario.especialidade || "-"}</Text>
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

export default PdfRelatorioUsuarios;