#!/bin/zsh

installOrUpdateHomebrew() {
    which -s brew
    if [[ $? != 0 ]] ; then
        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
        echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> $HOME/.zprofile
        eval "$(/opt/homebrew/bin/brew shellenv)"
    else
        brew update
    fi
    
    brew bundle
}

textEditSettings() {
    # Open TextEdit with Plain Text mode
    defaults write com.apple.TextEdit "RichText" -int 0
    # Disable smart quotes
    defaults write com.apple.TextEdit "SmartQuotes" -int 0
}

systemSettings() {
    defaults write com.apple.finder "ShowHardDrivesOnDesktop" -bool "false"
    defaults write com.apple.finder "AppleShowAllFiles" -bool "true"
    defaults write NSGlobalDomain "AppleShowAllExtensions" -bool "true"
    
    # When performing a search, search the current folder by default
    defaults write com.apple.finder "FXDefaultSearchScope" -string "SCcf"

    # Disable the warning when changing a file extension
    defaults write com.apple.finder "FXEnableExtensionChangeWarning" -bool "false"

    # Use column view in all Finder windows by default
    defaults write com.apple.finder "FXPreferredViewStyle" -string "clmv"

    defaults write NSGlobalDomain "com.apple.swipescrolldirection" -bool "false"

    # Disable automatic capitalization
    defaults write NSGlobalDomain "NSAutomaticCapitalizationEnabled" -bool "false"

    # Disable smart dashes
    defaults write NSGlobalDomain "NSAutomaticDashSubstitutionEnabled" -bool "false"

    # Disable automatic period substitution
    defaults write NSGlobalDomain "NSAutomaticPeriodSubstitutionEnabled" -bool "false"

    # Disable smart quotes
    defaults write NSGlobalDomain "NSAutomaticQuoteSubstitutionEnabled" -bool "false"

    # Disable auto-correct
    defaults write NSGlobalDomain "NSAutomaticSpellingCorrectionEnabled" -bool "false"

    # Set Fn key to change the keyboard Input Source
    defaults write com.apple.HIToolbox "AppleFnUsageType" -int 1

    killall Finder
}

copyFiles() {
    cp -f ./settings/files/US\ No\ Symbols.keylayout ~/Library/Keyboard\ Layouts/
}

main() {
    installOrUpdateHomebrew
    textEditSettings
    systemSettings
    copyFiles
}

main
