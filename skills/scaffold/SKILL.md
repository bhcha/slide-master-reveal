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
   - `index.template.html` — reveal.js HTML 템플릿 (레이아웃 구조 + `<!--BODY:slide-N-->` 마커)
   - `index.html` — assemble된 최종 HTML
   - `styles.css` — Slide Master CSS + reveal.js override
   - `slides/slide-N-body.html` — 각 슬라이드의 body 콘텐츠 파일

3. 결과 보고: 몇 장의 슬라이드가 생성되었는지, 각 슬라이드의 레이아웃 요약

## 구조

```
presentation/
├── index.template.html     ← 레이아웃 구조 (수정하지 않음)
├── index.html              ← assemble 결과 (자동 생성)
├── styles.css              ← 디자인 토큰 CSS
└── slides/
    ├── slide-1-body.html   ← fill이 편집하는 파일
    ├── slide-2-body.html
    └── ...
```

## 재조립 (assemble)

body 파일을 수정한 후 index.html을 재생성:
```bash
node ${CLAUDE_SKILL_DIR}/assemble.js --dir <프레젠테이션 디렉토리>
```

## 참고

- 스크립트는 이 스킬 디렉토리의 `create-from-export.js`
- content 필드 → header/footer에 직접 배치, body에는 초기값으로 생성
- narration → `<aside class="notes">` 자동 변환
- 상세 콘텐츠(이미지, 테이블 등)는 `/fill`로 `slides/slide-N-body.html`에 추가
