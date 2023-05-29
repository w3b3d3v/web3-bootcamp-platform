const axios = require('axios');
require('dotenv').config();

const WORKSPACE_ID = process.env.ORBIT_WORKSPACE_ID;
const ORBIT_API_URL = `https://app.orbit.love/api/v1/${WORKSPACE_ID}/`;
const HEADERS = {
    Authorization: `Bearer ${process.env.ORBIT_API_KEY}`,
}

async function insertMember(user) {
    let buildMember = formatUserToMember(user);

    try {
        await axios.post(ORBIT_API_URL + "members", buildMember, { headers: HEADERS });
        return true;
    }
    catch (err) {
        console.error("Error inserting member: ", err);
        return false;
    }
}

async function findMemberByEmail(email) {
    try {
        let response = await axios.get(ORBIT_API_URL + "members/find?source=email&email=" + email, { headers: HEADERS });
        return response.data.data;
    }
    catch(error) {
        console.error("Error finding member: ", error);
        return null;
    }
}

async function updateMemberIdentity(user, member_slug) {
    try {
        let formatedIdentity = formatIdentity(user);
        let response = await axios.post(
            ORBIT_API_URL + `members/${member_slug}/identities`, formatedIdentity, { headers: HEADERS }
        );
        return response.data.data;
    }
    catch(error) {
        console.error("Error updating member identity: ", error);
        return null;
    }
}

function formatIdentity(user) {
    return {
        "name": "Web3dev",
        "source": "web3devBuild",
        "source_host": "https://bootcamp.web3dev.com.br/",
        "username": user.username,
        "uid": user.id,
        "email": user.email,
    }
}

function formatUserToMember(member) {
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

module.exports = { insertMember, findMemberByEmail, updateMemberIdentity }
