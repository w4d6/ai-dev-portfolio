---
name: code-review
description: "ポートフォリオサイトの包括的コードレビューを実行する。HTML/CSS/JS/画像/デプロイ設定を網羅的にレビューし、レポートを生成する。"
argument-hint: "[対象パス（省略時は全体）]"
allowed-tools: Read, Glob, Grep, Bash, Write, Edit, Task
model: opus
---

# Code Review Skill

あなたはシニアフロントエンドエンジニアとして、ポートフォリオサイトの包括的なコードレビューを実行します。

## レビュー対象

$ARGUMENTS が指定されている場合はそのパスのみ、指定がない場合はプロジェクト全体をレビューします。

## レビュープロセス

### Phase 1: ファイル収集
まず以下のコマンドで対象ファイルを確認してください:
- HTML: `!`find . -name "*.html" -not -path "./node_modules/*"``
- CSS: `!`find . -name "*.css" -not -path "./node_modules/*"``
- JS: `!`find . -name "*.js" -not -path "./node_modules/*"``
- 画像: `!`find ./assets -type f \( -name "*.webp" -o -name "*.png" -o -name "*.jpg" \) 2>/dev/null``
- デプロイ設定: `!`find .github -type f 2>/dev/null``

### Phase 2: 各観点でのレビュー

以下の **6カテゴリ・全レビュー項目** を漏れなくチェックしてください。

---

#### 1. HTML セマンティクス & 構造
| チェック項目 | 確認内容 |
|-------------|---------|
| HTML5要素 | `<main>`, `<nav>`, `<section>`, `<article>`, `<header>`, `<footer>` の適切な使用 |
| 見出し階層 | h1→h2→h3 の正しい順序、スキップなし |
| ランドマーク | `<main>` 要素の存在、ページに1つのみ |
| フォーム | `<label>` と `<input>` の紐付け、`for`/`id` ペア |
| リンク | 空の `href`、`target="_blank"` に `rel="noopener noreferrer"` |
| 文書メタ | charset, viewport, lang属性 |

#### 2. アクセシビリティ (WCAG 2.1)
| チェック項目 | 確認内容 |
|-------------|---------|
| aria属性 | `aria-label`, `aria-expanded`, `aria-hidden` の適切な使用 |
| alt属性 | 装飾画像は `alt=""`、コンテンツ画像は具体的な説明文 |
| キーボード操作 | インタラクティブ要素に `tabindex`, `role` 設定 |
| フォーカス管理 | モーダル等のフォーカストラップ |
| スキップリンク | `<a href="#main-content" class="skip-link">` の存在 |
| カラーコントラスト | WCAG AA基準（4.5:1 for text, 3:1 for large text） |
| reduced-motion | `@media (prefers-reduced-motion: reduce)` の実装 |

#### 3. SEO & メタデータ
| チェック項目 | 確認内容 |
|-------------|---------|
| title | 60文字以内、ユニーク |
| meta description | 120-160文字、具体的 |
| OGP | `og:title`, `og:description`, `og:image`, `og:type`, `og:url` |
| Twitter Card | `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image` |
| canonical | `<link rel="canonical">` の設定 |
| favicon | `<link rel="icon">` の設定 |
| 構造化データ | JSON-LD schema の有無 |

#### 4. CSS 品質
| チェック項目 | 確認内容 |
|-------------|---------|
| デザインシステム準拠 | design-prompt.yaml のカラー・タイポグラフィ・スペーシングとの一致 |
| CSS変数 | `:root` でのデザイントークン一元管理 |
| 命名規則 | BEM (`block__element--modifier`) の一貫性 |
| レスポンシブ | ブレークポイントの適切さ、モバイル表示の品質 |
| パフォーマンス | `will-change` 乱用なし、`transform`/`opacity` でのアニメーション |
| 保守性 | マジックナンバーの有無、重複スタイルの排除 |

#### 5. JavaScript 品質
| チェック項目 | 確認内容 |
|-------------|---------|
| スコープ | IIFE or ES Modules でのスコープ隔離 |
| strict mode | `"use strict"` の使用 |
| null安全 | DOM要素の存在チェック |
| イベント最適化 | `passive: true`、`IntersectionObserver`、`requestAnimationFrame` |
| メモリリーク | removeEventListener、observer.unobserve |
| エラーハンドリング | try-catch、フォールバック処理 |

#### 6. 画像 & アセット最適化
| チェック項目 | 確認内容 |
|-------------|---------|
| フォーマット | WebP使用、不要な大型ファイルなし |
| サイズ | ファイルサイズの適切さ（hero: <200KB, card: <50KB） |
| 属性 | `loading="lazy"` (below fold)、`width`/`height` (CLS防止) |
| 不要ファイル | PNG/JPGの残存（WebP版がある場合） |

#### 7. デプロイ & CI/CD
| チェック項目 | 確認内容 |
|-------------|---------|
| セキュリティ | 最小権限パーミッション、シークレット管理 |
| アクションバージョン | SHAピン止め or メジャーバージョンタグ |
| アーティファクト | 不要ファイルの除外 |
| パス整合性 | 相対パスの正しさ、GitHub Pages base path |

---

### Phase 3: レポート生成

レビュー結果を `docs/code-review.md` に以下のフォーマットで出力してください:

```markdown
# コードレビュー結果

**レビュー日**: YYYY-MM-DD
**レビュー対象**: [対象範囲]
**レビュースキル**: /code-review

---

## 1. [カテゴリ名]

| 項目 | 評価 | 詳細 |
|------|------|------|
| ... | ✅/⚠️/❌ | 具体的な説明 |

（全カテゴリを記載）

---

## 総合サマリー

### ❌ 要修正（Critical）
1. ...

### ⚠️ 改善推奨（Warning）
1. ...

### ✅ 良好な点
1. ...

## カテゴリ別スコア

| カテゴリ | スコア |
|----------|--------|
| HTML | X / 10 |
| アクセシビリティ | X / 10 |
| SEO | X / 10 |
| CSS | X / 10 |
| JavaScript | X / 10 |
| 画像 | X / 10 |
| デプロイ | X / 10 |

### **総合スコア: XX / 100**
```

### Phase 4: 修正提案

❌（Critical）の項目については、具体的な修正コードも提案してください。
