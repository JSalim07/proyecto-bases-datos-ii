const { gql } = require('apollo-server');

const typeDefs = gql`
  type Poet {
    poet_code: ID!
    first_name: String!
    surname: String!
    address: String
    postcode: String
    telephone_number: String
    poems: [Poem]
  }

  type Poem {
    poem_code: ID!
    poem_title: String!
    poem_contents: String
    poet_code: Int!
    poet: Poet
  }

  type Publication {
    publication_code: ID!
    title: String!
    price: Float
    poems: [Poem]
  }

  type Customer {
    customer_code: ID!
    first_name: String!
    surname: String!
    address: String
    postcode: String
    telephone_number: String
  }

  type Sale {
    sale_code: ID!
    date: String!
    amount: Float!
    customer_code: Int!
    customer: Customer
  }

  type PoetWithPoemsView {
    poet_code: Int!
    first_name: String!
    surname: String!
    address: String
    postcode: String
    telephone_number: String
    poem_code: Int
    poem_title: String
    poem_contents: String
  }

  type SaleWithCustomerView {
    sale_code: Int!
    date: String!
    amount: Float!
    customer_code: Int!
    first_name: String!
    surname: String!
    address: String
    postcode: String
    telephone_number: String
  }

  type PublicationWithPoemsView {
    publication_code: Int!
    publication_title: String!
    publication_price: Float
    poem_code: Int
    poem_title: String
    poem_contents: String
    poet_code: Int
    poet_first_name: String
    poet_surname: String
  }

  type Query {
    poets: [Poet]
    poet(poet_code: ID!): Poet
    poems: [Poem]
    poem(poem_code: ID!): Poem
    publications: [Publication]
    customers: [Customer]
    sales: [Sale]

    # Consultas usando Procedimientos Almacenados (Vistas)
    poetWithPoems(poet_code: Int!): [PoetWithPoemsView]
    saleWithCustomer(sale_code: Int!): [SaleWithCustomerView]
    publicationWithPoems(publication_code: Int!): [PublicationWithPoemsView]
  }

  type Mutation {
    addPoet(first_name: String!, surname: String!, address: String, postcode: String, telephone_number: String): Poet!
    updatePoet(poet_code: ID!, first_name: String, surname: String, address: String, postcode: String, telephone_number: String): Poet!
    deletePoet(poet_code: ID!): ID!

    addPoem(poem_title: String!, poem_contents: String, poet_code: Int!): Poem!
    updatePoem(poem_code: ID!, poem_title: String, poem_contents: String, poet_code: Int): Poem!
    deletePoem(poem_code: ID!): ID!

    addPublication(title: String!, price: Float): Publication!
    updatePublication(publication_code: ID!, title: String, price: Float): Publication!
    deletePublication(publication_code: ID!): ID!

    addCustomer(first_name: String!, surname: String!, address: String, postcode: String, telephone_number: String): Customer!
    updateCustomer(customer_code: ID!, first_name: String, surname: String, address: String, postcode: String, telephone_number: String): Customer!
    deleteCustomer(customer_code: ID!): ID!

    addSale(date: String!, amount: Float!, customer_code: Int!): Sale!
    updateSale(sale_code: ID!, date: String, amount: Float, customer_code: Int): Sale!
    deleteSale(sale_code: ID!): ID!

    # Relaciones muchos a muchos
    addPoemToPublication(poem_code: Int!, publication_code: Int!): String!
    removePoemFromPublication(poem_code: Int!, publication_code: Int!): String!

    addPublicationToSale(sale_code: Int!, publication_code: Int!): String!
    removePublicationFromSale(sale_code: Int!, publication_code: Int!): String!
  }
`;

module.exports = typeDefs;
