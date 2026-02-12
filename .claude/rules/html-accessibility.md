---
paths:
  - "**/*.html"
---

# HTML & Accessibility Review Rules

## HTML セマンティクス

### 必須要素
- `<main>` ランドマーク（ページに1つ）
- `<nav>` でのナビゲーション
- `<section>` / `<article>` の適切な使い分け
- `<footer>` でのフッター
- 見出し階層: h1 → h2 → h3（スキップ禁止）

### SEO必須メタタグ
- `<meta charset="UTF-8">`
- `<meta name="viewport">`
- `<meta name="description">`（120-160文字）
- `<title>`（60文字以内）
- `<link rel="canonical">`
- `<link rel="icon">` (favicon)
- OGP: `og:title`, `og:description`, `og:image`, `og:type`, `og:url`
- Twitter: `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`

## WCAG 2.1 AA 準拠チェックリスト

### 知覚可能
- [ ] 全画像に適切な `alt` 属性（装飾画像は `alt=""`）
- [ ] カラーコントラスト比 4.5:1 以上（通常テキスト）
- [ ] カラーコントラスト比 3:1 以上（大テキスト 18px+）
- [ ] 色のみで情報を伝えていない

### 操作可能
- [ ] スキップナビゲーションリンクの存在
- [ ] 全インタラクティブ要素がキーボードで操作可能
- [ ] フォーカスインジケーターが視認可能
- [ ] モーダルにフォーカストラップが実装されている
- [ ] `prefers-reduced-motion` でアニメーション無効化可能

### 理解可能
- [ ] `<html lang="ja">` 設定
- [ ] 異言語テキストに適切な `lang` 属性
- [ ] フォーム要素に関連付けられたラベル

### 堅牢
- [ ] aria属性の適切な使用
- [ ] `aria-expanded` の状態管理
- [ ] `aria-hidden="true"` で装飾要素を非表示
