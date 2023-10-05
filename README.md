# dotfiles
Original idea.

## Commands

Install all available macOS updates:

    softwareupdate -ia

Install Xcode Command Line Tools:

    xcode-select --install

Clone the repository in your home directory:

    git clone https://github.com/MergeCommits/dotfiles.git

Install/update the dotfiles, macOS defaults, Homebrew and its packages:

    ./install

## Other commands

Run settings diff checker (does not work in home directory, copy `extern-tools/apple-plist-differ.sh` to folder on Desktop):

    sh apple-plist-differ.sh
