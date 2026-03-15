-- =====================================================
-- Banco de dados: Sistema de Diagnóstico Médico
-- =====================================================

CREATE DATABASE IF NOT EXISTS sistema_diagnostico
CHARACTER SET utf8mb4
COLLATE utf8mb4_general_ci;

USE sistema_diagnostico;

-- =====================================================
-- Tabela: usuarios
-- =====================================================

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    crm VARCHAR(50) UNIQUE,
    email VARCHAR(120) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- Tabela: historico_diagnostico
-- =====================================================

CREATE TABLE historico_diagnostico (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    doenca_sugerida VARCHAR(255),
    sintomas TEXT NOT NULL,
    resposta_ia TEXT,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    INDEX idx_usuario (usuario_id),

    FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id)
        ON DELETE CASCADE
);

-- =====================================================
-- Tabela: pesquisas
-- =====================================================

CREATE TABLE pesquisas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    termo_pesquisa VARCHAR(255) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    INDEX idx_usuario_pesquisa (usuario_id),

    FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id)
        ON DELETE CASCADE
);

-- =====================================================
-- Tabela: perguntas_rag (perguntas feitas para IA)
-- =====================================================

CREATE TABLE perguntas_rag (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pergunta TEXT NOT NULL,
    resposta TEXT,
    fontes TEXT,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- Usuário de teste
-- senha: 123456
-- =====================================================

INSERT INTO usuarios (nome, crm, email, senha)
VALUES (
    'Dr. Teste',
    'CRM12345',
    'teste@medico.com',
    '$2y$10$CwTycUXWue0Thq9StjUM0uJ8nK5QX6Q5XyHbZ1u6C8Q4xZGbM4mG6'
);