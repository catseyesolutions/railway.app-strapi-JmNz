// src/api/homepage/controllers/homepage.ts
import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::homepage.homepage', ({ strapi }) => ({
  async find(ctx) {
    // Your custom logic here (latest articles/events example from before)

    const homepage = await strapi.db.query('api::homepage.homepage').findOne({
      populate: ['Banner'],
    });

    if (!homepage) {
      return ctx.notFound('Homepage not found');
    }

    const latestArticles = await strapi.db.query('api::article.article').findMany({
      limit: 4,
      orderBy: { publishedAt: 'desc' },
      where: { publishedAt: { $notNull: true } },
      populate: ['image'], // add fields you need
    });

    const latestEvents = await strapi.db.query('api::event.event').findMany({
      limit: 4,
      orderBy: { date: 'desc' },
      where: { publishedAt: { $notNull: true } },
      populate: ['image'],
    });

    return {
      data: {
        ...homepage,
        articles: latestArticles,
        events: latestEvents,
      },
      meta: {},
    };
  },
}));