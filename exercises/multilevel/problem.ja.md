あなたのコンピューター上で動くサーバーから値を取得するためにmultilevelを使用するモジュールを
書いてください。

ローカルホスト上でポート番号**4545**を使用する`net`モジュールを使用してTCPコネクションを作成してください。
このコネクションをmultilevelのRPCストリームにパイプでつなぎ、コネクションに返してください。
以下のようなコードを書いてください。

```javascript
var db = multilevel.client()
var connection = net.connect(4545)
connection.pipe(db.createRpcStream()).pipe(connection)
```

あなたはLevelUPオブジェクトのように相互作用できる`db`オブジェクトを持つことになります。

`multilelvelmeup`というキーを使用してデータストアから値を取得し、コンソール上に表示してください。

**値を取得した後は必ずコネクションを閉じてください！**

    connection.end()

---

## ヒント:

multilevelに関しての詳細は以下のページで読めます。

    http://npmjs.com/multilevel

または以下に配置されているローカルのファイルからオフラインでも読めます。

    {rootdir}/docs/multilevel.html

このエクササイズを始めるために`npm install multilevel`を実行しなければいけません。

インターネットに接続できない場合、`node_modules`というディレクトリを作成し以下のディレクトリを作成した
ディレクトリ内にコピーしてください。

    {rootdir}/node_modules/multilevel/
