// Model
class Tab {
  constructor(url = "https://github.com/Raju41320") {
    this.url = url;
  }
}

// Controller
class TabController {
  constructor() {
    this.tabs = [];
    this.currentTabIndex = 0;
  }

  addTab() {
    const newTab = new Tab();
    this.tabs.push(newTab);
    this.renderTabs();
  }

  removeTab(index) {
    this.tabs.splice(index, 1);
    this.currentTabIndex = Math.min(index, this.tabs.length - 1);
    this.renderTabs();
    this.renderContent();
  }

  switchTab(index) {
    this.currentTabIndex = index;
    this.renderContent();
  }

  renderTabs() {
    const tabsContainer = $("#tabs");
    tabsContainer.empty();

    this.tabs.forEach((tab, index) => {
      const tabElement = $(
        `<div class="tab" data-index="${index}">${index + 1}. ${tab.url}</div>`
      );
      const closeBtn = $(`<span class="tab-close">x</span>`);

      closeBtn.click(() => this.removeTab(index));
      tabElement.append(closeBtn);

      tabElement.click(() => this.switchTab(index));
      tabsContainer.append(tabElement);
    });

    $("#add-tab").click(() => this.addTab());
  }

  renderContent() {
    const currentTab = this.tabs[this.currentTabIndex];
    const iframeContainer = $("#iframe-container");
    iframeContainer.html(`<iframe src="${currentTab.url}"></iframe>`);
  }
}

// Initialize
const tabController = new TabController();
tabController.addTab(); // Add initial tab
tabController.renderTabs(); // Render initial tabs
