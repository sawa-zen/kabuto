#!/usr/bin/env node
'use strict';
import program from 'commander';
import * as kabuto from '../';

var demo = [
  '.hoge:',
  '  width: Ti.UI.FILL'
].join('\n');

console.info(kabuto.compile(demo));

// commanderの設定
program
  .version('0.1.0') // コマンドバージョン指定
  .usage('<path> [options]')
  .option('-f, --file <path>', 'Parse a file')
  .option('-d, --dir <path>', 'Parse some files');

// commander実行
program.parse(process.argv);
