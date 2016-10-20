**`level`**をつかって、LevelDBのデータストアをオープンし、キーをいくつか読みだす
モジュールを書きましょう。

３つの引数を取るNodeモジュールとしてプログラムを書いて下さい。

```javascript
module.exports = function (databaseDir, changes, callback) {
  // your code...
  callback(error, values)
}
```
`changes`は削除対象キーのアレイを持つ`del`プロパティを持ったオブジェクトです。
追加対象のキーと値を持つオブジェクトも`put`プロパティとして`changes`は持っています。

例えば:

```
{
  del: [ '@darachennis' ],
  put: {
    '@izs': 'Isaac Z. Schlueter',
    '@tmpvar': 'Elijah Insua',
    '@mrbruning': 'Max Bruning'
  }
}
```

この場合、あなたは３つの新しいエントリ（Twitterハンドルと実名のマップ）を削除し、
１つのエントリを削除する必要があります。

あなたはこのエクササイズで`batch()`メソッドを使いたいはずです。_batch_オペレーション
はアトミックで、複数回の書き込み（削除）を行うのに効率的なメカニズムです。

---

## ヒント:

`batch()`メソッドは２つの形式を持っています。

### 配列形式

配列形式では、必要なオペレーション配列にして渡します。オプションでcallbackを
渡すことも出来ます。配列の各要素は以下の様な形式のオブジェクトとなります。

```javascript
{ type: 'put', key: 'foo', value: 'bar' }
```

あるいは、

```javascript
{ type: 'del', key: 'foo' }
```

### チェーン形式

チェーン系式はLevelDBそのもののバッチオペレーションにより近いものとなっています。
`batch()`を引数無しでコールすると、`Batch`オブジェクトが返されます。そのオブジェクト
を使用することで一連の書き込み・削除オペレーションを構築し、サブミットすることが
出来ます。このオブジェクトは以下のようなメソッドを持っています。

```javascript
batch.put('key', 'value')
batch.del('key')
batch.write(callback)
```

LevelUPインスタンスが_"ready"_となるまで、チェーン系式のバッチは使用できません。
_"ready"_はcallbackをメインの`level()`関数に渡す、あるいは"ready"イベント
をListenすることで判定することが出来ます。詳しい情報はLevelUPドキュメントを
参照して下さい。

### アトミック性

バッチの書き込みはアトミックで、全ての書き込みが成功するか、全て失敗するかの
どちらかです。もしcallbackがエラーを受け取った場合は、あたなは全ての書き込みが
失敗したとみなして問題ありません。

デバッグで`levelmeup run program.js`を使用しますが、その際に出力を見たい
場合はconsole.logではなく、console.errorを使用して下さい。
