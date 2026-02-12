# Portfolio Site - Claude Code Project Instructions

## Project Overview
AI開発ポートフォリオサイト。GitHub Pages でホスティング。
- URL: https://w4d6.github.io/ai-dev-portfolio/
- Design: "Warm Elegant Minimal" (design-prompt.yaml 参照)

## Code Review System

### /code-review スキル
コード変更後に `/code-review` を実行すると、以下の7カテゴリで包括的なレビューを実施:

1. **HTML セマンティクス** - 要素の適切な使用、見出し階層
2. **アクセシビリティ** - WCAG 2.1 AA準拠、aria属性、キーボード操作
3. **SEO** - メタタグ、OGP、構造化データ
4. **CSS品質** - design-prompt.yaml準拠、BEM命名、レスポンシブ
5. **JavaScript品質** - パフォーマンス、エラーハンドリング、スコープ管理
6. **画像最適化** - WebP、lazy loading、ファイルサイズ
7. **デプロイ設定** - GitHub Actions、セキュリティ、パス整合性

レビュー結果は `docs/code-review.md` に出力されます。

### レビュールール
- `.claude/rules/code-review-standards.md` - 全般基準
- `.claude/rules/html-accessibility.md` - HTML & WCAG基準
- `.claude/rules/css-design-system.md` - CSS & デザインシステム基準

### カスタムエージェント
- `.claude/agents/code-reviewer.md` - code-reviewer エージェント（Task toolで使用可能）

### Hooks
- `PreToolUse`: .env ファイルの編集をブロック
- `PostToolUse`: HTML/CSS/JS 編集後にレビューリマインダー表示
- `Stop`: 実装完了時に /code-review の実行を提案

## Design System Reference
@design-prompt.yaml

## Tech Stack
- HTML5 + CSS3 + Vanilla JS
- Google Fonts: Noto Serif JP, Cormorant Garamond
- NanoBanana Pro API: AI画像生成 (2K)
- GitHub Pages: 静的サイトホスティング
- GitHub Actions: CI/CD

## File Structure
```
index.html              # メインページ
src/styles/main.css     # CSS（デザインシステム準拠）
src/scripts/main.js     # JS（Intersection Observer等）
assets/                 # ポートフォリオ画像
assets/generated/       # AI生成画像（NanoBanana Pro 2K）
docs/                   # レビュー結果・リサーチ
.claude/                # Claude Code設定
  skills/code-review/   # /code-review スキル
  agents/               # カスタムエージェント
  rules/                # レビュールール
  hooks/                # フックスクリプト
  settings.json         # プロジェクト設定
```
