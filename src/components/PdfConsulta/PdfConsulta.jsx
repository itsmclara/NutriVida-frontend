import {
  Document,
  Page,
  Text,
  View,
  Image,
  Font
} from "@react-pdf/renderer";

import { styles } from "./styles";
import logo from "../../assets/imagem-logo-vertical.png";
import watermark from "../../assets/imagem-logo.png";

Font.register({
  family: "Inter",
  fonts: [
    { src: "/fonts/Inter-Regular.ttf" },
    { src: "/fonts/Inter-Medium.ttf", fontWeight: 500 },
    { src: "/fonts/Inter-Bold.ttf", fontWeight: "bold" }
  ]
});

function PdfConsulta({ consulta, paciente }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>

        <Image src={watermark} style={styles.watermark} />

        {/* LOGO */}
        <View style={styles.header}>
          <Image src={logo} style={styles.logo} />
        </View>

        {/* TOPO */}
        <View style={styles.row}>
          <View style={styles.col}>

            <Text>
              <Text style={styles.label}>Nutricionista: </Text>
              <Text style={styles.value}>Sarah Duarte</Text>
            </Text>

            <Text>
              <Text style={styles.label}>CRN: </Text>
              <Text style={styles.value}>12345</Text>
            </Text>

            <Text>
              <Text style={styles.label}>Especialidade: </Text>
              <Text style={styles.value}>Nutrição Clínica</Text>
            </Text>

          </View>

          <View style={styles.col}>

            <Text>
              <Text style={styles.label}>Data da consulta: </Text>
              <Text style={styles.value}>{consulta.data}</Text>
            </Text>

            <Text>
              <Text style={styles.label}>Tipo: </Text>
              <Text style={styles.value}>{consulta.descricao}</Text>
            </Text>

          </View>
        </View>

        <View style={styles.linha} />

        {/* PACIENTE */}
        <View style={styles.row}>
          <View style={styles.col}>

            <Text>
              <Text style={styles.label}>Paciente: </Text>
              <Text style={styles.value}>{paciente.nome}</Text>
            </Text>

            <Text>
              <Text style={styles.label}>Data de nascimento: </Text>
              <Text style={styles.value}>
                {paciente.dataNascimento} ({paciente.idade} anos)
              </Text>
            </Text>

              <Text style={styles.label}>Objetivo: </Text>
              <Text style={styles.value}>Emagrecimento saudável</Text>

              <Text style={styles.label}>Informações clínicas: </Text>
              <Text style={styles.value}>Diabetes tipo 2</Text>

              <Text style={styles.label}>Restrições alimentares: </Text>
              <Text style={styles.value}>Intolerância à lactose</Text>

          </View>

          <View style={styles.col}>

            <Text>
              <Text style={styles.label}>Prontuário: </Text>
              <Text style={styles.value}>00001</Text>
            </Text>

            <Text>
              <Text style={styles.label}>Gênero: </Text>
              <Text style={styles.value}>{paciente.genero}</Text>
            </Text>

          </View>
        </View>

        <View style={styles.linha} />

        {/* AVALIAÇÃO */}
        <Text style={styles.bold}>Avaliação física</Text>

        <View style={styles.row}>
          <View style={styles.col}>

            <Text>
              <Text style={styles.label}>Peso: </Text>
              <Text style={styles.value}>{consulta.peso} kg</Text>
            </Text>

            <Text>
              <Text style={styles.label}>Altura: </Text>
              <Text style={styles.value}>{consulta.altura} m</Text>
            </Text>

            <Text>
              <Text style={styles.label}>IMC: </Text>
              <Text style={styles.value}>25,5</Text>
            </Text>

          </View>

          <View style={styles.col}>

            <Text>
              <Text style={styles.label}>Circunferência abdominal: </Text>
              <Text style={styles.value}>85 cm</Text>
            </Text>

            <Text>
              <Text style={styles.label}>Circunferência do quadril: </Text>
              <Text style={styles.value}>85 cm</Text>
            </Text>

            <Text>
              <Text style={styles.label}>Percentual de gordura: </Text>
              <Text style={styles.value}>22%</Text>
            </Text>

          </View>
        </View>

        <View style={styles.linha} />

        {/* PLANO */}
        <Text style={styles.bold}>Plano alimentar</Text>
        <Text style={styles.value}>{consulta.plano}</Text>

        <View style={styles.linha} />

        {/* OBS */}
        <Text style={styles.bold}>Observações</Text>
        <Text style={styles.value}>{consulta.observacoes}</Text>

        {/* ASSINATURA */}
        <View style={styles.assinatura}>
            <View style={styles.linhaAssinatura} />
            <Text>Dr. Sarah Duarte</Text>
            <Text>CRN 12345 - Nutricionista</Text>
        </View>
        
        {/* FOOTER */}
        <View style={styles.footer} fixed>
            <Text style={styles.footerText}>(43) 91234-5678</Text>
            <Text style={styles.footerText}>contato@nutrivida.com.br</Text>
            <Text style={styles.footerText}>www.clinicanutrivida.com.br</Text>
        </View>

      </Page>
    </Document>
  );
}

export default PdfConsulta;