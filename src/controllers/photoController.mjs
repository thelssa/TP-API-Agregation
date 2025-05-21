// import Photo from '../models/PhotoModel.mjs';
// import Album from '../models/AlbumModel.mjs';

// const photoController = {
//   getPhotosByAlbum: async (req, res) => {
//     try {
//       const photos = await Photo.find({ album: req.params.idalbum });
//       res.status(200).json(photos);
//       return null;
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//       return null;
//     }
//   },

//   getPhotoById: async (req, res) => {
//     try {
//       const photo = await Photo.findOne({
//         _id: req.params.idphotos,
//         album: req.params.idalbum
//       });
//       if (!photo) {
//         res.status(404).json({ message: 'Photo non trouvée' });
//         return null;
//       }
//       res.status(200).json(photo);
//       return null;
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//       return null;
//     }
//   },

//   addPhotoToAlbum: async (req, res) => {
//     try {
//       const album = await Album.findById(req.params.idalbum);
//       if (!album) {
//         res.status(404).json({ message: 'Album non trouvé' });
//         return null;
//       }

//       const photo = new Photo({ ...req.body, album: album._id });
//       await photo.save();

//       album.photos.push(photo._id);
//       await album.save();

//       res.status(201).json(photo);
//       return null;
//     } catch (err) {
//       res.status(400).json({ error: err.message });
//       return null;
//     }
//   },

//   updatePhoto: async (req, res) => {
//     try {
//       const photo = await Photo.findOneAndUpdate(
//         { _id: req.params.idphotos, album: req.params.idalbum },
//         req.body,
//         { new: true }
//       );
//       if (!photo) {
//         res.status(404).json({ message: 'Photo non trouvée' });
//         return null;
//       }
//       res.status(200).json(photo);
//       return null;
//     } catch (err) {
//       res.status(400).json({ error: err.message });
//       return null;
//     }
//   },

//   deletePhoto: async (req, res) => {
//     try {
//       const photo = await Photo.findOneAndDelete({
//         _id: req.params.idphotos,
//         album: req.params.idalbum
//       });

//       if (!photo) {
//         res.status(404).json({ message: 'Photo non trouvée' });
//         return null;
//       }

//       await Album.findByIdAndUpdate(req.params.idalbum, {
//         $pull: { photos: req.params.idphotos }
//       });

//       res.status(200).json({ message: 'Photo supprimée' });
//       return null;
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//       return null;
//     }
//   }
// };

// export default photoController;
