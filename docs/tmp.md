# Commands and their options


```
codespace v1.0.0

  A tool to help you create, manage, and launch vscode workspaces. 

Options

  -h, --help       Display this usage guide. Each command has it's own help option if you want   
                   to know more about a given command.                                           
  -v, --version    Display only the version number                                               

Commands

  new   TODO... 
  add   TODO...
```

## new

Path leading up to file with be created if it doesn't exist.

## add

```
codespace add
```

If you don't have a config file, one will be auto-created for you after running this command. If a `.config` directory is present in your home directory, then `$HOME/.config/codespace/config.json` will be created; otherwise, `$HOME/.codespace/config.json` will be created.

You will be prompted for the root directory which houses your workspaces unless you have thee `rootDir` setting in your `config.json`, or you provide an arg with `-r` (args trump config):

```
codespace add -r ~/workspaces
```

You will be prompted for the name of the workspace to create

root directory which houses your workspaces unless you have thee `rootDir` setting in your `config.json`, or you provide an arg with `-r` (args trump config):

## open

```
codespace open <path-to-workspace-file>
```

If no path is given, then a list is shown and user can select. This list is effected by use of `add` / `open` / `remove`. Before showing the list, each entry is checked to exist first (i.e. checked to see if it's a JSON file and that it has a `folders` property). If this check passes, it is included in the list displayed; otherwise, it isn't.

