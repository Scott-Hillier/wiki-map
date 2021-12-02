-- Widgets table seeds here (Example)
INSERT INTO maps (user_id, name, isPrivate)
VALUES
  (1, 'Best Restaurants', TRUE),
  (2, 'Favourite Parks', FALSE),
  (3, 'Famous Movie Scenes', TRUE),
  (4, 'Location of Every McDonalds', TRUE),
  (5, 'Every Hotel', TRUE),
  (1, 'Landmarks', FALSE);

INSERT INTO points (map_id, title, description, image, latitude, longitude, address, type)
VALUES
  (1, 'Pizza Pizza', 'Pizza', 'https://www.franchiseinfo.ca/wp-content/uploads/2017/06/Pizza-Pizza-Store-Front-2-e1496926774687.jpg', 49.2731504240154, -123.07228869396322, '123 Address', 'Restaurant'),
  (1, 'Burger Joint', 'Burgers', 'http://https://www.franchiseinfo.ca/wp-content/uploads/2017/06/Pizza-Pizza-Store-Front-2-e1496926774687.jpg', 49.26609385119361, -123.15176791002264, '456 Address', 'Restaurant'),
  (1, 'Restaurant Satoshi', 'Ramen', 'https://i.pinimg.com/originals/e3/a1/ec/e3a1ecfbb194b2eeb7aed82ff0d6bee3.jpg', 49.225246721872146, -123.13357180456245, '789 Street', 'Restaurant'),
  (1, 'Pizza Hut', 'Pizza', 'https://thumbs.dreamstime.com/b/cambridge-uk-circa-october-pizza-hut-storefront-pizza-hut-storefront-cambridge-129897523.jpg', 49.25388247582642, -123.10662096887923, '123 Road', 'Restaurant'),
  (2, 'Queen Elizabeth Park', 'Located in central Vancouver Queen Elizabath Park has multiple amenities including pitch and putt, disc golf, and a bird conservation', 'https://i.pinimg.com/originals/f9/90/80/f99080a76b5b2e76d68c44eaec825dda.jpg', 49.24144393363248, -123.11219996352702, '4600 Cambie St.', 'Park'),
  (4, 'McDonalds', 'The fanciest McDonalds', 'http://bengkel.kaodim.com/wp-content/uploads/2015/01/oldmcdonalds-edit.jpg', 49.2852402429455, -123.13906878784746, '1610 Davie St.', 'Restaurant'),
  (3, 'deadpool movie scene', 'Deadpool', 'http://bengkel.kaodim.com/wp-content/uploads/2015/01/oldmcdonalds-edit.jpg', 49.2852401429455, -123.13946878784746, '1610 Davie St.', 'Restaurant'),
  (3, 'twilight movvie scene', 'Twilight', 'http://bengkel.kaodim.com/wp-content/uploads/2015/01/oldmcdonalds-edit.jpg', 49.2652413429455, -123.14006878784746, '1610 Stanley park', 'Restaurant'),
  (3, 'Harrypotter movie scene', 'Harry Potter', 'http://bengkel.kaodim.com/wp-content/uploads/2015/01/oldmcdonalds-edit.jpg', 49.2802402429455, -123.1390578784746, '1610 Davie St.', 'Restaurant')
 
INSERT INTO favorites (user_id, map_id, isFavorite)
VALUES

INSERT INTO contributions (user_id, map_id, isContributed)
VALUES
