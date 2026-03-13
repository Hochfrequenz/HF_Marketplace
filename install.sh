#!/bin/bash
# HF Marketplace — Skill Installer
# Fügt den Marktplatz als Git Submodule hinzu und installiert ausgewählte Skills.
#
# Nutzung:
#   ./install.sh                          # Alle Skills auflisten
#   ./install.sh <skill-name>             # Einen Skill installieren
#   ./install.sh <skill1> <skill2> ...    # Mehrere Skills installieren
#   ./install.sh --all                    # Alle Skills installieren
#   ./install.sh --remove <skill-name>    # Einen Skill entfernen

set -e

MARKETPLACE_REPO="https://github.com/Hochfrequenz/HF_Marketplace.git"
MARKETPLACE_DIR=".claude/marketplace"
SKILLS_DIR=".claude/skills"

# Farben
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

info()  { echo -e "${GREEN}[✓]${NC} $1"; }
warn()  { echo -e "${YELLOW}[!]${NC} $1"; }
error() { echo -e "${RED}[✗]${NC} $1"; exit 1; }

# Submodule einrichten falls nötig
setup_submodule() {
    if [ ! -d "$MARKETPLACE_DIR" ]; then
        echo "Füge HF Marketplace als Git Submodule hinzu..."
        git submodule add "$MARKETPLACE_REPO" "$MARKETPLACE_DIR" 2>/dev/null || true
        git submodule update --init "$MARKETPLACE_DIR"
        info "Marktplatz eingerichtet unter $MARKETPLACE_DIR"
    else
        echo "Aktualisiere Marktplatz..."
        git submodule update --remote "$MARKETPLACE_DIR" 2>/dev/null || true
        info "Marktplatz aktualisiert"
    fi
}

# Verfügbare Skills auflisten
list_skills() {
    echo ""
    echo "Verfügbare Skills im HF Marketplace:"
    echo "======================================"
    for skill_dir in "$MARKETPLACE_DIR"/skills/*/; do
        if [ -f "$skill_dir/SKILL.md" ]; then
            skill_name=$(basename "$skill_dir")
            # Description aus SKILL.md YAML-Header lesen
            desc=$(grep "^description:" "$skill_dir/SKILL.md" | head -1 | sed 's/^description: //')
            installed=""
            if [ -d "$SKILLS_DIR/$skill_name" ]; then
                installed=" ${GREEN}[installiert]${NC}"
            fi
            echo -e "  • ${GREEN}$skill_name${NC}$installed"
            echo "    $desc"
            echo ""
        fi
    done
    echo "Installation: ./install.sh <skill-name>"
}

# Einen Skill installieren
install_skill() {
    local skill_name="$1"
    local source="$MARKETPLACE_DIR/skills/$skill_name"

    if [ ! -d "$source" ]; then
        error "Skill '$skill_name' nicht gefunden im Marktplatz"
    fi

    if [ ! -f "$source/SKILL.md" ]; then
        error "Skill '$skill_name' hat keine SKILL.md — kann nicht installiert werden"
    fi

    mkdir -p "$SKILLS_DIR/$skill_name"
    cp "$source/SKILL.md" "$SKILLS_DIR/$skill_name/SKILL.md"
    info "Skill '$skill_name' installiert nach $SKILLS_DIR/$skill_name/"
}

# Einen Skill entfernen
remove_skill() {
    local skill_name="$1"
    local target="$SKILLS_DIR/$skill_name"

    if [ ! -d "$target" ]; then
        error "Skill '$skill_name' ist nicht installiert"
    fi

    rm -rf "$target"
    info "Skill '$skill_name' entfernt"
}

# Hauptlogik
if [ $# -eq 0 ]; then
    setup_submodule
    list_skills
    exit 0
fi

if [ "$1" = "--remove" ]; then
    shift
    for skill in "$@"; do
        remove_skill "$skill"
    done
    exit 0
fi

setup_submodule

if [ "$1" = "--all" ]; then
    for skill_dir in "$MARKETPLACE_DIR"/skills/*/; do
        if [ -f "$skill_dir/SKILL.md" ]; then
            install_skill "$(basename "$skill_dir")"
        fi
    done
else
    for skill in "$@"; do
        install_skill "$skill"
    done
fi

echo ""
info "Fertig! Skills sind verfügbar in Claude Code."
