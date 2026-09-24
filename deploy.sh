#!/usr/bin/env bash
# Pulls the latest commit for DEPLOY_BRANCH (from .env) and (re)builds the stack in place.
# Run from inside a checkout directory — ~/apps/envista-production (DEPLOY_BRANCH=production) or
# ~/apps/envista-staging (DEPLOY_BRANCH=staging). Same script for both; the only difference
# between environments is which directory/branch/.env you're sitting in.
#
# Reads DEPLOY_BRANCH from .env rather than inferring it from the checkout's current branch,
# so a renamed deploy branch can't silently keep deploying the old one.
#
# Used by .github/workflows/deploy-*.yml over SSH, and safe to run by hand for the same effect.
set -euo pipefail

if [ ! -f .env ]; then
  echo "No .env in $(pwd) — see DEPLOYMENT.md before running this." >&2
  exit 1
fi

DEPLOY_BRANCH=$(grep -m1 '^DEPLOY_BRANCH=' .env | cut -d= -f2-)
if [ -z "$DEPLOY_BRANCH" ]; then
  echo "No DEPLOY_BRANCH in $(pwd)/.env — see DEPLOYMENT.md." >&2
  exit 1
fi

# The site's images/logos are stored in Git LFS. Without git-lfs on this host the checkout
# would contain tiny text pointers instead of the real files (the Dockerfile refuses to build
# in that case, but fail here with a clearer message).
if ! git lfs version >/dev/null 2>&1; then
  echo "git-lfs is not installed on this host. Run once:  sudo apt install -y git-lfs && git lfs install" >&2
  exit 1
fi

git fetch origin
git checkout -B "$DEPLOY_BRANCH" "origin/$DEPLOY_BRANCH"
git lfs pull

docker compose up -d --build

# Drop images/layers no longer referenced by any container — keeps a long-lived VM from
# quietly filling its disk with every previous build.
docker image prune -f
