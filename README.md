<p align="center">Sistema para Comercio</p>

<p align="left">
Cadastro de Clientes, Produtos, Fornecedores e Ordem de Serviço
</p>
<p align="left">
Contas a Pagar e Contas a Receber
</p>

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
