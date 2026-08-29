CREATE TABLE "products" (
  "id" int unsigned NOT NULL AUTO_INCREMENT,
  "title" varchar(255) NOT NULL,
  "description" text NOT NULL,
  "stock" int NOT NULL,
  "price" decimal(10,2) NOT NULL,
  "image" varchar(500) DEFAULT NULL,
  "created_date" datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ("id")
);insert into `products` (`id`, `title`, `description`, `stock`, `price`, `image`, `created_date`) values (1, 'Cloth Club Classic Tee', 'Classic Cloth Club t-shirt in black', 20, '500.00', 'cloth-club-classic-tee-black.jpg', '2026-08-13 07:56:30');
insert into `products` (`id`, `title`, `description`, `stock`, `price`, `image`, `created_date`) values (2, 'His Cloth Club Hoodie', 'Cloth Club Hoodie in black for him', 18, '500.00', 'cloth-club-hoodie-black-his.jpg', '2026-08-13 08:26:20');
insert into `products` (`id`, `title`, `description`, `stock`, `price`, `image`, `created_date`) values (3, 'Her Cloth Club Hoodie', 'Cloth Club Hoodie in pink for her', 9, '500.00', 'cloth-club-hoodie-pink-her.jpg', '2026-08-13 08:29:38');
insert into `products` (`id`, `title`, `description`, `stock`, `price`, `image`, `created_date`) values (4, 'Cloth Club Socks', '3 pack Unisex', 63, '250.00', 'cloth-club-socks.jpg', '2026-08-13 08:31:40');
insert into `products` (`id`, `title`, `description`, `stock`, `price`, `image`, `created_date`) values (5, 'Cloth Club Cap', 'Cap Unisex', 28, '350.00', 'cloth-club-cap.jpg', '2026-08-13 08:35:14');
insert into `products` (`id`, `title`, `description`, `stock`, `price`, `image`, `created_date`) values (6, 'Cloth Club Beanie', 'Beanie Unisex', 22, '350.00', 'cloth-club-beanie.jpg', '2026-08-13 08:35:57');
insert into `products` (`id`, `title`, `description`, `stock`, `price`, `image`, `created_date`) values (8, 'Cloth Club T-shirt', 'En klassisk svart t-shirt', 20, '499.00', 'cloth-club-tshirt.jpg', '2026-08-13 12:46:16');
insert into `products` (`id`, `title`, `description`, `stock`, `price`, `image`, `created_date`) values (9, 'Updated Test Product', 'Test description', 15, '600.00', NULL, '2026-08-17 08:37:01');
insert into `products` (`id`, `title`, `description`, `stock`, `price`, `image`, `created_date`) values (10, 'Test Product', 'Test description', 10, '500.00', NULL, '2026-08-17 09:17:56');
