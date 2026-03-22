---
description: 프로젝트 파일로 reveal.js HTML + CSS 스캐폴드 생성
---

# Scaffold

Slide Master 프로젝트 파일(slide-project.json)로 reveal.js 프레젠테이션 스캐폴드를 생성합니다.

## 사용법

```
/slide-master-reveal:scaffold <slide-project.json 경로> 출력은 <출력 디렉토리>
```

## 실행 순서

1. 스캐폴드 스크립트 실행:
   ```bash
   node ${CLAUDE_SKILL_DIR}/create-from-export.js \
     --input <slide-project.json 경로> \
     --output <출력 디렉토리> \
     --title "<제목>"
   ```

2. 생성된 파일 확인:
   - `index.template.html` — reveal.js HTML 템플릿 (`<!--BODY:slide-N-->` + `<!--NOTES:slide-N-->` 마커)
   - `index.html` — assemble된 최종 HTML
   - `styles.css` — Slide Master CSS + reveal.js override
   - `slides/slide-N-body.html` — 각 슬라이드의 body 콘텐츠 파일
   - `slides/slide-N-notes.html` — 각 슬라이드의 발표자 노트 파일

3. 결과 보고: 몇 장의 슬라이드가 생성되었는지, 각 슬라이드의 레이아웃 요약

## 구조

```
presentation/
├── index.template.html     ← 레이아웃 구조 (수정하지 않음)
├── index.html              ← assemble 결과 (자동 생성)
├── styles.css              ← 디자인 토큰 CSS
└── slides/
    ├── slide-1-body.html   ← fill이 편집 (콘텐츠 + 나레이션 바)
    ├── slide-1-notes.html  ← fill/enhance가 편집 (발표자 노트)
    ├── slide-2-body.html
    ├── slide-2-notes.html
    └── ...
```

## 재조립 (assemble)

body/notes 파일을 수정한 후 index.html을 재생성:
```bash
node ${CLAUDE_SKILL_DIR}/assemble.js --dir <프레젠테이션 디렉토리>
```

## 참고

- content 필드 → header/footer에 직접 배치
- body 영역과 발표자 노트는 빈 파일로 생성 → `/fill`에서 채움
- 나레이션 바는 body 파일에 직접 추가 (`.slide-narration-wrap > .slide-narration-bar`)
- 발표자 노트는 notes 파일에 작성 → assemble 시 `<aside class="notes">`에 삽입
