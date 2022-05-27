create table users(
nome VARCHAR(255),
cognome VARCHAR(255),
username VARCHAR(255) PRIMARY KEY,
email  VARCHAR(255) UNIQUE,
pwd VARCHAR (255)
)Engine = InnoDB;


create table favorites(
    movie_id INTEGER,
    username VARCHAR(255),
    img VARCHAR(255),
    title VARCHAR(255),
    vote FLOAT,
    overview TEXT,
    favorite_id INTEGER  PRIMARY KEY AUTO_INCREMENT ,
    index idx_username (username),
    FOREIGN KEY (username) REFERENCES users(username), 
    UNIQUE(movie_id,username)
)Engine = InnoDB;


create table chat(
    username VARCHAR(255),
    date TIMESTAMP,
    img VARCHAR(255),
    title VARCHAR(255),
    movie_id INTEGER,
    text_msg VARCHAR(255),
    msg_id INTEGER  PRIMARY KEY AUTO_INCREMENT ,
    updated BOOLEAN,
    index idx_username (username),
    FOREIGN KEY (username) REFERENCES users(username)
)Engine = InnoDB;
