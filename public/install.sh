#!/usr/bin/env bash
# One-line installer for Sentinal (VibeSentinel):
#   curl -fsSL https://sahilsidhu7.github.io/sentinal-landing/install.sh | bash
#
# This is a bootstrap only — it clones the Sentinal repo, then hands off to
# its own scripts/install.sh (venv, editable installs, ONNX export, dashboard
# build). See https://github.com/SahilSidhu7/Sentinal for what that does.
set -euo pipefail

REPO_URL="https://github.com/SahilSidhu7/Sentinal.git"
INSTALL_DIR="${SENTINAL_INSTALL_DIR:-$PWD/Sentinal}"

echo "==> Sentinal bootstrap installer"

if ! command -v git >/dev/null 2>&1; then
  echo "error: git not found. Install git first." >&2
  exit 1
fi

if [ -d "$INSTALL_DIR/.git" ]; then
  echo "==> $INSTALL_DIR already exists — pulling latest instead of re-cloning"
  git -C "$INSTALL_DIR" pull
else
  echo "==> cloning into $INSTALL_DIR"
  git clone "$REPO_URL" "$INSTALL_DIR"
fi

if [ ! -f "$INSTALL_DIR/scripts/install.sh" ]; then
  echo "error: $INSTALL_DIR/scripts/install.sh not found — repo layout changed?" >&2
  exit 1
fi

echo "==> handing off to $INSTALL_DIR/scripts/install.sh"
bash "$INSTALL_DIR/scripts/install.sh"  # invoked via bash explicitly, not relying on the executable bit
                                         # surviving a Windows-authored git commit

echo ""
echo "==> done. cd \"$INSTALL_DIR\" && source .venv/bin/activate && sentinal --help"
