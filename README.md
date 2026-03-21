# Slide Master Reveal

Claude Code plugin for generating reveal.js presentations from Slide Master project files.

Based on [ryanbbrown/revealjs-skill](https://github.com/ryanbbrown/revealjs-skill). Adapted for Slide Master design token system.

## Structure

```
slide-master-reveal/
├── .claude-plugin/plugin.json
├── skills/
│   ├── studio/          # Studio 에디터 서빙
│   ├── scaffold/        # 프로젝트 파일 → reveal.js HTML + CSS
│   ├── fill/            # AI placeholder 채우기
│   ├── enhance/         # 고급 기능 (Fragment, Chart, Auto-Animate 등)
│   ├── check/           # overflow 검사 (Puppeteer)
│   ├── review/          # 스크린샷 리뷰 (decktape)
│   └── edit/            # 브라우저 텍스트 편집 서버
├── refer-upstream/      # 원본 revealjs 스킬 참조용 (실행에 사용하지 않음)
└── README.md
```

## Install

```bash
/plugin marketplace add bhcha/slide-master-reveal
/plugin install slide-master-reveal
```

## Dependencies

check 및 review 스킬 실행에 필요:

```bash
cd <plugin-root>
npm install    # puppeteer (overflow 검사), cheerio (차트 검증)
```

decktape은 `npx`로 자동 설치됨.

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

## Based On

원본 [ryanbbrown/revealjs-skill](https://github.com/ryanbbrown/revealjs-skill)의 스크립트와 참조 문서를 베이스로 Slide Master 디자인 토큰 시스템에 맞게 재구성. 원본은 `refer-upstream/`에 참조용으로 보관.
