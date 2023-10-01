async function assignmentsHandler(req, res) {
    console.log('assignments handler')
}

async function getHandler(req, res) {
    console.log('assignments get handler')
}
async function putHandler(req, res) {
    console.log('assignments put handler')
}
async function postHandler(req, res) {
    console.log('assignments post handler')
}
async function deleteHandler(req, res) {
    console.log('assignments delete handler')
}


module.exports = {
    assignmentsHandler: assignmentsHandler,
    getHandler: getHandler,
    putHandler: putHandler,
    postHandler: postHandler,
    deleteHandler: deleteHandler,
}