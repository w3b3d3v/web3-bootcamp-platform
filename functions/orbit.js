const axios = require('axios');
require('dotenv').config();

const ORBIT_API_URL = `https://app.orbit.love/api/v1/` + process.env.ORBIT_WORKSPACE_ID + `/`;
const HEADERS = {
    Authorization: `Bearer ${process.env.ORBIT_API_KEY}`,
}

function getActivity(activityName) {
    listedActivities = {
        "buildSubscription": {
            "activity_type": "buildSubscription",
            "tags": ["subscription"],
            "title": "Build Subscription",
            "description": "Build Subscription",
            "link": "https://bootcamp.web3dev.com.br/",
            "weight": 1,
        }
    }
}

async function createActivity(member, activity) {
    try {
        let response = await axios.post(ORBIT_API_URL + "activities", activity, { headers: HEADERS });
        return response.data.data;
    }
    catch(error) {
        console.error("Error creating activity: ", error);
        return null;
    }
}

async function insertMember(user, entity_name) {
    let buildMember = formatUserToMember(user, entity_name);
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
        return false;
    }
}

async function updateMemberIdentity(user, member_slug, entity_name) {
    try {
        let formatedIdentity = formatIdentity(user, entity_name);
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

function formatIdentity(user, entity_name) {
    let identities = {
        "web3devBuilds": {
            "name": "Web3dev",
            "source": "web3devBuild",
            "source_host": "bootcamp.web3dev.com.br",
            "username": user.username || user.email?.split("@")[0],
            "uid": user.id,
        },
        "forem": {
            "name": "Forem",
            "source": "forem",
            "source_host": "web3dev.com.br",
            "username": user.username || user.email?.split("@")[0],
            "uid": user.id,
        },
    }
    return identities[entity_name];
}

function formatUserToMember(member, entity_name) {
    let identity = formatIdentity(member, entity_name);
    return {
        "member": {
            "name": member.username || member.email?.split("@")[0],
            "email": member.email,
        },
        identity
    }
}

module.exports = { insertMember, findMemberByEmail, updateMemberIdentity }
