This is the master repository.

## Initial setup (Linux)

1. Install [NVM](https://github.com/nvm-sh/nvm#installing-and-updating)
2. Install NodeJS v20 through NVM: `nvm install v20`
3. Install Docker and docker-compose:
    * [docker](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04)
    * [docker-compose](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04)
4. Install NodeJS through NVM: `nvm install stable`
5. Run `yarn install`
6. Run `yarn start`

## Initial setup (Mac)

1. Ensure you have XCode, XCode command line developer tools and Homebrew installed:
    * [Homebrew](https://brew.sh/)
    * For command line tools run: `xcode-select --install`
2. Install [NVM](https://github.com/nvm-sh/nvm#installing-and-updating). WARNING: install script does not add required exports to your `~/.zshrc`, follow instructions from installation script carefully
3. Install [MKCERT](https://github.com/FiloSottile/mkcert). WARNING: install script does not add required exports to your `~/.zshrc`, follow instructions from installation script carefully
4. Install Docker and docker-compose:
   brew install colima
   brew install docker
   brew install docker-compose
5. Install NodeJS through NVM: `nvm install stable`
6. Run `yarn install`
7. Run `yarn start`

## Syncing commits back to source repos

1. Make sure you are on `master`
2. Run the `sync.sh` script


## Development Process

1. Create branch
2. Work in relevant sub-repos
3. Commit as you normally do
4. Create PR
5. Review as you normally do
6. Merge PR
7. Sync commits to sub-repos
