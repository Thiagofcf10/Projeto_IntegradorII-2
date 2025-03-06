CREATE TABLE information (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    image TEXT NOT NULL,
    text TEXT NOT NULL,
    url TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE articles (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    image TEXT NOT NULL,
    content TEXT NOT NULL,
    buttonUrl TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE state_articles (
    id SERIAL PRIMARY KEY,
    state VARCHAR(2) NOT NULL,
    title VARCHAR(255) NOT NULL,
    image TEXT NOT NULL,
    content TEXT NOT NULL,
    authors TEXT NOT NULL,
    institution TEXT NOT NULL,
    buttonUrl TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE form_submissions (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);