#!/bin/bash

firebase use dev
gcloud firestore export gs://web3dev-development.appspot.com/firestore-bkp

gsutil -m cp -r gs://web3dev-development.appspot.com/firestore-bkp /tmp/
firebase emulators:start --import /tmp/firestore-bkp
