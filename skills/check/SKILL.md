---
description: 슬라이드 overflow 검사 및 수정
---

# Check

모든 슬라이드의 콘텐츠 overflow를 검사하고 문제를 수정합니다.

## 사용법

```
/slide-master-reveal:check
```

## 실행 순서

1. overflow 검사 스크립트 실행:
   ```bash
   node ${CLAUDE_SKILL_DIR}/check-overflow.js <프레젠테이션>/index.html
   ```

2. 결과 분석:
   - overflow 없음 → 통과 보고
   - overflow 감지 → 해당 슬라이드 번호와 초과 크기(px) 보고

3. overflow가 있으면 수정:
   - 콘텐츠 줄이기 (텍스트 축소, 항목 제거)
   - 텍스트 크기 낮추기 (`.text-2xl` → `.text-xl`)
   - 레이아웃 변경 (`.slide-grid-3` → `.slide-grid-2`)
   - 수정 후 다시 검사

4. 차트가 있으면 차트 검증도 실행:
   ```bash
   node ${CLAUDE_SKILL_DIR}/check-charts.js <프레젠테이션>/index.html
   ```

## 의존성

스크립트 실행 전 플러그인 루트에서 `npm install` 필요 (puppeteer, cheerio):
```bash
cd ${CLAUDE_SKILL_DIR}/../.. && npm install
```

## 참고

- Puppeteer 기반으로 실제 브라우저에서 렌더링하여 검사
- 수직/수평 overflow 모두 감지
- reveal.js가 초기화된 후 측정하므로 정확
- check-charts.js는 차트 JSON 구조와 `maintainAspectRatio: false` 설정을 검증
