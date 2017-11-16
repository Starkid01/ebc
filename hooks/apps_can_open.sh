#!/bin/bash

if [[ ! -f /usr/libexec/PlistBuddy ]]; then
    exit 0
fi

PLIST=platforms/ios/*/*-Info.plist

# Bypass ATS for test servers
cat << EOF |
Delete :LSApplicationQueriesSchemes
Add :LSApplicationQueriesSchemes array
Add :LSApplicationQueriesSchemes:0 string 'fb'
Add :LSApplicationQueriesSchemes:1 string 'twitter'
Add :LSApplicationQueriesSchemes:2 string 'instagram'
EOF
while read line
do
    /usr/libexec/PlistBuddy -c "$line" $PLIST
done