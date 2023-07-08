CREATE TABLE `catalogs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `detail` varchar(255) DEFAULT NULL,
  `price` int DEFAULT NULL,
  `available_units` int DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `policy` json DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `dni` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role_id` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `total` int DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `dni` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `order_items` (
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `adquired_units` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`order_id`,`product_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `notifications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `text` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `product_catalogs` (
  `product_id` int NOT NULL,
  `catalog_id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`product_id`,`catalog_id`),
  KEY `catalog_id` (`catalog_id`),
  CONSTRAINT `product_catalogs_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `product_catalogs_ibfk_2` FOREIGN KEY (`catalog_id`) REFERENCES `catalogs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `shopping_carts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `total` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `shopping_carts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `shopping_cart_items` (
  `shopping_cart_id` int NOT NULL,
  `product_id` int NOT NULL,
  `units` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`shopping_cart_id`,`product_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `shopping_cart_items_ibfk_1` FOREIGN KEY (`shopping_cart_id`) REFERENCES `shopping_carts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `shopping_cart_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `user_sessions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_sessions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);


INSERT INTO `catalogs` VALUES (1,'Frutas','2023-07-08 17:30:53','2023-07-08 17:30:53'),(2,'Verduras','2023-07-08 17:30:53','2023-07-08 17:30:53');
INSERT INTO `products` VALUES (1,'Manzana','Fruta fresca y jugosa',2217,58,'assets/apples.jpg','2023-07-08 17:30:53','2023-07-08 17:30:53'),(2,'Plátano','Fruta rica en potasio',2385,62,'assets/bananas.jpg','2023-07-08 17:30:53','2023-07-08 17:30:53'),(3,'Sandía','Fruta refrescante para el verano',4106,51,'assets/watermelon.jpg','2023-07-08 17:30:53','2023-07-08 17:30:53'),(4,'Zanahoria','Hortaliza saludable y rica en betacaroteno',2956,63,'assets/carrots.jpg','2023-07-08 17:30:53','2023-07-08 17:30:53'),(5,'Tomate','Fruto versátil para diferentes preparaciones culinarias',2305,69,'assets/tomatoes.webp','2023-07-08 17:30:53','2023-07-08 17:30:53'),(6,'Lechuga','Hojas verdes y crujientes para ensaladas',2053,72,'assets/lettuce.jpg','2023-07-08 17:30:53','2023-07-08 17:30:53'),(7,'Piña','Fruta tropical jugosa y dulce',3840,59,'assets/pineapple.jpg','2023-07-08 17:30:53','2023-07-08 17:30:53'),(8,'Papa','Tubérculo versátil para guarniciones y platos principales',2465,64,'assets/potatoes.jpg','2023-07-08 17:30:53','2023-07-08 17:30:53'),(9,'Mango','Dulce fruta exótica con pulpa jugosa',4123,56,'assets/mangoes.jpg','2023-07-08 17:30:53','2023-07-08 17:30:53'),(10,'Espinaca','Verdura rica en hierro y nutrientes esenciales',2794,68,'assets/spinach.jpg','2023-07-08 17:30:53','2023-07-08 17:30:53'),(11,'Naranja','Cítrico jugoso y lleno de vitamina C',2365,65,'assets/oranges.jpg','2023-07-08 17:30:53','2023-07-08 17:30:53'),(12,'Pimiento','Vegetal colorido y sabroso para guisos y ensaladas',2239,71,'assets/bell-pepper.webp','2023-07-08 17:30:53','2023-07-08 17:30:53'),(13,'Pera','Fruta jugosa y dulce, perfecta para postres',2614,60,'assets/pear.JPG','2023-07-08 17:30:53','2023-07-08 17:30:53'),(14,'Pepino','Hortaliza refrescante para ensaladas y gazpachos',2142,67,'assets/cucumber.webp','2023-07-08 17:30:53','2023-07-08 17:30:53'),(15,'Melón','Fruta dulce y jugosa, ideal para el verano',3039,57,'assets/melon.jpg','2023-07-08 17:30:53','2023-07-08 17:30:53'),(16,'Calabacín','Vegetal versátil para asar, saltear o rellenar',2275,69,'assets/zucchini.jpg','2023-07-08 17:30:53','2023-07-08 17:30:53'),(17,'Cereza','Pequeña fruta roja y jugosa, perfecta como snack',3218,54,'assets/cherry.jpg','2023-07-08 17:30:53','2023-07-08 17:30:53'),(18,'Patata','Tubérculo versátil para diversas preparaciones',2401,61,'assets/american-potatoes.jpg','2023-07-08 17:30:53','2023-07-08 17:30:53'),(19,'Uva','Fruta pequeña y dulce, ideal para postres y vinos',2873,66,'assets/grapes.jpg','2023-07-08 17:30:53','2023-07-08 17:30:53'),(20,'Cebolla','Hortaliza aromática para salsas y guisos',2197,70,'assets/spring-onion.jpg','2023-07-08 17:30:53','2023-07-08 17:30:53'),(21,'Limón','Cítrico ácido y refrescante, perfecto para aliños',2336,68,'assets/lemon.jpg','2023-07-08 17:30:53','2023-07-08 17:30:53'),(22,'Calabaza','Vegetal dulce y nutritivo para cremas y pasteles',2750,63,'assets/pumpkin.webp','2023-07-08 17:30:53','2023-07-08 17:30:53'),(23,'Mandarina','Pequeño cítrico jugoso y fácil de pelar',2419,64,'assets/tangerine.jpg','2023-07-08 17:30:53','2023-07-08 17:30:53'),(24,'Brócoli','Verdura llena de nutrientes y antioxidantes',2657,59,'assets/broccoli.jpg','2023-07-08 17:30:53','2023-07-08 17:30:53'),(25,'Melocotón','Fruta jugosa y dulce, ideal para postres',2935,55,'assets/peaches.jpg','2023-07-08 17:30:53','2023-07-08 17:30:53'),(26,'Calabacita','Vegetal tierno y sabroso para guisos y salteados',2232,67,'assets/mexican-zucchini.jpg','2023-07-08 17:30:53','2023-07-08 17:30:53'),(27,'Mora','Pequeña fruta oscura y dulce, ideal para postres',3127,53,'assets/blackberry.jpg','2023-07-08 17:30:53','2023-07-08 17:30:53'),(28,'Perejil','Hierba aromática y decorativa para platos',2168,71,'assets/parsley.webp','2023-07-08 17:30:53','2023-07-08 17:30:53'),(29,'Durazno','Fruta jugosa y dulce, perfecta para postres',2561,62,'assets/peaches2.jpg','2023-07-08 17:30:53','2023-07-08 17:30:53'),(30,'Champiñón','Seta suave y versátil para platos salteados',2345,68,'assets/mushroom.webp','2023-07-08 17:30:53','2023-07-08 17:30:53'),(31,'Frambuesa','Pequeña fruta dulce y ácida, ideal para postres',3194,56,'assets/raspberry.jpg','2023-07-08 17:30:53','2023-07-08 17:30:53'),(32,'Coliflor','Verdura versátil y nutritiva para guisos y gratinados',2725,61,'assets/cauliflower.jpg','2023-07-08 17:30:53','2023-07-08 17:30:53'),(33,'Ciruela','Fruta jugosa y dulce, ideal para postres y mermeladas',2959,57,'assets/plum.jpg','2023-07-08 17:30:53','2023-07-08 17:30:53'),(34,'Escarola','Variedad de lechuga con hojas rizadas y amargas',2175,65,'assets/endive.jpg','2023-07-08 17:30:53','2023-07-08 17:30:53'),(35,'Kiwi','Fruta pequeña y exótica, rica en vitamina C',2374,67,'assets/kiwi.webp','2023-07-08 17:30:53','2023-07-08 17:30:53'),(36,'Apio','Vegetal crujiente y refrescante para ensaladas',2247,69,'assets/celery.webp','2023-07-08 17:30:53','2023-07-08 17:30:53'),(37,'Granada','Fruta llena de antioxidantes y sabor agridulce',2838,54,'assets/grenade.jpg','2023-07-08 17:30:53','2023-07-08 17:30:53'),(38,'Repollo','Verdura crujiente y versátil para ensaladas y cocidos',2146,72,'assets/cabbage.jpg','2023-07-08 17:30:53','2023-07-08 17:30:53'),(39,'Fresa','Pequeña fruta dulce y jugosa, perfecta como postre',3213,58,'assets/strawberry.webp','2023-07-08 17:30:53','2023-07-08 17:30:53'),(40,'Espárrago','Hortaliza delicada y sabrosa, ideal para guarniciones',2261,70,'assets/asparagus.jpg','2023-07-08 17:30:53','2023-07-08 17:30:53'),(41,'Coco','Fruta tropical con sabor dulce y textura cremosa',2467,63,'assets/coconut.webp','2023-07-08 17:30:53','2023-07-08 17:30:53'),(42,'Puerro','Hortaliza con sabor suave para sopas y guisos',2321,66,'assets/leek.jpg','2023-07-08 17:30:53','2023-07-08 17:30:53'),(43,'Albaricoque','Fruta jugosa y ligeramente ácida, perfecta para postres',2714,60,'assets/peruvian-peaches.jpg','2023-07-08 17:30:53','2023-07-08 17:30:53'),(44,'Alcachofa','Hortaliza con sabor delicado y textura tierna',2286,64,'assets/artichoke.jpg','2023-07-08 17:30:53','2023-07-08 17:30:53'),(45,'Ciruela pasa','Fruta deshidratada dulce y jugosa',2095,73,'assets/prunes.jpg','2023-07-08 17:30:53','2023-07-08 17:30:53'),(46,'Remolacha','Hortaliza dulce y nutritiva, perfecta para ensaladas',2378,67,'assets/beet.jpg','2023-07-08 17:30:54','2023-07-08 17:30:54'),(47,'Mango verde','Fruta tropical aún sin madurar, ideal para preparaciones saladas',2213,72,'assets/green-mangoes.jpg','2023-07-08 17:30:54','2023-07-08 17:30:54'),(48,'Hinojo','Hortaliza de sabor anisado, ideal para ensaladas',2280,69,'assets/fennel.jpg','2023-07-08 17:30:54','2023-07-08 17:30:54'),(49,'Carambola','Fruta tropical con forma de estrella y sabor agridulce',2465,66,'assets/no-available.jpg','2023-07-08 17:30:54','2023-07-08 17:30:54'),(50,'Rábano','Raíz picante y crujiente para ensaladas y salsas',2337,63,'assets/no-available.jpg','2023-07-08 17:30:54','2023-07-08 17:30:54'),(51,'Morango','Pequeña fruta dulce y jugosa, ideal para postres',3191,59,'assets/no-available.jpg','2023-07-08 17:30:54','2023-07-08 17:30:54'),(52,'Habas','Legumbre tierna y sabrosa, ideal para guisos',2219,68,'assets/no-available.jpg','2023-07-08 17:30:54','2023-07-08 17:30:54'),(53,'Níspero','Fruta dulce y jugosa, típica en climas cálidos',2464,65,'assets/no-available.jpg','2023-07-08 17:30:54','2023-07-08 17:30:54');
INSERT INTO `roles` VALUES (1,'Adminstrator','{\"GET\": {\"/logout\": true, \"/orders\": true, \"/products\": true, \"/order/items\": true}, \"PUT\": {\"/order\": true}}','2023-07-08 17:30:51','2023-07-08 17:30:51'),(2,'User','{\"GET\": {\"/logout\": true, \"/products\": true, \"/cart/items\": true, \"/notifications\": true}, \"POST\": {\"/cart\": true, \"/order\": true}, \"DELETE\": {\"/notification\": true}}','2023-07-08 17:30:52','2023-07-08 17:30:52');
INSERT INTO `users` VALUES (1,'Roxanne','Sporer','Desmond.Miller-McClure85@yahoo.com','6192897173','84830 Ruth Neck','482-506-8827 x255','demo0','demo0',1,'2023-07-08 17:30:52','2023-07-08 17:30:52'),(2,'Faye','Ankunding','Rhoda37@hotmail.com','1210463445','24523 Denesik Ranch','1-261-233-6695 x1562','demo1','demo1',2,'2023-07-08 17:30:52','2023-07-08 17:30:52'),(3,'Annalise','Ankunding','Rosemarie.Reichel26@gmail.com','2471980318','9628 Mariane Branch','1-285-589-5244 x90672','demo2','demo2',1,'2023-07-08 17:30:52','2023-07-08 17:30:52'),(4,'Tina','Carroll','Herta.Fay78@gmail.com','5081966614','24394 Heidenreich Alley','588.623.7701 x7870','demo3','demo3',2,'2023-07-08 17:30:52','2023-07-08 17:30:52'),(5,'Dane','Hegmann','Freddie_Ortiz65@gmail.com','0998790652','419 Jayme Roads','1-228-676-7350 x0572','demo4','demo4',1,'2023-07-08 17:30:52','2023-07-08 17:30:52'),(6,'Chesley','Kilback','Cheyanne65@yahoo.com','2696462424','16568 Vita Villages','(699) 434-3248 x8248','demo5','demo5',2,'2023-07-08 17:30:52','2023-07-08 17:30:52'),(7,'Trudie','Hickle','Ana_Reichert@hotmail.com','7663893364','3421 Orn Path','718-334-7880 x9293','demo6','demo6',1,'2023-07-08 17:30:52','2023-07-08 17:30:52'),(8,'Marisa','Thompson','Pasquale64@hotmail.com','9855110222','19584 Weimann Burg','1-208-215-0782 x83989','demo7','demo7',2,'2023-07-08 17:30:52','2023-07-08 17:30:52'),(9,'Mckayla','Torp','Amina.Kris@gmail.com','5718692486','9147 Borer Points','(506) 750-9550 x3383','demo8','demo8',1,'2023-07-08 17:30:52','2023-07-08 17:30:52'),(10,'Bethel','Kihn','Winston.Jenkins46@yahoo.com','8153886938','954 Pollich Crossing','285-376-3803 x07151','demo9','demo9',2,'2023-07-08 17:30:52','2023-07-08 17:30:52'),(11,'Barton','Miller','Adeline_Jaskolski@hotmail.com','1269846651','195 Hector Row','741-852-6592','demo10','demo10',1,'2023-07-08 17:30:52','2023-07-08 17:30:52'),(12,'Bette','Stark','Kaden_Schiller71@yahoo.com','3660824993','4893 Raphaelle Course','1-786-723-2809 x2147','demo11','demo11',2,'2023-07-08 17:30:52','2023-07-08 17:30:52'),(13,'Enola','Rutherford','Kylie.Prosacco41@hotmail.com','3415072385','2154 Littel Streets','966.627.9539','demo12','demo12',1,'2023-07-08 17:30:52','2023-07-08 17:30:52'),(14,'Kelly','Jacobi','Jefferey_Conroy@hotmail.com','5995078938','5213 Moshe Course','781-382-1574 x214','demo13','demo13',2,'2023-07-08 17:30:52','2023-07-08 17:30:52'),(15,'Rowland','Braun','Hazel.OKon14@hotmail.com','6679322343','83538 Isadore Cape','1-597-559-1891 x6868','demo14','demo14',1,'2023-07-08 17:30:52','2023-07-08 17:30:52'),(16,'Keyshawn','Mohr','Christop.Crist@yahoo.com','5754439413','27056 Sabryna Flat','523.964.6707 x58674','demo15','demo15',2,'2023-07-08 17:30:52','2023-07-08 17:30:52'),(17,'Manley','Mraz','Troy.Walter20@yahoo.com','7452620224','6893 Howe Trail','(437) 310-6561 x254','demo16','demo16',1,'2023-07-08 17:30:52','2023-07-08 17:30:52'),(18,'Pierce','Lebsack','Elisha23@hotmail.com','4304086394','50877 Daugherty Corner','1-708-801-4593 x8959','demo17','demo17',2,'2023-07-08 17:30:52','2023-07-08 17:30:52'),(19,'Lorenza','Schinner','Candelario14@yahoo.com','3395274353','1107 Stokes Rest','1-330-866-4107 x547','demo18','demo18',1,'2023-07-08 17:30:52','2023-07-08 17:30:52'),(20,'Meghan','Hartmann','Clement.Quitzon@hotmail.com','9130282245','555 Hermiston Ville','418-952-7754 x90497','demo19','demo19',2,'2023-07-08 17:30:52','2023-07-08 17:30:52'),(21,'Erik','Hammes','Hope_Schaden22@hotmail.com','2717956888','749 Mya Flats','419.279.9649 x668','demo20','demo20',1,'2023-07-08 17:30:52','2023-07-08 17:30:52'),(22,'Josiah','Gleichner','Myrtie_Volkman@yahoo.com','0219879645','109 Donnelly Grove','(895) 881-5494 x58968','demo21','demo21',2,'2023-07-08 17:30:52','2023-07-08 17:30:52'),(23,'Ernestina','Rath','Alia48@yahoo.com','3153144076','47065 Araceli Course','440-410-7880 x59533','demo22','demo22',1,'2023-07-08 17:30:52','2023-07-08 17:30:52'),(24,'Constantin','Crooks','Carrie.Yost@gmail.com','3958784665','9010 Hane Shoals','799-935-6936 x32784','demo23','demo23',2,'2023-07-08 17:30:52','2023-07-08 17:30:52'),(25,'Jan','Romaguera','Douglas.Langworth@gmail.com','2263814344','2563 Rowe Canyon','(245) 594-1098','demo24','demo24',1,'2023-07-08 17:30:52','2023-07-08 17:30:52'),(26,'Juston','Nader','Pat.West67@yahoo.com','9312587347','18655 Franecki Village','(603) 928-7132','demo25','demo25',2,'2023-07-08 17:30:52','2023-07-08 17:30:52'),(27,'Madison','Crona','Aliza.Bogisich@hotmail.com','5178214063','642 Hyatt Walks','949-373-7958 x40674','demo26','demo26',1,'2023-07-08 17:30:53','2023-07-08 17:30:53'),(28,'Anderson','Christiansen','Phoebe_Hills@gmail.com','3914813974','2091 Herzog Radial','(979) 277-0228 x933','demo27','demo27',2,'2023-07-08 17:30:53','2023-07-08 17:30:53');
INSERT INTO `shopping_carts` VALUES (1,1,0,'2023-07-08 17:30:52','2023-07-08 17:30:52'),(2,2,0,'2023-07-08 17:30:52','2023-07-08 17:30:52'),(3,3,0,'2023-07-08 17:30:52','2023-07-08 17:30:52'),(4,4,0,'2023-07-08 17:30:52','2023-07-08 17:30:52'),(5,5,0,'2023-07-08 17:30:52','2023-07-08 17:30:52'),(6,6,0,'2023-07-08 17:30:52','2023-07-08 17:30:52'),(7,7,0,'2023-07-08 17:30:52','2023-07-08 17:30:52'),(8,8,0,'2023-07-08 17:30:52','2023-07-08 17:30:52'),(9,9,0,'2023-07-08 17:30:52','2023-07-08 17:30:52'),(10,10,0,'2023-07-08 17:30:52','2023-07-08 17:30:52'),(11,11,0,'2023-07-08 17:30:52','2023-07-08 17:30:52'),(12,12,0,'2023-07-08 17:30:52','2023-07-08 17:30:52'),(13,13,0,'2023-07-08 17:30:52','2023-07-08 17:30:52'),(14,14,0,'2023-07-08 17:30:52','2023-07-08 17:30:52'),(15,15,0,'2023-07-08 17:30:52','2023-07-08 17:30:52'),(16,16,0,'2023-07-08 17:30:52','2023-07-08 17:30:52'),(17,17,0,'2023-07-08 17:30:52','2023-07-08 17:30:52'),(18,18,0,'2023-07-08 17:30:52','2023-07-08 17:30:52'),(19,19,0,'2023-07-08 17:30:52','2023-07-08 17:30:52'),(20,20,0,'2023-07-08 17:30:52','2023-07-08 17:30:52'),(21,21,0,'2023-07-08 17:30:52','2023-07-08 17:30:52'),(22,22,0,'2023-07-08 17:30:52','2023-07-08 17:30:52'),(23,23,0,'2023-07-08 17:30:52','2023-07-08 17:30:52'),(24,24,0,'2023-07-08 17:30:52','2023-07-08 17:30:52'),(25,25,0,'2023-07-08 17:30:52','2023-07-08 17:30:52'),(26,26,0,'2023-07-08 17:30:53','2023-07-08 17:30:53'),(27,27,0,'2023-07-08 17:30:53','2023-07-08 17:30:53'),(28,28,0,'2023-07-08 17:30:53','2023-07-08 17:30:53');
INSERT INTO `product_catalogs` VALUES (1,1,'2023-07-08 17:30:53','2023-07-08 17:30:53'),(2,1,'2023-07-08 17:30:53','2023-07-08 17:30:53'),(3,1,'2023-07-08 17:30:53','2023-07-08 17:30:53'),(4,2,'2023-07-08 17:30:53','2023-07-08 17:30:53'),(5,2,'2023-07-08 17:30:53','2023-07-08 17:30:53'),(6,2,'2023-07-08 17:30:53','2023-07-08 17:30:53'),(7,1,'2023-07-08 17:30:53','2023-07-08 17:30:53'),(8,2,'2023-07-08 17:30:53','2023-07-08 17:30:53'),(9,1,'2023-07-08 17:30:53','2023-07-08 17:30:53'),(10,2,'2023-07-08 17:30:53','2023-07-08 17:30:53'),(11,1,'2023-07-08 17:30:53','2023-07-08 17:30:53'),(12,2,'2023-07-08 17:30:53','2023-07-08 17:30:53'),(13,1,'2023-07-08 17:30:53','2023-07-08 17:30:53'),(14,2,'2023-07-08 17:30:53','2023-07-08 17:30:53'),(15,1,'2023-07-08 17:30:53','2023-07-08 17:30:53'),(16,2,'2023-07-08 17:30:53','2023-07-08 17:30:53'),(17,1,'2023-07-08 17:30:53','2023-07-08 17:30:53'),(18,2,'2023-07-08 17:30:53','2023-07-08 17:30:53'),(19,1,'2023-07-08 17:30:53','2023-07-08 17:30:53'),(20,2,'2023-07-08 17:30:53','2023-07-08 17:30:53'),(21,1,'2023-07-08 17:30:53','2023-07-08 17:30:53'),(22,2,'2023-07-08 17:30:53','2023-07-08 17:30:53'),(23,1,'2023-07-08 17:30:53','2023-07-08 17:30:53'),(24,2,'2023-07-08 17:30:53','2023-07-08 17:30:53'),(25,1,'2023-07-08 17:30:53','2023-07-08 17:30:53'),(26,2,'2023-07-08 17:30:53','2023-07-08 17:30:53'),(27,1,'2023-07-08 17:30:53','2023-07-08 17:30:53'),(28,2,'2023-07-08 17:30:53','2023-07-08 17:30:53'),(29,1,'2023-07-08 17:30:53','2023-07-08 17:30:53'),(30,2,'2023-07-08 17:30:53','2023-07-08 17:30:53'),(31,1,'2023-07-08 17:30:53','2023-07-08 17:30:53'),(32,2,'2023-07-08 17:30:53','2023-07-08 17:30:53'),(33,1,'2023-07-08 17:30:53','2023-07-08 17:30:53'),(34,2,'2023-07-08 17:30:53','2023-07-08 17:30:53'),(35,1,'2023-07-08 17:30:53','2023-07-08 17:30:53'),(36,2,'2023-07-08 17:30:53','2023-07-08 17:30:53'),(37,1,'2023-07-08 17:30:53','2023-07-08 17:30:53'),(38,2,'2023-07-08 17:30:53','2023-07-08 17:30:53'),(39,1,'2023-07-08 17:30:53','2023-07-08 17:30:53'),(40,2,'2023-07-08 17:30:53','2023-07-08 17:30:53'),(41,1,'2023-07-08 17:30:53','2023-07-08 17:30:53'),(42,2,'2023-07-08 17:30:53','2023-07-08 17:30:53'),(43,1,'2023-07-08 17:30:53','2023-07-08 17:30:53'),(44,2,'2023-07-08 17:30:53','2023-07-08 17:30:53'),(45,1,'2023-07-08 17:30:53','2023-07-08 17:30:53'),(46,2,'2023-07-08 17:30:54','2023-07-08 17:30:54'),(47,1,'2023-07-08 17:30:54','2023-07-08 17:30:54'),(48,2,'2023-07-08 17:30:54','2023-07-08 17:30:54'),(49,1,'2023-07-08 17:30:54','2023-07-08 17:30:54'),(50,2,'2023-07-08 17:30:54','2023-07-08 17:30:54'),(51,1,'2023-07-08 17:30:54','2023-07-08 17:30:54'),(52,2,'2023-07-08 17:30:54','2023-07-08 17:30:54'),(53,1,'2023-07-08 17:30:54','2023-07-08 17:30:54');