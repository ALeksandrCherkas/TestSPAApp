#Проект содержит следующие функции:
1. Отображение товаров и заказов из БД
2. Удаление товаров и заказов
3. Real-time отображение времени и акативных сессий
4. Реализация фильтра по типам продуктов 



#Данные
Проект использует реляционную структуру для управления заказами и продуктами. Основная логика построена на связи многие-ко-многим (один заказ может содержать много продуктов, один продукт может быть в разных заказах).
Для создания необходимых таблиц к сайту, необходимо выполнить эти команды в MySQL:
CREATE TABLE IF NOT EXISTS `products` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `serial` VARCHAR(45) NOT NULL,
  `isNew` TINYINT NULL,
  `photo` VARCHAR(100) NULL,
  `title` VARCHAR(45) NULL,
  `type` VARCHAR(45) NULL,
  `guarantee_start` DATETIME NULL,
  `guarantee_end` DATETIME NULL,
  `price_usd` DECIMAL(10,2) NULL,
  `price_uah` DECIMAL(10,2) NULL,
  `date` DATETIME NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `orders` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NOT NULL,
  `date` DATETIME NULL,
  `description` LONGTEXT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `order_items` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `order_id` INT NULL,
  `product_id` INT NULL,
  `order_itemscol` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_order_idx` (`order_id` ASC) VISIBLE,
  INDEX `fk_product_idx` (`product_id` ASC) VISIBLE,
  CONSTRAINT `fk_order`
    FOREIGN KEY (`order_id`)
    REFERENCES `orders` (`id`)
    ON DELETE CASCADE 
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_product`
    FOREIGN KEY (`product_id`)
    REFERENCES `products` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;





