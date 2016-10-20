**`level`**をつかって、LevelDBのデータストアをオープンするモジュールを書きましょう。

３つの引数を取るNodeモジュールとしてプログラムを書いて下さい。

```javascript
module.exports = function (databaseDir, obj, callback) {
  // your code...
  callback(error)
}
```

第２引数にはオブジェクトが渡されます。オブジェクトのプロパティをそれぞれキーと値
としてlevelのデータストアに**put**して下さい。

後でデータストアの値を読みだし、引数として渡したオブジェクトのプロパティと比較する
ことであなたのプログラムは検証されます。

---

## ヒント:

LevelUPの`put()`メソッドはとてもシンプルで、キーを値を渡すだけで使えます。
オプションでCallbackを渡すこともできます。Callbackを渡すことで、データが
コミットされたことを知ることが出来ます。あるいは、エラーをcatchすることが
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
存在したとしても、あなたのプログラムが無限ループに陥る可能性はありません。

デバッグで`levelmeup run program.js`を使用しますが、その際に出力を見たい
場合はconsole.logではなく、console.errorを使用して下さい。
