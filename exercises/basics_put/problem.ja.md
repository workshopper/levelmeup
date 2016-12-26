**`level`**をつかって、LevelDBのデータストアをオープンし、エントリを
**`put`**するモジュールを書きましょう。

３つの引数を取るNodeモジュールとしてプログラムを書いて下さい。

```javascript
module.exports = function (databaseDir, obj, callback) {
  // your code...
  callback(error)
}
```

第２引数にはオブジェクトが渡されます。オブジェクトのプロパティをそれぞれキーと値
としてlevelのデータストアに**put**して下さい。

プログラムの検証時には、更新されたデータストアの値とオブジェクトのプロパティが
比較されます。

---

## ヒント:

LevelUPの`put()`メソッドはとてもシンプルで、キーと値を渡すだけで使えます。
オプションでCallbackを渡すこともできます。Callbackを渡すことで、データの
コミットが完了したことを知ることが出来ます。あるいは、エラーをcatchすることが
出来ます。（CatchしなければErrorはthrowされてしまいます）

```javascript
var db = level('/path/to/db/')
db.put('foo', 'bar', function (err) {
  if (err) {
    return callback(error)
  }
})
```

全てのcallbackが終了すれば、あなたは`db.close()`も実行するかもしれません。
プログラムの実行が終了すればデータストアは自動的にクローズされるので、この
関数の実行はオプショナルです。オープンしたままのLevelDBのデータストアが
存在したとしても、あなたのプログラムが無限ループに陥ることはありません。

デバッグで`levelmeup run program.js`を使用しますが、その際に出力を見たい
場合はconsole.logではなく、console.errorを使用して下さい。
