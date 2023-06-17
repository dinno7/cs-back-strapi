"use strict";

/**
 * comment controller
 */

const { createCoreController } = require("@strapi/strapi").factories;
const { v4 } = require("uuid");

module.exports = createCoreController("api::comment.comment", ({ strapi }) => ({
  async create(ctx) {
    let frontBody = ctx.request.body?.data;
    frontBody.uuid = v4();
    frontBody.publishedAt = null;
    let entity;
    if (!ctx.is("multipart")) {
      const { user } = ctx.state;
      if (!user) {
        return { error: "You have not access" };
      }
      frontBody.author = user;
      entity = await strapi.entityService.create("api::comment.comment", {
        data: frontBody,
      });
      return this.transformResponse(entity);
    }
  },
}));
