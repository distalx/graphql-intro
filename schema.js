import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} from 'graphql/type';

import albums from './albums.json';
import images from './images.json';

const ImageType = new GraphQLObjectType({
  name: 'ImageType',
  fields:{
    id:{
      type: GraphQLString
    },
    caption:{
      type: GraphQLString
    }
  }
});

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
      type: new GraphQLList(ImageType),
      resolve: (album)=>{


        return album.images.filter((albumImageId)=>{

          return images.filter((img)=>{
            if(img.id === albumImageId){
              return img;
            }
          });

        });


      }
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
