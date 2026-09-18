# 知的計算システム研究室 Webサイト

東京電機大学 未来科学部 情報メディア学科 知的計算システム研究室（ICL）のWebサイトです。  
Hugoと専用テーマ `themes/icl/` を使用し、掲載内容をYAMLで管理します。

- 公開先: https://icl-tdu-git.github.io/
- 実装済みのページ: トップ、Member、お知らせ一覧、Publications、Theses

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
| お知らせ | `data/news.yaml` |
| 学術論文・国際会議・国内学会 | `data/publications.yaml` |
| 博士論文・修士論文・卒業論文 | `data/theses.yaml` |
| メンバー・学年・表示順 | `data/member.yaml` |
| 研究室名・所属・住所 | `data/site.yaml` |
| ページタイトル | `content/_index.md`、`content/member.md` |
| メニュー・公開URL | `hugo.toml` |

### 写真と紹介文

画像は `static/img/` 以下に配置し、YAMLには `img/index/top.jpg` のように指定します。
先頭の `/` や `static/` は付けません。`image_alt` には画像の内容を記載します。

`data/home.yaml` の `about.text` は `|-` 形式です。
字下げを揃えて記述すると、改行・空行が画面にも反映されます。長い行は画面幅に合わせて折り返されます。

### お知らせ

`data/news.yaml` に日付と本文を記載します。初回は空リストの `[]` を削除し、次のように追加してください。

```yaml
- date: "2026-09-16"
  text: "○○学会で研究成果を発表しました。"
  url: "https://example.com/"

- date: "2026-09-01"
  text: "○○の活動を行いました。"
```

紹介文と研究分野の間に、日付の新しい順で最新5件を表示します。
「お知らせ一覧へ」から `/news/` を開くと、年ごとに全件を新しい順で表示します。
トップと一覧は同じYAMLを使用するため、一覧用の追記は不要です。年の見出しも自動生成します。
`date` は引用符で囲んだ `YYYY-MM-DD` 形式にします。`url` は任意で、指定すると本文がリンクになります。
お知らせがない場合は `[]` と記載すると「現在、お知らせはありません。」と表示します。

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

### Publications・Theses

`/publications/` は研究業績、`/theses/` は学位論文・卒業論文の一覧です。
Publicationsは「出版年 → 出版種別」の順で表示します。
`data/publications.yaml` の先頭に論文を追加します。各項目の `category` に出版種別を指定します。
出版年（1月〜12月）は必須の `date` から自動取得し、新しい順に並べます。
`date` は引用符で囲んだ `YYYY-MM` 形式で記載してください（月は2桁）。

```yaml
- author: [著者名1, 著者名2]
  title: 論文タイトル
  venue: 掲載誌名・会議名、巻号、ページなど
  date: "2026-09"
  category: international
  url: "https://example.com/"
```

カテゴリは `journal`（学術論文）、`international`（国際会議）、`domestic`（国内学会・研究会）の順で表示します。
各カテゴリ内は年月の新しい順に表示します。同じ年月の項目は記載順です。
未定義のカテゴリや不正な年月形式はビルド時にエラーになります。全件削除する場合は `[]` と記載します。
その年に項目のないカテゴリは表示しません。
`author` は著者名のリスト、または卒論・修論のように単一の文字列を指定できます。
Thesesでは通常 `author` と `title` のみで構いません。
`venue`・`url` は任意です。`url` を指定するとタイトルがリンクになります。
掲載先の補足には `**受賞情報**` のようなMarkdownの強調が使えます。
Thesesは「年度 → 種別」の順で表示します。データは従来どおり `data/theses.yaml` の該当カテゴリの `fiscal_years` 内に追記します。
`fiscal_year` は年度（4月〜翌年3月）で、新しい順に表示します。`date` は任意です。

```yaml
      - fiscal_year: 2026
        items:
          - author: 著者名
            title: 論文タイトル
```

Thesesのカテゴリ内の `fiscal_years: []` または年度内の `items: []` は表示しません。
博士論文を追加する際は、`doctoral` の `fiscal_years: []` を年度と項目のリストに置き換えてください。

## デザインの変更

専用テーマの編集箇所は次のとおりです。

| 内容 | `themes/icl/` 内のファイル |
| --- | --- |
| トップの構成 | `layouts/index.html` |
| Memberの構成 | `layouts/_default/member.html` |
| Publicationsの構成 | `layouts/_default/publications.html` |
| Thesesの構成 | `layouts/_default/achievements.html` |
| Publicationsの参考文献形式 | `layouts/partials/publication-list.html` |
| Thesesの論文項目表示 | `layouts/partials/achievement-list.html` |
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
