-- DevBank - Dados de Teste
-- Use este arquivo para popular o banco com dados de exemplo após criação do usuário
-- Substitua 'seu-user-id-aqui' pelo UUID real do seu usuário

-- ==================== INSERIR CARTÕES ====================

INSERT INTO cards (user_id, holder, number, expiry, cvv, brand, balance, limit, color, bank, type) 
VALUES 
  (
    'seu-user-id-aqui', 
    'SEU NOME COMPLETO', 
    '4562 1122 4595 7852', 
    '12/2028', 
    '698', 
    'Mastercard', 
    8545.0, 
    15000, 
    'linear-gradient(135deg, #1a3a6b 0%, #0A1F44 100%)', 
    'Nubank', 
    'Crédito'
  ),
  (
    'seu-user-id-aqui',
    'SEU NOME COMPLETO',
    '5168 4411 1235 3456',
    '08/2026',
    '421',
    'Visa',
    3200.5,
    8000,
    'linear-gradient(135deg, #2d1b69 0%, #0f0a2e 100%)',
    'Itaú',
    'Débito'
  ),
  (
    'seu-user-id-aqui',
    'SEU NOME COMPLETO',
    '3714 496353 98431',
    '03/2027',
    '1234',
    'Amex',
    12000.0,
    25000,
    'linear-gradient(135deg, #0d3b2d 0%, #071f18 100%)',
    'Bradesco',
    'Crédito'
  );

-- ==================== INSERIR TRANSAÇÕES ====================

INSERT INTO transactions (user_id, name, category, amount, date, icon, color, type, card_id)
VALUES
  -- Março 2025
  ('seu-user-id-aqui', 'Spotify', 'Entretenimento', -12.99, '2025-03-18', 'music-note-beamed', '#1DB954', 'debit', 1),
  ('seu-user-id-aqui', 'Apple Store', 'Entretenimento', -5.99, '2025-03-17', 'apple', '#555', 'debit', 1),
  ('seu-user-id-aqui', 'Transferência Recebida', 'Transação', 300.0, '2025-03-17', 'arrow-down-circle', '#89D4FF', 'credit', 1),
  ('seu-user-id-aqui', 'Mercado Extra', 'Compras', -88.0, '2025-03-16', 'cart3', '#7FCFFF', 'debit', 2),
  ('seu-user-id-aqui', 'Netflix', 'Entretenimento', -39.9, '2025-03-15', 'play-circle', '#E50914', 'debit', 1),
  ('seu-user-id-aqui', 'Uber', 'Transporte', -24.5, '2025-03-15', 'car-front', '#000', 'debit', 2),
  ('seu-user-id-aqui', 'Salário', 'Renda', 6500.0, '2025-03-05', 'bank', '#5DB7E6', 'credit', 1),
  ('seu-user-id-aqui', 'iFood', 'Alimentação', -55.8, '2025-03-14', 'bag', '#EA1D2C', 'debit', 2),
  ('seu-user-id-aqui', 'Amazon', 'Compras', -149.9, '2025-03-13', 'box-seam', '#FF9900', 'debit', 1),
  ('seu-user-id-aqui', 'Freela Design', 'Renda', 1200.0, '2025-03-10', 'laptop', '#2F8FC4', 'credit', 1),
  ('seu-user-id-aqui', 'Conta de Luz', 'Utilidades', -187.4, '2025-03-09', 'lightning', '#D9F3FF', 'debit', 2),
  ('seu-user-id-aqui', 'Academia', 'Saúde', -89.9, '2025-03-08', 'heart-pulse', '#A8E0FF', 'debit', 1),
  
  -- Fevereiro 2025
  ('seu-user-id-aqui', 'Spotify', 'Entretenimento', -12.99, '2025-02-18', 'music-note-beamed', '#1DB954', 'debit', 1),
  ('seu-user-id-aqui', 'Netflix', 'Entretenimento', -39.9, '2025-02-15', 'play-circle', '#E50914', 'debit', 1),
  ('seu-user-id-aqui', 'Salário', 'Renda', 6500.0, '2025-02-05', 'bank', '#5DB7E6', 'credit', 1),
  ('seu-user-id-aqui', 'iFood', 'Alimentação', -42.3, '2025-02-10', 'bag', '#EA1D2C', 'debit', 2),
  ('seu-user-id-aqui', 'Uber', 'Transporte', -31.2, '2025-02-14', 'car-front', '#000', 'debit', 2),
  ('seu-user-id-aqui', 'Conta de Luz', 'Utilidades', -156.7, '2025-02-08', 'lightning', '#D9F3FF', 'debit', 2),
  
  -- Janeiro 2025
  ('seu-user-id-aqui', 'Salário', 'Renda', 6500.0, '2025-01-05', 'bank', '#5DB7E6', 'credit', 1),
  ('seu-user-id-aqui', 'Spotify', 'Entretenimento', -12.99, '2025-01-18', 'music-note-beamed', '#1DB954', 'debit', 1),
  ('seu-user-id-aqui', 'Academia', 'Saúde', -89.9, '2025-01-08', 'heart-pulse', '#A8E0FF', 'debit', 1),
  
  -- Dezembro 2024
  ('seu-user-id-aqui', 'Salário', 'Renda', 8000.0, '2024-12-05', 'bank', '#5DB7E6', 'credit', 1),
  ('seu-user-id-aqui', 'Compras Natal', 'Compras', -450.0, '2024-12-20', 'cart3', '#7FCFFF', 'debit', 1),
  ('seu-user-id-aqui', 'Netflix', 'Entretenimento', -39.9, '2024-12-15', 'play-circle', '#E50914', 'debit', 1);

-- ==================== VERIFICAÇÃO ====================

-- Para verificar os dados inseridos, execute:
-- SELECT COUNT(*) FROM cards WHERE user_id = 'seu-user-id-aqui';
-- SELECT COUNT(*) FROM transactions WHERE user_id = 'seu-user-id-aqui';

-- Para ver os dados:
-- SELECT * FROM cards WHERE user_id = 'seu-user-id-aqui';
-- SELECT * FROM transactions WHERE user_id = 'seu-user-id-aqui' ORDER BY date DESC LIMIT 10;
