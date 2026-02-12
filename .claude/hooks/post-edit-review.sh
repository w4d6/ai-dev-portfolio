#!/bin/bash
# Post-edit hook: HTML/CSS/JS ファイルの編集後にレビューリマインダーを表示
# .claude/settings.json の PostToolUse フックから呼び出される

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // .tool_input.content // empty' 2>/dev/null)

# Check if the edited file is a reviewable type
if [[ "$FILE_PATH" == *.html ]] || [[ "$FILE_PATH" == *.css ]] || [[ "$FILE_PATH" == *.js ]]; then
  echo "[Review Reminder] ${FILE_PATH} が編集されました。/code-review で品質チェックを実行できます。"
fi

exit 0
