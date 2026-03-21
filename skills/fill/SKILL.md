---
description: 슬라이드에 텍스트, 이미지, 테이블 등 콘텐츠를 대화형으로 채우기
---

# Fill

scaffold로 생성된 프레젠테이션에 콘텐츠를 추가/수정합니다.

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

1. `index.html` 읽기
2. 사용자 지시에 따라 대상 슬라이드 식별
3. 콘텐츠 유형 판단 (텍스트, 이미지, 테이블 등)
4. 필요 시 에셋 탐색 또는 사용자에게 확인
5. Edit 도구로 HTML 수정

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

## 슬라이드 크기 제약 (필수)

슬라이드는 **1280×720px 고정 영역**입니다. 콘텐츠가 이 영역을 넘으면 잘립니다.

### 사용 가능한 공간 계산

| 레이아웃 | header | footer | body 사용 가능 높이 (대략) |
|----------|--------|--------|--------------------------|
| Header/Body/Footer | ~120px | ~96px | **~430px** |
| Two Column | ~120px | ~96px | **~430px** (×2열) |
| Title Only | 없음 | 없음 | **~620px** |
| Blank Canvas | 없음 | 없음 | **~620px** |

### 콘텐츠 설계 원칙

1. **카드는 최대 3개** — header-body-footer에서 카드 4개 이상은 거의 확실히 넘침
2. **텍스트는 짧게** — 카드 안 텍스트는 제목(h2) 1줄 + 설명(p) 1~2줄이 한계
3. **그리드 활용** — 항목이 많으면 세로 나열 대신 `.slide-grid-2`/`.slide-grid-3`으로 가로 배치
4. **SVG/차트 높이 제한** — viewBox 높이를 body 가용 높이에 맞춤 (max-height 사용)
5. **큰 콘텐츠는 슬라이드 분할** — 한 슬라이드에 모든 정보를 넣지 말고 2~3장으로 나눔
6. **footnote는 absolute** — body 높이에 포함되지 않으므로 안전

### 레이아웃별 콘텐츠 용량 가이드

**Header/Body/Footer (~430px body):**
- 카드 2~3개 (세로 나열) 또는 카드 4~6개 (slide-grid-2/3)
- 테이블 최대 5~6행
- SVG/차트 1개 (max-height: 350px)

**Two Column (~430px body, 2열):**
- 각 열에 카드 2~3개 또는 간단한 리스트
- 한쪽 이미지 + 한쪽 텍스트

**Blank Canvas (~620px body):**
- 전체 화면 이미지 또는 대형 차트
- 카드 4~6개 가능
- 2단 그리드 + 하단 요약 바

### 넘침 방지 체크리스트

콘텐츠 작성 후 반드시 확인:
- [ ] body 영역의 총 높이가 가용 높이를 넘지 않는가?
- [ ] 카드 개수가 적절한가? (세로 3개 이하)
- [ ] 텍스트 크기가 과도하지 않은가? (.text-3xl은 1~2개만)
- [ ] SVG/이미지에 max-height를 설정했는가?
- [ ] 의심스러우면 `/check`로 overflow 검사

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
