// 기본 검색 사이트들
const DEFAULT_SITES = [
  {
    name: "Google",
    url: "https://www.google.com/search?q={query}",
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/results?search_query={query}",
  },
];

class JumpToSearch {
  constructor() {
    this.sites = [];
    this.draggedElement = null;
    this.init();
  }

  async init() {
    await this.loadSites();
    this.setupEventListeners();
    this.renderSites();

    // 팝업이 열렸을 때 사이트 선택 드롭다운에 초점 설정
    setTimeout(() => {
      const siteSelect = document.getElementById("siteSelect");
      if (siteSelect) {
        siteSelect.focus();
      }
    }, 100);
  }

  async loadSites() {
    try {
      const result = await chrome.storage.local.get(["sites"]);
      this.sites = result.sites || DEFAULT_SITES;
    } catch (error) {
      console.error("사이트 로드 실패:", error);
      this.sites = DEFAULT_SITES;
    }
  }

  async saveSites() {
    try {
      await chrome.storage.local.set({ sites: this.sites });
    } catch (error) {
      console.error("사이트 저장 실패:", error);
    }
  }

  setupEventListeners() {
    // 검색 버튼
    document.getElementById("searchBtn").addEventListener("click", () => {
      this.performSearch();
    });

    // Enter 키 검색
    document.getElementById("searchInput").addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        this.performSearch();
      }
    });

    // TAB 키 네비게이션 제한 (홈 화면에서만)
    document.addEventListener("keydown", (e) => {
      if (
        e.key === "Tab" &&
        document.getElementById("homePage").classList.contains("active")
      ) {
        const focusableElements = [
          document.getElementById("siteSelect"),
          document.getElementById("searchInput"),
          document.getElementById("searchBtn"),
          document.getElementById("newTabCheckbox"),
        ];

        const currentIndex = focusableElements.indexOf(document.activeElement);

        if (e.shiftKey) {
          // Shift+Tab: 이전 요소로
          if (currentIndex <= 0) {
            e.preventDefault();
            focusableElements[focusableElements.length - 1].focus();
          }
        } else {
          // Tab: 다음 요소로
          if (currentIndex >= focusableElements.length - 1) {
            e.preventDefault();
            focusableElements[0].focus();
          }
        }
      }
    });

    // 사이트 목록 버튼
    document.getElementById("listSitesBtn").addEventListener("click", () => {
      this.showSitesListPage();
    });

    // 사이트 추가 버튼
    document.getElementById("addSiteBtn").addEventListener("click", () => {
      this.showAddSitePage();
    });

    // 뒤로가기 버튼들
    document.getElementById("backFromListBtn").addEventListener("click", () => {
      this.showHomePage();
    });

    document.getElementById("backFromAddBtn").addEventListener("click", () => {
      this.showHomePage();
    });

    document.getElementById("backFromEditBtn").addEventListener("click", () => {
      this.showSitesListPage();
    });

    // 사이트 저장 버튼
    document.getElementById("saveSiteBtn").addEventListener("click", () => {
      this.saveNewSite();
    });

    // 사이트 업데이트 버튼
    document.getElementById("updateSiteBtn").addEventListener("click", () => {
      const index = parseInt(
        document.getElementById("editSitePage").getAttribute("data-edit-index")
      );
      this.editSite(index);
    });

    // Edit/Delete 버튼 이벤트 위임
    document.addEventListener("click", (e) => {
      const editBtn = e.target.closest(".edit-btn");
      const deleteBtn = e.target.closest(".delete-btn");

      if (editBtn) {
        const index = parseInt(editBtn.getAttribute("data-index"));
        this.showEditSitePage(index);
      } else if (deleteBtn) {
        const index = parseInt(deleteBtn.getAttribute("data-index"));
        this.deleteSite(index);
      }
    });
  }

  renderSites() {
    const siteSelect = document.getElementById("siteSelect");
    siteSelect.innerHTML = '<option value="">Select a site</option>';

    this.sites.forEach((site, index) => {
      const option = document.createElement("option");
      option.value = index;
      option.textContent = site.name;
      siteSelect.appendChild(option);
    });
  }

  performSearch() {
    const selectedSiteIndex = document.getElementById("siteSelect").value;
    const searchQuery = document.getElementById("searchInput").value.trim();
    const openInNewTab = document.getElementById("newTabCheckbox").checked;

    if (!selectedSiteIndex) {
      alert("Please select a site.");
      return;
    }

    if (!searchQuery) {
      alert("Please enter a search term.");
      return;
    }

    const selectedSite = this.sites[selectedSiteIndex];
    const searchUrl = selectedSite.url.replace(
      "{query}",
      encodeURIComponent(searchQuery)
    );

    if (openInNewTab) {
      chrome.tabs.create({ url: searchUrl });
    } else {
      chrome.tabs.update({ url: searchUrl });
    }

    // Close popup
    window.close();
  }

  showHomePage() {
    document
      .querySelectorAll(".page")
      .forEach((page) => page.classList.remove("active"));
    document.getElementById("homePage").classList.add("active");
  }

  showSitesListPage() {
    document
      .querySelectorAll(".page")
      .forEach((page) => page.classList.remove("active"));
    document.getElementById("sitesListPage").classList.add("active");
    this.renderSitesList();
  }

  showAddSitePage() {
    document
      .querySelectorAll(".page")
      .forEach((page) => page.classList.remove("active"));
    document.getElementById("addSitePage").classList.add("active");
    document.getElementById("siteName").value = "";
    document.getElementById("siteUrl").value = "";
    document.getElementById("siteName").focus();
  }

  showEditSitePage(index) {
    const site = this.sites[index];
    document
      .querySelectorAll(".page")
      .forEach((page) => page.classList.remove("active"));
    document.getElementById("editSitePage").classList.add("active");
    document.getElementById("editSiteName").value = site.name;
    document.getElementById("editSiteUrl").value = site.url;
    document
      .getElementById("editSitePage")
      .setAttribute("data-edit-index", index);
    document.getElementById("editSiteName").focus();
  }

  async saveNewSite() {
    const name = document.getElementById("siteName").value.trim();
    const url = document.getElementById("siteUrl").value.trim();

    if (!name) {
      alert("Please enter a site name.");
      return;
    }

    if (!url) {
      alert("Please enter a search URL.");
      return;
    }

    if (!url.includes("{query}")) {
      alert("Please include {query} in the URL.");
      return;
    }

    // Check for duplicate names
    if (this.sites.some((site) => site.name === name)) {
      alert("A site with this name already exists.");
      return;
    }

    const newSite = { name, url };
    this.sites.push(newSite);
    await this.saveSites();
    this.renderSites();
    this.showSitesListPage();

    // Success message
    this.showNotification("New site added successfully!");
  }

  renderSitesList() {
    const sitesList = document.getElementById("sitesList");
    sitesList.innerHTML = "";

    this.sites.forEach((site, index) => {
      const siteItem = document.createElement("div");
      siteItem.className = "site-item";
      siteItem.setAttribute("data-index", index);

      siteItem.innerHTML = `
        <div class="drag-handle" draggable="true">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="9" cy="5" r="1"></circle>
            <circle cx="9" cy="12" r="1"></circle>
            <circle cx="9" cy="19" r="1"></circle>
            <circle cx="15" cy="5" r="1"></circle>
            <circle cx="15" cy="12" r="1"></circle>
            <circle cx="15" cy="19" r="1"></circle>
          </svg>
        </div>
        <div class="site-item-info">
          <div class="site-item-name">${site.name}</div>
          <div class="site-item-url">${site.url}</div>
        </div>
        <div class="site-item-actions">
          <button class="edit-btn" data-index="${index}" title="Edit site">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
          </button>
          <button class="delete-btn" data-index="${index}" title="Delete site">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3,6 5,6 21,6"></polyline>
              <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"></path>
            </svg>
          </button>
        </div>
      `;

      sitesList.appendChild(siteItem);
    });

    // 드래그 앤 드롭 이벤트 설정
    this.setupDragAndDrop();
  }

  setupDragAndDrop() {
    const dragHandles = document.querySelectorAll(".drag-handle");
    const siteItems = document.querySelectorAll(".site-item");

    dragHandles.forEach((handle) => {
      handle.addEventListener("dragstart", (e) => {
        const item = handle.closest(".site-item");
        this.draggedElement = item;
        item.classList.add("dragging");
        e.dataTransfer.effectAllowed = "move";
      });

      handle.addEventListener("dragend", () => {
        if (this.draggedElement) {
          this.draggedElement.classList.remove("dragging");
          this.draggedElement = null;
        }
      });
    });

    siteItems.forEach((item) => {
      item.addEventListener("dragover", (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
      });

      item.addEventListener("dragenter", (e) => {
        e.preventDefault();
        if (item !== this.draggedElement) {
          item.classList.add("drag-over");
        }
      });

      item.addEventListener("dragleave", () => {
        item.classList.remove("drag-over");
      });

      item.addEventListener("drop", (e) => {
        e.preventDefault();
        item.classList.remove("drag-over");

        if (this.draggedElement && this.draggedElement !== item) {
          const draggedIndex = parseInt(
            this.draggedElement.getAttribute("data-index")
          );
          const dropIndex = parseInt(item.getAttribute("data-index"));

          // 배열에서 순서 변경
          const draggedSite = this.sites[draggedIndex];
          this.sites.splice(draggedIndex, 1);
          this.sites.splice(dropIndex, 0, draggedSite);

          // 저장하고 다시 렌더링
          this.saveSites();
          this.renderSites();
          this.renderSitesList();
        }
      });
    });
  }

  async editSite(index) {
    const name = document.getElementById("editSiteName").value.trim();
    const url = document.getElementById("editSiteUrl").value.trim();

    if (!name) {
      alert("Please enter a site name.");
      return;
    }

    if (!url) {
      alert("Please enter a search URL.");
      return;
    }

    if (!url.includes("{query}")) {
      alert("Please include {query} in the URL.");
      return;
    }

    // Check for duplicate names (excluding current site)
    if (this.sites.some((site, i) => i !== index && site.name === name)) {
      alert("A site with this name already exists.");
      return;
    }

    this.sites[index] = { name, url };
    await this.saveSites();
    this.renderSites();
    this.showSitesListPage();

    // Success message
    this.showNotification("Site updated successfully!");
  }

  async deleteSite(index) {
    if (confirm("Are you sure you want to delete this site?")) {
      this.sites.splice(index, 1);
      await this.saveSites();
      this.renderSites();
      this.renderSitesList();

      // Success message
      this.showNotification("Site deleted successfully!");
    }
  }

  showNotification(message) {
    const notification = document.createElement("div");
    notification.className = "notification";
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 3000);
  }
}

// 초기화
new JumpToSearch();
