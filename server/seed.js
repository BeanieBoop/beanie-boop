const { db, Category, Product, Order, LineItem, Review, User } = require('./db/models');

const categories = [
  {
    name: 'Superheroes',
    description: 'Sharp teeth, etc.',
  },
  {
    name: 'Star Wars',
    description: 'Worth more than the average beanie baby.',
  },
  {
    name: 'Frozen',
    description: 'Beanie babies from Frozen™!',
  },
  {
    name: 'Underwater',
    description: 'Underwater beanie babies!',
  },
];


const products = [{
  "name": "C3PO",
  "description": "Felis concolor",
  "price": 7500000,
  "inventoryQuantity": 5,
  "imgUrl": "/pictures/c3po.jpg",
  "categoryId": 2
}, {
  "name": "Chewbacca",
  "description": "Dusicyon thous",
  "price": 7167,
  "inventoryQuantity": 6,
  "imgUrl": "/pictures/chewbacca.jpg",
  "categoryId": 2
}, {
  "name": "Ewok",
  "description": "Semnopithecus entellus",
  "price": 276,
  "inventoryQuantity": 65,
  "imgUrl": "/pictures/wicket_top.jpg",
  "categoryId": 2
}, {
  "name": "Iron Man",
  "description": "Eumetopias jubatus",
  "price": 379,
  "inventoryQuantity": 99,
  "imgUrl": "/pictures/ironman.gif",
  "categoryId": 1
}, {
  "name": "Spiderman",
  "description": "Vulpes cinereoargenteus",
  "price": 507,
  "inventoryQuantity": 28,
  "imgUrl": "/pictures/spiderman.gif",
  "categoryId": 1
}, {
  "name": "Captain America",
  "description": "Zalophus californicus",
  "price": 674,
  "inventoryQuantity": 88,
  "imgUrl": "/pictures/captainAmerica.gif",
  "categoryId": 1
}, {
  "name": "Spotted hyena",
  "description": "Crocuta crocuta",
  "price": 226,
  "inventoryQuantity": 73,
  "imgUrl": "https://robohash.org/perferendismagniet.png?size=50x50&set=set1",
  "categoryId": 1
}, {
  "name": "Cow",
  "description": "Coracias caudata",
  "price": 967,
  "inventoryQuantity": 38,
  "imgUrl": "https://robohash.org/autipsamprovident.png?size=50x50&set=set1",
  "categoryId": 2
}, {
  "name": "Leopard",
  "description": "Panthera pardus",
  "price": 946,
  "inventoryQuantity": 3,
  "imgUrl": "https://robohash.org/quiaiureaut.png?size=50x50&set=set1",
  "categoryId": 1
}, {
  "name": "Indian mynah",
  "description": "Acridotheres tristis",
  "price": 227,
  "inventoryQuantity": 80,
  "imgUrl": "https://robohash.org/commodiexercitationemiure.png?size=50x50&set=set1",
  "categoryId": 4
}]

const orders = [{
  "status": 'closed',
  "userId": null
}, {
  "userId": 6
}, {
  "userId": 9
}, {
  "userId": 3
}, {
  "userId": 3
}, {
  "userId": null
}, {
  "userId": 1
}, {
  "userId": 7
}, {
  "userId": 8
}, {
  "userId": 8
}]

const lineItems = [{
  "unitPrice": 81065,
  "quantity": 7,
  "orderId": 7,
  "productId": 4
}, {
  "unitPrice": 83907,
  "quantity": 6,
  "orderId": 10,
  "productId": 2
}, {
  "unitPrice": 60274,
  "quantity": 3,
  "orderId": 6,
  "productId": 10
}, {
  "unitPrice": 2778,
  "quantity": 3,
  "orderId": 4,
  "productId": 4
}, {
  "unitPrice": 10314,
  "quantity": 2,
  "orderId": 1,
  "productId": 4
}, {
  "unitPrice": 6086,
  "quantity": 5,
  "orderId": 7,
  "productId": 2
}, {
  "unitPrice": 9969,
  "quantity": 6,
  "orderId": 1,
  "productId": 8
}, {
  "unitPrice": 74415,
  "quantity": 1,
  "orderId": 4,
  "productId": 9
}, {
  "unitPrice": 4123,
  "quantity": 2,
  "orderId": 7,
  "productId": 4
}, {
  "unitPrice": 72767,
  "quantity": 4,
  "orderId": 8,
  "productId": 3
}]

const reviews = [{
  "rating": 0,
  "reviewText": "Vestibulum quam sapien, varius ut, blandit non, interdum in, ante.",
  "userId": 1,
  "productId": 2
}, {
  "rating": 3,
  "reviewText": "Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.",
  "userId": 3,
  "productId": 1
}, {
  "rating": 4,
  "reviewText": "Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy.",
  "userId": 10,
  "productId": 10
}, {
  "rating": 4,
  "reviewText": "In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.",
  "userId": 8,
  "productId": 9
}, {
  "rating": 3,
  "reviewText": "Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem.",
  "userId": 10,
  "productId": 5
}, {
  "rating": 4,
  "reviewText": "Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.",
  "userId": 2,
  "productId": 4
}, {
  "rating": 3,
  "reviewText": "In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.",
  "userId": 4,
  "productId": 9
}, {
  "rating": 4,
  "reviewText": "Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi.",
  "userId": 5,
  "productId": 9
}, {
  "rating": 4,
  "reviewText": "Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.",
  "userId": 7,
  "productId": 7
}, {
  "rating": 4,
  "reviewText": "Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue.",
  "userId": 6,
  "productId": 10
}]



const users = [
  {
    id: 1,
    email: 'schamp0@wired.com',
    password: 'password',
    isAdmin: 'true',
  },
  {
    id: 2,
    email: 'cglantz1@ameblo.jp',
    password: 'password',
  },
  {
    id: 3,
    email: 'mcranmer2@nifty.com',
    password: 'password',
  },
  {
    id: 4,
    email: 'enitti3@printfriendly.com',
    password: 'password',
  },
  {
    id: 5,
    email: 'jhuggen4@ucoz.com',
    password: 'password',
  },
  {
    id: 6,
    email: 'srousel5@youtu.be',
    password: 'password',
  },
  {
    id: 7,
    email: 'lgoldney6@bbc.co.uk',
    password: 'password',
  },
  {
    id: 8,
    email: 'rmylchreest7@jiathis.com',
    password: 'password',
  },
  {
    id: 9,
    email: 'amorford8@indiegogo.com',
    password: 'password',
  },
  {
    id: 10,
    email: 'snassie9@walmart.com',
    password: 'password',
  },
];

db
  .sync({ force: true })
  .then(() => {
    return Promise.all(
      categories.map(category => {
        return Category.create(category);
      })
    );
  })
  .then(() => {
    return Promise.all(
      products.map(product => {
        return Product.create(product);
      })
    );
  })
  .then(() => {
    return Promise.all(
      users.map(user => {
        return User.create(user);
      })
    );
  })
  .then(() => {
    return Promise.all(
      orders.map(order => {
        return Order.create(order);
      })
    );
  })
  .then(() => {
    return Promise.all(
      lineItems.map(lineItem => {
        return LineItem.create(lineItem);
      })
    );
  })
  .then(() => {
    return Promise.all(
      reviews.map(review => {
        return Review.create(review);
      })
    );
  })
  .then(() => {
    console.log('success!!');
  })
  .catch(err => console.error(err));
