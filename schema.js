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
    id: {
      type: GraphQLString
    },
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

    album: {
      type: new GraphQLList(AlbumType),
      args: {
        id: { type: GraphQLString }
      },
      resolve:  (_, args) => {

        return albums.filter((album)=>{
          if(album.id === args.id){
            return album;
          }

        });

      }
    },
  }
});

const schema = new GraphQLSchema({
  query: RootType
});

export default schema;
