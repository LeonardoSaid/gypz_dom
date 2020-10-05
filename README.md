# GYPZ DOM - Frontend

![2020-09-22-11-13-gypz-dom herokuapp com](https://user-images.githubusercontent.com/32913906/93893999-a4fc2900-fcc4-11ea-83d9-3b6ce68346f3.png)

- GYPZ Tech Challenge: [https://github.com/gypzlab/tech_challenge](https://github.com/gypzlab/tech_challenge)
- Preview/Demo: [http://gypz-dom.herokuapp.com/](http://gypz-dom.herokuapp.com/)
- Repositório do Backend: [https://github.com/LeonardoSaid/gypz_api](https://github.com/LeonardoSaid/gypz_api)

## Instalação

Necessário ter Node.js e npm instalado

```bash
git clone https://github.com/LeonardoSaid/gypz_dom.git
cd gypz_dom
npm install
npm start
```

## Docker

### Dockerfile

Se quiser usar o Dockerfile presente no root do projeto basta montar a imagem e executar:

```bash
# Powershell - executando gypz_dom em modo interactive na porta 3000
# OBS: precisa definir a baseURL da API pela env variable REACT_APP_HOST_IP_ADDRESS
docker build -t gypz_dom .
docker run `
    -itd `
    --rm `
    -w /gypz_dom -v "$(pwd):/gypz_dom" `
    -p 3000:3000 `
    -e "REACT_APP_HOST_IP_ADDRESS=http://localhost:8000" `
    gypz_dom
```

### Docker-compose

Para utilizar o `docker-compose.yml` providenciado, coloque o arquivo junto com as pastas dos projetos `gypz_api` e `gypz_dom` e execute:

```bash
# com docker-compose.yml, /gypz_dom/ e /gypz_api/ no mesmo diretório
docker-compose up -d --build
```

## Licença
[MIT](https://choosealicense.com/licenses/mit/)
