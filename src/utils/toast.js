const toast = {

  sucesso(mensagem) {

    window.mostrarToast?.(
      mensagem,
      "sucesso"
    );
  },

  erro(mensagem) {

    window.mostrarToast?.(
      mensagem,
      "erro"
    );
  },

  aviso(mensagem) {

    window.mostrarToast?.(
      mensagem,
      "aviso"
    );
  },

  info(mensagem) {

    window.mostrarToast?.(
      mensagem,
      "info"
    );
  }
};

export default toast;