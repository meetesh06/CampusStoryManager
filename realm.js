import Realm from 'realm';

var realmdb = null;

const Events = {
  name: 'Events',
  primaryKey: '_id',
  properties: {
    _id: 'string',
    email: 'string',
    name: 'string',
    college: 'string',
    reach: 'string',
    views: 'string',
    enrollees: 'string',
    timestamp: 'date',
    title: 'string',
    ms : 'int',
    description: 'string',
    location: 'string',
    category: 'string',
    tags: 'string',
    reg_start: 'date',
    reg_end: 'date',
    date: 'date',
    time: 'date',
    channel_name: 'string',
    contact_details: 'string',
    faq: 'string',
    price: 'string',
    available_seats: 'string',
    audience: 'string',
    channel: 'string',
    // interested: 'string',
    // going: 'string',
    media: 'string'
  }
};

export default {
  getRealm: (callback) => { 
    if(realmdb === null) {
      return Realm.open({schema: [Events], deleteRealmIfMigrationNeeded: true })
        .then(realm => {
          realmdb = realm;
          callback(realmdb);
        });
    } else {
      callback(realmdb);
    }
  }
};