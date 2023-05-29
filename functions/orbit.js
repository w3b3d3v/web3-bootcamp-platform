const axios = require('axios');
require('dotenv').config();

const WORKSPACE_ID = process.env.ORBIT_WORKSPACE_ID;
const ORBIT_API_URL = `https://app.orbit.love/api/v1/${WORKSPACE_ID}/`;
const HEADERS = {
    Authorization: `Bearer ${process.env.ORBIT_API_KEY}`,
}

async function insertMember(member) {
    let buildMember = formatMember(member);

    try {
        await axios.post(ORBIT_API_URL + "members", buildMember, { headers: HEADERS });
        return true;
    }
    catch (err) {
        console.error("Error inserting member: ", err);
        return false;
    }
}

function formatMember(member) {
    return {
        "member": {
            "name": member.username,
            "email": member.email,
        },
        "identity": {
            "name": "Web3dev",
            "source": "web3devBuild",
            "source_host": "https://bootcamp.web3dev.com.br/",
            "username": member.username,
            "uid": member.id,
            "email": member.email,
        }
    }
}

module.exports = { insertMember }
