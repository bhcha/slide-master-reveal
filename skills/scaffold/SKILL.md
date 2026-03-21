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
   - `index.html` — reveal.js HTML (레이아웃 구조 + 기본 콘텐츠)
   - `styles.css` — Slide Master CSS + reveal.js override

3. 결과 보고: 몇 장의 슬라이드가 생성되었는지, 각 슬라이드의 레이아웃과 content 요약

## 참고

- 스크립트는 이 스킬 디렉토리의 `create-from-export.js`
- content 필드 → HTML에 직접 배치됨
- narration → `<aside class="notes">` 자동 변환
- 상세 콘텐츠(이미지, 테이블, 차트 등)는 `/fill` 스킬로 추가
