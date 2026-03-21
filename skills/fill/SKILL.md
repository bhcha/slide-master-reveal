---
description: AI placeholder 주석을 실제 콘텐츠로 채우기
---

# Fill

scaffold로 생성된 HTML의 `<!-- AI: ... -->` 주석을 실제 콘텐츠로 채웁니다.

## 사용법

```
/slide-master-reveal:fill
```

## 실행 순서

1. 생성된 `index.html` 읽기
2. 모든 `<!-- AI: ... -->` 주석 찾기
3. 각 프롬프트에 맞는 HTML 콘텐츠 생성
4. Edit 도구로 placeholder를 교체 (한 번에 1~2개 슬라이드씩)

## 콘텐츠 생성 규칙

### 필수 규칙
- `<!-- AI: ... -->` 안의 프롬프트를 읽고 적절한 HTML 생성
- export CSS의 클래스만 사용 (아래 목록 참조)
- 인라인 스타일은 grid 레이아웃만 허용 (`display: grid; grid-template-columns: ...`)
- 슬라이드 데이터에 없는 슬롯은 렌더링 금지
- 데이터에 없는 내용을 임의로 추가 금지

### 사용 가능한 CSS 클래스

| 클래스 | 용도 |
|--------|------|
| `.card` | 카드 (border + radius, `.card h2`/`.card p` 프리셋) |
| `.badge` / `.badge--secondary` | 라벨 뱃지 |
| `.overlay-bar` | 다크 오버레이 바 |
| `.slide-grid-2` / `.slide-grid-3` | 2열 / 3열 그리드 |
| `.text-lg` ~ `.text-3xl` | 텍스트 크기 확대 (body 기준 1.15x ~ 1.75x) |
| `.text-muted` | 흐린 텍스트 |
| `.text-center` | 가운데 정렬 |
| `.font-bold` | 굵은 텍스트 |
| `.footnote` | 하단 각주 (absolute) |
| `h1`, `h2`, `p`, `small` | 텍스트 계층 (토큰 스타일 적용) |
| `blockquote` | 인용문 (border-left + italic) |

### reveal.js 내장 클래스

| 클래스 | 용도 |
|--------|------|
| `r-fit-text` | 텍스트를 슬라이드 폭에 맞게 자동 크기 조절 |
| `r-stretch` | 요소를 남은 수직 공간으로 늘림 |
| `r-stack` | 요소를 겹쳐서 배치 |

### Font Awesome 아이콘

scaffold에 Font Awesome CDN이 포함되어 있으므로 아이콘 사용 가능:
```html
<i class="fa-solid fa-lightbulb"></i>
<i class="fa-solid fa-check"></i>
<i class="fa-solid fa-chart-line"></i>
```

### 콘텐츠 팁
- 슬라이드마다 다른 레이아웃 사용 (한 곳은 카드, 다른 곳은 그리드)
- `.card`와 `.overlay-bar`, 일반 텍스트를 섞어서 사용
- 데이터/수치: 큰 텍스트 (`.text-3xl`) + `.text-muted` 설명
- 콘텐츠가 적은 슬라이드는 큰 텍스트 클래스 사용
- `.badge`로 카테고리 라벨 표시
