#!/bin/bash
# Pre-edit hook: .env ファイルやシークレットの編集をブロック
INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty' 2>/dev/null)

PROTECTED_PATTERNS=(".env" "secrets/" ".secret")

for pattern in "${PROTECTED_PATTERNS[@]}"; do
  if [[ "$FILE_PATH" == *"$pattern"* ]]; then
    echo "Blocked: $FILE_PATH は保護対象ファイルです。直接編集できません。" >&2
    exit 2
  fi
done

exit 0
