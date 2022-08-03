const Airtable = require('airtable');

const base = Airtable.base('app9I0qSvHK5HulIw')

const table = base('Users')

export {table};