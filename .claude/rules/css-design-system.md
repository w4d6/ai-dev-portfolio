---
paths:
  - "**/*.css"
---

# CSS & Design System Review Rules

## design-prompt.yaml 準拠チェック

### カラーパレット
CSS変数が以下の値と一致すること:
- `--color-primary`: `#e8a4b8` (Muted rose)
- `--color-primary-dark`: `#d48fa3` (Deeper rose)
- `--color-accent`: `#ffc0cb` (Soft pink)
- `--color-accent-soft`: `#fff0f3` (Very pale pink)
- `--color-bg-primary`: `#ffffff`
- `--color-bg-secondary`: `#fafafa`
- `--color-bg-tertiary`: `#f5f5f5`
- `--color-text-primary`: `#333333`
- `--color-text-secondary`: `#888888`
- `--color-border`: `#eeeeee`

### タイポグラフィ
- Primary: `"Noto Serif JP"` (serif-first strategy)
- フォントウェイト: 400, 700
- 見出し line-height: 1.5-1.8
- 本文 line-height: 1.8
- letter-spacing: 0.05em-0.15em

### スペーシング
8px基準のスケール: 4, 8, 16, 24, 32, 48, 64-80px

### コンポーネント基準
- カード: `border-radius: 8px`, hover時 `translateY(-4px)`
- ボタン: `border-radius: 50px` (pill形状)
- バッジ: `border-radius: 50px`, `font-size: 11px`
- プログレスバー: `height: 3-4px`, ピンクグラデーション
- セクションディバイダー: `width: 40-60px`, `height: 3px`

## CSS品質基準

### 命名規則 (BEM)
```
.block {}
.block__element {}
.block--modifier {}
```

### 必須メディアクエリ
1. タブレット: `@media (max-width: 1024px)` → 2カラム
2. モバイル: `@media (max-width: 768px)` → 1カラム
3. 小型: `@media (max-width: 480px)`
4. **`@media (prefers-reduced-motion: reduce)`** → アニメーション無効化

### パフォーマンス
- アニメーション: `transform` と `opacity` のみ
- `will-change` の乱用禁止
- `-webkit-backdrop-filter` プレフィックス付与
