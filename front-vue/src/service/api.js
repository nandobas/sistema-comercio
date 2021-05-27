import axios from "axios";

export default class Api {
  constructor() {}

  token = "Bearer " + localStorage.getItem("token");
  login(url, dados) {
    return axios
      .post(process.env.VUE_APP_ROOT_API + url, Object.assign({}, dados))
      .then((response) => {
        if (response.data.erro) {
          Object.noty.error(response.data.msg, {
            timeout: 10000,
          });
          return false;
        }
        return response;
      })
      .catch((error) => {
        return error.response;
        // this.redirectError(error.response.status);
      });
  }

  post(url, dados) {
    return axios
      .post(
        process.env.VUE_APP_ROOT_API + url,

        Object.assign({}, dados),
        {
          headers: {
            "Api-Token": this.token,
          },
        }
      )
      .then((response) => {
        if (response.data.erro) {
          Object.noty.error(response.data.msg, {
            timeout: 10000,
          });
          return false;
        }
        return response.data;
      })
      .catch((error) => {
        return error.response;
        // this.redirectError(error.response.status);
      });
  }

  get(url, p_token = "") {
    if (p_token == "") p_token = this.token;
    return axios
      .get(process.env.VUE_APP_ROOT_API + url, {
        headers: {
          Authorization: p_token,
        },
      })
      .then((response) => {
        if (response.data) {
          return response.data;
        }

        return [];
      });
  }

  getEconet(url) {
    return axios
      .get(url, {
        headers: {
          "Api-Token": this.token,
        },
      })
      .then((response) => {
        if (response.data) {
          return response.data;
        }

        return [];
      });
  }

  getUrlCompleta(url) {
    return axios.get(url).then((response) => {
      return response.data;
    });
  }

  file(url, dados) {
    return axios
      .post(process.env.VUE_APP_ROOT_API + url, dados, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Api-Token": this.token,
        },
      })
      .then((response) => {
        return response.data;
      });
  }

  impressao(url, dados) {
    let token = this.getToken();
    return axios({
      url: process.env.VUE_APP_ROOT_API + url,
      method: "POST",
      data: dados,
      headers: {
        Accept: "application/pdf",
        "Api-Token": this.token,
      },
      responseType: "blob",
    }).then((response) => {
      return response;
    });
  }

  redirectError(statusCode) {
    switch (parseInt(statusCode)) {
      case 401:
        window.location = "/erro/401";
        break;
      case 404:
      default:
        window.location = "/erro/404";
        break;
    }
  }

  requisicao = axios.interceptors.response.use(
    function(response) {
      return response;
    },
    function(error) {
      if (
        window.location.pathname != "/erro/401" &&
        window.location.pathname != "/erro/404" &&
        window.location.pathname.indexOf("/validar") === -1
      ) {
        switch (parseInt(error.response.status)) {
          case 401:
            if (
              error.response.data.response == "token_empty" ||
              error.response.data.response == "token_invalid"
            ) {
              localStorage.removeItem("token");
              localStorage.removeItem("nome_usuario");
              localStorage.removeItem("HASH_USER");
              window.location = "/";
            } else if (error.response.data.response == "token_expired") {
              if (localStorage.getItem("HASH_USER")) {
                new Api()
                  .getUrlCompleta(
                    "https://www.econeteditora.com.br/acesso_spt_login.php?id=" +
                      localStorage.getItem("HASH_USER")
                  )
                  .then((response) => {
                    if (response.blLogado) {
                      //refresh token

                      new Api()
                        .get(
                          "../../api/ValidarLogin/" +
                            localStorage.getItem("HASH_USER")
                        )
                        .then((response) => {
                          let token = response.response.token;
                          let nome_usuario = response.response.nome;
                          localStorage.setItem("token", token);
                          localStorage.setItem("nome_usuario", nome_usuario);
                          error.config.headers["Api-Token"] = token;
                          return axios.request(error.config);
                        });
                      /*
                                                .catch(error => {
                                                    console.log("deu erro");
                                                    debugger;

                                                    window.location = "/";
												});
											*/
                    } else {
                      localStorage.removeItem("token");
                      localStorage.removeItem("nome_usuario");
                      localStorage.removeItem("HASH_USER");
                      window.location = "/";
                    }
                  });
              } else {
                localStorage.removeItem("token");
                localStorage.removeItem("nome_usuario");
                localStorage.removeItem("HASH_USER");
                window.location = "/";
              }
            }
            break;
          case 404:
            Object.noty.error(
              "Erro ao acessar a API, entre em contato com o suporte.",
              {
                timeout: 10000,
              }
            );
            break;
          case 408:
            Object.noty.error(
              "Erro ao acessar a API, entre em contato com o suporte.",
              {
                timeout: 10000,
              }
            );
            break;
          case 500:
            Object.noty.error(
              "Erro ao acessar a API, entre em contato com o suporte.",
              {
                timeout: 10000,
              }
            );
            break;
          default:
            return Promise.reject(error);
        }
      }
    }
  );
}
