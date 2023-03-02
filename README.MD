Este repositório tem por objetivo mostrar como começar a usar a API de dados do google analytics utilizando uma biblioteca (google-analytics/data).

1 Passo:
	Deve-se criar um novo projeto na plataforma Console Cloud (https://console.cloud.google.com/welcome).

2 Passo: 
	Ativar a API de dados do google analytics (https://console.cloud.google.com/apis/api/analyticsdata.googleapis.com/).

3 Passo:
	Criar uma conta de serviço (https://console.cloud.google.com/iam-admin/serviceaccounts) e baixar o arquivo de credenciais.json.

4 Passo: 
	Deve-se cadastrar a conta de serviço (criada no passo 3) na plataforma do Google Analytics (https://analytics.google.com/analytics/web/), Acesse a aba de “Administrador”, depois a aba de “Gerenciamento de acesso à conta”, depois a aba de “Adicionar permissões de acesso a novos usuários” (o símbolo de + na cor azul), depois selecione "Adicionar usuário", insira o email da conta de serviço no campo “Endereços de e-mail” e selecione o papel de “Leitor”. Caso você não saiba qual o email da conta de serviço abra o arquivo .json com um editor de texto e localize o campo “client_email”.

5 Passo: 
	Renomeie o arquivo das credenciais da conta de serviço para credential.json e coloque o mesmo arquivo na pasta “src” do projeto

Documentação de referência: https://developers.google.com/analytics/devguides/reporting/data/v1/quickstart-client-libraries

Como rodar o projeto?

1 Passo:
  instale todas as dependências com o comando “yarn” ou “npm install”

2 Passo:
  inicie o projeto com o comando "yarn dev" ou "npm run dev"

3 Passo:
  Acesse a url “http://localhost:4000”
