#!/bin/bash
COHORT_ID=059yHPINjYRPu5cJGdLs
TEMPLATE=course_day
# SUBJECT="🎮 Crie seu própio NFT Game 👾"
# SUBJECT="🤓 Crie seu primeiro Smart Contract com Solidity"
SUBJECT="🤓 Construa seu primeiro projeto web3 usando JavaScript"
wget "http://localhost:5001/web3dev-bootcamp/us-central1/sendEmailToAllUsers?cohort_id=$COHORT_ID&template=$TEMPLATE&subject=$SUBJECT"
