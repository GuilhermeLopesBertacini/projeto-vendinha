CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    cpf VARCHAR(14) NOT NULL unique,
    data_nascimento DATE NOT NULL,
    email VARCHAR(255)
);

-- Criação da tabela de dívidas
CREATE TABLE dividas (
    id SERIAL PRIMARY KEY,
    valor NUMERIC(10, 2) NOT NULL,
    situacao TEXT NOT NULL,
    data_criacao DATE NOT NULL,
    data_pagamento DATE,
    descricao TEXT,
    cliente_id INTEGER NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);
CREATE SEQUENCE hibernate_sequence START 1;

-- Inserção de alguns dados de exemplo
INSERT INTO clientes (nome, cpf, data_nascimento, email) VALUES
('João da Silva', '12345678901', '1980-05-15', 'joaozinho@gmail.com'),
('Guilherme', '23456789012', '1992-08-30', 'guilherme@gmail.com');

INSERT INTO dividas (valor, situacao, data_criacao, data_pagamento, descricao, cliente_id) VALUES
(150.00, false, '2024-06-01', NULL, 'Compra de mantimentos', 1),
(200.00, true, '2024-05-15', '2024-05-20', 'Compra de eletrodoméstico', 2);

-- Consultas de exemplo para visualizar os dados
SELECT * FROM clientes;
SELECT * FROM dividas;