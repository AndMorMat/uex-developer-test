import { Link } from "@inertiajs/react";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <div className="flex flex-col py-12">
            <div className="relative sm:flex sm:justify-center sm:items-center bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white">
                <div className="sm:fixed sm:top-0 sm:right-0 p-6 text-end">
                    {auth.user ? (
                        <Link
                            href={route("dashboard")}
                            className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                        >
                            Entrar
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route("login")}
                                className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Entrar
                            </Link>

                            <Link
                                href={route("register")}
                                className="ms-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Cadastre-se
                            </Link>
                        </>
                    )}
                </div>
            </div>
            <div className="mx-auto max-w-screen-2xl">
                <div>
                    <h1 className="mt-10 text-xl font-semibold text-gray-900">
                        Teste para desenvolvedor UEX
                    </h1>
                </div>
                <div>
                    <p className="font-semibold mt-10 text-xl">Descrição:</p>
                    <p className="dark:text-gray-400 text-xl">
                        Desenvolver um sistema de cadastro de contatos com
                        endereço integrado ao Via Cep e Google Maps.
                    </p>
                </div>
                <div>
                    <p className="font-semibold mt-10 text-xl">
                        Escopo de negócio:
                    </p>
                    <ul className="text-xl">
                        <li>- Se cadastrar para utilizar a plataforma.</li>
                        <li>- Recuperar a sua senha.</li>
                        <li>- Realizar login e logout.</li>
                        <li>- Gerenciar sua lista de contatos.</li>
                        <li>
                            - Realizar pesquisa de endereços como ajuda ao
                            cadastro de contatos.
                        </li>
                        <li>- Excluir a sua própria conta.</li>
                    </ul>
                </div>
                <div>
                    <p className="font-semibold mt-10 text-xl">
                        Jornada do usuário:
                    </p>
                    <p className="dark:text-gray-400 text-xl">
                        Jornada do usuário O usuário acessa a plataforma,
                        realiza seu cadastro e em seguida faz seu login, caso
                        não lembre a senha cadastrada pode recuperá-la através
                        de seu e-mail..
                        <br />
                        Assim que estiver dentro do sistema, os dados dos
                        contatos previamente cadastrados são exibidos na tela e
                        então o usuário realiza o cadastro de um ou mais
                        contatos utilizando um formulário contendo os campos
                        necessários para o cadastro.
                        <br />A plataforma possui um sistema de ajuda para o
                        preenchimento do endereço do contato, onde o usuário
                        pode informar alguns dados tais como, UF, cidade e um
                        trecho do endereço e esse sistema de ajuda apresenta
                        então as possibilidades de endereço baseado na pesquisa,
                        dessa forma o usuário escolhe na lista qual o endereço
                        lhe convém e tem os campos do formulário correspondente
                        preenchidos automaticamente.
                        <br />
                        Quando o usuário quer localizar um contato na lista, ele
                        utiliza um filtro de texto que traz apenas os contatos
                        que contém o nome ou CPF equivalente ao termo
                        pesquisado.
                        <br />
                        Sempre que o usuário clica no contato da lista, o mapa
                        deve centralizar e marcar com um “pin” a coordenada
                        geográfica obtida através do cadastro.
                        <br />O usuário pode realizar a exclusão e a edição dos
                        dados dos contatos a qualquer momento.
                        <br />
                        Se desejar, o usuário pode remover a sua própria conta,
                        o que faz com que todos os dados cadastrados pelo mesmo
                        sejam removidos da base de dados.
                    </p>
                </div>
                <div>
                    <p className="font-semibold mt-10 text-xl">
                        Escopo técnico:
                    </p>
                    <p className="dark:text-gray-400 text-xl">
                        A aplicação somente pode consumir serviços de terceiros
                        atraves do próprio backend
                        <br />
                        Deve-se implementar um conjunto de api para suprir as
                        necessidades do frontend
                        <br />
                        Todos os endpoints de gerenciamento de contatos devem
                        ser autenticados.
                    </p>
                </div>
            </div>
        </div>
    );
}
