{
  //--------------------//
  // BUNDLE IDENTIFIERS //
  //--------------------//
  // bundle identifiers for terminal emulator applications
  terminalEmulators: [
    // Alacritty
    '^io\\.alacritty$',
    // Hyper
    '^co\\.zeit\\.hyper$',
    // iTerm2
    '^com\\.googlecode\\.iterm2$',
    // Terminal
    '^com\\.apple\\.Terminal$',
  ],

  // bundle identifiers for web browser applications
  webBrowsers: [
    // Google Chrome
    '^com\\.google\\.chrome$',
    // Mozilla Firefox
    '^org\\.mozilla\\.firefox$',
  ],

  // since this combination is used so much, it's given its own identifier
  standard:
    $.terminalEmulators +
    [],  // unnecessary, but it allows the '$.foo +'-style for the preceeding lines, which makes my OCD happy
}
