**`level`**をつかって、LevelDBのデータストアをオープンし、エントリを
全て取り出すモジュールを書きましょう。

引数を１つだけ取り、ストリームを返すNodeモジュールとしてプログラムを
書いて下さい。

```javascript
module.exports = function (databaseDir) {
  var resultStream
  // your code...
  return resultStream
}
```

LevelDB中のエントリをそれぞれ`{key}={value}`の形式でチャンクに分けた
ストリームを作成して下さい。

---

## ヒント:

今回あなたはキーが分からない状態ですので、`get()`を使うことは出来ません。
その代わり、ReadStreamを使ってデータストアに問い合わせることになります。

`createReadStream()`メソッドはNodeの標準的なオブジェクトストリームを
作成します。このオブジェクトストリームのチャンク（あるいはデータイベント）
はLevelDBのデータストアの各エントリとなります。データオブジェクトはエントリ
に対応する`key`プロパティと`value`プロバティを持ちます。

あなたは以下のようなコードでデータストアの全コンテンツのストリームを
作成することが出来ます。

```javascript
    db.createReadStream().on('data', function (data) {
      // data.key and data.value
    })
```

ストリームが終了したあと、データベースを`.close`する必要があることを
忘れないで下さい！

`through2`を使用すると良いでしょう。

    npm i through2

もしオフラインであれば、以下のパスのものを使用して下さい。

    file://{rootdir}/node_modules/through2

I/Oエラーにより'error'イベントが発生する可能性があることに注意して下さい。
