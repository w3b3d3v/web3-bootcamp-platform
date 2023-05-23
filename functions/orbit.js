const axios = require('axios');
require('dotenv').config();

const WORKSPACE_ID = process.env.ORBIT_WORKSPACE_ID;
const ORBIT_API_URL = `https://app.orbit.love/api/v1/${WORKSPACE_ID}/`;
const HEADERS = {
    Authorization: `Bearer ${process.env.ORBIT_API_KEY}`,
}


async function insertMember(member) {
    // should we add any tag to user?
    let user = formatMember(member);

    try {
        await axios.post(ORBIT_API_URL + "members", user, { headers: HEADERS });
        return true;
    }
    catch (err) {
        console.error("Error inserting member: ", err);
        return false;
    }
}

function formatMember(member) {
    const toInsert = {};
    const attributesToInclude = ['name', 'email', 'bio'];

    for (const attr of attributesToInclude) {
        if (member[attr]) {
            toInsert[attr] = member[attr];
        }
    }

    let user = {
        "member": toInsert,
    }
    return user;
}

module.exports = { insertMember }
