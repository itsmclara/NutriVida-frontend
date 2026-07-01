import {
    Document,
    Page,
    View,
    Text,
    Image
} from "@react-pdf/renderer";

import { styles } from "./styles";
import { formatarData, formatarTelefone } from "../../utils/formatadores";

import logo from "../../assets/imagem-logo-horizontal.png";
import calendarioIcon from "../../assets/icones/calendar.png";
import generoIcon from "../../assets/icones/gender.png";
import cidadeIcon from "../../assets/icones/city.png";
import idadeIcon from "../../assets/icones/age.png";
import filtroIcon from "../../assets/icones/filter.png";
import listaIcon from "../../assets/icones/lista.png";

function PdfRelatorioPacientes({
    pacientes,
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
                        RELATÓRIO DE PACIENTES
                    </Text>

                    <Text style={styles.subtitulo}>
                        Lista todos os pacientes cadastrados na clínica.
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
                            src={generoIcon}
                            style={styles.iconeFiltro}
                        />

                        <Text style={styles.filtroTitulo}>
                            Gênero
                        </Text>

                        <Text style={styles.filtroValor}>
                            {filtros.genero || "Todos"}
                        </Text>

                    </View>

                    <View style={styles.divisorFiltro} />

                    <View style={styles.itemFiltro}>

                        <Image
                            src={cidadeIcon}
                            style={styles.iconeFiltro}
                        />

                        <Text style={styles.filtroTitulo}>
                            Cidade
                        </Text>

                        <Text style={styles.filtroValor}>
                            {filtros.cidade || "Todas"}
                        </Text>

                    </View>

                    <View style={styles.divisorFiltro} />

                    <View style={styles.itemFiltro}>

                        <Image
                            src={idadeIcon}
                            style={styles.iconeFiltro}
                        />

                        <Text style={styles.filtroTitulo}>
                            Faixa etária
                        </Text>

                        <Text style={styles.filtroValor}>
                            {filtros.faixaEtaria || "Todas"}
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
                            LISTA DE PACIENTES
                        </Text>

                    </View>

                    <Text style={styles.totalTexto}>
                        Total de pacientes: {total}
                    </Text>

                </View>

                {/* Tabela */}

                <View style={styles.tabela}>

                    {/* Cabeçalho */}
                    <View style={styles.tabelaCabecalho}>

                        <View style={[styles.colProntuario, styles.celulaHeader]}><Text style={styles.headerText}>Prontuário</Text></View>
                        <View style={[styles.colNome, styles.celulaHeader]}><Text style={styles.headerText}>Nome</Text></View>
                        <View style={[styles.colIdade, styles.celulaHeader]}><Text style={styles.headerText}>Idade</Text></View>
                        <View style={[styles.colGenero, styles.celulaHeader]}><Text style={styles.headerText}>Gênero</Text></View>
                        <View style={[styles.colTelefone, styles.celulaHeader]}><Text style={styles.headerText}>Telefone</Text></View>
                        <View style={[styles.colCidade, styles.celulaHeader]}><Text style={styles.headerText}>Cidade</Text></View>
                        <View style={[styles.colCadastro, styles.celulaHeader]}><Text style={styles.headerText}>Cadastro</Text></View>

                    </View>

                    {/* Linhas */}
                    {pacientes.map((paciente) => (

                        <View
                            key={paciente.id}
                            style={styles.tabelaLinha}
                        >

                            <View style={styles.colProntuario}>
                                <Text style={styles.textoTabela}>{paciente.numeroProntuario}</Text>
                            </View>

                            <View style={styles.colNome}>
                                <Text style={styles.textoTabela}>{paciente.nome}</Text>
                            </View>

                            <View style={styles.colIdade}>
                                <Text style={styles.textoTabela}>{paciente.idade}</Text>
                            </View>

                            <View style={styles.colGenero}>
                                <Text style={styles.textoTabela}>{paciente.genero}</Text>
                            </View>

                            <View style={styles.colTelefone}>
                                <Text style={styles.textoTabela}>{formatarTelefone(paciente.telefone) || "-"}</Text>
                            </View>

                            <View style={styles.colCidade}>
                                <Text style={styles.textoTabela}>{paciente.cidade || "-"}</Text>
                            </View>

                            <View style={styles.colCadastro}>
                                <Text style={styles.textoTabela}>{formatarData(paciente.dataCadastro)}</Text>
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

export default PdfRelatorioPacientes;