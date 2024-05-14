CREATE DATABASE SPE;

-- drop database spe;

SHOW GRANTS FOR 'root'@'localhost';

GRANT ALL PRIVILEGES ON SPE.* TO 'root'@'localhost';
FLUSH PRIVILEGES;

use SPE;
show tables;
