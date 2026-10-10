# harahering.com

harahering のアプリ紹介サイトです。GitHub Pages で `https://harahering.com/` として公開します(公開前は非公開リポジトリ)。

Jekyll は使わず、普通の HTML として置いています(`.nojekyll`)。

## 構成

| パス | 内容 |
|---|---|
| `/` | 開発者のトップ(アプリの一覧) |
| `/dayline/` | Day Line の紹介 |
| `/dayline/help/` | ヘルプ |
| `/dayline/terms/` | 利用規約(アプリの課金画面からも開く) |
| `/dayline/privacy/` | プライバシーポリシー(App Store Connect にも登録する) |
| `/dayline/tokushoho/` | 特定商取引法に基づく表記(アプリの設定と課金画面からも開く) |
| `/dayline/news/` | お知らせ(`news.json` を読み込んで表示) |
| `/dayline/news.json` | お知らせのデータ。アプリもこのファイルを読む |
| `/assets/` | スタイル、お知らせの表示用スクリプト、アイコン |

**`/dayline/news.json` の場所は変えないこと。** 公開したアプリがこの URL を読みに来るため、変えると古いバージョンでお知らせが読めなくなります。

## お知らせの書き方

`dayline/news.json` の `items` に1件足します。並び順は気にしなくてかまいません(日付の新しい順に表示されます)。

```json
{
  "id": "2026-11-bugfix-video",
  "date": "2026-11-05",
  "title": "動画が再生できない不具合について",
  "body": "1行目の文章です。\n\n空行(\\n\\n)で段落が分かれます。[ヘルプ](https://harahering.com/dayline/help/)のようにリンクも書けます。",
  "important": true,
  "minVersion": "1.0",
  "maxVersion": "1.0.1"
}
```

| 項目 | 必須 | 内容 |
|---|---|---|
| `id` | ○ | お知らせごとに違う文字列。**一度出したら変えない**(アプリはこれで既読を判断する)。日付と内容が分かる英数字とハイフンにする |
| `date` | ○ | `YYYY-MM-DD` |
| `title` | ○ | 見出し |
| `body` | ○ | 本文。改行は `\n`、段落は `\n\n`。リンクは `[文字](https://...)` |
| `important` | | `true` にすると、アプリのホームにもカードで表示する。不具合や大事な変更のときだけ使う |
| `minVersion` / `maxVersion` | | アプリでは、このバージョンの範囲の人にだけ表示する(両端を含む)。不具合のお知らせを、影響のあるバージョンにだけ出すときに使う。サイトには常に表示する |

書いたら、JSON として正しいかを確かめてから反映します。

```bash
python3 -c "import json; json.load(open('dayline/news.json')); print('OK')"
```

## 手元で見る

```bash
python3 -m http.server 8000
```

ブラウザで `http://localhost:8000/dayline/` を開きます。

## 公開前に残っていること

- [x] 独自ドメイン `harahering.com` を購入し、DNS を GitHub Pages に向ける(2026-10-05)
- [x] リポジトリを公開にし、Settings → Pages で `main` ブランチを公開、カスタムドメインと HTTPS を設定する(2026-10-05)
- [x] 問い合わせフォーム(Google フォーム)を作り、各ページの「お問い合わせ(準備中)」をリンクに差し替える(2026-10-10)
- [x] 利用規約の管轄裁判所を埋める(東京地方裁判所)
- [ ] 利用規約・プライバシーポリシーの施行日を、アプリの公開日に合わせて埋める
- [ ] 特定商取引法に基づく表記の、販売事業者・運営責任者の氏名と所在地(バーチャルオフィスの住所)を埋める
- [ ] App Store のリンクを差し替える(アプリの公開後)
- [ ] 最初のお知らせ(「Day Line を公開しました」)を `news.json` に足す(公開前は空にしている)
- [ ] 各ページの「公開準備中」の帯(`.prerelease`)と `<meta name="robots" content="noindex">` を消す
