'use strict';
import jsYaml from 'js-yaml';

// yamlをコンパイル
export function compile(yaml) {

  if(!yaml) {
    return '';
  }

  // 渡されたyamlをobjectへ変換
  var object = jsYaml.load(yaml);

  // jsonに変換
  var json = JSON.stringify(object, null, '  ');

  // 変数として使用するものはダブルクオートを外す
  json = json.replace(/['"]Ti(.+?)['"]/gi, 'Ti$1');
  json = json.replace(/['"]Titanium(.+?)['"]/gi, 'Titanium$1');
  json = json.replace(/['"]Alloy(.+?)['"]/gi, 'Alloy$1');

  return json;
}
