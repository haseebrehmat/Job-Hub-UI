#!/bin/bash
# Remove old Node.js version
sudo apt-get remove nodejs
sudo apt-get remove npm

sudo rm -rf /usr/local/bin/npm
sudo rm -rf /usr/local/share/man/man1/node*
sudo rm -rf /usr/local/lib/dtrace/node.d
sudo rm -rf ~/.npm
sudo rm -rf ~/.node-gyp
sudo rm -rf /opt/local/bin/node
sudo rm -rf /opt/local/include/node
sudo rm -rf /opt/local/lib/node_modules

sudo rm -rf /usr/local/bin/node
sudo rm -rf /usr/local/include/node
sudo rm -rf /usr/local/lib/node_modules

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
