#!/bin/zsh

installOrUpdateHomebrew() {
    which brew > /dev/null 2>&1
    if [ $? -eq 1 ]; then
        xcode-select --install # Assume XCode command line tools are not installed.
        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    else
        brew update
    fi
    
    brew bundle
}

installOrUpdateOhMyZsh() {
    OMZDIR="$HOME/.oh-my-zsh"
    if [ ! -d "$OMZDIR" ]; then
        sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
    else
        upgrade_oh_my_zsh
    fi
}

textEditSettings() {
    # Open TextEdit with Plain Text mode
    defaults write com.apple.TextEdit RichText -int 0
    # Disable smart quotes
    defaults write com.apple.TextEdit SmartQuotes -int 0
}

systemSettings() {
    defaults write com.apple.screensaver askForPassword -int 1
    defaults write com.apple.screensaver askForPasswordDelay -int 600
    
    # Use list view in all Finder windows by default
    defaults write com.apple.finder FXPreferredViewStyle -string "Nlsv"
}

main() {
    installOrUpdateHomebrew()
    installOrUpdateOhMyZsh()
    textEditSettings()
    systemSettings()
}

main()
