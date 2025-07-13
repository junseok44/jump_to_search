// 백그라운드 서비스 워커
chrome.runtime.onInstalled.addListener(() => {
  console.log("JumpToSearch 확장 프로그램이 설치되었습니다.");

  // 기본 사이트들이 이미 popup.js에서 처리되므로 여기서는 로그만 출력
});

// 확장 프로그램 아이콘 클릭 시 팝업이 자동으로 열리므로 별도 처리 불필요
chrome.action.onClicked.addListener((tab) => {
  // 팝업이 자동으로 열리므로 여기서는 아무것도 하지 않음
});

// 메시지 리스너 (향후 기능 확장을 위해)
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getSites") {
    // 사이트 목록 요청 처리
    chrome.storage.local.get(["sites"], (result) => {
      sendResponse({ sites: result.sites || [] });
    });
    return true; // 비동기 응답을 위해 true 반환
  }
});
