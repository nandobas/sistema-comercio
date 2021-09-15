<p align="center">Sistema para Comercio</p>

#Ficha Técnica - Restaurantes

Uma ferramenta indispensável para a gestão mais assertiva de bares e restaurantes, a ficha técnica consiste em um documento detalhado de cada prato/receita, com indicação dos ingredientes utilizados bem como a sua quantidade e modo de preparo. Uma ficha técnica bem elaborada **facilita a vida da equipe e garante o mesmo padrão de qualidade nas receitas**. Empresas do ramo alimentício que desejam ter sucesso no mercado precisam ter o processo de elaboração de seu cardápio bem definido

O Objetivo do sistema é elaborar a ficha técnica e montagem do cardápio de maneira específica e bem detalhada tanto os ingredientes principais, como os outros produtos que também entram nas receitas e preparos.

- Os itens que não podem faltar em uma ficha técnica são:
  - o Nome da receita (pode-se utilizar códigos, como nos cardápios)
  - o Categoria: entrada, salada, prato principal, sobremesa, bebida, etc
  - o Foto do prato (para padronizar montagem a apresentação)
  - o Rendimento: individual, para duas pessoas, etc
  - o Lista de ingredientes: listar todos os insumos utilizados, de temperos a ingredientes principais
  - o Unidade de medida e quantidade exata de cada item: g, kg, ml, und, etc
  - o Modo de preparo
  - o Custo da receita
  - o Preço praticado

## About System

Banco de dados mysql;
Porta: 8306;

Api PHP Laravel;
Porta: 8003;

Front VueJs V3;
Porta: 8083;

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

## Common commands

Run Docker:
docker-compose build --force-rm
docker-compose up

Run Local:
php artisan serve --port=8003

npm run serve -- --port 8083

## step one

mysql -hlocalhost -uroot -pdb-#12.bas
mysql>
CREATE DATABASE IF NOT EXISTS comercio;

#leia mais em script

## step two

php artisan migrate
php artisan db:seed

sudo lsof -i -P -n | grep 8003
sudo kill 8003
