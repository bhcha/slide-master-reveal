---
description: 슬라이드 body에 텍스트, 이미지, 테이블 등 콘텐츠를 대화형으로 채우기
---

# Fill

`slides/slide-N-body.html` 파일을 편집하여 슬라이드에 콘텐츠를 추가/수정합니다.

> **CRITICAL:**
> - **`slides/slide-N-body.html`만 편집하세요.** index.html, index.template.html, styles.css는 절대 수정하지 마세요.
> - 각 body 파일 상단 주석에 **가용 높이**가 적혀 있습니다. 이 높이를 넘기지 마세요.

## 사용법

```
/slide-master-reveal:fill <지시사항>
```

## 사용 예시

```
/slide-master-reveal:fill 슬라이드 2에 아키텍처 다이어그램 넣어줘
/slide-master-reveal:fill 슬라이드 3에 제품 비교 테이블 만들어줘
/slide-master-reveal:fill 슬라이드 1 내용 교체해줘
```

## 실행 순서

1. `slides/` 디렉토리 확인 — body 파일 목록 파악
2. 대상 `slides/slide-N-body.html` 읽기
3. 파일 상단 주석에서 **레이아웃과 가용 높이** 확인
4. 가용 높이 안에서 콘텐츠 설계 — 넘칠 것 같으면 슬라이드 분할 제안
5. Edit 도구로 **body 파일만** 수정
6. **[필수] assemble 실행:**
   ```bash
   node ${CLAUDE_SKILL_DIR}/../scaffold/assemble.js --dir <프레젠테이션 디렉토리>
   ```
7. **[필수] overflow 검사:**
   ```bash
   node ${CLAUDE_SKILL_DIR}/../check/check-overflow.js <프레젠테이션>/index.html
   ```
8. **overflow 감지 시 body 파일 수정 → assemble → 재검사.** overflow 0이 될 때까지 반복.

## 편집 대상

```
presentation/
└── slides/
    ├── slide-1-body.html   ← 이 파일들만 편집
    ├── slide-2-body.html
    └── ...
```

**편집하면 안 되는 파일:**
- `index.html` — assemble이 자동 생성
- `index.template.html` — scaffold가 생성한 레이아웃 구조
- `styles.css` — Studio 디자인 토큰

## 가용 높이

body 파일 상단 주석에 적혀 있지만, 참고로:

| 레이아웃 | body 가용 높이 |
|----------|---------------|
| Header/Body/Footer | **≈ 430px** |
| Two Column | **≈ 430px** (×2열) |
| Title Only | **≈ 620px** |
| Blank Canvas | **≈ 576px** |

## 콘텐츠 용량 가이드

**세로로 쌓는 카드는 최대 3개.** 4개 이상은 가로 그리드 사용.

| 요소 | 대략적 높이 |
|------|-----------|
| `.card` (제목 + 설명 1줄) | ~100px |
| `.card` (제목 + 설명 2줄) | ~130px |
| `.overlay-bar` (1줄) | ~50px |
| `h2` | ~50px |
| `p` (1줄) | ~42px |
| `gap` | 24px |

**작성 전 합산 예시:**
- h2(50) + slide-grid-2 카드(130) + overlay-bar 3열(90) + gap×2(48) = **318px** → OK
- 카드 4개 세로(130×4) + gap×3(72) = **592px** → NG (430px 초과)

## 사용 가능한 CSS 클래스

| 클래스 | 용도 |
|--------|------|
| `.card` | 카드 (border + radius) |
| `.badge` / `.badge--secondary` | 라벨 뱃지 |
| `.overlay-bar` | 다크 오버레이 바 |
| `.slide-grid-2` / `.slide-grid-3` | 2열 / 3열 그리드 |
| `.text-lg` ~ `.text-3xl` | 텍스트 크기 확대 |
| `.text-muted` | 흐린 텍스트 |
| `.text-center` | 가운데 정렬 |
| `.font-bold` | 굵은 텍스트 |
| `.footnote` | 하단 각주 (absolute) |
| `r-fit-text` | 슬라이드 폭 맞춤 |
| `r-stretch` | 남은 공간 채우기 |

Font Awesome: `<i class="fa-solid fa-lightbulb"></i>`

색상: `var(--slide-color-primary)`, `var(--slide-color-text)` 등 토큰만 사용.

## 이미지

1. 프레젠테이션 디렉토리에서 `*.png, *.jpg, *.svg` 등 스캔
2. 있으면 목록을 보여주고 확인, 없으면 경로를 물어봄
3. 배치: `<img class="r-stretch" src="image.png" alt="설명">`

## 테이블

```html
<table>
  <thead><tr><th>항목</th><th>값</th></tr></thead>
  <tbody><tr><td>A</td><td>100</td></tr></tbody>
</table>
```

## 나레이션 바

슬라이드 하단에 토스트 형태로 표시되는 나레이션입니다. body 파일에 추가합니다:

```html
<!-- slides/slide-N-body.html 안에 추가 -->
<div class="slide-narration-wrap">
  <div class="slide-narration-bar">여기에 나레이션 텍스트</div>
</div>
```

나레이션 바는 absolute 포지션이므로 body 가용 높이에 영향을 주지 않습니다.

## 발표자 노트

발표자 뷰(S키)에서만 보이는 노트입니다. notes 파일에 작성합니다:

```
slides/slide-N-notes.html에 텍스트 작성
```

assemble 후 `<aside class="notes">`에 삽입됩니다.

## 규칙

- **body 파일과 notes 파일만 편집** — index.html, template, styles.css 수정 금지
- 색상 하드코딩 금지 — `var(--slide-color-*)` 토큰만 사용
- 인라인 스타일은 grid 배치용만 허용 (`display: grid; grid-template-columns: ...`)
- SVG/이미지에 반드시 `max-height` 설정
- 내용이 많으면 슬라이드 분할을 사용자에게 제안
- **overflow가 남은 상태로 작업을 끝내지 마세요**
