時々、使用中のキーと衝突することに気を配らずジャンクで満たすためのクリーンな名前空間が必要になります。

クリーンな名前空間を作成するために**sublevel**を使用できます。

以下のようにsublevelを使用するためにデータベース操作を拡張できます。

```javascript
var db = sub(level(...))
```

それから`db.sublevel()`を呼び出すことで新しいsublevelを作成できます。

`db.sublevel()`をある名前と共に呼ぶだけで、ある名前空間内で有効であること以外は
通常のデータベース操作のように振る舞うオブジェクトを取得することができます。

```javascript
var wizards = db.sublevel('wizards')
```

このアドベンチャーでレベルアップするために、1つ目の引数としてデータベースのパスを取得します。
2つのsublevelを作成してください。1つは"robots"と呼ばれています。
もう1つは"dinosaurs"と呼ばれています。

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

デバッグのために`{appname} run program.js`を実行して結果を取得するために、
console.logの代わりにconsole.errorを使用してください。