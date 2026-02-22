#!/usr/bin/env node

/**
 * Generates Strapi content type files directly on the filesystem.
 *
 * Usage — run from your Strapi project root:
 *   node /path/to/create-strapi-content-types.js
 *
 * Or copy this script into your Strapi project and run:
 *   node create-strapi-content-types.js
 *
 * It creates the folder structure under src/api/ for each content type:
 *   src/api/<name>/content-types/<name>/schema.json
 *   src/api/<name>/controllers/<name>.js
 *   src/api/<name>/services/<name>.js
 *   src/api/<name>/routes/<name>.js
 *
 * After running, restart Strapi:  npm run develop
 */

const fs = require('fs');
const path = require('path');

// Detect Strapi root — look for src/ folder in cwd
const ROOT = process.cwd();
const SRC = path.join(ROOT, 'src', 'api');

if (!fs.existsSync(path.join(ROOT, 'src'))) {
  console.error('❌  No src/ folder found in current directory.');
  console.error('   Run this script from your Strapi project root.');
  process.exit(1);
}

// ── Content type definitions ────────────────────────────────────────────────

const collectionTypes = [
  {
    singularName: 'article',
    pluralName: 'articles',
    displayName: 'Article',
    description: 'Blog & knowledge base articles',
    attributes: {
      title: {
        type: 'string',
        required: true,
        pluginOptions: { i18n: { localized: true } },
      },
      slug: {
        type: 'uid',
        targetField: 'title',
        required: true,
      },
      excerpt: {
        type: 'text',
        pluginOptions: { i18n: { localized: true } },
      },
      content: {
        type: 'richtext',
        required: true,
        pluginOptions: { i18n: { localized: true } },
      },
      category: {
        type: 'string',
        pluginOptions: { i18n: { localized: true } },
      },
      author: {
        type: 'string',
      },
      image: {
        type: 'media',
        multiple: false,
        allowedTypes: ['images'],
      },
    },
  },

  {
    singularName: 'mosque',
    pluralName: 'mosques',
    displayName: 'Mosque',
    description: 'Mosque directory listings',
    attributes: {
      name: {
        type: 'string',
        required: true,
        pluginOptions: { i18n: { localized: true } },
      },
      slug: {
        type: 'uid',
        targetField: 'name',
        required: true,
      },
      description: {
        type: 'richtext',
        pluginOptions: { i18n: { localized: true } },
      },
      address: { type: 'string' },
      city: { type: 'string' },
      country: { type: 'string' },
      latitude: { type: 'float' },
      longitude: { type: 'float' },
      phone: { type: 'string' },
      website: { type: 'string' },
      image: {
        type: 'media',
        multiple: false,
        allowedTypes: ['images'],
      },
    },
  },

  {
    singularName: 'event',
    pluralName: 'events',
    displayName: 'Event',
    description: 'Events & lectures',
    attributes: {
      title: {
        type: 'string',
        required: true,
        pluginOptions: { i18n: { localized: true } },
      },
      slug: {
        type: 'uid',
        targetField: 'title',
        required: true,
      },
      description: {
        type: 'richtext',
        pluginOptions: { i18n: { localized: true } },
      },
      date: { type: 'datetime', required: true },
      endDate: { type: 'datetime' },
      location: {
        type: 'string',
        pluginOptions: { i18n: { localized: true } },
      },
      city: { type: 'string' },
      organizer: { type: 'string' },
      link: { type: 'string' },
      image: {
        type: 'media',
        multiple: false,
        allowedTypes: ['images'],
      },
    },
  },

  {
    singularName: 'quiz-question',
    pluralName: 'quiz-questions',
    displayName: 'Quiz Question',
    description: 'Islamic quiz questions',
    attributes: {
      question: {
        type: 'text',
        required: true,
        pluginOptions: { i18n: { localized: true } },
      },
      optionA: {
        type: 'string',
        required: true,
        pluginOptions: { i18n: { localized: true } },
      },
      optionB: {
        type: 'string',
        required: true,
        pluginOptions: { i18n: { localized: true } },
      },
      optionC: {
        type: 'string',
        required: true,
        pluginOptions: { i18n: { localized: true } },
      },
      optionD: {
        type: 'string',
        required: true,
        pluginOptions: { i18n: { localized: true } },
      },
      correctAnswer: {
        type: 'enumeration',
        enum: ['A', 'B', 'C', 'D'],
        required: true,
      },
      explanation: {
        type: 'text',
        pluginOptions: { i18n: { localized: true } },
      },
      category: {
        type: 'string',
        pluginOptions: { i18n: { localized: true } },
      },
    },
  },

  {
    singularName: 'video',
    pluralName: 'videos',
    displayName: 'Video',
    description: 'YouTube video embeds',
    attributes: {
      title: {
        type: 'string',
        required: true,
        pluginOptions: { i18n: { localized: true } },
      },
      slug: {
        type: 'uid',
        targetField: 'title',
        required: true,
      },
      description: {
        type: 'text',
        pluginOptions: { i18n: { localized: true } },
      },
      youtubeUrl: {
        type: 'string',
        required: true,
      },
      category: {
        type: 'string',
        pluginOptions: { i18n: { localized: true } },
      },
      image: {
        type: 'media',
        multiple: false,
        allowedTypes: ['images'],
      },
    },
  },

  {
    singularName: 'page-content',
    pluralName: 'page-contents',
    displayName: 'Page Content',
    description: 'Generic CMS pages (privacy, terms, about, etc.)',
    attributes: {
      title: {
        type: 'string',
        required: true,
        pluginOptions: { i18n: { localized: true } },
      },
      slug: {
        type: 'uid',
        targetField: 'title',
        required: true,
      },
      content: {
        type: 'richtext',
        required: true,
        pluginOptions: { i18n: { localized: true } },
      },
      image: {
        type: 'media',
        multiple: false,
        allowedTypes: ['images'],
      },
    },
  },
];

const singleTypes = [
  {
    singularName: 'homepage',
    pluralName: 'homepages',
    displayName: 'Homepage',
    description: 'Homepage hero & featured content',
    attributes: {
      heroTitle: {
        type: 'string',
        pluginOptions: { i18n: { localized: true } },
      },
      heroSubtitle: {
        type: 'text',
        pluginOptions: { i18n: { localized: true } },
      },
      bannerImage: {
        type: 'media',
        multiple: false,
        allowedTypes: ['images'],
      },
      featuredArticles: {
        type: 'relation',
        relation: 'oneToMany',
        target: 'api::article.article',
      },
      featuredEvents: {
        type: 'relation',
        relation: 'oneToMany',
        target: 'api::event.event',
      },
    },
  },
];

// ── File generators ─────────────────────────────────────────────────────────

function buildSchema(ct, kind) {
  return {
    kind,
    collectionName: ct.pluralName.replace(/-/g, '_'),
    info: {
      singularName: ct.singularName,
      pluralName: ct.pluralName,
      displayName: ct.displayName,
      description: ct.description,
    },
    options: {
      draftAndPublish: true,
    },
    pluginOptions: {
      i18n: { localized: true },
    },
    attributes: ct.attributes,
  };
}

function controllerJs(singularName) {
  const camel = singularName.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
  return `'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::${singularName}.${singularName}');
`;
}

function serviceJs(singularName) {
  return `'use strict';

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::${singularName}.${singularName}');
`;
}

function routeJs(singularName) {
  return `'use strict';

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::${singularName}.${singularName}');
`;
}

// ── Writer ──────────────────────────────────────────────────────────────────

function writeContentType(ct, kind) {
  const name = ct.singularName;
  const base = path.join(SRC, name);

  const dirs = [
    path.join(base, 'content-types', name),
    path.join(base, 'controllers'),
    path.join(base, 'services'),
    path.join(base, 'routes'),
  ];

  for (const dir of dirs) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const schema = buildSchema(ct, kind);
  const files = [
    [path.join(base, 'content-types', name, 'schema.json'), JSON.stringify(schema, null, 2) + '\n'],
    [path.join(base, 'controllers', name + '.js'), controllerJs(name)],
    [path.join(base, 'services', name + '.js'), serviceJs(name)],
    [path.join(base, 'routes', name + '.js'), routeJs(name)],
  ];

  let created = 0;
  let skipped = 0;

  for (const [filePath, content] of files) {
    if (fs.existsSync(filePath)) {
      skipped++;
      continue;
    }
    fs.writeFileSync(filePath, content, 'utf-8');
    created++;
  }

  const rel = path.relative(ROOT, base);
  if (skipped === files.length) {
    console.log(`   ✓  ${ct.displayName.padEnd(20)} ${rel}/  (already exists)`);
  } else {
    console.log(`   ✅ ${ct.displayName.padEnd(20)} ${rel}/  (${created} files created)`);
  }
}

// ── Main ────────────────────────────────────────────────────────────────────

console.log('');
console.log('🕌 Gebedstijden — Strapi Content Type Generator');
console.log('─'.repeat(55));
console.log(`   Strapi root: ${ROOT}`);
console.log(`   Target:      ${path.relative(ROOT, SRC)}/`);

if (!fs.existsSync(SRC)) {
  fs.mkdirSync(SRC, { recursive: true });
  console.log(`   Created src/api/`);
}

console.log('');
console.log('📦 Collection types:');
for (const ct of collectionTypes) {
  writeContentType(ct, 'collectionType');
}

console.log('');
console.log('📄 Single types:');
for (const st of singleTypes) {
  writeContentType(st, 'singleType');
}

// Summary
console.log('');
console.log('─'.repeat(55));
console.log('');
console.log('Files created under src/api/:');
console.log('');
for (const ct of [...collectionTypes, ...singleTypes]) {
  const n = ct.singularName;
  console.log(`  src/api/${n}/`);
  console.log(`    ├─ content-types/${n}/schema.json`);
  console.log(`    ├─ controllers/${n}.js`);
  console.log(`    ├─ services/${n}.js`);
  console.log(`    └─ routes/${n}.js`);
}

console.log('');
console.log('API endpoints (after restart):');
console.log('');
for (const ct of collectionTypes) {
  console.log(`  GET  /api/${ct.pluralName}          → list`);
  console.log(`  GET  /api/${ct.pluralName}/:id       → single`);
}
for (const st of singleTypes) {
  console.log(`  GET  /api/${st.singularName}             → single type`);
}

console.log('');
console.log('Next steps:');
console.log('  1. Restart Strapi:  npm run develop');
console.log('  2. Enable locales in Admin → Settings → Internationalization');
console.log('     Add: nl (Dutch), tr (Turkish), ar (Arabic)');
console.log('  3. Set permissions in Admin → Settings → Roles → Public');
console.log('     Enable find & findOne for each content type');
console.log('  4. Start adding content in the Content Manager');
console.log('');
