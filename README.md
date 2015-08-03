# kabuto

yamlをtss形式に変換するnpmモジュール


## Description

Titanium Mobile の Alloy アプリを作る際に yaml で tss を書きたくなったので、
それ用の npm モジュールを作りました。


## Install

```
$ npm install kabuto
```

## Usage

一つの yaml ファイルの変換

```
$ kabuto hoge.yaml --file hoge.tss
```

ディレクトリ単位での変換

```
$ kabuto src --dir dist
```

## Author

[@sawa-zen](https://github.com/sawa-zen)
