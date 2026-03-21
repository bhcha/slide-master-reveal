---
description: 스크린샷 촬영 및 시각적 리뷰
---

# Review

모든 슬라이드를 스크린샷으로 캡처하고 시각적으로 검증합니다.

## 사용법

```
/slide-master-reveal:review
```

## 실행 순서

1. assemble 실행 (body 파일이 최신 상태인지 확인):
   ```bash
   node ${CLAUDE_SKILL_DIR}/../scaffold/assemble.js --dir <프레젠테이션 디렉토리>
   ```

2. 스크린샷 촬영:
   ```bash
   cd <프레젠테이션 디렉토리>
   npx decktape reveal "index.html?export" output.pdf \
     --screenshots \
     --screenshots-directory "screenshots/$(date +%Y%m%d_%H%M%S)"
   ```

   > **`?export`**: Chart.js 애니메이션을 비활성화하여 차트가 완전히 렌더링된 상태로 캡처됩니다. 브라우저에서 직접 볼 때는 차트가 정상적으로 애니메이션됩니다.

3. Read 도구로 **모든 스크린샷** 확인 (건너뛰지 말 것)

4. 확인 항목:
   - 텍스트 가독성 (배경 대비 충분한 대비)
   - 레이아웃 overflow (check에서 못 잡은 edge case)
   - 누락/잘못 배치된 요소
   - 카드/뱃지 스타일링 정상 여부
   - 색상 상속 문제 (컨테이너 안 텍스트 색)
   - 빈 영역이 너무 많은 슬라이드
   - 차트가 올바르게 렌더링되었는지 (데이터, 범례, 축 레이블)
   - Font Awesome 아이콘이 정상 표시되는지 (빈 사각형이면 CDN 로드 실패)

5. 문제 발견 시:
   - `slides/slide-N-body.html` 수정 → assemble → 해당 슬라이드만 다시 캡처:
     ```bash
     npx decktape reveal "index.html?export" output.pdf \
       --screenshots \
       --screenshots-directory "screenshots/$(date +%Y%m%d_%H%M%S)" \
       --slides 2,5
     ```
   - 수정된 스크린샷 다시 확인

## 참고

- decktape이 설치되어 있지 않으면 `npx`로 자동 다운로드됨
- 스크린샷은 타임스탬프 폴더에 저장되어 이전 버전과 비교 가능
