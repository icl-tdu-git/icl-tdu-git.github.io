# 知的計算システム研究室 Webサイト

東京電機大学 未来科学部 情報メディア学科 知的計算システム研究室（ICL）のWebサイトです。  
Hugoと専用テーマ `themes/icl/` を使用し、掲載内容をYAMLで管理します。

- 公開先: https://icl-tdu-git.github.io/
- 実装済みのページ: トップ、Member

## ローカルでの表示

Hugo 0.115.3を使用しています。ローカルではextended版で動作確認済みですが、現在の構成は通常版でも生成できます。

リポジトリ直下で実行します。

```powershell
hugo server --baseURL http://localhost:1313/ --disableFastRender
```

ブラウザーで http://localhost:1313/ を開きます。Memberページは http://localhost:1313/member/ です。
ファイルを保存するとプレビューに反映されます。停止は `Ctrl+C` です。

## 掲載内容の更新

| 内容 | 編集するファイル |
| --- | --- |
| トップの写真・紹介文・研究分野 | `data/home.yaml` |
| メンバー・学年・表示順 | `data/member.yaml` |
| 研究室名・所属・住所 | `data/site.yaml` |
| ページタイトル | `content/_index.md`、`content/member.md` |
| メニュー・公開URL | `hugo.toml` |

### 写真と紹介文

画像は `static/img/` 以下に配置し、YAMLには `img/index/top.jpg` のように指定します。
先頭の `/` や `static/` は付けません。`image_alt` には画像の内容を記載します。

`data/home.yaml` の `about.text` は `|-` 形式です。
字下げを揃えて記述すると、改行・空行が画面にも反映されます。長い行は画面幅に合わせて折り返されます。

### メンバー

`data/member.yaml` の該当グループの `members` に追記します。

```yaml
      - ja: 電大 太郎
        en: Taro Dendai
        url: https://example.com/
```

`url` は任意です。指定した場合は氏名がリンクになります。
グループとメンバーはYAMLのリスト順に表示し、人数は自動集計します。
グループの `id` は、重複しない半角英数字とハイフンで指定してください。

## デザインの変更

専用テーマの編集箇所は次のとおりです。

| 内容 | `themes/icl/` 内のファイル |
| --- | --- |
| トップの構成 | `layouts/index.html` |
| Memberの構成 | `layouts/_default/member.html` |
| 共通HTML・フォント読み込み | `layouts/_default/baseof.html` |
| ヘッダー・メニュー・フッター | `layouts/partials/` |
| 色・文字・配置・スマートフォン表示 | `static/css/icl.css` |
| モバイルメニューの開閉 | `static/js/navigation.js` |

色はCSS冒頭の変数、トップ写真に重ねる緑色の濃さは `.main-visual::after` で調整します。
本文・見出しはNoto Sans JP、ICLロゴとトップの英語研究室名はRighteousをGoogle Fontsから読み込みます。
本文の太さは500、見出しは700です。オフライン時や読み込み前は端末内の代替フォントで表示します。

## ビルド・公開
GitHub Pagesへの公開は `.github/workflows/hugo.yaml` が行います。

1. 初回にGitHubの **Settings → Pages → Build and deployment → Source** を **GitHub Actions** に設定します。
2. `main` ブランチへpushすると、Hugo 0.115.3でビルドして公開します。
3. GitHubのActions画面で結果を確認します。`main` に対する手動実行も可能です。

公開時のタイムゾーンはAsia/Tokyoで、Pagesから取得したURLを `--baseURL` に渡します。
既定ブランチを変更する場合は、ワークフローのpush対象とdeploy条件を両方更新してください。

生成物の `public/`、キャッシュの `resources/`、ローカル確認用の `.preview/` はGit管理から除外しています。

参考: [Hugo公式のGitHub Pages公開手順](https://gohugo.io/host-and-deploy/host-on-github-pages/)
