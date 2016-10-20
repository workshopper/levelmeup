**`level`**ディレクトリを開いて、そこからキーを読みだすプログラムを作りましょう。

３つの引数を取るNodeモジュールとしてプログラムを書いて下さい。

```javascript
module.exports = function (databaseDir, key, callback) {
  // your code...
  callback(error, value)
}
```

`database_dir`は`leveldb`のデータを持ったディレクトリです。あなたの作るプログラムは
`key`の値を取り出し、その値をcallbackに渡してください。

_注意: キーの値を返す前に、データベースをクローズする必要があります！_

---

## ヒント

**`level`**パッケージはNodeフレンドリな **`levelup`**と、低レベルな
LevelDBバインディングである**`leveldown`**の両方を含んでいます。

LevelとLevelUPについての詳しい情報はここを読んで下さい。: http://npmjs.com/levelup

オフラインで参照する場合は、あなたのPCの以下のパスを参照して下さい。

    {rootdir}/docs/levelup.html

このエクササイズを始めるために、 `npm install level`を実行する必要があります。

もしインターネットに接続されていないのであれば、`node_modules`ディレクトリを作成し、
そこに以下のディレクトリをコピーして下さい。

    {rootdir}/node_modules/level/

`level()`をディレクトリのパスを指定して実行することで、既存のデータベースを開く、
あるいは新たにデータベースを作ることが出来ます。この関数は_LevelUP_インスタンスを
新たに作成し、返します。

全てのLevelUPメソッドは非同期です。データストアから値を取得するときは、`.get(key, callback)`
メソッドを使用して下さい。

```javascript
var level = require('level')
var db = level('/path/to/db/')
db.get('foo', function (err, value) {
  console.log('foo =', value)
})
```
