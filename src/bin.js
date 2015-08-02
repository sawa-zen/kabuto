#!/usr/bin/env node
'use strict';

/**
 * CLI
 */
import fs from 'fs';
import path from 'path';
import _ from 'lodash';
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
  throw new Error('no target file.');
}


// yamlファイルかどうか
function isYamlFile(filePath) {
  var ext = path.extname(filePath);
  if(ext !== '.yml' && ext !== '.yaml') {
    return false;
  }
  return true;
}


// tssファイルかどうか
function isTssFile(filePath) {
  var ext = path.extname(filePath);
  if(ext !== '.tss') {
    return false;
  }
  return true;
}


// 変換してファイルを出力
function compile(targetPath, outPath) {
  var yaml = fs.readFileSync(targetPath);
  var tss = kabuto.compile(yaml);
  fs.writeFileSync(outPath, tss);
  console.info('compiled: ' + target + ' > ' + outPath);
}


// 単一ファイルのコンパイル
function compileOneFile() {
  var outPath = program.file;
  // 対象ファイルの拡張子がyamlでもymlでもなければエラーを返す
  if(!isYamlFile(target)) {
    throw new Error('no yamlFile');
  }
  // 出力先の拡張子がtssでなければエラーを返す
  if(!isTssFile(outPath)) {
    throw new Error('require tss path');
  }
  // yamlをコンパイル
  compile(target, outPath);
}

// ディレクトリ単位のコンパイル
function compileDirectory() {
  var outDirPath = program.dir;
  var fileList = fs.readdirSync(target);
  _.each(fileList, (val) => {
    // yamlファイルでなければ無視
    if(!isYamlFile(val)) {
      return;
    }
    var targetPath = path.join(target, val);
    var outPath = path.join(outDirPath, val.replace(/\.yml/, '.tss'));
    compile(targetPath, outPath);
  });
}

// optionで分岐
if(program.file) {
  // 単一yamlファイルのコンパイル
  compileOneFile();
} else if(program.dir) {
  // ディレクトリ単位のコンパイル
  compileDirectory();
} else {
  throw new Error('require option');
}
