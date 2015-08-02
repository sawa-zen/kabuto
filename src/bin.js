#!/usr/bin/env node
'use strict';

/**
 * CLI
 */
import fs from 'fs';
import program from 'commander';
import * as kabuto from '../';

// commanderの設定
program
  .version('0.1.0') // コマンドバージョン指定
  .usage('<path> [options]')
  .option('-f, --file <path>', 'Parse a file')
  .option('-d, --dir <path>', 'Parse some files');

// commander実行
program.parse(process.argv);

// 第一引数の確認
var target = process.argv[2];
try {
  fs.statSync(target);
} catch(e) {
  throw new Error('no yaml.');
}

// 単一ファイルの場合
var outFile = program.file;
if(outFile) {
  console.info('--file');
  console.info(kabuto.compile(''));
  try {
    fs.statSync('');
    console.info('file found!');
  } catch(e) {
    throw new Error('no file');
  }
}
