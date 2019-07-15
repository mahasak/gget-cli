#!/usr/bin/env node

const chalk = require('chalk');
const command = require('commander');
const figlet = require('figlet');
const fs = require('fs-extra');
const git = require('simple-git/promise');
const isUrl = require('is-url');
const log = console.log;
const ora = require('ora');
const path = require('path');
const touch = require('touch');
const urlExists = require('url-exists');
const GithubContent = require('github-content');

main = () => {
    var options = {
        owner: 'github',
        repo: 'gitignore',
        branch: 'master' // defaults to master
      };
      
      var gc = new GithubContent(options);

      gc.file('Node.gitignore', function(err, file) {
        if (err) return console.log(err);
        console.log(file.path);
        console.log(file.contents.toString());
      });
}

main();