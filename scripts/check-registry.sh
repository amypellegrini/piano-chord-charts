#!/usr/bin/env bash
# Registry guard: keep private package-registry details out of this repository.
#
# Fails when:
#   1. a package-lock.json resolves any package from somewhere other than
#      https://registry.npmjs.org/, a GitHub git URL, or a local file: path
#   2. an .npmrc sets anything other than registry=https://registry.npmjs.org/
#   3. (hooks only) a staged change matches a pattern in the local, untracked
#      deny-list at ${GIT_DENYLIST:-$HOME/.config/git/denylist}
#      (one extended regex per line, matched case-insensitively; # comments)
#
# Usage:
#   scripts/check-registry.sh            check every tracked file (CI)
#   scripts/check-registry.sh --staged   check the staged version of files (pre-commit)
#   scripts/check-registry.sh --message <file>   check a commit message (commit-msg)
set -euo pipefail

mode="${1:-all}"
allowed='https://registry.npmjs.org/'
status=0

list_files() {
  if [ "$mode" = "--message" ]; then
    return 0 # only the deny-list applies to a commit message
  elif [ "$mode" = "--staged" ]; then
    git diff --cached --name-only --diff-filter=ACMR
  else
    git ls-files
  fi
}

read_file() {
  if [ "$mode" = "--staged" ]; then git show ":$1"; else cat "$1"; fi
}

while IFS= read -r f; do
  [ -n "$f" ] || continue
  case "$f" in
    package-lock.json | */package-lock.json)
      bad=$(read_file "$f" | grep -oE '"resolved": *"[^"]*"' |
        grep -vE '"resolved": *"(https://registry\.npmjs\.org/|git\+(ssh://git@|https://)github\.com/|file:)' || true)
      if [ -n "$bad" ]; then
        echo "registry guard: $f resolves packages outside $allowed:" >&2
        printf '%s\n' "$bad" | sed 's/^/  /' | head -5 >&2
        echo "  Regenerate it with: npm install --registry=$allowed" >&2
        status=1
      fi
      ;;
    .npmrc | */.npmrc)
      bad=$(read_file "$f" | grep -vE '^[[:space:]]*(#.*)?$' | grep -vxF "registry=$allowed" || true)
      if [ -n "$bad" ]; then
        echo "registry guard: $f may only contain registry=$allowed" >&2
        status=1
      fi
      ;;
  esac
done < <(list_files)

denylist="${GIT_DENYLIST:-$HOME/.config/git/denylist}"
if [ "$mode" != "all" ] && [ -f "$denylist" ]; then
  patterns=$(grep -vE '^[[:space:]]*(#.*)?$' "$denylist" || true)
  if [ -n "$patterns" ]; then
    if [ "$mode" = "--message" ]; then
      text=$(grep -v "^#" "$2" || true)
      what="the commit message"
    else
      text=$(git diff --cached -U0 --no-color | grep -E '^\+' || true)
      what="staged changes"
    fi
    hits=$(printf '%s\n' "$text" | grep -iEf <(printf '%s\n' "$patterns") || true)
    if [ -n "$hits" ]; then
      echo "registry guard: deny-listed text found in $what ($denylist):" >&2
      printf '%s\n' "$hits" | cut -c1-160 | head -5 | sed 's/^/  /' >&2
      status=1
    fi
  fi
fi

exit "$status"
