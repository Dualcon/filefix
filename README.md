# filefix
Want your files organized? Filefix can do that lightly for you.

## What is filefix?
filefix is a npm module which can helps you organizing your files, labeling them.

## Installation
1.  Download and install [node.js](https://nodejs.org/).
2.  On your console install the filefix module
    $ npm install filefix -g
    
    ## Usage
Usage: filefix [options] [command]

Commands:
add      Adds a specific tag to the file name.
remove   Removes a specific tag from the file name.

Options:
-h, --help                         output usage information
-V, --version                      output the version number
-p, --path <path>                  Path to the files directory.
-t, --tag <tag>                    Tag to add into the file name.
-l, --localization <localization>  Tag's localization [left, right].

## Examples
$filefix add -p . -t ' [tag]' -l right
Output: input [tag].txt

$filefix remove -p . -t ' [tag]'
Output: input.txt
