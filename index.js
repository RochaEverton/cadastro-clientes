import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });
const customers = [];

async function listCustomers() {
    console.log(customers);
    await rl.question('Pressione Enter para continuar...');
    printMenu();
}

async function startRegistration() {
    console.clear();
    const name = await rl.question('Digite o nome do cliente: ');
    const address = await rl.question('Digite o endereço do cliente: ');
    const id = customers.length > 0 ? customers[customers.length - 1].id + 1 : 1;
    // Aqui você pode adicionar lógica para salvar os dados do cliente
    console.log(`Cliente cadastrado: ${name}, Endereço: ${address}, Id: ${id}`);
    customers.push({name, address,id });
    await rl.question('Pressione Enter para continuar...');
    printMenu();
}

async function printMenu() {
    console.clear();
    console.log("Menu:");
    console.log("1 - Cadastrar Clientes");
    console.log("2 - Listar Clientes");
    console.log("3 - Sair");

    const answer = await rl.question('Escolha uma opção? ');

    switch (answer) {
        case '1':
            startRegistration();
            break;
        case '2':
            listCustomers();
            break;
        case '3':
            console.log('Saindo...');
            setTimeout(() => {
            console.clear();
            process.exit(0);
            }, 2000);
            break
        default:
            console.log('Opção inválida, tente novamente.');
            await rl.question('Pressione Enter para continuar...');
            printMenu();
            break;
    }
}

printMenu();
