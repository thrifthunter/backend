let response = require('../response');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = require('../firestorecred.json')
initializeApp({
    credential: cert(serviceAccount)
});

const db = getFirestore();

async function getItems(request, reply) {
    let querySnapshot
    const { page, size, keyword, category } = request.query
    const newKeyword = keyword?.toLowerCase()
    const keywordArray = newKeyword?.split(' ');
    const query = db.collection('items');
    if (keyword == undefined || keyword == '' && category == undefined || category == '') {
        querySnapshot = await query
            .limit(size != undefined ? size : 10)
            .offset(page != undefined ? (page - 1) * size : 0)
            .get();
    } else if (keyword == undefined || keyword == '') {
        querySnapshot = await query
            .limit(size != undefined ? size : 10)
            .offset(page != undefined ? (page - 1) * size : 0)
            .where('category', '==', category)
            .get();
    } else if (category == undefined || category == '') {
        querySnapshot = await query
            .limit(size != undefined ? size : 10)
            .offset(page != undefined ? (page - 1) * size : 0)
            .where('keyword', 'array-contains-any', keywordArray)
            .get();
    } else {
        console.log('here')
        querySnapshot = await query
            .limit(size != undefined ? size : 10)
            .offset(page != undefined ? (page - 1) * size : 0)
            .where('category', '==', category)
            .where('keyword', 'array-contains-any', keywordArray)
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

async function getItemById(request, reply) {
    const id = request.params.id
    const query = db.collection('items').doc(id);
    const doc = await query.get();
    if (!doc.exists) {
        return response.badRequest('', `not found`, reply)
    } else {
        tempData = doc.data();
        delete tempData.keyword
        data = tempData
    }

    return response.ok(data, `Success`, reply);
}

module.exports = {
    getItems,
    getItemById
}
