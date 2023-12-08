#!/bin/zsh

installOrUpdateHomebrew() {
    which -s brew
    if [[ $? != 0 ]] ; then
        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
        echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> $HOME/.zprofile
        eval "$(/opt/homebrew/bin/brew shellenv)"
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
            local typeOfValue=$(yq eval ".\"$domain\".\"$key\" | type" "$defaultsFile")
            local valueAsString=$(yq eval ".\"$domain\".\"$key\"" "$defaultsFile")

            if [[ "$typeOfValue" == "!!str" ]]; then
                commands+=("defaults write $domain \"$key\" -string \"$valueAsString\"")

            elif [[ "$typeOfValue" == "!!int" ]]; then
                commands+=("defaults write $domain \"$key\" -int \"$valueAsString\"")

            elif [[ "$typeOfValue" == "!!float" ]]; then
                commands+=("defaults write $domain \"$key\" -float \"$valueAsString\"")

            elif [[ "$typeOfValue" == "!!bool" ]]; then
                commands+=("defaults write $domain \"$key\" -bool \"$valueAsString\"")

            elif [[ "$typeOfValue" == "!!map" ]]; then
                local subkeys=($(yq eval ".\"$domain\".\"$key\" | keys | .[]" "$defaultsFile"))
                local subkey_values=()

                for subkey in "${subkeys[@]}"; do
                    local subkey_value=$(yq eval ".\"$domain\".\"$key\".\"$subkey\"" "$defaultsFile")
                    subkey_values+=("$subkey" "$subkey_value")
                done

                local subkey_str=$(printf '"%s" "%s" ' "${subkey_values[@]}")

                commands+=("defaults write $domain \"$key\" -dict-add $subkey_str")
            fi
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
