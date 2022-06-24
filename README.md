<h1>Talkers - Gerenciador de Palestrantes</h1>
<p>O objetivo desde projeto é permitir que a pessoa usuária seja capaz de gerenciar pessoas palestrantes por meio de uma API RESTFul desenvolvida em Node.Js por meio do framework Express.js.</p>
<p>A implementação dos requisitos projeto foi desenvolvido individualmente pela pesssoa autora deste repositório enquanto que os testes unitários (Jest), os arquivos de conteinerização (Docker) e o arquivo talker.json foram disponibilizados pela Trybe para o desenvolvimento do projero. </p>

<h2>Tecnologias</h2>
<p>O projeto foi desenvolvido utilizando o framework Express.Js para o desenvolvimento da API RESTFul de gerenciamento de palestrantes, toda a conteinerização do projeto foi realizada por meio do Docker e os testes unitarios dos requisitos implementados foram desenvolvidos utilizando o framework Jest e tod</p>

<h2>Excecutando o projeto</h2>
<p>Você pode executar o projeto Talkers de das maneiras conforme descrito a seguir.</p>

<h3>Localmente</h3>
<p>É necessário que você tenha o NPM instalado em sua máquina para que você possa fazer a instalação das dependências por meio do comando <strong>npm install</strong>. Em seguida você deve executar o comando <strong>npm start</strong> para iniciar o projeto.</p>
<p><strong>Obs.:</strong>Para que o projeto funcione corretamente esta maneira é <strong>OBRIGATÓRIO</strong> que a versão 16 do Node esteja instalada no computador.</p>

<h3>Docker</h3>
<p>Para que o projeto seja executado com Docker, é preciso que você inicie o serviço <strong>node</strong> por meio do comando <strong>docker-compose up -d</strong>. Este comando inicializará o container <strong>talker_manager</strong>. Em seguida, execute o comando <strong>docker exec -it talker_manager bash</strong> para acessar o terminal do container. Por fim, execute o comando <strong>npm install</strong> para instalar as dependências do projeto.</p>
