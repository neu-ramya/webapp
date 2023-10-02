const assignmentModel = require('../models/assignment');

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
    // console.log('assignments post handler')
    // console.log(req.body);
    // await assignmentModel.create(req.body);
    await insertHandler(req, res)
}

async function deleteHandler(req, res) {
    console.log('assignments delete handler')
}


async function insertHandler(req, res) {
    const requiredKeys = ['name', 'points', 'num_of_attempts','deadline']; // Replace with your actual required keys
    const missingKeys = [];
    requiredKeys.forEach((key) => {
        if (!(key in req.body)) {
            missingKeys.push(key);
        }
    });

    if (missingKeys.length > 0) {
        return res.status(400).json({ error: `Missing required keys: ${missingKeys.join(', ')}` });
    }

    try {
        await assignmentModel.create(req.body);
        return res.status(200).json({ message: 'Assignment created successfully' });
    } catch (error) {
        console.error('Error creating assignment:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}


module.exports = {
    assignmentsHandler: assignmentsHandler,
    getHandler: getHandler,
    putHandler: putHandler,
    postHandler: postHandler,
    deleteHandler: deleteHandler,
}