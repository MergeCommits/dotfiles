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

Copy "x_layout" to system folder, **requires restart**

    cp settings/keyboard/x_layout.keylayout ~/Library/Keyboard\ Layouts/x_layout.keylayout

Add "x_layout"

-  System Preferences -> Keyboard -> Text Input
-  Click "Edit..."
-  Click "+"
-  Select "Others"
-  Select "x_layout" then click "Add"
-  Click "All Input Sources"
-  Disable "Show Input Menu in menu bar"

Setup Karabiner to only modify Dygma keyboard events

-  Karabiner Elements -> Devices -> Raise (Dygma) -> Enable "Modify events"
-  Apple Internal Keyboard -> Disable "Modify events"

Setup Dygma keyboard modifiers

-  System Preferences -> Keyboard -> Keyboard Shortcuts... -> Modifier Keys
-  Swap assignment of Command and Control keys for both "Raise" and "Karabiner VirtualHIDKeyboard"

## Other commands

Run settings diff checker (does not work in home directory, copy `extern-tools/apple-plist-differ.sh` to folder on Desktop):

    sh apple-plist-differ.sh
