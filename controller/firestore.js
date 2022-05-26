let response = require('../response');
const { initializeApp, applicationDefault } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

initializeApp({
    credential: applicationDefault()
});

const db = getFirestore();

async function getItems(request, reply) {

    const { offset, limit, keyword, category, order } = request.query

    const query = db.collection('items');
    const querySnapshot = await query
        .orderBy('Type', 'asc')
        .limit(2)
        .offset(1)
        .where('keywords','array-contains','ka')
        .get();
    const data = new Array()
    if (querySnapshot.size > 0) {
        console.log(querySnapshot.docs[0].id)
        querySnapshot.docs.forEach(doc => data.push({ id: doc.id, ...doc.data() }));
    }
    else {
        return response.badRequest('', `not found`, reply)
    }
    return response.ok(data, `Success`, reply);
}

module.exports = {
    getItems
}
