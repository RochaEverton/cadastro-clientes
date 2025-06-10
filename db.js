import fs from 'fs';
let customers = [];

function addCustomer(name, address, cpf) {
    const id = customers.length > 0 ? customers[customers.length - 1].id + 1 : 1;
    customers.push({ id, name, address, cpf});

    fs.writeFileSync("db.json", JSON.stringify(customers));

    return id;
}

function getCustomers() {
    const customersString = fs.readFileSync("db.json", "utf-8");
    customers = JSON.parse(customersString);
    return customers;
}

function updateCustomer(id, newData) {
    const customerIndex = customers.findIndex(customer => customer.id === Number(id));
    if (customerIndex === -1) return false;

    const customer = customers[customerIndex];
    if(newData.name)
        customer.name = newData.name;
    if(newData.address)
        customer.address = newData.address;
    if(newData.cpf)
        customer.cpf = newData.cpf;

    customers[customerIndex] = customer;
    fs.writeFileSync("db.json", JSON.stringify(customers));

    return true;
}

export default { 
    addCustomer,
    getCustomers,
    updateCustomer
};