**`level`**をつかって、LevelDBのデータストアをオープンし、いくつかのエントリを
更新するモジュールを書きましょう。

３つの引数を取るNodeモジュールとしてプログラムを書いて下さい。

```javascript
module.exports = function (databaseDir, changes, callback) {
  // your code...
  callback(error, values)
}
```
`changes`はデータベースに対する変更内容を持ったオブジェクトです。
`del`プロパティは削除対象キーの配列です。
`put`プロパティは追加対象のキーと値を持つオブジェクトです。

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

この場合、あなたは３つの新しいエントリ（Twitterハンドルと実名のマップ）を
追加し、１つのエントリを削除する必要があります。

このエクササイズでは`batch()`メソッドを使うと良いでしょう。_batch_
オペレーションはアトミックで、複数回の書き込み（追加・削除）を行うのに効率的な
メカニズムです。

---

## ヒント:

`batch()`メソッドは２つの形式を持っています。

### 配列形式

配列形式では、必要なオペレーション配列にして渡します。オプションで
callbackを渡すことも出来ます。配列の各要素は以下の様な形式のオブジェクト
となります。

```javascript
{ type: 'put', key: 'foo', value: 'bar' }
```

あるいは、

```javascript
{ type: 'del', key: 'foo' }
```

### チェーン形式

チェーン系式はLevelDBが提供するバッチオペレーションにより近いものと
なっています。`batch()`を引数無しでコールすると、`Batch`オブジェクトが
返されます。そのオブジェクトを使用することで一連の書き込みオペレー
ションを構築し、サブミットすることが出来ます。このオブジェクトは以下の
ようなメソッドを持っています。

```javascript
batch.put('key', 'value')
batch.del('key')
batch.write(callback)
```

LevelUPインスタンスが_"ready"_となるまで、チェーン系式のバッチは使用
できません。_"ready"_はcallbackをメインの`level()`関数に渡す、あるいは
"ready"イベントをListenすることで判定することが出来ます。詳しい情報は
LevelUPドキュメントを参照して下さい。

### アトミック性

バッチの書き込みはアトミックで、全ての書き込みが成功するか、全て失敗
するかのどちらかです。もしcallbackがエラーを受け取った場合は、全ての
書き込みが失敗したとみなして問題ありません。

デバッグで`levelmeup run program.js`を使用しますが、その際に出力を見たい
場合はconsole.logではなく、console.errorを使用して下さい。
