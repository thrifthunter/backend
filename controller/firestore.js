let response = require('../response');
const { initializeApp, applicationDefault } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

initializeApp({
    credential: applicationDefault()
});

const db = getFirestore();

async function getItems(request, reply) {
    let querySnapshot
    const { page, size, keyword, category } = request.query
    console.log((page - 1) * size, size, keyword, category)
    const query = db.collection('items');
    if (keyword == undefined && category == undefined) {
        querySnapshot = await query
            .limit(size != undefined ? size : 10)
            .offset(page != undefined ? (page - 1) * size : 0)
            .get();
    } else if (keyword == undefined) {
        querySnapshot = await query
            .limit(size != undefined ? size : 10)
            .offset(page != undefined ? (page - 1) * size : 0)
            .where('category', '==', category)
            .get();
    } else if (category == undefined) {
        querySnapshot = await query
            .limit(size != undefined ? size : 10)
            .offset(page != undefined ? (page - 1) * size : 0)
            .where('keyword', 'array-contains', keyword)
            .get();
    } else {
        console.log('here')
        querySnapshot = await query
            .limit(size != undefined ? size : 10)
            .offset(page != undefined ? (page - 1) * size : 0)
            .where('category', '==', category)
            .where('keyword', 'array-contains', keyword)
            .get();
    }

    const data = new Array()
    if (querySnapshot.size > 0) {
        querySnapshot.docs.forEach(doc => {
            const temp = doc.data()
            delete temp.keyword
            data.push({ id: doc.id, ...temp })
        });
    }
    else {
        return response.badRequest('', `not found`, reply)
    }
    return response.ok(data, `Success`, reply);
}

module.exports = {
    getItems
}
