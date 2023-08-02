#!/bin/zsh

installOrUpdateHomebrew() {
    which -s brew
    if [[ $? != 0 ]] ; then
        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
        echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> $HOME/.zprofile
        eval "$(/opt/homebrew/bin/brew shellenv)"
    else
        brew update
        brew upgrade
    fi
    
    brew bundle
}

defaultEdits() {
    ### Globals
    defaults write NSGlobalDomain "AppleShowAllExtensions" -bool "true"
    defaults write NSGlobalDomain "com.apple.swipescrolldirection" -bool "false"
    defaults write NSGlobalDomain "NSAutomaticCapitalizationEnabled" -bool "false"
    defaults write NSGlobalDomain "NSAutomaticDashSubstitutionEnabled" -bool "false"
    defaults write NSGlobalDomain "NSAutomaticPeriodSubstitutionEnabled" -bool "false"
    defaults write NSGlobalDomain "NSAutomaticQuoteSubstitutionEnabled" -bool "false"
    defaults write NSGlobalDomain "NSAutomaticSpellingCorrectionEnabled" -bool "false"

    ### Finder
    defaults write com.apple.finder "ShowHardDrivesOnDesktop" -bool "false"
    defaults write com.apple.finder "AppleShowAllFiles" -bool "true"
    defaults write com.apple.finder "FXEnableExtensionChangeWarning" -bool "false"
    
    # When performing a search, search the current folder by default
    defaults write com.apple.finder "FXDefaultSearchScope" -string "SCcf"

    # Use column view in all Finder windows by default
    defaults write com.apple.finder "FXPreferredViewStyle" -string "clmv"

    killall Finder

    ### TextEdit
    defaults write com.apple.TextEdit "SmartQuotes" -int 0
    
    # Open TextEdit with Plain Text mode
    defaults write com.apple.TextEdit "RichText" -int 0

    ### Keyboard

    # Set Fn key to change the keyboard Input Source
    defaults write com.apple.HIToolbox "AppleFnUsageType" -int 1

    ### Restart preferences daemon
    killall cfprefsd
}

main() {
    installOrUpdateHomebrew
    defaultEdits
}

main
