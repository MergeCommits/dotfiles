local bundle = import 'bundle.libsonnet';

{
  //-----------//
  // FUNCTIONS //
  //-----------//

  // rule
  //
  // description (string, required)
  //   description of a rule, should be '<key> (<modifier1>+...+<modifierN>) [<specialNotes>]'
  //
  // input (object, required)
  //   input object for a rule; use input()
  //
  // output (object, required)
  //   output object for a rule; use outputKey() or outputShell()
  //
  // condition (object, optional)
  //   condition for a trigger; use condition()
  rule(description, input, output, condition=null):: {
    description: description,
    manipulators: [
      {
        from: input,
        [output.to_type]: [
          output.output,
        ],
        [if condition != null then 'conditions']: [
          condition,
        ],
        type: 'basic',
      },
    ],
  },

  ruleSwapControlModifierToCommand(input):: 
    self.rule(std.asciiUpper(input) + ' (Ctrl)',
           self.input(input, ['control']),
           self.outputKey(input, ['command']),
           self.condition('unless', bundle.standard)),

  doubleTapAction(description, variableName, input, output, outputOnDoubleTap):: {
    description: description,
    manipulators: [
    {
        type: "basic",
        conditions: [
            {
                "type": "variable_if",
                "name": variableName,
                "value": 1
            }
        ],
        "from": input,
        [outputOnDoubleTap.to_type]: [
            outputOnDoubleTap.output,
            {
                "set_variable": {
                    "name": variableName,
                    "value": 0
                }
            }
        ],
    },
    {
        "type": "basic",
        "from": input,
        "to": [
            output.output,
            {
                "set_variable": {
                    "name": variableName,
                    "value": 1
                }
            }
        ],
        "to_delayed_action": {
            "to_if_invoked": [
                {
                    "set_variable": {
                        "name": variableName,
                        "value": 0
                    }
                }
            ]
        }
    }
]
  },

  // input
  //
  // key (string, required)
  //   key that will trigger a rule
  //
  // modifiers (array, optional)
  //   modifiers that, when combined with <key>, trigger a rule
  //
  // key_is_modifier (boolean, optional)
  //   removes entire 'modifiers' object; only use when <key> is a modifier itself
  input(key, modifiers=null, key_is_modifier=false, noOptional=false):: {
    key_code: key,
    [if key_is_modifier then null else 'modifiers']: {
      [if modifiers != null then 'mandatory']: modifiers,
      [if noOptional then null else 'optional']: ['any'],
    },
  },

  // outputKey
  //
  // key (string, required)
  //   key to output when a rule is triggered
  //
  // modifiers (array, optional)
  //   modifiers to add to the key when a rule is triggered
  //
  // output_type (string, optional)
  //   type of 'to' object; should normally be left alone
  outputKey(key, modifiers=null, output_type='to'):: {
    to_type: output_type,
    output: {
      key_code: key,
      [if modifiers != null then 'modifiers']: modifiers,
    },
  },

  // outputShell
  //
  // command (string, required)
  //   the command to run when a rule is triggered
  outputShell(command):: {
    to_type: 'to',
    output: {
      shell_command: command,
    },
  },

  // condition
  //
  // type (string, required)
  //   the 'frontmost_application' type to use. common values are 'if' or 'unless'
  //
  // bundles (array, required)
  //   bundle identifiers of applications
  condition(type, bundles):: {
    type: 'frontmost_application_' + type,
    bundle_identifiers: bundles,
  },

  // runDockedApp
  //
  // number (string, required)
  //   the number of the docked app to run (zero-indexed)
  //   note that the list of apps does not include Finder, which is permanently
  //   pinned to the dock as the first item
  runDockedApp(number):: {
    to_type: 'to',
    output: {
      shell_command: "open -b $(/usr/libexec/PlistBuddy -c 'print :persistent-apps:" + number + ":tile-data:bundle-identifier' ~/Library/Preferences/com.apple.dock.plist)",
    },
  },
}
