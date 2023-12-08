# dotfiles
Original idea.

## Commands

Install all available macOS updates and restart:

    softwareupdate -iaR

Install Xcode Command Line Tools:

    xcode-select --install

Clone the repository in your home directory:

    git clone https://github.com/MergeCommits/dotfiles.git

Install/update the dotfiles, macOS defaults, Homebrew and its packages:

    ./install

Update everything

    topgrade

## Other commands

Run settings diff checker:

    sh extern-tools/apple-plist-differ.sh
