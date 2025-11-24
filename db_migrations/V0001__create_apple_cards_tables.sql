-- Таблица карточек Apple (каталог)
CREATE TABLE IF NOT EXISTS cards (
  id SERIAL PRIMARY KEY,
  amount INTEGER NOT NULL,
  price INTEGER NOT NULL,
  description TEXT,
  available_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица кодов карт
CREATE TABLE IF NOT EXISTS card_codes (
  id SERIAL PRIMARY KEY,
  card_id INTEGER REFERENCES cards(id),
  code TEXT NOT NULL UNIQUE,
  is_sold BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  sold_at TIMESTAMP
);

-- Таблица заказов
CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  card_id INTEGER REFERENCES cards(id),
  code_id INTEGER REFERENCES card_codes(id),
  email TEXT NOT NULL,
  phone TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Вставляем начальные данные карточек
INSERT INTO cards (amount, price, description, available_count) VALUES
(500, 500, 'Apple Gift Card на 500 рублей', 10),
(1000, 1000, 'Apple Gift Card на 1000 рублей', 15),
(3000, 3000, 'Apple Gift Card на 3000 рублей', 8),
(5000, 5000, 'Apple Gift Card на 5000 рублей', 5);

-- Вставляем тестовые коды для карточек
INSERT INTO card_codes (card_id, code) VALUES
(1, 'APPLE500-XXXX-YYYY-ZZZZ-0001'),
(1, 'APPLE500-XXXX-YYYY-ZZZZ-0002'),
(2, 'APPLE1000-XXXX-YYYY-ZZZZ-0001'),
(2, 'APPLE1000-XXXX-YYYY-ZZZZ-0002'),
(3, 'APPLE3000-XXXX-YYYY-ZZZZ-0001'),
(4, 'APPLE5000-XXXX-YYYY-ZZZZ-0001');