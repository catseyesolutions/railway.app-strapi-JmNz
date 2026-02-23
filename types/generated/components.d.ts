import type { Schema, Struct } from '@strapi/strapi';

export interface AdBanner extends Struct.ComponentSchema {
  collectionName: 'components_ad_banners';
  info: {
    displayName: 'Banner';
    icon: 'apps';
  };
  attributes: {
    Test: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'ad.banner': AdBanner;
    }
  }
}
