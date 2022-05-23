let response = require('../response');
const { initializeApp, applicationDefault } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

initializeApp({
    credential: applicationDefault()
  });

const db = getFirestore();

async function getItems(request, reply) {

    const { page, limit, keyword, category, order } = request.query

    const query = db.collection('items');
    const querySnapshot = await query.get();

    if (querySnapshot.size > 0) {
        data = querySnapshot.docs[0].data();
    }
    else {
        return response.badRequest('', `not found`, reply)
    }

    return response.ok(data, `Success`, reply);
}

module.exports = {
    getItems
}
