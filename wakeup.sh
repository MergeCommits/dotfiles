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

setMacOSDefaults() {
    local defaultsFile="dots/defaults.yml"
    local domains=($(yq eval 'keys | .[]' $defaultsFile))
    local commands=()

    for domain in $domains; do
        local keys=($(yq eval ".\"$domain\" | keys | .[]" $defaultsFile))
 
        for key in $keys; do
            local value=$(yq eval ".\"$domain\".\"$key\"" $defaultsFile)
            local type="string"

            if [[ "$value" == "true" || "$value" == "false" ]]; then
                type="bool"
            elif [[ "$value" =~ ^[0-9]+(\.[0-9]+)?$ ]]; then
                type="float"
            fi

            commands+=("defaults write $domain \"$key\" -$type \"$value\"")
        done
    done

    if [[ "$1" == "--debug-defaults" ]]; then
        printf '%s\n' "${commands[@]}"
    else
        for command in "${commands[@]}"; do
            eval "$command"
        done

        killall Finder
        killall Dock
        killall cfprefsd
    fi
}

main() {
    if [[ "$1" == "--debug-defaults" ]]; then
        echo "Debugging macOS defaults..."
    else
        installOrUpdateHomebrew
        echo "Setting macOS defaults..."
    fi
    setMacOSDefaults $1
}

main $1
