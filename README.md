# GGET-CLI [![npm version](https://badge.fury.io/js/gget-cli.svg)](http://badge.fury.io/js/gget-cli) 

A set of CLI tools to reduce bolierplate task

## Install

```bash
npm install gget-cli -g
```

## GGET Usage

```bash
Usage: gget [options] <url>

Options:
  -d, --dest <dest>  destination path for clone git
  -D, --debug        display error
  -h, --help         output usage information
```
Example: apply boilerplate from git url to current directory

```
gget https://github.com/<username>/<repository>
```

Example: apply boilerplate from git url to a directory module_1

```
gget https://github.com/<username>/<repository> -d module_1
```

Example: apply boilerplate from git url shorthand to current directory

```
gget <username>/<repository>
```

Example: apply boilerplate from git url shorthand to a directory module_1

```
gget <username>/<repository> -d module_1
```

## GGIGNORE Usage
```
Usage: ggignore [options] <template>

Options:
  -f, --file <file>  output filename default to .gitignore
  -o, --override     override output file
  -D, --debug        display error
  -h, --help         output usage information
```

Example: apply node .gitignore template to .gitignore file and overwrite

```
ggignore node -f .gitignore -o
```

Example: apply scala .gitignore template to default .gitignore file without overwrite

```
ggignore scala
```

See templates here: https://github.com/github/gitignore