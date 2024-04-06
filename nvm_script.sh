#!/bin/bash
# Remove old Node.js version
sudo apt-get remove nodejs

# Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

# Install Yarn
npm install -g yarn

# Install Node.js
nvm install 18.12.1
nvm use 18.12.1
