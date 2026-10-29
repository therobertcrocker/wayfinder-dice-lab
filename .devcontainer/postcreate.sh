#!/bin/bash
# Runs once inside the dev container after it's created.
# Shell setup mirrors gm-toolkit's dev container (zsh + Starship pastel powerline).
set -e

# Claude Code's config volume is created owned by root; hand it to the node user
# so `claude` can save your sign-in there.
sudo chown -R node:node /home/node/.claude

# Let git work in the bind-mounted repo.
git config --global --add safe.directory /workspaces/wayfinder-dice-lab

# zsh ships with this base image; install it only if it's missing.
# jq is used by the Claude Code SessionStart hook in .claude/settings.json.
if ! command -v zsh >/dev/null || ! command -v jq >/dev/null; then
  sudo apt-get update && sudo apt-get install -y zsh jq
fi

# Language server for Claude Code's TypeScript LSP plugin (it also covers .js).
npm install -g typescript-language-server typescript

# Install Starship
curl -sS https://starship.rs/install.sh | sudo sh -s -- --yes

# Configure Starship
mkdir -p ~/.config

# Apply pastel powerline preset
starship preset pastel-powerline -o ~/.config/starship.toml

# Add container module to starship config
sed -i 's/\$username\\/\$username\\\n\$container\\/' ~/.config/starship.toml

cat >> ~/.config/starship.toml << 'EOF'

[container]
disabled = false
style = "bg:#9A348E"
format = '[$symbol \[$name\] ]($style)'
EOF

# Set Starship as shell init
grep -q 'starship init zsh' ~/.zshrc 2>/dev/null || echo 'eval "$(starship init zsh)"' >> ~/.zshrc

# Set zsh as default shell
sudo chsh -s "$(which zsh)" node
