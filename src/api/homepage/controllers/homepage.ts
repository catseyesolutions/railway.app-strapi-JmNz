'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::homepage.homepage', ({ strapi }) =>  ({
  async find(ctx) {
    // First, get the homepage entry (singleType, usually only one)
    const homepage = await strapi.db.query('api::homepage.homepage').findOne({
      populate: ['Banner'],  // keep your dynamic zone if needed
      // No need to populate articles/events here
    });

    if (!homepage) {
      return ctx.notFound('Homepage not found');
    }

    // Dynamically fetch latest 4 published articles (adjust filters as needed)
    const latestArticles = await strapi.db.query('api::article.article').findMany({
      limit: 4,
      orderBy: { publishedAt: 'desc' },  // or { createdAt: 'desc' } or { date: 'desc' } if you have a date field
      where: { publishedAt: { $notNull: true } },  // only published ones
      populate: ['image', 'categories'],  // add what you need
    });

    // Same for events (example: upcoming or latest)
    const latestEvents = await strapi.db.query('api::event.event').findMany({
      limit: 4,
      orderBy: { date: 'desc' },  // or 'asc' for upcoming if date is future
      where: { publishedAt: { $notNull: true } },
      populate: ['image'],
    });

    // Merge into the response
    const data = {
      ...homepage,
      articles: latestArticles,
      events: latestEvents,
    };

    return { data, meta: {} };  // match Strapi response shape
  },
}));