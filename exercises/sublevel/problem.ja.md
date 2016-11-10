使用中のキーとの衝突を気にせずジャンクを埋めつくせるような、クリーンな名前空間が
たまに必要になります。

クリーンな名前空間を作成するために**sublevel**を使用できます。

以下のようにsublevelを使用するためにデータベースハンドルを拡張できます。

```javascript
var db = sub(level(...))
```

その後、`db.sublevel()`を呼び出すことで新しいsublevelを作成できます。

`db.sublevel()`を名前渡して呼ぶだけで、通常のデータベースハンドルと
（ある名前空間内に存在しているということ以外は）同じように振る舞う
オブジェクトを取得することができます。

```javascript
var wizards = db.sublevel('wizards')
```

このアドベンチャーでレベルアップするために、1つ目の引数としてデータ
ベースのパスを受け取ります。
2つのsublevelを作成してください。1つは"robots"という名前で、
もう1つは"dinosaurs"という名前です。

各sublevelのために"slogan"と言う名のキーを作成してください。
dinosaursと呼ばれるsublevelの _slogan_ を`'rawr'`に設定し、
robotsと呼ばれるsublevelの _slogan_ を`'beep boop'`に設定してください。

---

# ヒント:

sublevelに関しての詳細は以下のページで読めます。

    http://npmjs.com/level-sublevel

または以下に配置されているローカルのファイルからオフラインでも読めます。

    {appDir}/docs/sublevel.html

このエクササイズを始めるために`npm install level-sublevel`を実行しなければいけません。

インターネットに接続できない場合、`node_modules`というディレクトリを作成し以下のディレクトリを作成した
ディレクトリ内にコピーしてください。

    {appdir}/node_modules/level-sublevel/

デバッグのために`{appname} run program.js`を実行して出力を取得するために、
console.logの代わりにconsole.errorを使用してください。
