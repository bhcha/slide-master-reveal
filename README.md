# Slide Master Reveal

Claude Code plugin for generating reveal.js presentations from Slide Master project files.

Based on [ryanbbrown/revealjs-skill](https://github.com/ryanbbrown/revealjs-skill). Adapted for Slide Master design token system.

## Structure

```
slide-master-reveal/
├── upstream/          ← 원본 revealjs 스킬 (수정 없음)
│   ├── SKILL.md
│   ├── references/    ← advanced-features.md, charts.md, base-styles.css
│   └── scripts/       ← check-overflow.js, edit-html.js, create-presentation.js, check-charts.js
├── skills/            ← Slide Master 전용 스킬 (upstream 참조)
│   ├── studio/        ← Studio 에디터 서빙 (우리 고유)
│   ├── scaffold/      ← 프로젝트 파일 → reveal.js (우리 고유 스크립트)
│   ├── fill/          ← AI placeholder 채우기 (우리 고유)
│   ├── enhance/       ← 고급 기능 (upstream/references/ 참조)
│   ├── check/         ← overflow 검사 (upstream/scripts/ 참조)
│   ├── review/        ← 스크린샷 리뷰 (npx decktape)
│   └── edit/          ← 텍스트 편집 (upstream/scripts/ 참조)
└── .claude-plugin/
```

- `upstream/` — 원본 스킬 파일. **수정하지 않음**. 업데이트 시 이 폴더만 교체.
- `skills/` — Slide Master 전용 스킬. upstream 참조 + Studio 연동.

## Install

```bash
/plugin marketplace add bhcha/slide-master-reveal
/plugin install slide-master-reveal
```

## Skills

| Skill | Description |
|-------|-------------|
| `/slide-master-reveal:studio` | Open Studio editor in browser |
| `/slide-master-reveal:scaffold` | Generate reveal.js HTML + CSS from project file |
| `/slide-master-reveal:fill` | Fill AI placeholder comments with content |
| `/slide-master-reveal:enhance` | Add charts, animations, transitions |
| `/slide-master-reveal:check` | Detect slide overflow with Puppeteer |
| `/slide-master-reveal:review` | Screenshot & visual review with decktape |
| `/slide-master-reveal:edit` | Browser-based text editing server |

## Workflow

```
/slide-master-reveal:studio     → Open editor, design master + deck, save .json
/slide-master-reveal:scaffold   → Generate HTML + CSS scaffold
/slide-master-reveal:fill       → Fill AI placeholders with content
/slide-master-reveal:enhance    → Add charts, animations, transitions
/slide-master-reveal:check      → Detect overflow
/slide-master-reveal:review     → Screenshot review
/slide-master-reveal:edit       → Fine-tune text in browser
```

## Updating Upstream

```bash
git clone --depth 1 https://github.com/ryanbbrown/revealjs-skill.git /tmp/revealjs-skill
rm -rf upstream/
cp -r /tmp/revealjs-skill/skills/revealjs/ upstream/
rm -rf /tmp/revealjs-skill
git diff upstream/
git add upstream/ && git commit -m "update upstream revealjs skill"
```
