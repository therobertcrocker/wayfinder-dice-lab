#!/bin/bash
# Runs once inside the dev container after it's created.
# The shell prompt (zsh + Starship) comes from the dotfiles repo, not this script.
set -e

# Let git work in the bind-mounted repo.
git config --global --add safe.directory /workspaces/wayfinder-dice-lab

# zsh ships with this base image; install it only if it's missing.
# jq is used by the Claude Code SessionStart hook in .claude/settings.json.
if ! command -v zsh >/dev/null || ! command -v jq >/dev/null; then
  sudo apt-get update && sudo apt-get install -y zsh jq
fi

# Language server for Claude Code's TypeScript LSP plugin (it also covers .js).
npm install -g typescript-language-server typescript
