const db = require('../../database/db');
const StoredProceduresGraphQL = require('../../models/storedProceduresGraphQL');

const resolvers = {
  Query: {
    poets: async () => await db.select().table('Poet'),

    poet: async (_, { poet_code }) =>
      await db('Poet').where({ poet_code }).first(),

    poems: async () => await db.select().table('Poem'),

    poem: async (_, { poem_code }) =>
      await db('Poem').where({ poem_code }).first(),

    publications: async () => await db.select().table('Publication'),

    customers: async () => await db.select().table('Customer'),

    sales: async () => await db.select().table('Sale'),

    // Queries usando Procedimientos Almacenados
    poetWithPoems: async (_, { poet_code }) =>
      await StoredProceduresGraphQL.getPoetWithPoems(poet_code),

    saleWithCustomer: async (_, { sale_code }) =>
      await StoredProceduresGraphQL.getSaleWithCustomer(sale_code),

    publicationWithPoems: async (_, { publication_code }) =>
      await StoredProceduresGraphQL.getPublicationWithPoems(publication_code),
  },

  Mutation: {
    addPoet: async (_, { first_name, surname, address, postcode, telephone_number }) => {
      const [poet_code] = await db('Poet').insert({
        first_name,
        surname,
        address,
        postcode,
        telephone_number
      });
      const newPoet = await db('Poet').where({ poet_code }).first();
      return newPoet;
    },

    updatePoet: async (_, { poet_code, first_name, surname, address, postcode, telephone_number }) => {
      await db('Poet').where({ poet_code }).update({
        first_name,
        surname,
        address,
        postcode,
        telephone_number
      });
      const updatedPoet = await db('Poet').where({ poet_code }).first();
      return updatedPoet;
    },

    deletePoet: async (_, { poet_code }) => {
      await db('Poet').where({ poet_code }).del();
      return poet_code;
    },

    addPoem: async (_, { poem_title, poem_contents, poet_code }) => {
      const [poem_code] = await db('Poem').insert({
        poem_title,
        poem_contents,
        poet_code
      });
      const newPoem = await db('Poem').where({ poem_code }).first();
      return newPoem;
    },

    updatePoem: async (_, { poem_code, poem_title, poem_contents, poet_code: poetCode }) => {
      await db('Poem').where({ poem_code }).update({
        poem_title,
        poem_contents,
        poet_code: poetCode
      });
      const updatedPoem = await db('Poem').where({ poem_code }).first();
      return updatedPoem;
    },

    deletePoem: async (_, { poem_code }) => {
      await db('Poem').where({ poem_code }).del();
      return poem_code;
    },

    addPublication: async (_, { title, price }) => {
      const [publication_code] = await db('Publication').insert({
        title,
        price
      });
      const newPublication = await db('Publication').where({ publication_code }).first();
      return newPublication;
    },

    updatePublication: async (_, { publication_code, title, price }) => {
      await db('Publication').where({ publication_code }).update({
        title,
        price
      });
      const updatedPublication = await db('Publication').where({ publication_code }).first();
      return updatedPublication;
    },

    deletePublication: async (_, { publication_code }) => {
      await db('Publication').where({ publication_code }).del();
      return publication_code;
    },

    addCustomer: async (_, { first_name, surname, address, postcode, telephone_number }) => {
      const [customer_code] = await db('Customer').insert({
        first_name,
        surname,
        address,
        postcode,
        telephone_number
      });
      const newCustomer = await db('Customer').where({ customer_code }).first();
      return newCustomer;
    },

    updateCustomer: async (_, { customer_code, first_name, surname, address, postcode, telephone_number }) => {
      await db('Customer').where({ customer_code }).update({
        first_name,
        surname,
        address,
        postcode,
        telephone_number
      });
      const updatedCustomer = await db('Customer').where({ customer_code }).first();
      return updatedCustomer;
    },

    deleteCustomer: async (_, { customer_code }) => {
      await db('Customer').where({ customer_code }).del();
      return customer_code;
    },

    addSale: async (_, { date, amount, customer_code }) => {
      const [sale_code] = await db('Sale').insert({
        date,
        amount,
        customer_code
      });
      const newSale = await db('Sale').where({ sale_code }).first();
      return newSale;
    },

    updateSale: async (_, { sale_code, date, amount, customer_code }) => {
      await db('Sale').where({ sale_code }).update({
        date,
        amount,
        customer_code
      });
      const updatedSale = await db('Sale').where({ sale_code }).first();
      return updatedSale;
    },

    deleteSale: async (_, { sale_code }) => {
      await db('Sale').where({ sale_code }).del();
      return sale_code;
    },

    // Relaciones muchos a muchos - Poem_Publication
    addPoemToPublication: async (_, { poem_code, publication_code }) => {
      await db('Poem_Publication').insert({
        poem_code,
        publication_code
      });
      return `Poem ${poem_code} added to Publication ${publication_code}`;
    },

    removePoemFromPublication: async (_, { poem_code, publication_code }) => {
      const deleted = await db('Poem_Publication')
        .where({ poem_code, publication_code })
        .del();

      if (deleted) {
        return `Poem ${poem_code} removed from Publication ${publication_code}`;
      }
      return `Relation not found`;
    },

    // Relaciones muchos a muchos - Sale_Publication
    addPublicationToSale: async (_, { sale_code, publication_code }) => {
      await db('Sale_Publication').insert({
        sale_code,
        publication_code
      });
      return `Publication ${publication_code} added to Sale ${sale_code}`;
    },

    removePublicationFromSale: async (_, { sale_code, publication_code }) => {
      const deleted = await db('Sale_Publication')
        .where({ sale_code, publication_code })
        .del();

      if (deleted) {
        return `Publication ${publication_code} removed from Sale ${sale_code}`;
      }
      return `Relation not found`;
    },
  },

  Poet: {
    poems: async (parent) => {
      return await db('Poem').where({ poet_code: parent.poet_code });
    },
  },

  Poem: {
    poet: async (parent) => {
      return await db('Poet').where({ poet_code: parent.poet_code }).first();
    },
  },

  Publication: {
    poems: async (parent) => {
      const poemPublications = await db('Poem_Publication')
        .where({ publication_code: parent.publication_code });

      const poemCodes = poemPublications.map(pp => pp.poem_code);

      if (poemCodes.length === 0) return [];

      return await db('Poem').whereIn('poem_code', poemCodes);
    },
  },

  Sale: {
    customer: async (parent) => {
      return await db('Customer').where({ customer_code: parent.customer_code }).first();
    },
  },
};

module.exports = resolvers;
