---
description: 슬라이드에 텍스트, 이미지, 테이블 등 콘텐츠를 대화형으로 채우기
---

# Fill

scaffold로 생성된 프레젠테이션에 콘텐츠를 추가/수정합니다.

> **CRITICAL: 슬라이드는 1280×720px 고정입니다. 콘텐츠가 세로 높이를 초과하면 잘립니다.**
> 콘텐츠를 만들기 전에 반드시 아래 [슬라이드 크기 제약](#슬라이드-크기-제약-critical) 섹션을 확인하세요.
> 내용이 많으면 **슬라이드를 나누세요**. 한 슬라이드에 욱여넣지 마세요.

## 사용법

```
/slide-master-reveal:fill <지시사항>
```

## 사용 예시

```
/slide-master-reveal:fill 슬라이드 2에 아키텍처 다이어그램 넣어줘
/slide-master-reveal:fill 슬라이드 3에 제품 비교 테이블 만들어줘
/slide-master-reveal:fill 슬라이드 4 body에 카드 3개로 핵심 기능 정리
/slide-master-reveal:fill 슬라이드 1 내용 교체해줘
```

## 실행 순서

1. `index.html`과 `styles.css` 읽기
2. 사용자 지시에 따라 대상 슬라이드 식별
3. **레이아웃 확인 → body 가용 높이 계산** (아래 표 참조)
4. 가용 높이 안에서 콘텐츠 설계 — 넘칠 것 같으면 슬라이드 분할을 제안
5. 콘텐츠 유형 판단 (텍스트, 이미지, 테이블 등)
6. 필요 시 에셋 탐색 또는 사용자에게 확인
7. Edit 도구로 HTML 수정
8. **[필수] overflow 검사 실행:**
   ```bash
   node ${CLAUDE_SKILL_DIR}/../check/check-overflow.js <프레젠테이션>/index.html
   ```
9. **overflow가 감지되면 반드시 수정 후 재검사** — 콘텐츠 축소, 카드 제거, 슬라이드 분할 등. overflow가 0이 될 때까지 반복

## 콘텐츠 유형별 처리

### 텍스트

기존 CSS 클래스를 사용하여 HTML 생성:

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

reveal.js 내장 클래스:

| 클래스 | 용도 |
|--------|------|
| `r-fit-text` | 텍스트를 슬라이드 폭에 맞게 자동 크기 조절 |
| `r-stretch` | 요소를 남은 수직 공간으로 늘림 |
| `r-stack` | 요소를 겹쳐서 배치 |

Font Awesome 아이콘:
```html
<i class="fa-solid fa-lightbulb"></i>
<i class="fa-solid fa-check"></i>
```

### 이미지

사용자가 이미지를 요청하면:

1. **프레젠테이션 디렉토리 스캔**: `*.png, *.jpg, *.jpeg, *.svg, *.gif, *.webp` 탐색
2. **이미지가 있으면**: 파일 목록을 보여주고 어떤 이미지를 사용할지 확인
3. **이미지가 없으면**: 사용자에게 경로를 물어봄
4. **배치**: 지시에 맞는 패턴 적용

배치 패턴:

```html
<!-- 단일 이미지 (남은 공간 채우기) -->
<img class="r-stretch" src="diagram.png" alt="Architecture">

<!-- 이미지 + 캡션 -->
<figure>
  <img class="r-stretch" src="screenshot.png" alt="Screenshot">
  <figcaption class="text-muted">Fig 1. 시스템 구성도</figcaption>
</figure>

<!-- 이미지 그리드 -->
<div class="slide-grid-3">
  <img src="step1.png" alt="Step 1">
  <img src="step2.png" alt="Step 2">
  <img src="step3.png" alt="Step 3">
</div>

<!-- 이미지 + 텍스트 (2열) -->
<div class="slide-grid-2">
  <img src="photo.jpg" alt="Product">
  <div>
    <h2>제품명</h2>
    <p>설명 텍스트</p>
  </div>
</div>
```

### 테이블

```html
<table>
  <thead>
    <tr><th>기능</th><th>Free</th><th>Pro</th></tr>
  </thead>
  <tbody>
    <tr><td>저장 용량</td><td>5GB</td><td>100GB</td></tr>
    <tr><td>API 호출</td><td>1,000/일</td><td>무제한</td></tr>
  </tbody>
</table>
```

테이블 스타일은 export CSS의 토큰을 자동 상속합니다.

### 비디오 / iframe

```html
<!-- 로컬 비디오 -->
<video class="r-stretch" src="demo.mp4" controls></video>

<!-- 외부 임베드 -->
<iframe class="r-stretch" src="https://example.com/demo" frameborder="0"></iframe>
```

## 슬라이드 크기 제약 (CRITICAL)

> **이 섹션의 규칙을 위반하면 슬라이드가 잘립니다. 반드시 지키세요.**

슬라이드는 **1280×720px 고정**. `.slide-body`에 `overflow: hidden`이 걸려 있어서 넘치는 콘텐츠는 보이지 않습니다.

### body 가용 높이

| 레이아웃 | header | footer | padding | **body 가용 높이** |
|----------|--------|--------|---------|-------------------|
| Header/Body/Footer | 120px | 96px | 48px | **≈ 430px** |
| Two Column | 120px | 96px | 48px | **≈ 430px** (×2열) |
| Title Only | 0 | 0 | 48px | **≈ 620px** |
| Blank Canvas | 0 | 0 | 72px | **≈ 576px** |

### MUST 규칙

1. **세로로 나열하는 카드는 절대 3개 이하** — 카드 1개당 ~120px, 3개 = ~360px + gap = ~408px. 4개는 반드시 넘침
2. **항목 4개 이상은 반드시 가로 그리드** — `.slide-grid-2`(2열) 또는 `.slide-grid-3`(3열) 사용
3. **SVG/차트에 반드시 `max-height` 설정** — body 가용 높이의 80% 이하 (예: Header/Body/Footer에서 max-height: 340px)
4. **한 슬라이드에 2단 구조 이상 쌓지 않기** — 예: 그리드 + 카드 행 + 요약 바 = 3단 → 거의 확실히 넘침
5. **넘칠 것 같으면 슬라이드를 나누라고 사용자에게 제안** — "이 내용은 2장으로 나누는 게 좋겠습니다"

### 높이 추정 참고값

| 요소 | 대략적 높이 |
|------|-----------|
| `.card` (제목 1줄 + 설명 1줄) | ~100px |
| `.card` (제목 1줄 + 설명 2줄) | ~130px |
| `.overlay-bar` (1줄) | ~50px |
| `.overlay-bar` (3줄, 숫자 포함) | ~90px |
| `h2` (subheading) | ~50px |
| `p` (body 1줄) | ~42px |
| `.slide-grid-3` × `.overlay-bar` | ~90px (가로 배치이므로 1행) |
| `gap` (section-gap) | 24px |

**콘텐츠 작성 전에 반드시 합산하세요.** 예:
- h2(50) + 2열 그리드 내 카드 2개(130×2→130, 가로 배치) + 3열 요약 바(90) + gap×2(48) = **318px** → OK (430px 이내)
- h2(50) + 카드 4개 세로(130×4=520) + gap×4(96) = **666px** → NG (430px 초과)

### 넘침 방지 — 반드시 이 순서를 따르세요

1. 콘텐츠 작성 **전**: 요소 높이를 합산하여 가용 높이 이내인지 확인
2. 콘텐츠 작성 **후**: `check-overflow.js` 실행 (실행 순서 8번)
3. overflow 감지 시: **콘텐츠를 줄이거나 슬라이드를 나눈 뒤 재검사**
4. overflow 0이 될 때까지 반복

**overflow가 남아있는 상태로 작업을 끝내지 마세요.**

## 규칙

- 인라인 스타일은 grid 레이아웃만 허용 (`display: grid; grid-template-columns: ...`)
- export CSS의 클래스를 우선 사용
- 사용자가 지정하지 않은 콘텐츠를 임의로 추가하지 않음
- 이미지 파일이 프레젠테이션 디렉토리에 없으면 반드시 사용자에게 경로 확인
- 기존 콘텐츠가 있는 슬라이드를 수정할 때는 교체/추가 여부를 확인

## 팁

- 슬라이드마다 다른 레이아웃 패턴 사용 (카드, 그리드, 이미지+텍스트 등)
- `.card`와 `.overlay-bar`, 일반 텍스트를 섞어서 사용
- 데이터/수치: 큰 텍스트 (`.text-3xl`) + `.text-muted` 설명
- `.badge`로 카테고리 라벨 표시
- 이미지는 `alt` 속성을 반드시 포함
- **내용이 많으면 슬라이드를 나누자고 사용자에게 제안**
