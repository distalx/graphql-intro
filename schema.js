import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull
} from 'graphql/type';

import albums from './albums.json';

const AlbumType = new GraphQLObjectType({
  name: 'AlbumType',
  fields: {
    title: {
      type: GraphQLString
    },
    images: {
      type: GraphQLString
    }

  }
});

const RootType = new GraphQLObjectType({
  name: 'ImageGallery',
  fields: {
    albums: {
      type: new GraphQLList(AlbumType),
      resolve() {
        return albums;
      }
    },
  }
});

const schema = new GraphQLSchema({
  query: RootType
});

export default schema;
