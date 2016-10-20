簡単な _hello world_　でリズムに乗りましょう。

３つの引数を取るNodeモジュールを書きましょう。

```javascript
module.exports = function (X, Y, callback) {
  /* your code here */
  callback(error, result)
}
```

**X**と**Y**を使い、Callbackを下記のような結果を使って実行するように
このモジュールを作って下さい。

    ALL YOUR {X} ARE BELONG TO {Y}

上記の中で、`X`と`Y`はそれぞれ引数の値で置き換えて下さい。プログラムが出来たら、
実行してみましょう。以下のコマンドを使ってテスト環境で実行することができます。

    {appname} run program.js

もし結果に満足すれば、以下を実行しましょう。

    {appname} verify program.js

正しいかどうか、検証が行われます。もし正解なら再度 **`{appname}`** を実行して
次の課題に取り組みましょう！
