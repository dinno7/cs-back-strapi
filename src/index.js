"use strict";
const { faker } = require("@faker-js/faker/locale/fa");

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }) {
    // strapi.service("plugin::users-permissions.user").fetchAuthenticatedUser =
    //   async (id) => {
    //     const user = await strapi
    //       .query("plugin::users-permissions.user")
    //       .findOne({ where: { id }, populate: ["avatar"] });
    //     return user;
    //   };
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    // for (let i = 0; i < 10; i++) {
    //   await strapi.entityService.create("api::post.post", {
    //     data: {
    //       title: faker.lorem.words(2),
    //       uuid: "faker-" + i + Math.floor(Math.random() * 1000),
    //       content: faker.lorem.paragraph(),
    //       brief: faker.word.words(5),
    //       category: 1,
    //       publishedAt: faker.date.recent(),
    //     },
    //   });
    // }
  },
};
