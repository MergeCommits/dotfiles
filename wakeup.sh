#!/bin/zsh

installOrUpdateHomebrew() {
    which brew > /dev/null 2>&1
    if [ $? -eq 1 ]; then
        xcode-select --install
        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    else
        brew update
    fi
}

installOrUpdateOhMyZsh() {
    OMZDIR="$HOME/.oh-my-zsh"
    if [ ! -d "$OMZDIR" ]; then
        sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
    else
        upgrade_oh_my_zsh
    fi
}
