import db from'./db.js';
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });

async function listCustomers() {
    console.clear();
    const customers = db.getCustomers();
    if (customers.length === 0) {
        console.log('Nenhum cliente cadastrado.');
        await rl.question('Pressione Enter para continuar...');
        printMenu();
        return;
    }
    console.log('Lista de Clientes:');
    console.log('-----------------------------------------------------------------------------');
    console.log('Id | Nome Completo                | Endereço               | CPF');
    console.log('---|------------------------------|------------------------|-----------------');
    customers.forEach(customer => {
        console.log(`${customer.id.toString().padEnd(2)} | ${customer.name.padEnd(28)} | ${customer.address.padEnd(22)} | ${customer.cpf}`);
    });
    console.log('-------------------');
    console.log(`Total de clientes: ${customers.length}`);
    console.log('-------------------');
    console.log('Pressione Enter para voltar ao menu principal.');
    console.log('-------------------');
    await rl.question('');
    console.clear();
    console.log('Voltando ao menu principal...');
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.clear();
    printMenu();
}
function validateName(name) {
    if (!name) return false;
    if (name.trim().indexOf(' ') === -1) return false;
    if (name.trim().length < 3) return false;
    if (name.trim().length > 50) return false;
    const regex = /^[a-zA-ZÀ-ÿ\s]+$/;
    if (!regex.test(name.trim())) return false;
    return true;
}

function validateAddress(address) {
    if (!address) return false;
    if (address.trim().length < 5) return false;
    return true;
}

function validateCPF(cpf) {
    if (!cpf) return false;
    cpf = cpf.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (cpf.length !== 11) return false; // CPF deve ter 11 dígitos
    /* verifica CPFs inválidos
    if (/^(\d)\1{10}$/.test(cpf)) return false; // Verifica se todos os dígitos são iguais
    let sum = 0;
    let remainder;
    for (let i = 1; i <= 9; i++) {
        sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(9, 10))) return false;

    sum = 0;
    for (let i = 1; i <= 10; i++) {
        sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(10, 11))) return false;
    */
    return true;
}

async function getAnswer(question, errorMessage, validateFunction) {
    let answer = '';
    do {
        answer = await rl.question(question);
        if (!validateFunction(answer)) console.log(errorMessage);
    } while (!validateFunction(answer));
    return answer;
}

async function startRegistration() {
    console.clear();

    const name = await getAnswer("Qual o nome e sobrenome do cliente? ", "Nome inválido. Por favor, tente novamente. ", validateName);
    const address = await getAnswer("Qual o endereço do cliente? ", "Endereço inválido. Por favor, tente novamente. ", validateAddress);
    const cpf = await getAnswer("Qual o CPF do cliente? ", "CPF inválido. Por favor, tente novamente. ", validateCPF);

    const id = db.addCustomer(name, address, cpf);

    console.log(`Cliente cadastrado: Id: ${id}, Nome: ${name}, Endereço: ${address}, CPF: ${cpf}`);
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
db.getCustomers();