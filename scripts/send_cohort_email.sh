#!/bin/bash
COHORT_ID=5HLP7Ttl6hmA5I5VRYHC
TEMPLATE=course_day
# SUBJECT="🎮 Crie seu própio NFT Game 👾"
SUBJECT="🤓 Crie seu primeiro Smart Contract com Solidity"
wget "http://localhost:5001/web3dev-bootcamp/us-central1/sendEmailToAllUsers?cohort_id=$COHORT_ID&template=$TEMPLATE&subject=$SUBJECT"
