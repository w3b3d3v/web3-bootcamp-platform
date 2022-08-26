#!/bin/bash
COHORT_ID=iWzxss5FWNxlBf2I4UNx
TEMPLATE=course_day
SUBJECT="🎮Crie seu própio NFT Game 👾"
wget "http://localhost:5001/web3dev-bootcamp/us-central1/sendEmailToAllUsers?cohort_id=$COHORT_ID&template=$TEMPLATE&subject=$SUBJECT"
