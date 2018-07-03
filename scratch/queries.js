'use strict';

const knex = require('../knex');

// let searchTerm;
// searchTerm = 'gaga';
// knex
//   .select('notes.id', 'title', 'content')
//   .from('notes')
//   .modify(queryBuilder => {
//     if (searchTerm) {
//       queryBuilder.where('title', 'like', `%${searchTerm}%`);
//     }
//   })
//   .orderBy('notes.id')
//   .then(res => {
//     console.log(res);
//   })
//   .catch(err => {
//     console.error(err);
//   });

// let sampleId = 1004;
// knex
//   .select('notes.id', 'title', 'content')
//   .from('notes')
//   .modify(queryBuilder => {
//     if (sampleId) {
//       queryBuilder.where('notes.id', `${sampleId}`);
//     }
//   })
//   .returning(['id', 'title'])
//   .then(([res]) => {
//     console.log(res);
//   })
//   .catch(err => {
//     console.error(err);
//   });

// let updObj = {id: 1015, title: 'dadsfsaddfsfo', content: null};
// let {id, title, content} = updObj;
// knex
//   .from('notes')
//   .modify(queryBuilder => {
//     if (updObj) {
//       console.log(id);
//       queryBuilder.where('notes.id', `${id}`)
//         .update({id:`${id}` , title: `${title}`, content:`${content}`});
//     }
//   })
//   .returning(['id', 'title'])
//   .then(([res]) => {
//     console.log(res);
//   })
//   .catch(err => {
//     console.error(err);
//   });

// let creaObj = {title: 'aw9e9rimomfawefmwoem', content: 'asdfityjftyjtyjf'};
// knex
//   .from('notes')
//   .modify(queryBuilder => {
//     if (creaObj) {
//       queryBuilder.insert(creaObj);
//     }
//   })
//   .returning(['id', 'title'])
//   .then(([res]) => {
//     console.log(res);
//   })
//   .catch(err => {
//     console.error(err);
//   });

// let sampleId = 1018;
// knex
//   .from('notes')
//   .modify(queryBuilder => {
//     if (sampleId) {
//       queryBuilder.where('notes.id', `${sampleId}`).del();
//     }
//   })
//   .returning(['id', 'title'])
//   .then(([res]) => {
//     console.log(res);
//   })
//   .catch(err => {
//     console.error(err);
//   });
  






