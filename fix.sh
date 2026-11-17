#!/bin/sh

git filter-branch --force --env-filter '
    export GIT_COMMITTER_NAME="Heidarabdi"
    export GIT_COMMITTER_EMAIL="xeydarcabdi3@gmail.com"
    export GIT_AUTHOR_NAME="Heidarabdi"
    export GIT_AUTHOR_EMAIL="xeydarcabdi3@gmail.com"
' --tag-name-filter cat -- --branches --tags