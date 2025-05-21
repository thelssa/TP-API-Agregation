// import Album from '../models/AlbumModel.mjs';
// import Photo from '../models/PhotoModel.mjs';

// const albumController = {
//   getAlbumById: async (req, res) => {
//     try {
//       const album = await Album.findById(req.params.id).populate('photos');
//       if (!album) {
//         res.status(404).json({ message: 'Album non trouvé' });
//         return null;
//       }
//       res.status(200).json(album);
//       return null;
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//       return null;
//     }
//   },

//   getAllAlbums: async (req, res) => {
//     try {
//       const filter = req.query.title ? { title: new RegExp(req.query.title, 'i') } : {};
//       const albums = await Album.find(filter).populate('photos');
//       res.status(200).json(albums);
//       return null;
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//       return null;
//     }
//   },

//   createAlbum: async (req, res) => {
//     try {
//       const album = new Album(req.body);
//       await album.save();
//       res.status(201).json(album);
//       return null;
//     } catch (err) {
//       res.status(400).json({ error: err.message });
//       return null;
//     }
//   },

//   updateAlbum: async (req, res) => {
//     try {
//       const album = await Album.findByIdAndUpdate(req.params.id, req.body, { new: true });
//       if (!album) {
//         res.status(404).json({ message: 'Album non trouvé' });
//         return null;
//       }
//       res.status(200).json(album);
//       return null;
//     } catch (err) {
//       res.status(400).json({ error: err.message });
//       return null;
//     }
//   },

//   deleteAlbum: async (req, res) => {
//     try {
//       const album = await Album.findById(req.params.id);
//       if (!album) {
//         res.status(404).json({ message: 'Album non trouvé' });
//         return null;
//       }

//       await Photo.deleteMany({ album: album._id });
//       await album.deleteOne();

//       res.status(200).json({ message: 'Album et ses photos supprimés' });
//       return null;
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//       return null;
//     }
//   }
// };

// export default albumController;
