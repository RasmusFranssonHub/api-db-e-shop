CREATE TABLE "product_categories" (
  "product_id" int unsigned NOT NULL,
  "category_id" int unsigned NOT NULL,
  PRIMARY KEY ("product_id","category_id"),
  KEY "category_id" ("category_id"),
  CONSTRAINT "product_categories_ibfk_1" FOREIGN KEY ("product_id") REFERENCES "products" ("id") ON DELETE CASCADE,
  CONSTRAINT "product_categories_ibfk_2" FOREIGN KEY ("category_id") REFERENCES "categories" ("id") ON DELETE CASCADE
);insert into `product_categories` (`product_id`, `category_id`) values (1, 1);
insert into `product_categories` (`product_id`, `category_id`) values (2, 1);
insert into `product_categories` (`product_id`, `category_id`) values (4, 1);
insert into `product_categories` (`product_id`, `category_id`) values (5, 1);
insert into `product_categories` (`product_id`, `category_id`) values (6, 1);
insert into `product_categories` (`product_id`, `category_id`) values (8, 1);
insert into `product_categories` (`product_id`, `category_id`) values (9, 1);
insert into `product_categories` (`product_id`, `category_id`) values (10, 1);
insert into `product_categories` (`product_id`, `category_id`) values (1, 2);
insert into `product_categories` (`product_id`, `category_id`) values (3, 2);
insert into `product_categories` (`product_id`, `category_id`) values (4, 2);
insert into `product_categories` (`product_id`, `category_id`) values (5, 2);
insert into `product_categories` (`product_id`, `category_id`) values (6, 2);
insert into `product_categories` (`product_id`, `category_id`) values (8, 2);
insert into `product_categories` (`product_id`, `category_id`) values (9, 2);
insert into `product_categories` (`product_id`, `category_id`) values (10, 2);
insert into `product_categories` (`product_id`, `category_id`) values (1, 4);
insert into `product_categories` (`product_id`, `category_id`) values (8, 4);
insert into `product_categories` (`product_id`, `category_id`) values (2, 5);
insert into `product_categories` (`product_id`, `category_id`) values (3, 5);
insert into `product_categories` (`product_id`, `category_id`) values (4, 6);
insert into `product_categories` (`product_id`, `category_id`) values (5, 7);
insert into `product_categories` (`product_id`, `category_id`) values (6, 7);
