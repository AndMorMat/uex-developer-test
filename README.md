# UEX Test

Projeto desenvolvido como parte de um processo seletivo para empresa UEX,

A aplicação permite que o usuário se cadastre, crie e gerencie uma lista de contatos. O frontend foi desenvolvido em react e o backend em php, o frontend desconhece qualquer serviço externo, toda a comunicação é realizada somente com a api.
Durante o processo de cadastro de um novo contato, o usuário tem a opção de buscar o endereço desejado de duas maneiras: fornecendo um CEP válido ou especificando a UF, cidade e parte do logradouro, em ambos os casos, a API se comunica com o serviço ViaCep para obter as informações completas do endereço. Além disso, ao adicionar um novo contato, a API se conecta ao Google GeoLocation para recuperar as coordenadas de latitude e longitude correspondentes ao endereço fornecido.
Toda comunicação com a api é realizada utilizando um token bearer, recuperado no momento do login.

# Requisitos técnicos

-   Laravel 10.10
-   Php 8.1
-   Docker
-   Api google maps ativa
-   Api google geocode ativa

# Endpoints

**GET '/cep/{cepParam}**  
Retorna uma endereço baseado em um cep

**GET '/cep/{province}/{city}/{searchParam}'**  
Retorna um endereço baseado no estado, cidade e nome da rua

**GET '/contact'**  
Retorna uma lista de contatos

**GET '/contact-search/{id}'**  
Busca um contato pelo id

**POST '/contact-add'**  
Insere um novo contato  
Payload:

```
{
    "name": string,
    "cpf": string,
    "phone": string,
    "address": {
        "zip_code": string,
        "address": string,
        "neighborhood": string,
        "city": string,
        "province": string
    }
}
```

**PUT '/contact-update/{id}'**  
Altera um contato existente  
Payload:

```
{
    "name": string,
    "cpf": string,
    "phone": string,
    "address": {
        "zip_code": string,
        "address": string,
        "neighborhood": string,
        "city": string,
        "province": string
    }
}
```

**DELETE '/contact-delete/{id}'**  
Remove um contato

As rotas do fluxo de autenticação foram criadas com auxilio da lib Breeze (https://github.com/laravel/breeze), por isso não estão presentes nessa lista.

## Andre Matos

andre_matos13@hotmail.com  
https://andrematos.dev.br
